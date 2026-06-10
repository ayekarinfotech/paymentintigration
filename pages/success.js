import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Payment Successful — AykarInfotech</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.page}>
        <div style={styles.glow} />
        <div style={styles.card}>
          <div style={styles.iconWrap}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="rgba(240,165,0,0.15)" />
              <circle cx="24" cy="24" r="18" fill="rgba(240,165,0,0.2)" />
              <path d="M14 24l7 7 13-13" stroke="#F0A500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={styles.brand}>
            <span style={styles.logoText}>aykar<span style={styles.logoAccent}>infotech</span></span>
          </div>

          <h1 style={styles.title}>Payment Successful!</h1>
          <p style={styles.subtitle}>
            Your payment has been received and is being processed. You will receive a confirmation shortly.
          </p>

          <div style={styles.infoBox}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <span style={styles.statusBadge}>✓ Confirmed</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Powered by</span>
              <span style={styles.infoValue}>NOWPayments</span>
            </div>
          </div>

          <button onClick={() => router.push('/')} style={styles.btn}>
            Make Another Payment
          </button>

          <p style={styles.countdown}>
            Redirecting in <span style={styles.countdownNum}>{countdown}s</span>
          </p>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
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
    fontFamily: "'Inter', sans-serif",
  },
  glow: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '36px 28px',
    textAlign: 'center',
    animation: 'fadeUp 0.5s ease both',
  },
  iconWrap: {
    marginBottom: '16px',
    animation: 'scaleIn 0.4s ease both 0.1s',
  },
  brand: {
    marginBottom: '16px',
  },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: '500',
    color: '#fff',
  },
  logoAccent: {
    color: '#F0A500',
    fontWeight: '700',
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '10px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  infoBox: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '12px',
    padding: '14px 16px',
    marginBottom: '24px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
  },
  infoLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
  },
  infoValue: {
    fontSize: '13px',
    color: '#fff',
    fontWeight: '500',
  },
  statusBadge: {
    fontSize: '12px',
    color: '#4ADE80',
    background: 'rgba(74,222,128,0.1)',
    padding: '3px 10px',
    borderRadius: '20px',
    border: '1px solid rgba(74,222,128,0.2)',
    fontWeight: '600',
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #F0A500, #F5C842)',
    border: 'none',
    borderRadius: '12px',
    color: '#080C14',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: 'pointer',
    marginBottom: '16px',
    transition: 'opacity 0.15s',
  },
  countdown: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.25)',
  },
  countdownNum: {
    color: 'rgba(240,165,0,0.6)',
    fontWeight: '600',
  },
};
