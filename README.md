# AykarInfotech — Payment Portal

A modern, secure online payment portal built for **AykarInfotech**, enabling customers to complete payments quickly and safely through cryptocurrency and card-based checkout.

---

## Overview

The AykarInfotech Payment Portal provides a streamlined, single-page checkout experience. Customers can select from preset payment amounts or enter a custom value, review a clear payment summary, and complete their transaction through a trusted, PCI-compliant payment gateway. Upon successful payment, customers are guided to a confirmation page with automatic redirection.

The platform is designed with a focus on speed, security, and simplicity — delivering a frictionless payment experience on both desktop and mobile devices.

---

## Key Features

- **Multiple Payment Options** — Supports Bitcoin, Ethereum, USDT, and 200+ cryptocurrencies, along with card payments through an integrated gateway.
- **Flexible Amounts** — Preset denominations ($25, $50, $100, $250, $500, $1000) plus a custom amount option for complete flexibility.
- **Transparent Checkout** — A clear payment summary is displayed before checkout, so customers always know exactly what they are paying.
- **Secure Processing** — All transactions are processed through NOWPayments, an industry-trusted payment infrastructure. No sensitive payment data is stored on our servers.
- **Confirmation & Redirect** — A dedicated success page confirms completed payments and automatically returns customers to the homepage.
- **Responsive Design** — A premium dark-gold interface, fully optimized for mobile, tablet, and desktop.

---

## Technology

| Layer | Technology |
|-------|------------|
| Framework | Next.js (React) |
| Payment Infrastructure | NOWPayments |
| Hosting | Vercel |
| Design | Custom responsive dark-gold UI |

---

## Security

- Payments are handled end-to-end by a certified third-party gateway.
- API credentials are stored securely as environment variables and never exposed to the client.
- No card details, wallet keys, or personal financial data are collected or stored by this application.

---

## About AykarInfotech

AykarInfotech is committed to providing fast, reliable, and secure digital payment solutions for its customers.

---

## License

© 2024 AykarInfotech. All rights reserved.

---

## Rampex Integration (added)

Environment variables (set these in Vercel → Project → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `RAMPEX_API_KEY` | Your API key from the Rampex dashboard |
| `RAMPEX_WEBHOOK_SECRET` | Webhook secret from Rampex dashboard → Webhook Settings |
| `RAMPEX_API_BASE` | Optional. Defaults to `https://rampex.io/api` |
| `NEXT_PUBLIC_BASE_URL` | Your deployed URL, e.g. `https://yourproject.vercel.app` (already used by NOWPayments) |

Webhook URL to register in your Rampex dashboard:

```
https://YOUR-DOMAIN.vercel.app/api/rampex-webhook
```

The webhook verifies the `X-Rampex-Signature` (HMAC-SHA256 of the raw body) and logs payment results to Vercel Logs.
