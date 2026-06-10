import Head from 'next/head';
import { useState } from 'react';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function Home() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePreset = (val) => {
    setAmount(String(val));
    setError('');
  };

  const handlePay = async () => {
    setError('');
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (Number(amount) < 1) {
      setError('Minimum payment is $1.00');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      window.location.href = data.invoiceUrl;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AykarInfotech — Secure Payment</title>
        <meta name="description" content="Fast, secure crypto and card payments by AykarInfotech" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.page}>
        {/* Background glow */}
        <div style={styles.glow1} />
        <div style={styles.glow2} />

        <main style={styles.main}>
          {/* Logo / Brand */}
          <div style={styles.brand}>
            <div style={styles.logoMark}>K</div>
            <span style={styles.logoText}>aykar<span style={styles.logoAccent}>infotech</span></span>
          </div>

          {/* Card */}
          <div style={styles.card}>
            {/* Card header */}
            <div style={styles.cardHeader}>
              <div style={styles.accentBar} />
              <div>
                <p style={styles.cardEyebrow}>Secure Checkout</p>
                <h1 style={styles.cardTitle}>Make a Payment</h1>
              </div>
              <div style={styles.badges}>
                <span style={styles.badge}>🔒 SSL</span>
                <span style={styles.badge}>⚡ Instant</span>
              </div>
            </div>

            {/* Preset amounts */}
            <div style={styles.section}>
              <label style={styles.label}>Select Amount (USD)</label>
              <div style={styles.presetGrid}>
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val}
                    onClick={() => handlePreset(val)}
                    style={{
                      ...styles.presetBtn,
                      ...(amount === String(val) ? styles.presetBtnActive : {}),
                    }}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount */}
            <div style={styles.section}>
              <label style={styles.label}>Or enter custom amount</label>
              <div style={styles.inputWrapper}>
                <span style={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(''); }}
                  style={styles.input}
                  min="1"
                />
                <span style={styles.currencyCode}>USD</span>
              </div>
            </div>

            {/* Description */}
            <div style={styles.section}>
              <label style={styles.label}>Payment note <span style={styles.optional}>(optional)</span></label>
              <input
                type="text"
                placeholder="What is this payment for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, paddingLeft: '16px' }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={styles.errorBox}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Summary */}
            {amount && !isNaN(amount) && Number(amount) > 0 && (
              <div style={styles.summary}>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Amount</span>
                  <span style={styles.summaryValue}>${Number(amount).toFixed(2)} USD</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Processing fee</span>
                  <span style={styles.summaryValueMuted}>Included</span>
                </div>
                <div style={styles.summaryDivider} />
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabelBold}>Total</span>
                  <span style={styles.summaryTotal}>${Number(amount).toFixed(2)} USD</span>
                </div>
              </div>
            )}

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={loading}
              style={{ ...styles.payBtn, ...(loading ? styles.payBtnLoading : {}) }}
            >
              {loading ? (
                <span style={styles.spinnerWrap}>
                  <span style={styles.spinner} /> Processing...
                </span>
              ) : (
                `Pay ${amount && !isNaN(amount) && Number(amount) > 0 ? `$${Number(amount).toFixed(2)}` : 'Now'}`
              )}
            </button>

            {/* Payment methods */}
            <div style={styles.methods}>
              <span style={styles.methodsText}>Accepted via</span>
              <div style={styles.methodIcons}>
                {['💳 Visa', '💳 Mastercard', '🍎 Apple Pay', 'G Pay', '₿ Bitcoin', '⟠ ETH', '◎ USDT'].map((m) => (
                  <span key={m} style={styles.methodChip}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p style={styles.footer}>
            Powered by <span style={styles.footerAccent}>NOWPayments</span> · 
            Secured by <span style={styles.footerAccent}>Guardarian</span> ·{' '}
            <span style={styles.footerMuted}>© 2026 AykarInfotech</span>
          </p>
        </main>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#080C14',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    position: 'relative',
    overflow: 'hidden',
  },
  glow1: {
    position: 'fixed',
    top: '-200px',
    left: '-200px',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glow2: {
    position: 'fixed',
    bottom: '-200px',
    right: '-200px',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  main: {
    width: '100%',
    maxWidth: '480px',
    animation: 'fadeUp 0.5s ease both',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '28px',
    justifyContent: 'center',
  },
  logoMark: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg, #F0A500, #F5C842)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: '700',
    fontSize: '18px',
    color: '#080C14',
  },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '22px',
    fontWeight: '500',
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  logoAccent: {
    color: '#F0A500',
    fontWeight: '700',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '28px 24px',
    backdropFilter: 'blur(20px)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '24px',
  },
  accentBar: {
    width: '4px',
    height: '44px',
    background: 'linear-gradient(180deg, #F0A500, #F5C842)',
    borderRadius: '4px',
    flexShrink: 0,
    marginTop: '2px',
  },
  cardEyebrow: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#F0A500',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  cardTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  badges: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginLeft: 'auto',
    flexShrink: 0,
  },
  badge: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.06)',
    padding: '3px 8px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
    whiteSpace: 'nowrap',
  },
  section: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  optional: {
    fontWeight: '400',
    textTransform: 'none',
    letterSpacing: '0',
    color: 'rgba(255,255,255,0.3)',
  },
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  presetBtn: {
    padding: '10px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontFamily: "'Inter', sans-serif",
  },
  presetBtnActive: {
    background: 'rgba(240,165,0,0.15)',
    border: '1px solid rgba(240,165,0,0.5)',
    color: '#F0A500',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  currencySymbol: {
    position: 'absolute',
    left: '14px',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '16px',
    fontWeight: '500',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '13px 16px 13px 32px',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  currencyCode: {
    position: 'absolute',
    right: '14px',
    color: 'rgba(255,255,255,0.3)',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    pointerEvents: 'none',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#F87171',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summary: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '12px',
    padding: '14px 16px',
    marginBottom: '18px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  summaryLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
  },
  summaryLabelBold: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
  },
  summaryValue: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
  },
  summaryValueMuted: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.3)',
  },
  summaryDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.06)',
    margin: '10px 0',
  },
  summaryTotal: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#F0A500',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  payBtn: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #F0A500, #F5C842)',
    border: 'none',
    borderRadius: '14px',
    color: '#080C14',
    fontSize: '15px',
    fontWeight: '700',
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    letterSpacing: '0.3px',
    marginBottom: '20px',
  },
  payBtnLoading: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none',
  },
  spinnerWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(8,12,20,0.3)',
    borderTop: '2px solid #080C14',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  methods: {
    textAlign: 'center',
  },
  methodsText: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '10px',
  },
  methodIcons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    justifyContent: 'center',
  },
  methodChip: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.4)',
    background: 'rgba(255,255,255,0.04)',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.2)',
  },
  footerAccent: {
    color: 'rgba(240,165,0,0.6)',
  },
  footerMuted: {
    color: 'rgba(255,255,255,0.15)',
  },
};
