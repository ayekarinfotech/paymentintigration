// Creates a Rampex hosted-checkout payment link.
// Mirrors the official Rampex WooCommerce plugin contract:
//   POST {RAMPEX_API_BASE}/api-create-payment-link
//   Headers: X-API-Key
//   Body: { amount, currency, customer_email, description, woo_store_url, woo_order_id }
//   Success response: { success: true, data: { payment_url, link_id, short_code, ipn_token } }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, description, email, orderId } = req.body || {};

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required for Rampex payments' });
  }
  if (!process.env.RAMPEX_API_KEY) {
    return res.status(500).json({ error: 'Rampex is not configured (missing RAMPEX_API_KEY)' });
  }

  const apiBase = (process.env.RAMPEX_API_BASE || 'https://rampex.io/api').replace(/\/+$/, '');
  const order = orderId || `AYK-${Date.now()}`;

  try {
    const response = await fetch(`${apiBase}/api-create-payment-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': process.env.RAMPEX_API_KEY,
      },
      body: JSON.stringify({
        amount: Number(amount), // USD
        currency: 'USD',
        customer_email: email,
        description: description || 'AykarInfotech Payment',
        // Field names kept as the Rampex backend expects them (same contract as their Woo plugin):
        woo_store_url: process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com',
        woo_order_id: order,
      }),
    });

    const data = await response.json().catch(() => null);

    if (
      (response.status === 200 || response.status === 201) &&
      data && data.success && data.data && data.data.payment_url
    ) {
      return res.status(200).json({
        paymentUrl: data.data.payment_url,
        linkId: data.data.link_id || null,
        shortCode: data.data.short_code || null,
        orderId: order,
      });
    }

    // Known error from Rampex: merchant wallet not configured
    if (data && data.error && data.error.code === 'NO_WALLET') {
      console.error('Rampex error: NO_WALLET — set a Default Polygon Wallet in your Rampex dashboard Settings.');
      return res.status(502).json({
        error: 'Merchant wallet not configured in Rampex. Add a Default Polygon Wallet in your Rampex dashboard.',
      });
    }

    console.error('Rampex create-payment-link failed:', response.status, data);
    return res.status(response.status || 502).json({
      error: (data && data.error && data.error.message) || 'Unable to generate Rampex payment link',
    });
  } catch (err) {
    console.error('Rampex server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
