# Rippl App — Routing & Screen Slugs Map

This document outlines the routing scheme and URL slugs mapped across the 4 key portals of Rippl, matching the [Rippl Master Product Blueprint v3.0](file:///Users/sucre/Desktop/Reeple/Rippl_Master_Blueprint_v3%20%281%29.md) and the active Next.js frontend pages.

---

## 1. Public & Marketing Slugs (Unauthenticated)

| Route Path | Screen Name | Description / Details | Auth Role |
|---|---|---|---|
| `/` | Landing Page | Primary Hook & Conversion Engine (ROI calculator, NDPR banner, ticker, exit intent). | Guest |
| `/auth` | Unified Auth Portal | Unified access point for Log In, Sign Up, recovery options, and session expirations. | Guest |
| `/r/[code]` | Referral Redirect | Invisible tracking routing engine that registers clicks and drops cookies before forwarding. | Guest |

---

## 2. Affiliate Portal Slugs (`user_role = affiliate`)
The affiliate dashboard uses a unified single-page tabbed router at [app/affiliate](file:///Users/sucre/Desktop/Reeple/frontend/src/app/affiliate/page.tsx) with state-driven sub-views:

| URL Path + Tab | Screen / View Name | Features & Active Modals |
|---|---|---|
| `/affiliate` | Home Dashboard | Main metrics (cleared balance, pending kobo), activity feed, onboarding checklists. |
| `/affiliate?tab=campaigns` | Campaign Marketplace | Browsing, details sidebar, inv-only application form, and UTM referral link generator. |
| `/affiliate?tab=wallet` | Affiliate Wallet & Cashouts | Cleared balance withdrawal panel, bank account setup, Paystack/NIP resolving, 24h payout PIN checks. |
| `/affiliate?tab=analytics` | Affiliate Analytics | Area graphs of MTD earnings, clicks vs. conversions bar charts, and tabular campaign outputs. |
| `/affiliate?tab=leaderboard` | Leaderboard | Gamified partner rankings highlighting Silver/Gold/Platinum status tiers. |
| `/affiliate?tab=security` | Password & Security | Password updates, active browser session revocation list, and TOTP 2FA configurators. |
| `/affiliate?tab=support` | Help Centre | Searchable FAQ accordion modules and Intercom / WhatsApp direct support buttons. |

---

## 3. Business Admin Portal Slugs (`user_role = business_admin`)
The merchant dashboard is hosted at [app/business-admin](file:///Users/sucre/Desktop/Reeple/frontend/src/app/business-admin/page.tsx) and handles business campaign controls:

| URL Path + Tab | Screen / View Name | Features & Active Modals |
|---|---|---|
| `/business-admin` | Business Dashboard | Revenue trend charts, active affiliate counters, quick action shortcuts, recent conversion feed. |
| `/business-admin?tab=campaigns` | Campaign Manager | Campaign lists, create campaign wizard (description, commission settings, Paystack billing). |
| `/business-admin?tab=affiliates` | Affiliate Manager | Approval queue for invitation campaigns, full performance charts, interior notes fields. |
| `/business-admin?tab=payouts` | Payouts & Reserves | Approved/Flagged payout review queue, disputes tracker, business wallet funding transfer mockups. |
| `/business-admin?tab=integrations` | Integrations Hub | Tracking pixel codes, REST API keys, outbound webhook event logs, and the Pixel Tester iframe. |
| `/business-admin?tab=billing` | Billing & Settings | Subscription plan selector (Starter, Growth, Pro), CAC details profile, team member permission manager. |

---

## 4. Super Admin Portal Slugs (`user_role = super_admin`)
The platform administrator dashboard is hosted at [app/super-admin](file:///Users/sucre/Desktop/Reeple/frontend/src/app/super-admin/page.tsx) for corporate operations:

| URL Path + Tab | Screen / View Name | Features & Active Modals |
|---|---|---|
| `/super-admin` | Global Metrics | Platform metrics (Total GMV, MRR, uptime), new signup charts, incident warning logs. |
| `/super-admin?tab=verifications` | Verifications Queue | CAC registration certificate checking queue and Standard/Enhanced Tier 3 KYC selfie reviewers. |
| `/super-admin?tab=businesses` | Business Accounts | Active merchant accounts, plan adjusters, CAC override overrides, and admin session impersonation. |
| `/super-admin?tab=affiliates` | Global Affiliates | Global directory, withdrawal restriction triggers, suspension controls, audit logging. |
| `/super-admin?tab=finance` | Finance Ledger | Transaction fee MRR details, payout batch monitors, and statement reconciliation logs. |
| `/super-admin?tab=config` | Platform Configuration | Global platform fee variables, fraud thresholds, clearing periods, and email templates. |

---

## 5. Security & Shared Flows (Protected)
Handled by the Edge routing proxy at [src/proxy.ts](file:///Users/sucre/Desktop/Reeple/frontend/src/proxy.ts) and the unified auth state machine:

| Path Parameter | Route / View Name | Trigger Details |
|---|---|---|
| `/auth?logout=true` | Session End | Triggers Edge cookie deletion and forwards the user back to the login page. |
| `/auth` *(Suspended Mode)* | Suspension Notice | Triggered when `suspended@rippl.io` (or a banned flag) attempts login. Shows case details & appeals forms. |
| `/auth` *(Expired Mode)* | Session Lockout | Prefills active account details and blocks navigation until the password is re-verified. |
