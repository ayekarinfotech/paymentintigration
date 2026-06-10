// Rampex payment webhook (IPN).
// Rampex sends: POST with JSON body and header X-Rampex-Signature,
// which is HMAC-SHA256 (hex) of the RAW request body using your webhook secret.
// Payload includes: { link_id, status, transaction_hash | txid, ... }
// status values seen: paid | completed | success | failed | cancelled

import crypto from 'crypto';

// We must verify the signature over the raw bytes, so disable Next's body parser.
export const config = {
  api: { bodyParser: false },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.RAMPEX_WEBHOOK_SECRET;
  if (!secret) {
    console.error('RAMPEX_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  const raw = await readRawBody(req);
  const sig = req.headers['x-rampex-signature'] || '';

  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const sigBuf = Buffer.from(String(sig));
  const expBuf = Buffer.from(expected);
  const valid =
    sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

  if (!valid) {
    console.warn('Rampex webhook: invalid signature');
    return res.status(403).json({ error: 'Invalid signature' });
  }

  let data;
  try {
    data = JSON.parse(raw.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const linkId = data.link_id || '';
  const status = data.status || '';
  const txid = data.transaction_hash || data.txid || '';

  if (!linkId) {
    return res.status(400).json({ error: 'Missing link_id' });
  }

  // This app has no database, so we log the authoritative payment result here.
  // View these in Vercel → your project → Logs.
  if (status === 'paid' || status === 'completed' || status === 'success') {
    console.log(`✅ Rampex payment COMPLETED — link_id=${linkId} txid=${txid}`);
  } else if (status === 'failed' || status === 'cancelled') {
    console.log(`❌ Rampex payment ${status.toUpperCase()} — link_id=${linkId} txid=${txid}`);
  } else {
    console.log(`ℹ️ Rampex webhook status="${status}" — link_id=${linkId}`);
  }

  return res.status(200).json({ success: true });
}
