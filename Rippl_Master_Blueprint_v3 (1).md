# RIPPL — Master Product Blueprint

**Referral · Affiliate · Ambassador · Reward Infrastructure**
*Nigeria & Emerging Markets*

---

| Document Detail | Information |
|---|---|
| Version | 3.0 — Master Blueprint (Updated) |
| Generated | May 2026 |
| Classification | Confidential — Internal Use Only |
| Status | Approved for Development |
| Total Screens | 76 Screens across 4 Portals |
| Sections | 17 Sections — Full Product Specification |

> This document is the complete product specification, technical architecture, business strategy, and operational blueprint for Rippl — Africa's dedicated referral and affiliate infrastructure platform. Version 3.0 includes the fully elevated high-conversion public screen specifications.

---

## Table of Contents

1. [Executive Summary](#section-1--executive-summary)
2. [Complete Screen Inventory — All 76 Screens](#section-2--complete-screen-inventory--all-76-screens)
3. [Detailed User Flows](#section-3--detailed-user-flows)
4. [Product Modules & Feature Specifications](#section-4--product-modules--feature-specifications)
5. [Database Schema](#section-5--database-schema)
6. [Technology Stack](#section-6--technology-stack)
7. [Monetisation Model](#section-7--monetisation-model)
8. [Go-To-Market Strategy](#section-8--go-to-market-strategy)
9. [Financial Projections](#section-9--financial-projections)
10. [Product Roadmap](#section-10--product-roadmap)
11. [Risks & Mitigation](#section-11--risks--mitigation)
12. [Team Structure & Operations](#section-12--team-structure--operations)
13. [API Architecture & Integration Ecosystem](#section-13--api-architecture--integration-ecosystem)
14. [Compliance, Legal & Regulatory Framework](#section-14--compliance-legal--regulatory-framework)
15. [Analytics, Reporting & Platform Intelligence](#section-15--analytics-reporting--platform-intelligence)
16. [Implementation Checklist & Launch Criteria](#section-16--implementation-checklist--launch-criteria)
17. [Appendix — Glossary & References](#section-17--appendix--glossary--references)

---

# SECTION 1 | Executive Summary

## 1.1 The Opportunity

Nigeria's digital economy is growing rapidly — projected to exceed $50 billion by 2030. Yet the backbone of how businesses grow — referral and affiliate marketing — remains broken, manual, and deeply distrusted. Businesses manage affiliate programmes via WhatsApp groups and Excel sheets. Affiliates wait 30–90 days for payment, with no visibility into whether their referrals even converted. The result is a system that collapses under scale and destroys trust on both sides.

Rippl exists to fix this. We are building the foundational growth infrastructure layer for Nigeria and emerging markets — enabling any business, creator, influencer, or community to launch, manage, and scale people-powered growth programmes with the sophistication previously reserved for enterprise organisations in developed markets.

## 1.2 What We're Building

Rippl is a B2B SaaS platform with a two-sided marketplace. Businesses subscribe to create and manage referral and affiliate campaigns. Affiliates join for free to discover campaigns, earn commissions, and withdraw earnings instantly. A Super Admin layer gives the Rippl operations team full platform oversight, compliance controls, and fraud investigation tools.

## 1.3 Key Metrics at a Glance

| Metric | 6-Month Target | 12-Month Target | 24-Month Target |
|---|---|---|---|
| Active Business Accounts | 100 | 500 | 2,000 |
| Active Affiliates | 2,000 | 10,000 | 75,000 |
| Monthly Payout Volume | ₦50M | ₦300M | ₦2B |
| Monthly Recurring Revenue (MRR) | ₦3M | ₦15M | ₦60M |
| Fraud Rate | <1% | <0.5% | <0.3% |
| Markets | Nigeria | Nigeria + Ghana | 5 African Markets |

## 1.4 Why Now

- Nigeria has 40M+ SMBs, a rapidly expanding creator economy, and near-zero native affiliate infrastructure.
- Mobile money and fintech penetration (Paystack, Flutterwave, OPay) have made instant digital payments a baseline expectation.
- The global affiliate marketing market is growing at 10%+ CAGR — emerging markets are significantly underpenetrated.
- No serious competitor has built a native-NGN, compliance-first, fraud-aware affiliate platform for Nigeria. The window is open.

## 1.5 Business Model Summary

| Revenue Stream | Model | Est. Contribution (Yr 1) |
|---|---|---|
| Subscription Fees | ₦15K–₦300K+/month per business | 65% |
| Transaction Fees | 0.5–1.5% on wallet payouts | 25% |
| Setup & Onboarding Fees | One-time enterprise onboarding | 5% |
| Premium Marketplace | Featured placement for affiliates | 3% |
| White-Label Licensing | Enterprise branded instances | 2% |

---

# SECTION 2 | Complete Screen Inventory — All 76 Screens

> **TOTAL: 76 screens** — 12 Public, 22 Affiliate Portal, 24 Business Admin Portal, 14 Super Admin Portal, 4 Shared/Cross-Portal.

## 2.1 Public / Marketing Screens (12 Screens)

> **Goal:** Act as a persuasive funnel that actively dismantles objections and reinforces trust, combining core structural requirements with elevated, high-conversion sections.

### 1. Landing Page (The Hook & Conversion Engine)
* **Phase:** 1 | **Priority:** Critical

**Page Structure (top to bottom):**

| # | Section | Detail |
|---|---|---|
| 1 | Header / Nav | Logo (left), minimal nav — Product, Pricing, Blog — collapses to CTA-only on scroll. "Log In" (text link) + "Get Started" (primary button, brand blue) top right. Sticky on scroll with condensed height. |
| 2 | Hero | Headline: *"Turn every customer into a growth channel."* Subheadline: *"Rippl is the referral and affiliate infrastructure built for Nigerian businesses — trackable links, instant payouts, zero spreadsheets."* Dual CTA: "Start a Campaign" (business) / "Become an Affiliate" (affiliate) — visually distinct, business CTA primary-weighted. Hero visual: animated referral flow (click → track → convert → payout), looped, no sound. |
| 3 | Social Proof Bar | Logo strip: *"Trusted by 200+ Nigerian businesses"* — 5–6 client logos, grayscale until hover. Placed directly under the fold to reduce early bounce. |
| 4 | Agitation Block | "Old Way vs. Rippl Way" split-screen comparison (existing spec, retained). |
| 5 | How It Works | Toggleable business/affiliate 3-step tracks (existing spec, retained). |
| 6 | ROI / Earnings Calculator | Interactive dual-mode slider (existing spec, retained). |
| 7 | Feature Highlights | 3–4 alternating text+image blocks, outcome-framed: instant payouts ("Affiliates paid in <24h, not 90 days"), fraud protection ("BVN-verified, IP-scored, self-referral blocked automatically"), real-time attribution ("See every click, every conversion, live"). |
| 8 | Live Platform Ticker | Dynamic feed (existing spec, retained). Example content: *"Adaeze just earned ₦4,200 from a referral"* / *"Chidi's Fashion Store joined 3 minutes ago"* — anonymized first names only, no surnames or exact business identifiers, per NDPR. |
| 9 | Deeper Social Proof | 3–4 testimonials, mixed format (text + headshot, one video if available), explicitly split into a Business tab and an Affiliate tab so each audience sees relevant voices. Each includes name, role/business, and one concrete number (e.g., *"Rippl cut our affiliate payout time from 60 days to 1."*). |
| 10 | Pricing Teaser | Condensed 3-tier price comparison (Starter/Growth/Pro) with "See full pricing" linking to Screen #7. |
| 11 | FAQ Accordion | 5–6 objection-handling questions: *"Is this legal/compliant in Nigeria?", "How fast do affiliates get paid?", "What if someone tries to cheat the system?"* — ties directly into the Trust Anchors below. |
| 12 | Final CTA Band | Full-width closing section, repeats dual CTA from hero. No further scroll content beneath it except footer. |
| 13 | Footer | Legal links (Terms, Privacy Policy, NDPR Data Policy), CBN/compliance badges, sitemap links to all public screens, social icons, WhatsApp support link, copyright line. |

* **Trust Anchors:** Client testimonials, Paystack security badges, BVN-secured indicators, **CBN licensing/compliance mark**, and **NDPR data-protection badge** — the latter two elevated to sit alongside the payment badges rather than being implied only in Section 14, since they matter most to a skeptical first-time SMB visitor.
* **Visual Storytelling:** An animated referral flow illustration.
* **Elevated Sections:**
  * **The Agitation Block:** A stark visual breakdown contrasting the manual "Old Way" (Excel/WhatsApp) against the automated "Rippl Way".
  * **Audience-Segmented "How It Works":** Toggleable 3-step tracks. Business flow (Install Pixel → Set Commission → Approve Payouts) and affiliate flow (Sign Up → Share Link → Get Paid).
  * **Interactive ROI / Earnings Calculator:** A dual-mode slider for businesses to project ROI and for affiliates to project NGN earnings based on audience size.
  * **Live Platform Ticker:** A dynamic feed displaying real-time platform activity to create urgency and prove liquidity.
  * **Exit-Intent Capture:** Desktop-only modal triggered on upward mouse exit — offers a lightweight lead magnet (e.g., "Get the Affiliate Program Starter Guide") for visitors not ready to sign up, feeding the same nurture sequence as the Blog's lead magnet (#8).

* **Compliance Layer:**
  * **NDPR Cookie Consent Banner:** Bottom-anchored banner on first visit, Accept/Manage Preferences options, blocks non-essential tracking scripts until consent given. Applies site-wide but must be specified here since this is the first-touch page.

* **Tracking & Optimization:**
  * **UTM Capture:** Confirms and extends the Section 3.1 flow requirement ("UTM parameters captured") into the screen spec itself — all inbound query params logged to the session on first load, persisted through signup.
  * **A/B Testing Framework:** Headline, hero CTA copy, and calculator placement flagged as the three highest-priority test variables at launch, given this page's "conversion engine" priority rating. Framework: client-side split (e.g., GrowthBook or PostHog) reporting into the Analytics Engine (Section 4.1).
  * **Performance Budget:** Largest Contentful Paint (LCP) target < 2.0s on 4G mobile, given affiliate traffic skews mobile/WhatsApp-referred; total page weight budget < 1.5MB.

* **Mobile-Specific Behavior:** Hero CTA pair stacks vertically; live ticker collapses to a single-line rotating strip; calculator switches from side-by-side sliders to a stepped single-column form to preserve usability at narrow widths.

### 2. Business Signup (Frictionless Onboarding)
* **Phase:** 1 | **Priority:** Critical
* **Core Flow:** Multi-step registration covering email, business details, CAC verification, plan selection, and payment.
* **UI Guidance:** A persistent progress indicator shown throughout.
* **Elevated Sections:**
  * **Contextual Compliance Justification:** Authoritative micro-copy next to the CAC upload explaining that verification guarantees a 0% fraud ecosystem.
  * **In-Flow Trust Panel:** A static sidebar displaying enterprise trust badges and B2B testimonials to keep intent high during data entry.

### 3. Affiliate Signup (Momentum Builder)
* **Phase:** 1 | **Priority:** Critical
* **Core Flow:** Simplified 3-step registration capturing email/phone, display name, niche, and optional bank account.
* **Compliance:** Lazy KYC triggered automatically on the first withdrawal attempt.
* **Elevated Sections:**
  * **Niche Earnings Teaser:** Dynamic display of the top earning metric for the specific niche the user selects in step 2.
  * **Payout Proof Snippet:** A visual cue next to the bank account entry highlighting the "24-hour instant payout" guarantee.

### 4. Login (Unified Access)
* **Phase:** 1 | **Priority:** Critical
* **Authentication:** Unified screen with automatic role detection post-login. Google OAuth for businesses, OTP fallback for phone users, and a "Remember device" toggle.
* **Elevated Sections:**
  * **Platform Milestone Banner:** A rotating platform update (e.g., total volume processed) in the peripheral UI to reinforce momentum.
  * **Frictionless Cross-Linking:** Highly visible links directing misplaced users to the correct signup flows.

### 5. Forgot Password (Quick Recovery)
* **Phase:** 1 | **Priority:** Critical
* **Core Flow:** Email or phone-based reset input. Time-limited reset link with a 15-minute expiry. Success screen featuring a resend option.
* **Elevated Sections:**
  * **Quick-Return Navigation:** Unmissable text links back to the Login and Home pages to prevent dead-ends.

### 6. Referral Redirect (The Invisible Engine)
* **Phase:** 1 | **Priority:** Critical
* **Core Logic:** Invisible server-side redirect that logs clicks (IP, device, timestamp) and sets attribution cookies. A simple loading indicator before forwarding.
* **Elevated Sections:**
  * **Branded Interstitial:** Replacing the generic spinner with a micro-second, highly styled loading screen featuring the platform logo and a secure lock icon to establish tracking authority.

### 7. Pricing Page (Value Framing)
* **Phase:** 1 | **Priority:** High
* **Core Structure:** Interactive plan comparison table in NGN with a detailed feature matrix. Annual versus monthly billing toggle and an FAQ accordion. CTAs to start a free trial or book a demo.
* **Elevated Sections:**
  * **ROI Justification Metric:** Specific text under each tier illustrating its immediate value (e.g., "Pays for itself in 3 conversions").
  * **Embedded Enterprise Demo Widget:** A direct calendar embed for the Custom tier to capture high-intent enterprise leads instantly.

### 8. Blog / Resources Hub (SEO & Lead Capture)
* **Phase:** 1 | **Priority:** Medium
* **Content Organization:** Categories covering Affiliate Tips, Business Growth, and Platform Updates. Search bar, tag filtering, and standard newsletter signup.
* **Elevated Sections:**
  * **High-Value Lead Magnet:** A dedicated section offering a downloadable asset (e.g., an affiliate scaling guide) in exchange for an email to feed the B2B sales sequence.
  * **Persistent Global CTA:** A sticky banner driving readers directly to the platform signup flows.

### 9. About / Company Page (Institutional Trust)
* **Phase:** 1 | **Priority:** Medium
* **Core Narrative:** Brand story, mission statement, and company values. Founding team bios, press mentions, and investor logos.
* **Elevated Sections:**
  * **"Behind the Code" Architecture Block:** A high-level visual summary of the fraud-prevention and payment routing infrastructure to build immediate trust with technical stakeholders.

### 10. Contact / Support Page (Pre-Emptive Routing)
* **Phase:** 1 | **Priority:** Medium
* **Core Intake:** Pre-signup form requiring name, email, message, and role. WhatsApp chat button, direct links to the Help Centre, and pre-signup FAQ section.
* **Elevated Sections:**
  * **Dynamic Support Routing:** Form fields and placeholder text that adapt dynamically based on whether the user selects "Business" or "Affiliate" to reduce unnecessary ticket volume.

### 11. 404 / Error Page (Retention Net)
* **Phase:** 1 | **Priority:** High
* **Core UI:** Branded error messaging for broken URLs or expired codes with navigation options.
* **Elevated Sections:**
  * **"Top Campaigns" Quick Links:** A mini-feed of the highest-converting active campaigns to instantly recapture the attention of affiliates who hit a dead link.

### 12. Maintenance Page (Brand Engagement)
* **Phase:** 1 | **Priority:** High
* **Core UI:** Estimated return time and a link to the platform status page. Options to subscribe to update notifications via email or WhatsApp.
* **Elevated Sections:**
  * **"While You Wait" Content Blocks:** Links to high-value, evergreen platform guides to keep users engaged during downtime.

## 2.2 Affiliate Portal Screens (22 Screens)

| # | Screen Name | Description | Phase | Priority |
|---|---|---|---|---|
| 13 | Affiliate Home Dashboard | Primary landing screen post-login. Shows: today's earnings (KPI card), total pending balance, cleared balance, conversion count (MTD), top-performing link, recent activity feed, quick actions (generate link, browse campaigns), and unread notifications badge. | 1 | Critical |
| 14 | Onboarding Checklist | Post-signup guided checklist shown until all steps are complete. Tasks: complete profile → verify phone → browse campaigns → generate first link → share first link → complete KYC → make first withdrawal. Progress bar with % completion. Each task links to the relevant screen. | 1 | Critical |
| 15 | Campaign Marketplace | Grid and list toggle view of all available campaigns. Filter by: category, commission type, payout rate, brand, cookie duration, approval mode. Each card: brand logo, campaign name, commission %, cookie window, conversion count, and Apply or Join CTA. | 1 | Critical |
| 16 | Campaign Detail | Full campaign page for a specific programme. Sections: brand overview, commission structure breakdown, conversion requirements, cookie and attribution window, payout schedule, creatives preview, affiliate leaderboard snippet, T&Cs, and Apply CTA. | 1 | Critical |
| 17 | My Campaigns | List of all campaigns the affiliate has joined or applied to. Status badges: Active, Pending Approval, Paused, Declined. Quick-access button to generate link or view analytics per campaign. | 1 | Critical |
| 18 | Campaign Application | Simple apply form for invitation-only campaigns. Optional message to the brand. Real-time status tracking (Pending / Approved / Declined) with timestamp. Notification sent on status change. | 1 | High |
| 19 | Link Generator | One-click unique referral link generation per campaign. Features: copy to clipboard button, QR code generator, WhatsApp share button, Twitter/X share, Instagram bio link format, direct URL. UTM parameter customisation (source, medium, campaign). Link preview. | 1 | Critical |
| 20 | Referral Link Detail | Individual link analytics page. Metrics: clicks over time (line chart), conversion rate, earnings from this specific link, top referral sources (pie chart), device breakdown (mobile vs. desktop), recent conversions list. Distinct from the general analytics screen. | 1 | High |
| 21 | Marketing Assets | Downloadable creative assets uploaded by the business per campaign. Types: banner images (multiple sizes), copy templates, email scripts, video assets, hashtag lists. Organised by campaign. Preview before download. Direct WhatsApp share. | 1 | High |
| 22 | Affiliate Analytics | Performance dashboard across all campaigns. Charts: earnings over time (area), clicks vs. conversions (bar), conversion funnel (clicks → conversions → cleared → withdrawn). Campaign-level breakdown table. Referral source split. Date range selector. | 1 | Critical |
| 23 | Affiliate Wallet | Balance cards: Pending (under review), Clearing (fraud-cleared; awaiting period expiry), Cleared (available). Transaction history table with status, date, amount, and campaign. Bank account details. Withdraw CTA. Link to Earnings Statement. | 1 | Critical |
| 24 | Withdrawal Flow | Multi-step withdrawal: (1) Enter amount (min ₦2,000), (2) Select saved bank account or add new, (3) Review summary, (4) Confirm with 4-digit PIN, (5) Success screen with estimated arrival time (within 24h). Error handling for insufficient balance or bank issues. | 1 | Critical |
| 25 | Earnings History / Statement | Monthly earnings statements organised by period. Each statement shows: total earned, total withdrawn, tax summary (WHT where applicable). PDF download for each month. Useful for FIRS tax filing. Linked from Wallet screen. | 1 | High |
| 26 | Affiliate Profile | Personal info editor: display name, niche, bio, profile photo. KYC status and tier display with upgrade CTA. Notification preferences (push, email, SMS toggles per event type). Security settings link. Account since date. | 1 | Critical |
| 27 | KYC Flow | Progressive multi-step KYC triggered on first withdrawal attempt. Step 1 (Basic): already done at signup. Step 2 (Standard): BVN entry → Dojah verification → result in <30 seconds. Step 3 (Enhanced): government ID type selection → document upload → liveness selfie → submitted for review (48h SLA). | 1 | Critical |
| 28 | 2FA Setup Flow | Dedicated screen to enable TOTP-based 2FA. Steps: download authenticator app prompt → scan QR code → enter 6-digit verification code → save backup codes (downloadable PDF) → 2FA enabled confirmation. Disable 2FA flow with re-authentication required. | 1 | High |
| 29 | Password & Security Centre | Standalone security screen. Sections: change password (current + new + confirm), active sessions list with device name, location, and last active — with Revoke button, login history log (last 10 entries), 2FA management shortcut. | 1 | High |
| 30 | Notifications Centre | Full in-app notification history. Filter by type: Conversions, Payouts, Campaign Updates, System Alerts. Mark all as read. Individual notification links to relevant screen. Notification preference settings shortcut. | 1 | High |
| 31 | Invite a Friend (Affiliate Referral) | Screen for affiliates to refer other affiliates to Rippl. Unique referral code + shareable link. Tracks referred affiliates, their KYC status, and whether the ₦500 bonus has been earned. Bonus credited when referred affiliate completes first payout. | 2 | Medium |
| 32 | Affiliate Leaderboard | Public ranking of top affiliates within each campaign. Columns: rank, display name, earnings (MTD), conversions, conversion rate. Personal rank highlighted. Campaign selector dropdown. Gamification badges: Bronze (₦10K), Silver (₦50K), Gold (₦200K), Platinum (₦1M+). | 2 | Medium |
| 33 | Ambassador Programme Screen | Phase 2. Manage multi-tier ambassador relationships. View sub-affiliate network: who you recruited, their earnings, your override commission. Join new ambassador programmes. Distinct from standard affiliate campaigns — designed for community leaders. | 2 | Low |
| 34 | Support / Help Centre | In-app help and support. Sections: searchable FAQ, article categories (Getting Started, Payments, Campaigns, KYC), live chat widget (Intercom), WhatsApp support link, raise a ticket form. Available without leaving the app. | 1 | High |

## 2.3 Business Admin Portal Screens (24 Screens)

| # | Screen Name | Description | Phase | Priority |
|---|---|---|---|---|
| 35 | Business Dashboard | Post-login home screen. KPI cards: referral revenue (MTD), active campaigns, total active affiliates, pending payouts value, fraud alerts count. Charts: revenue trend (7-day), top 5 affiliates by revenue. Recent conversions feed. Quick actions: create campaign, approve payouts. | 1 | Critical |
| 36 | Business Onboarding Checklist | Post-signup guided setup checklist shown until complete. Steps: complete business profile → install tracking pixel → create first campaign → invite or recruit first affiliate → fund Rippl wallet → approve first payout. Progress bar. Each step links directly to the relevant screen. | 1 | Critical |
| 37 | Campaign List | Table of all campaigns: name, status badge, active affiliates count, conversions (MTD), revenue (MTD), commission cost, ROI. Quick actions: Pause, Edit, Duplicate, View Analytics. Filter by status. Create Campaign CTA. | 1 | Critical |
| 38 | Campaign Creation Wizard | 6-step guided wizard. Step 1: Basic info (name, description, category, image). Step 2: Target URL and tracking setup (pixel or API). Step 3: Commission type and value (flat/%, tiered, hybrid). Step 4: Payout rules (threshold, frequency, approval mode). Step 5: Creative asset upload. Step 6: Eligibility, start/end date, publish. Progress saved as draft between steps. | 1 | Critical |
| 39 | Campaign Detail & Editor | Full campaign page with live stats summary. Tabs: Overview, Affiliates, Conversions, Analytics, Creatives, Settings. Inline editing of non-live settings. Force-pause CTA. Status history log. | 1 | Critical |
| 40 | Campaign Analytics | Deep per-campaign analytics. Charts: conversion funnel, daily revenue, top 10 affiliates (bar chart), traffic source breakdown, referred customer cohort retention (vs. organic baseline). Date range selector. Export to CSV or PDF. | 1 | High |
| 41 | Campaign Duplication Flow | Quick modal flow to clone an existing campaign. Pre-fills all settings from source campaign. Fields editable before saving. Saves as draft. Reduces setup time for similar campaigns (e.g. seasonal variants). | 1 | High |
| 42 | Commission Rule Builder | Dedicated screen for designing complex commission structures. Visual rule builder: add tiers (min qty → rate), preview commission calculation with sample order values, test with example affiliate earnings. Saves as a reusable commission template. | 2 | Medium |
| 43 | Affiliate Applications | Queue of affiliates applying to invitation-only campaigns. Columns: affiliate name, niche, follower count (if provided), date applied, campaign. Approve or Decline with one click. Bulk actions. View affiliate public profile before deciding. | 1 | High |
| 44 | Affiliate Management Table | Full table of all affiliates across all campaigns. Columns: name, joined date, active campaigns, clicks (MTD), conversions (MTD), revenue generated, commission owed, fraud score, status. Sortable and filterable. Actions: View Profile, Flag for Review, Message, Remove. | 1 | Critical |
| 45 | Affiliate Profile (Business View) | Business's view of a specific affiliate's profile and performance. Sections: performance metrics (clicks, conversions, EPC, revenue generated), link activity log, payout history, fraud flag history, notes field for internal business use. Message affiliate CTA. | 1 | High |
| 46 | Affiliate Invite Page | Shareable branded recruitment page businesses send to specific affiliates. Shows: business logo, campaign preview (name, commission, CTA), one-click join button. Custom message field from the business. Distinct from open marketplace discovery. | 2 | Medium |
| 47 | Referral Portal Branding Preview | Live preview of the business's branded affiliate-facing referral portal. Preview panel shows: custom logo, brand colours, custom domain URL (e.g. affiliates.yourbrand.com), welcome message. Save changes and publish. Available on Pro plan and above. | 2 | Medium |
| 48 | Payout Management | Pending payouts table: affiliate name, campaign, conversion date, order value, commission amount, fraud score, status. Actions per row: Approve, Dispute, Hold. Bulk approve all clean payouts. Payout schedule configuration (weekly/monthly). Wallet balance and fund wallet CTA. | 1 | Critical |
| 49 | Business Wallet | Business wallet view. Current balance, funds reserved for pending payouts, available balance. Funding options: bank transfer (account details shown), Paystack inline card payment. Transaction history. Download statement. Low-balance alert settings. | 1 | Critical |
| 50 | Attribution & ROI Dashboard | Revenue attribution analysis. Total referral revenue vs. total commission cost = ROI %. CPA comparison: affiliate channel vs. paid ads vs. organic. Top affiliates by net ROI. Cohort analysis: LTV of referred customers. Exportable as PDF report. | 1 | High |
| 51 | Fraud Dashboard | Fraud overview for the business. Metrics: fraud rate (%), flagged conversions count, total value blocked, disputes raised. Charts: fraud score distribution, flagged affiliate list. Investigation CTA links to individual conversion or affiliate. | 1 | High |
| 52 | Dispute Management | Open and resolved disputes with affiliates. Per dispute: conversion ID, affiliate name, order value, commission at stake, reason, evidence uploads, timeline. Respond and upload counter-evidence. Escalate to Rippl ops. Resolution history. | 1 | High |
| 53 | Integrations Hub | Central integration management. Cards per integration: Tracking Pixel (with code snippet and copy button), REST API (key management), Webhooks (URL config, event selector, secret), Shopify Plugin (install guide), WooCommerce Plugin, Zapier, Google Analytics 4 event passthrough. | 1 | High |
| 54 | Pixel / SDK Installation Tester | Live debugging tool to verify the tracking pixel is correctly installed and firing. Business enters their website URL → Rippl loads it in a sandboxed iframe → attempts a test conversion event → shows result: firing correctly / not detected / partial (click only). Reduces misconfigured tracking issues at launch. | 1 | Critical |
| 55 | API Logs / Webhook Logs | Real-time and historical log of all inbound API calls and outbound webhook deliveries. Columns: timestamp, endpoint or event type, HTTP status, response time, payload preview. Expand row for full payload. Retry failed webhooks manually. Filter by date, status, type. | 1 | High |
| 56 | Team Management | Invite team members by email, assign roles (Admin / Analyst / Finance). Manage pending invitations. Active member list with last login. Remove member access. Role permissions explained per role in a tooltip. | 1 | Medium |
| 57 | Business Settings | Company profile editor: name, logo, website, industry, CAC number, contact email. Notification preferences. Brand colours for referral portal. Time zone setting. Account deletion request (redirects to Account Deletion Flow). | 1 | High |
| 58 | Plan & Billing | Current plan overview with usage vs. limits (affiliates, campaigns, payout volume). Upgrade or downgrade CTA. Invoice history with download. Payment method management (add/remove card). Annual plan toggle with savings highlighted. Subscription cancellation flow. | 1 | High |

## 2.4 Super Admin Portal Screens (14 Screens)

| # | Screen Name | Description | Phase | Priority |
|---|---|---|---|---|
| 59 | Platform Overview | Real-time platform command centre. Live KPI cards: Total GMV, MRR, Active Businesses, Active Affiliates, Payout Volume (today), Fraud Rate, Platform Uptime. Charts: new signups (daily), payout volume trend, MRR growth. Incident alerts panel. | 1 | Critical |
| 60 | Business Management | Full table of all registered businesses. Columns: name, plan, status, payout volume (MTD), active campaigns, affiliate count, fraud flags, CAC verification status. Actions: View, Approve, Suspend, Impersonate (with audit log), Adjust Plan. | 1 | Critical |
| 61 | Business Verification Queue | Queue of businesses awaiting CAC/company verification. Per entry: submitted docs viewer (CAC certificate, director ID), business details, CAC lookup result, Approve or Reject with reason code. Bulk actions. SLA timer per submission. | 1 | Critical |
| 62 | Affiliate Management (Global) | Global table of all affiliate accounts across the platform. Columns: name, KYC tier, total earned, total withdrawn, active campaigns, fraud score, account status. Actions: View, Restrict Withdrawal, Suspend, Escalate, Impersonate. | 1 | Critical |
| 63 | KYC Review Queue | Manual KYC review queue for enhanced-tier submissions. Per submission: BVN lookup result, ID document image viewer, liveness selfie viewer, match confidence score, Approve or Flag with reason. SLA: 48-hour target. | 1 | Critical |
| 64 | Campaign Oversight | All active campaigns across all businesses on the platform. Columns: business name, campaign name, active affiliates, conversion volume (MTD), commission paid (MTD), fraud rate. Actions: Flag, Force-Pause, Remove, Escalate to compliance. | 1 | High |
| 65 | Finance Ledger | Platform-wide financial overview. Revenue breakdown by stream: subscription fees, transaction fees, setup fees, marketplace fees. Payout volume processed. Fee collection summary. Reconciliation against Paystack and Flutterwave statements. Export to CSV. | 1 | Critical |
| 66 | Payout Batch Monitor | Real-time monitor of active payout batch jobs. Columns: batch ID, initiated time, total payouts in batch, completed count, failed count, processing count, total value. Drill into batch for individual payout statuses. Retry failed payouts. | 1 | High |
| 67 | Fraud Investigation | Full fraud investigation workflow for flagged entities. Entity detail: IP history, device fingerprint log, conversion history, related accounts (by BVN, device, IP). Fraud score breakdown per rule. Action panel: Warn, Block, Escalate, Clear. All actions logged with admin ID. | 1 | Critical |
| 68 | Dispute Arbitration | Escalated disputes that businesses and affiliates could not resolve. Evidence viewer for both sides. Resolution options: Rule in favour of business (reverse commission), Rule in favour of affiliate (release commission), Split (custom amount), Dismiss. Full audit log. | 1 | High |
| 69 | Compliance Reports | Generate and export compliance reports. Report types: KYC Audit Log, AML Transaction Screening Report, FIRS WHT Summary, CBN e-payment report, NDPR Data Processing Log. Scheduled report generation. | 1 | Critical |
| 70 | Platform Configuration | Global platform settings. Sections: Fee Structures (per plan transaction %), Payout Limits (per KYC tier), Fraud Score Thresholds (block/hold/flag), KYC Requirements (per withdrawal tier), Clearing Period (days), Minimum Withdrawal Amount. | 1 | High |
| 71 | Subscription & Billing Override | Manual subscription management for edge cases. Actions: upgrade or downgrade a business's plan, apply a discount (%), extend a trial, waive a billing cycle, apply a credit. All changes logged with admin ID and reason. | 1 | High |
| 72 | Platform Announcements Manager | Create and schedule in-app announcements shown to specific user segments (all users, businesses only, affiliates only, specific plan). Types: informational banner, modal alert, maintenance notice. Schedule publish and expiry times. Preview before publish. | 2 | Medium |

## 2.5 Shared / Cross-Portal Screens (4 Screens)

| # | Screen Name | Description | Phase | Priority |
|---|---|---|---|---|
| 73 | Email / Notification Template Manager | View and edit all transactional email and SMS templates used across the platform. Templates: Welcome Email, OTP, Conversion Notification, Payout Processed, Withdrawal Confirmation, KYC Approved/Rejected, Fraud Alert, Campaign Approved, etc. Variable preview with dummy data. Version history. | 1 | High |
| 74 | Account Deletion Flow | NDPR-compliant self-service account deletion. Step 1: Warning screen (consequences explained). Step 2: Request data export option (JSON download). Step 3: Confirm with password. Step 4: 30-day grace period notice with cancellation link. Step 5: Confirmation. Deletion scheduled in background. | 1 | High |
| 75 | Session Expired Screen | Shown automatically when JWT access token expires mid-session. Displays friendly message. Re-login form pre-filled with email. Redirects back to original page post-authentication. Preserves context where possible. | 1 | Critical |
| 76 | Account Suspension Notice | Shown when a business or affiliate account has been suspended by Super Admin. Displays suspension reason (if shareable), reference number, steps to appeal, and estimated review timeline. Read-only — no other app functionality accessible. | 1 | High |

## 2.6 Screen Summary by Portal & Phase

| Portal | Phase 1 Screens | Phase 2 Screens | Total Screens |
|---|---|---|---|
| Public / Marketing | 12 | 0 | 12 |
| Affiliate Portal | 18 | 4 | 22 |
| Business Admin Portal | 21 | 3 | 24 |
| Super Admin Portal | 13 | 1 | 14 |
| Shared / Cross-Portal | 4 | 0 | 4 |
| **TOTAL** | **68** | **8** | **76** |

---

# SECTION 3 | Detailed User Flows

## 3.1 Affiliate Onboarding & First Conversion Flow

| Step | Action | Screen | System Event |
|---|---|---|---|
| 1 | Lands on rippl.ng via social/referral | Landing Page (#1) | UTM parameters captured |
| 2 | Clicks 'Join as Affiliate' | Affiliate Signup (#3) | Session initiated |
| 3 | Enters email/phone, creates password | Affiliate Signup (#3) | Account created; OTP sent |
| 4 | Verifies OTP | Affiliate Signup (#3) | Account activated; JWT issued |
| 5 | Completes profile: name, niche | Affiliate Signup (#3) | Affiliate record created |
| 6 | Views onboarding checklist | Onboarding Checklist (#14) | Checklist state initialised |
| 7 | Browses Campaign Marketplace | Campaign Marketplace (#15) | Browse events tracked |
| 8 | Views campaign detail, clicks Apply | Campaign Detail (#16) | Application record created |
| 9 | Auto-approved or awaits approval | My Campaigns (#17) | Notification sent |
| 10 | Generates unique referral link | Link Generator (#19) | Referral link created in DB |
| 11 | Shares link on WhatsApp | External / Link Generator (#19) | Share event logged |
| 12 | Referee clicks link | Referral Redirect (#6) | Click logged; cookie set |
| 13 | Referee converts on business site | Business site + Pixel | Conversion API call fires |
| 14 | Affiliate gets push notification | Notifications Centre (#30) | Wallet pending credited |
| 15 | Views earnings update | Affiliate Wallet (#23) | Transaction record created |
| 16 | Triggers KYC for withdrawal | KYC Flow (#27) | BVN verification initiated |
| 17 | Requests withdrawal post-KYC | Withdrawal Flow (#24) | Payout job queued |
| 18 | Payment arrives in bank within 24h | External (Bank) | Payout status → completed |

## 3.2 Business Campaign Launch Flow

| Step | Action | Screen | Notes |
|---|---|---|---|
| 1 | Signs up with email + CAC | Business Signup (#2) | CAC lookup via FIRS API |
| 2 | Selects plan, adds payment | Plan & Billing (#58) | Paystack subscription created |
| 3 | Views onboarding checklist | Biz Onboarding Checklist (#36) | Checklist state initialised |
| 4 | Installs tracking pixel | Pixel Tester (#54) | Pixel installation verified live |
| 5 | Creates campaign (6-step wizard) | Campaign Wizard (#38) | Campaign saved as draft |
| 6 | Publishes campaign | Campaign Wizard Step 6 (#38) | Status → active; indexed |
| 7 | Reviews affiliate applications | Affiliate Applications (#43) | Notifications to affiliates |
| 8 | Monitors conversions | Attribution Dashboard (#50) | Real-time referral engine data |
| 9 | Reviews pending payouts | Payout Management (#48) | Bulk approve or dispute |
| 10 | Funds Rippl wallet | Business Wallet (#49) | Wallet credited; payouts execute |
| 11 | Reviews fraud dashboard | Fraud Dashboard (#51) | Flags investigated |
| 12 | Downloads ROI report | Attribution Dashboard (#50) | PDF export generated |

## 3.3 Fraud Detection & Response Flow

| Trigger | Detection | Score Impact | System Action | Admin Action |
|---|---|---|---|---|
| Self-referral | IP + device match affiliate & converter | High +0.6 | Conversion held; affiliate flagged | Super Admin reviews; block if confirmed |
| Duplicate device | Browser fingerprint matches known device | High +0.5 | Conversion → disputed | Business notified; investigation opened |
| Velocity anomaly | CTR > 40% in 24h window | Medium +0.3 | Affiliate soft-suspended | Fraud team reviews traffic logs |
| Geo-IP inconsistency | Lagos click; London conversion within 5 min | Medium +0.3 | Conversion held for review | Flag on affiliate account |
| BVN duplicate | Same BVN on 2+ accounts | Critical — block | Second account blocked immediately | Primary account reviewed |
| Payout cycling | Rapid withdrawals to different accounts | High +0.5 | Withdrawal blocked; compliance alert | AML review initiated |

---

# SECTION 4 | Product Modules & Feature Specifications

## 4.1 Core Modules

| Module | Purpose | Phase |
|---|---|---|
| Auth & Identity | Registration, login, 2FA, KYC orchestration, RBAC | 1 |
| Campaign Engine | Campaign CRUD, commission rules, link generation | 1 |
| Referral & Tracking Engine | Click logging, cookie attribution, conversion capture | 1 |
| Wallet & Finance | NGN wallet, balance lifecycle, transaction ledger | 1 |
| Payout Engine | Scheduling, bank verification, payment routing | 1 |
| Fraud Prevention | Rule-based detection, scoring, hold/block | 1 |
| Notification Engine | Push, email, SMS — event-driven via BullMQ | 1 |
| Analytics Engine | Pre-aggregated reports, export, attribution modelling | 1 |
| Admin Platform | Super Admin tools, KYC queue, compliance, billing | 1 |
| Ambassador Module | Community referral programs, multi-tier commissions | 2 |
| Mobile App | React Native iOS & Android client | 2 |
| AI Fraud Model | ML-based scoring with continuous retraining | 2 |
| Marketplace | Searchable campaign discovery with advanced filtering | 2 |
| White-Label Engine | Branded Rippl instances for enterprise clients | 3 |
| API Marketplace | Developer ecosystem, third-party integrations | 3 |
| Multi-Country Engine | Multi-currency wallets, regional payment rails (GHS, KES) | 3 |

## 4.2 Commission Models

| Model | Code | How It Works | Example |
|---|---|---|---|
| Cost Per Acquisition | CPA | Fixed fee per confirmed conversion (signup or purchase) | ₦2,000 per new signup |
| Cost Per Sale | CPS | Percentage of attributed order value | 10% of ₦50,000 = ₦5,000 |
| Cost Per Lead | CPL | Fixed fee per qualified lead (form fill, trial signup) | ₦500 per completed lead form |
| Tiered Commission | TIERED | Rate increases as affiliate hits volume milestones | 5% for 0–50 sales; 10% for 51+ |
| Hybrid | HYBRID | Flat base plus percentage bonus above a threshold | ₦500 + 5% on orders > ₦25,000 |

## 4.3 Fraud Prevention Rule Matrix

| Rule | Threshold | Action | Override? |
|---|---|---|---|
| Self-Referral IP Match | Same IP for click & conversion | Auto-hold conversion | Yes — Super Admin |
| Device Fingerprint Duplicate | Same fingerprint, different user | Auto-hold; flag affiliate | Yes — Super Admin |
| High CTR Velocity | CTR > 40% in any 24h | Soft-suspend affiliate | Yes — Business Admin |
| Geo-IP Time Anomaly | Click → conversion geo-jump < 10 min | Flag for manual review | Yes — Super Admin |
| BVN Duplicate | Same BVN on 2+ accounts | Block second account | No — compliance rule |
| Withdrawal Velocity | >5 withdrawals in 24h | Block; require verification | Yes — KYC upgrade |
| ML Score (Phase 2) | Score > 0.75 | Auto-hold; alert fraud team | Yes — Super Admin |

---

# SECTION 5 | Database Schema

## 5.1 Design Principles

- All monetary values stored in **kobo** (smallest NGN unit) as `INTEGER` (SQLite's INTEGER is a variable-length signed integer up to 8 bytes / 64-bit, sufficient for kobo-denominated values) to avoid floating-point errors.
- All IDs are **UUID v4 strings** stored as `TEXT` — SQLite has no native UUID type, so UUIDs are generated in the application layer (e.g. `crypto.randomUUID()` in Node) before insert. This still supports distributed generation and prevents enumeration attacks.
- All timestamps stored as `TEXT` in **ISO-8601 UTC** format (e.g. `2026-07-18T14:30:00.000Z`) — SQLite has no native timezone-aware timestamp type. `strftime('%Y-%m-%dT%H:%M:%fZ','now')` is used for defaults, and application code (or SQLite's date functions) handles comparisons.
- SQLite has **no native `ENUM` type**. All former ENUM columns become `TEXT` with a `CHECK` constraint restricting allowed values.
- SQLite has **no native `JSONB` type**. All former JSONB columns become `TEXT`, storing serialized JSON strings. SQLite's built-in `json1` extension (`json_extract`, `json_each`, etc.) can query these columns directly at read time.
- BVN stored as one-way **salted SHA-256 hash** — never in plaintext.
- **Soft deletes** via `deleted_at` (`TEXT`, nullable) timestamp for business-critical records.
- **Foreign keys are NOT enforced by default in SQLite** — every connection must run `PRAGMA foreign_keys = ON;` at startup for `ON DELETE CASCADE` and referential integrity to actually apply.
- SQLite has no automatic "auto-update" column, so `updated_at` refresh is handled via an explicit `AFTER UPDATE` trigger per table (shown below).

## 5.2 Core Table: `users`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | TEXT | PRIMARY KEY | UUID v4 generated in application layer |
| email | TEXT | UNIQUE NOT NULL | Indexed |
| phone | TEXT | UNIQUE | E.164 format |
| password_hash | TEXT | NOT NULL | bcrypt cost factor 12 |
| role | TEXT | NOT NULL CHECK(role IN ('affiliate','business_admin','super_admin')) | |
| status | TEXT | NOT NULL DEFAULT 'pending_kyc' CHECK(status IN ('active','suspended','pending_kyc','banned')) | |
| kyc_tier | TEXT | DEFAULT 'basic' CHECK(kyc_tier IN ('basic','standard','enhanced')) | |
| two_fa_secret | TEXT | | Encrypted TOTP secret |
| last_login_at | TEXT | | ISO-8601 UTC; security audit field |
| created_at | TEXT | NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')) | Auto-set |
| updated_at | TEXT | | Set by `users_updated_at` trigger |

```sql
CREATE TABLE users (
  id             TEXT PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  phone          TEXT UNIQUE,
  password_hash  TEXT NOT NULL,
  role           TEXT NOT NULL CHECK (role IN ('affiliate','business_admin','super_admin')),
  status         TEXT NOT NULL DEFAULT 'pending_kyc' CHECK (status IN ('active','suspended','pending_kyc','banned')),
  kyc_tier       TEXT DEFAULT 'basic' CHECK (kyc_tier IN ('basic','standard','enhanced')),
  two_fa_secret  TEXT,
  last_login_at  TEXT,
  created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at     TEXT
);

CREATE INDEX idx_users_email ON users(email);

CREATE TRIGGER users_updated_at
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = NEW.id;
END;
```

## 5.3 Core Table: `campaigns`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | TEXT | PRIMARY KEY | UUID v4 |
| business_id | TEXT | NOT NULL, FK → businesses(id) ON DELETE CASCADE | Requires `PRAGMA foreign_keys = ON` |
| name | TEXT | NOT NULL | |
| status | TEXT | NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','active','paused','ended','archived')) | |
| commission_type | TEXT | NOT NULL CHECK(commission_type IN ('flat','percentage','tiered','hybrid','cpl')) | |
| commission_value | REAL | NOT NULL | % or kobo amount |
| commission_tiers | TEXT | | Serialized JSON: `[{min_qty, rate}]`; query via `json_extract` |
| attribution_window_days | INTEGER | DEFAULT 30 | 1–90 days |
| cookie_duration_days | INTEGER | DEFAULT 30 | |
| approval_mode | TEXT | DEFAULT 'auto' CHECK(approval_mode IN ('auto','manual')) | |
| target_url | TEXT | NOT NULL | Redirect destination |
| budget_cap | INTEGER | | NULL = unlimited. In kobo. |
| starts_at | TEXT | | NULL = immediate |
| ends_at | TEXT | | NULL = no end date |
| deleted_at | TEXT | | Soft delete |

```sql
CREATE TABLE campaigns (
  id                        TEXT PRIMARY KEY,
  business_id               TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name                      TEXT NOT NULL,
  status                    TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','paused','ended','archived')),
  commission_type           TEXT NOT NULL CHECK (commission_type IN ('flat','percentage','tiered','hybrid','cpl')),
  commission_value          REAL NOT NULL,
  commission_tiers          TEXT,
  attribution_window_days   INTEGER DEFAULT 30,
  cookie_duration_days      INTEGER DEFAULT 30,
  approval_mode             TEXT DEFAULT 'auto' CHECK (approval_mode IN ('auto','manual')),
  target_url                TEXT NOT NULL,
  budget_cap                INTEGER,
  starts_at                 TEXT,
  ends_at                   TEXT,
  deleted_at                TEXT
);

CREATE INDEX idx_campaigns_business_id ON campaigns(business_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
```

## 5.4 Core Table: `conversions`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | TEXT | PRIMARY KEY | UUID v4 |
| referral_link_id | TEXT | NOT NULL, FK → referral_links(id) | |
| order_id | TEXT | UNIQUE | External order ref from business |
| order_value | INTEGER | NOT NULL | In kobo |
| commission_amount | INTEGER | NOT NULL | Calculated at conversion time |
| status | TEXT | NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','clearing','approved','paid','disputed','rejected')) | |
| fraud_score | REAL | DEFAULT 0.0 | 0 = clean; 1 = definite fraud |
| fraud_flags | TEXT | | Serialized JSON array of triggered fraud rules |
| ip_address | TEXT | | Converter's IP address |
| device_fingerprint | TEXT | | Hashed browser fingerprint |
| clearing_at | TEXT | | When clearing period ends |
| converted_at | TEXT | NOT NULL | When conversion occurred |

```sql
CREATE TABLE conversions (
  id                  TEXT PRIMARY KEY,
  referral_link_id    TEXT NOT NULL REFERENCES referral_links(id),
  order_id            TEXT UNIQUE,
  order_value         INTEGER NOT NULL,
  commission_amount   INTEGER NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','clearing','approved','paid','disputed','rejected')),
  fraud_score         REAL DEFAULT 0.0,
  fraud_flags         TEXT,
  ip_address          TEXT,
  device_fingerprint  TEXT,
  clearing_at         TEXT,
  converted_at        TEXT NOT NULL
);

CREATE INDEX idx_conversions_referral_link_id ON conversions(referral_link_id);
CREATE INDEX idx_conversions_status ON conversions(status);
```

## 5.5 Core Table: `wallets`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| id | TEXT | PRIMARY KEY | UUID v4 |
| owner_id | TEXT | NOT NULL | Polymorphic: affiliate_id or business_id |
| owner_type | TEXT | NOT NULL CHECK(owner_type IN ('affiliate','business')) | |
| pending_balance | INTEGER | DEFAULT 0 | Fraud review + clearing period |
| clearing_balance | INTEGER | DEFAULT 0 | Passed fraud; awaiting clearing |
| cleared_balance | INTEGER | DEFAULT 0 | Available for withdrawal |
| total_earned | INTEGER | DEFAULT 0 | Lifetime earnings (append-only) |
| total_withdrawn | INTEGER | DEFAULT 0 | Lifetime withdrawals |
| currency | TEXT | DEFAULT 'NGN' | ISO 4217 |
| version | INTEGER | DEFAULT 0 | Optimistic locking |
| updated_at | TEXT | | Set by `wallets_updated_at` trigger |

```sql
CREATE TABLE wallets (
  id                 TEXT PRIMARY KEY,
  owner_id           TEXT NOT NULL,
  owner_type         TEXT NOT NULL CHECK (owner_type IN ('affiliate','business')),
  pending_balance    INTEGER DEFAULT 0,
  clearing_balance   INTEGER DEFAULT 0,
  cleared_balance    INTEGER DEFAULT 0,
  total_earned       INTEGER DEFAULT 0,
  total_withdrawn    INTEGER DEFAULT 0,
  currency           TEXT DEFAULT 'NGN',
  version            INTEGER DEFAULT 0,
  updated_at         TEXT
);

CREATE INDEX idx_wallets_owner ON wallets(owner_id, owner_type);

CREATE TRIGGER wallets_updated_at
AFTER UPDATE ON wallets
BEGIN
  UPDATE wallets SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = NEW.id;
END;
```

## 5.6 Notes on Tables Referenced but Not Yet Defined

The original schema referenced `businesses(id)` and `referral_links(id)` as foreign-key targets without giving them their own table definitions — that gap carries over unchanged here, it isn't something lost in conversion. If you want those tables (plus others implied elsewhere in the blueprint, like `payouts` or `affiliate_applications`) fully specified in SQLite, let me know and I'll draft them in the same style.

---

# SECTION 6 | Technology Stack

## 6.1 Full Stack Overview

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Backend Runtime | Node.js | v20 LTS | Largest Nigerian dev community; async I/O ideal for event-heavy workloads |
| Backend Framework | Express.js + TypeScript | v4.x / TS 5.x | Minimal overhead; full TypeScript support; easy to hire for |
| Primary Database | SQLite | v3.4x | ACID-compliant, serverless, zero-ops file database; `json1` extension for fraud_flags querying *(changed from PostgreSQL — see Section 5 for schema and rationale caveats)* |
| Cache & Sessions | Redis | v7 | Sub-millisecond session reads; pub/sub for real-time events |
| Job Queue | BullMQ | Latest | Redis-backed; handles payout, fraud scoring, notifications at scale |
| File Storage | Cloudflare R2 | — | S3-compatible; zero egress fees; stores creatives and KYC documents |
| Email Delivery | Resend | API | Developer-friendly; reliable deliverability on Nigerian IPs |
| SMS / OTP | Termii | API | Nigeria-native; best delivery rates on local networks; USSD fallback |
| Payments (Primary) | Paystack | v2 API | Widest Nigerian bank coverage; native subscription billing |
| Payments (Backup) | Flutterwave | v3 API | Failover provider; broader Africa coverage for Phase 3 |
| KYC / BVN | Dojah / Smile Identity | API | BVN lookup, liveness check, document OCR — all in one |
| Frontend | React 18 + TypeScript | Vite build | Component ecosystem; TypeScript safety; fast iteration |
| Styling | Tailwind CSS | v3 | Utility-first; consistent design system; low-bandwidth CSS output |
| State Management | Zustand + TanStack Query | Latest | Zustand for UI state; TanStack Query for server state with caching |
| Forms & Validation | React Hook Form + Zod | Latest | Performant forms; end-to-end type-safe validation |
| Data Visualisation | Recharts | v2 | React-native charts; responsive; accessible |
| Mobile App | React Native | v0.73 (Phase 2) | Code sharing with web; single team for iOS and Android |
| Hosting — Frontend | Vercel | — | Edge CDN; auto deployments; preview environments per branch |
| Hosting — Backend | AWS ECS Fargate | — | Managed containers; auto-scaling; VPC isolation for database |
| Database Hosting | AWS RDS PostgreSQL | Multi-AZ | Automated backups; read replicas for analytics in Phase 2 |
| Secrets Management | AWS Secrets Manager | — | Centralised secrets; automatic rotation; no secrets in code |
| CI/CD | GitHub Actions | — | Automated test → build → deploy pipeline; Snyk security scanning |
| Monitoring & APM | Datadog + Sentry | — | APM, error tracking, log management, uptime alerts |

---

# SECTION 7 | Monetisation Model

## 7.1 Subscription Tiers

| Feature | Starter ₦15K/mo | Growth ₦45K/mo | Pro ₦120K/mo | Enterprise Custom |
|---|---|---|---|---|
| Active Campaigns | 2 | 10 | Unlimited | Unlimited |
| Active Affiliates | 50 | 500 | 5,000 | Unlimited |
| Monthly Payout Volume | ₦5M | ₦50M | ₦300M | Unlimited |
| Commission Models | CPA & CPS only | All models | All + Tiered | All + Custom |
| Attribution Window | Up to 30 days | Up to 60 days | Up to 90 days | Custom |
| Fraud Detection | Basic rules | Standard rules | Advanced + AI (Phase 2) | Custom AI model |
| Analytics | Basic dashboard | Advanced + export | Full BI suite | Custom reports |
| White-Label Portal | No | No | Yes | Yes + custom domain |
| Team Members | 1 | 3 | 10 | Unlimited |
| API Rate Limit | 100 req/min | 300 req/min | 500 req/min | Custom |
| Transaction Fee | 1.5% on payouts | 1.0% on payouts | 0.75% on payouts | Negotiated |
| Support SLA | Email 48h | Email 24h | Priority 4h | Dedicated CSM |

## 7.2 Additional Revenue Streams

| Stream | Model | When | Est. Revenue Contribution |
|---|---|---|---|
| Transaction Fees | 0.5–1.5% on all wallet payouts | Phase 1 | 25% of total revenue |
| Setup & Onboarding | ₦250K–₦500K one-time for enterprise clients | Phase 1 | 5% |
| Premium Marketplace | ₦25K–₦75K/week for featured campaign placement | Phase 2 | 3% |
| White-Label Licensing | ₦500K–₦2M/month per enterprise instance | Phase 3 | 5% |
| Rippl Developer API | ₦50K/month per 1M API calls above plan limit | Phase 3 | 2% |

---

# SECTION 8 | Go-To-Market Strategy

## 8.1 GTM Phases

| Phase | Timeline | Focus | Target |
|---|---|---|---|
| Validation | Months 1–2 | Manual pilot. No product yet. Prove willingness to pay. | 10 paying businesses |
| Soft Launch | Months 3–4 | MVP live. Founder-led sales. Startup community outreach. | 50 businesses, 1,000 affiliates |
| Growth Engine | Months 5–9 | Content marketing, partnerships, affiliate referral bonus. | 200 businesses, 5,000 affiliates |
| Expansion | Months 10–12 | Paid acquisition post-PMF. Agency partnerships. | 500 businesses, 10,000 affiliates |
| Geographic Expansion | Months 13–18 | Ghana and Kenya with local payment partners. | First 50 international businesses |

## 8.2 Competitive Positioning

| Capability | Rippl | PartnerStack | Impact.com | Manual (WhatsApp) |
|---|---|---|---|---|
| NGN Wallet & Payouts | ✅ Yes — Native | ❌ No (USD only) | ❌ No (USD only) | Manual bank transfer |
| Nigeria KYC (BVN) | ✅ Yes | ❌ No | ❌ No | No |
| Paystack / Flutterwave | ✅ Yes — Native | ❌ No | ❌ No | No |
| CBN / FIRS Compliance | ✅ Yes — Built-in | ❌ No | ❌ No | No |
| Nigeria Fraud Detection | ✅ Yes — Specialised | Basic only | Basic only | None |
| Monthly Cost (SMB) | ✅ ₦15,000 | $499+ | $500+ | Staff time ₦200K+/mo |
| Mobile-First Design | ✅ Yes — 2G tolerant | Desktop-first | Desktop-first | WhatsApp only |
| Setup Time | ✅ < 30 minutes | 2–4 weeks | 4–8 weeks | Ongoing manual |

---

# SECTION 9 | Financial Projections

## 9.1 Revenue Projections (36 Months)

| Month | Active Businesses | Subscription MRR | Payout Volume | Transaction Fee Rev | Total MRR |
|---|---|---|---|---|---|
| Month 1 | 20 | ₦400K | ₦200M | ₦2.0M | ₦2.4M |
| Month 3 | 60 | ₦1.2M | ₦600M | ₦6.0M | ₦7.2M |
| Month 6 | 120 | ₦2.4M | ₦1.2B | ₦12.0M | ₦14.4M |
| Month 9 | 250 | ₦5.0M | ₦2.5B | ₦25.0M | ₦30.0M |
| Month 12 | 500 | ₦10.0M | ₦5.0B | ₦50.0M | ₦60.0M |
| Month 18 | 1,200 | ₦24.0M | ₦12.0B | ₦120M | ₦144M |
| Month 24 | 2,500 | ₦55.0M | ₦25.0B | ₦250M | ₦305M |
| Month 36 | 5,000 | ₦130M | ₦60.0B | ₦600M | ₦730M |

## 9.2 Cost Structure

| Category | Month 1 | Month 6 | Month 12 | Month 24 |
|---|---|---|---|---|
| Engineering Salaries | ₦1.5M | ₦3.0M | ₦5.0M | ₦12.0M |
| Infrastructure (AWS/Cloud) | ₦200K | ₦600K | ₦1.5M | ₦4.0M |
| Payment Processing (~1% of vol) | ₦2.0M | ₦12.0M | ₦50.0M | ₦250M |
| Customer Support | ₦200K | ₦500K | ₦1.0M | ₦3.0M |
| Sales & Marketing | ₦300K | ₦2.0M | ₦5.0M | ₦15.0M |
| Compliance & Legal | ₦150K | ₦300K | ₦600K | ₦1.5M |
| **Total Operating Cost** | **₦4.4M** | **₦18.4M** | **₦63.1M** | **₦285.5M** |
| **Gross Profit / (Loss)** | **(₦2.0M)** | **(₦4.0M)** | **(₦3.1M)** | **₦19.5M** |

*Break-even target: ~Month 14*

## 9.3 Unit Economics

| Metric | Value | Benchmark | Notes |
|---|---|---|---|
| LTV (Avg Business) | ₦540,000 | SaaS target: >3x CAC | 12-month avg retention × avg MRR ₦45K |
| CAC (Business) | ₦80,000 | LTV/CAC = 6.75x ✓ | Sales time + marketing spend per business |
| Payback Period | ~2 months | SaaS ideal: <12 months | Very fast due to low CAC and high margin |
| Gross Margin | ~72% | SaaS benchmark: 70–80% | After payment processing costs |
| Net Revenue Retention | Target: 115%+ | World-class SaaS: >110% | Expansion from plan upgrades + tx volume |

---

# SECTION 10 | Product Roadmap

## 10.1 Phase 1 — MVP (Months 1–6)

> **Goal:** Prove core product works. Get to 100 paying businesses and ₦50M monthly payout volume.

| Sprint | Features | Success Criteria |
|---|---|---|
| Sprint 1–2 (Wks 1–4) | Project setup, auth system (JWT, RBAC, 2FA), user registration, OTP, basic DB schema | Engineers can log in with role-based access |
| Sprint 3–4 (Wks 5–8) | Campaign CRUD, referral link generation, click tracking redirect service, Paystack pixel | Business can create campaign; affiliate gets trackable link |
| Sprint 5–6 (Wks 9–12) | Conversion API, basic fraud rules (self-referral, device duplicate), wallet engine, basic analytics | End-to-end referral → conversion → wallet update works |
| Sprint 7–8 (Wks 13–16) | Paystack payout integration, bank verification (NIP), withdrawal flow, email/SMS notifications | Affiliate can withdraw to bank within 24h |
| Sprint 9–10 (Wks 17–20) | Business admin dashboard, affiliate management table, payout approval, subscription billing | Business can manage affiliates; billing active |
| Sprint 11–12 (Wks 21–24) | Super Admin portal, KYC queue, fraud log, compliance report, system health monitoring | MVP feature-complete; ready for soft launch |

## 10.2 Phase 2 — Growth (Months 6–12)

| Quarter | Key Deliverables | Strategic Objective |
|---|---|---|
| Q3 (Mo 7–9) | Ambassador programme module, Affiliate Marketplace v1, Flutterwave failover, advanced analytics (cohort, ROI) | Differentiate with ambassador tooling; unlock new segments |
| Q3 (Mo 7–9) | React Native mobile app alpha (iOS + Android), push notification infrastructure (FCM) | Deepen affiliate engagement; increase daily active use |
| Q4 (Mo 10–12) | AI fraud model v1 (gradient boosting on Phase 1 data), Shopify plugin, WooCommerce plugin, Zapier | Reduce fraud to <0.5%; unlock e-commerce segment at scale |
| Q4 (Mo 10–12) | Multi-currency wallet (USD for diaspora affiliates), smart commission AI, affiliate gamification | Expand TAM; increase affiliate retention and performance |

## 10.3 Phase 3 — Expansion (Months 12–24)

| Initiative | Description | Timeline |
|---|---|---|
| Ghana Market Entry | GHS wallet, Hubtel/MTN Mobile Money, Ghana Card KYC, local GTM partnerships | Month 13–15 |
| Kenya Market Entry | KES wallet, M-Pesa integration, Kenya KYC, Nairobi startup ecosystem GTM | Month 16–18 |
| White-Label Platform | Branded instances with custom domain, logo, colours, and contract. Target: 5 enterprise clients. | Month 14–18 |
| Rippl Developer API | Public REST API, developer docs, sandbox, developer community | Month 18–20 |
| Enterprise SSO | SAML 2.0 and OAuth 2.0 integration for enterprise single sign-on | Month 20–22 |
| Multi-Level Commissions | MLM-style commission structures for community ambassador programmes | Month 22–24 |

---

# SECTION 11 | Risks & Mitigation

## 11.1 Risk Register

| Risk | Category | Probability | Impact | Mitigation |
|---|---|---|---|---|
| CBN updates fintech regulations restricting wallet operations | Regulatory | Medium | Critical | Legal counsel on retainer. Compliance-first architecture. Active CBN consultation engagement. Dual-provider payment rail reduces single-regulator exposure. |
| Paystack / Flutterwave downtime affecting payouts | Technical | Medium | High | Dual-provider architecture with automatic failover. BullMQ retry logic with exponential backoff. Real-time payout monitoring and user communication on delays. |
| Sophisticated fraud at scale outpacing detection | Fraud | High | High | Continuous ML model retraining. Manual review queue for edge cases. Graduated clearing periods. Reserve fund for disputed payouts. Dedicated fraud team by Month 6. |
| Trust deficit — users unwilling to use new payment platform | Market | Medium | High | BVN-backed KYC. Paystack/Flutterwave rails are trusted brands. Transparent tracking shared with both parties. Fast dispute resolution SLA published publicly. |
| Engineering capacity — unable to hire strong engineers | Talent | Medium | Medium | Competitive NGN salaries (₦600K–₦1.5M/month for seniors). Remote-first team. Clear equity programme. Strong engineering culture. |
| Global competitor enters Nigeria with local pricing | Competitive | Low | High | Network effects and local data moat create defensibility. Local regulatory compliance takes 12–18 months to replicate. Focus on speed and community switching costs. |
| Key business churns before network effect established | Business | Medium | Medium | Annual contracts with 10% discount. Dedicated CSM for top 20 businesses. High-touch onboarding. Campaign performance guarantees for anchor clients. |
| NDPR compliance breach (data privacy) | Legal | Low | Critical | PII encrypted at rest. Minimal PII collection. 30-day deletion on request. DPA appointed. Annual privacy audit. Data residency within Nigeria. |

---

# SECTION 12 | Team Structure & Operations

## 12.1 Founding Team

| Role | Responsibilities | Hire By | Salary Range |
|---|---|---|---|
| CEO / Founder | Vision, fundraising, enterprise sales, regulatory relationships, team building | Day 0 | Equity-driven → market rate post-funding |
| CTO / Lead Engineer | Architecture, backend engineering, infrastructure, security, technical hiring | Day 0 | ₦800K–₦1.5M/month |
| Senior Full-Stack Engineer | Product feature development, frontend and backend, API integrations | Month 1 | ₦600K–₦1.0M/month |
| Product Manager | Roadmap, user research, sprint planning, analytics, prioritisation | Month 2 | ₦400K–₦700K/month |
| Customer Success / Ops | Onboarding, support, fraud review, affiliate KYC queue, dispute resolution | Month 3 | ₦200K–₦350K/month |
| Growth / Marketing Lead | Content, SEO, social, GTM execution, partnerships, community management | Month 4 | ₦300K–₦500K/month |
| Finance / Compliance | Financial reporting, FIRS compliance, NDPR, payout reconciliation | Month 6 | ₦300K–₦500K/month |

## 12.2 Operational Cadences

| Cadence | Process | Owner | Output |
|---|---|---|---|
| Daily | Fraud review queue processing | CS Ops | Flagged conversions actioned within 4 hours |
| Daily | Failed payout retry review | Finance | Retried or escalated |
| Weekly | Product sprint review | PM + CTO | Sprint demo, backlog grooming, next sprint plan |
| Weekly | KPI dashboard review | CEO + PM | MRR, payout volume, fraud rate, churn — actioned |
| Monthly | Full P&L review | CEO + Finance | Budget vs actuals; cost optimisation; investor update |
| Monthly | Compliance & fraud report | Finance + CTO | CBN-ready report; platform risk assessment |
| Quarterly | All-hands | CEO | Vision refresh, OKR review, culture health check |
| Quarterly | Penetration test | External vendor | Security vulnerability report and remediation plan |
| Annually | External financial audit | Audit firm | Audited financials for investors and regulatory |

---

# SECTION 13 | API Architecture & Integration Ecosystem

## 13.1 API Design Principles

- RESTful architecture with consistent JSON responses: `data`, `meta` (pagination), and `error` fields on every response.
- API versioning via URL prefix: `/v1/`, `/v2/`. Breaking changes always released in a new version.
- Idempotency keys required for all financial mutation endpoints to prevent double-processing.
- Rate limiting: sliding window per IP and per authenticated user, returned in `X-RateLimit-Remaining` headers.

## 13.2 Key API Endpoints

| Domain | Method | Endpoint | Description | Auth |
|---|---|---|---|---|
| Auth | POST | /v1/auth/register | Register business or affiliate | Public |
| Auth | POST | /v1/auth/login | Login; returns JWT pair | Public |
| Auth | POST | /v1/auth/refresh | Refresh access token | Public |
| Campaigns | GET | /v1/campaigns | List marketplace campaigns | Affiliate JWT |
| Campaigns | POST | /v1/campaigns | Create a campaign | Business JWT |
| Campaigns | PATCH | /v1/campaigns/:id | Update campaign | Business JWT |
| Campaigns | POST | /v1/campaigns/:id/apply | Affiliate applies to campaign | Affiliate JWT |
| Tracking | POST | /v1/track/click | Log a referral click | API Key |
| Tracking | POST | /v1/track/conversion | Record a conversion | API Key |
| Referrals | POST | /v1/referrals/links | Generate referral link | Affiliate JWT |
| Conversions | PATCH | /v1/conversions/:id/approve | Approve conversion | Business JWT |
| Conversions | PATCH | /v1/conversions/:id/dispute | Dispute conversion | Business JWT |
| Wallet | GET | /v1/wallet | Get wallet balance | Any JWT |
| Wallet | POST | /v1/wallet/withdraw | Request withdrawal | Affiliate JWT |
| Wallet | POST | /v1/wallet/fund | Fund business wallet | Business JWT |
| Analytics | GET | /v1/analytics/overview | Account overview metrics | Any JWT |
| Analytics | GET | /v1/analytics/export | Export report as CSV | Any JWT |
| Admin | GET | /v1/admin/businesses | List all businesses | Super Admin JWT |
| Admin | PATCH | /v1/admin/businesses/:id/approve | Approve business verification | Super Admin JWT |
| Admin | GET | /v1/admin/fraud/flagged | Flagged entities queue | Super Admin JWT |

---

# SECTION 14 | Compliance, Legal & Regulatory Framework

## 14.1 Regulatory Landscape

| Regulation | Body | Rippl Approach |
|---|---|---|
| CBN e-Payment Guidelines | CBN | Partnering with licensed PSPs (Paystack, Flutterwave) as payment processors. Rippl operates wallets under PSP licence umbrella. Legal review annually. |
| FIRS Tax Compliance | FIRS | Auto-calculate and report WHT on affiliate earnings above threshold. Downloadable tax statements for affiliates. API connection to FIRS system in Phase 2. |
| NDPR (Data Protection) | NITDA | Privacy-by-design architecture. Minimal PII collection. 30-day deletion on request. Registered Data Protection Officer. Annual audit. |
| Anti-Money Laundering | NFIU | BVN-backed KYC. Transaction velocity monitoring. Automated SAR flagging. Compliance reports for NFIU submission via Super Admin Compliance Reports screen. |
| Know Your Customer (KYC) | CBN / NFIU | Tiered KYC: Basic (email/phone) → Standard (BVN) → Enhanced (ID + liveness). Lazy KYC triggered on first withdrawal. Dojah / Smile Identity for verification. |

## 14.2 KYC Tier Requirements

| KYC Tier | Requirement | Unlock | Daily Withdrawal Limit |
|---|---|---|---|
| Basic | Email + phone OTP verified | Join campaigns, generate links, track earnings | N/A (cannot withdraw) |
| Standard | Basic + BVN verified (Dojah) | Withdraw up to ₦500,000/day | ₦500,000 |
| Enhanced | Standard + Government ID + Liveness Check | Withdraw up to ₦5,000,000/day; enterprise campaigns | ₦5,000,000 |

---

# SECTION 15 | Analytics, Reporting & Platform Intelligence

## 15.1 Affiliate Analytics

| Metric | Definition | Visualisation | Update Frequency |
|---|---|---|---|
| Total Clicks | Unique link clicks within period | Line chart + KPI card | Real-time |
| Total Conversions | Confirmed conversions (pending + cleared) | Line chart + KPI card | Real-time |
| Conversion Rate | Conversions / Clicks × 100 | Gauge / KPI card | Real-time |
| Earnings Per Click | Total Earnings / Total Clicks | KPI card | Daily |
| Earnings Over Time | Cumulative and periodic earnings | Area chart | Real-time |
| Pending vs. Cleared Balance | Wallet balance breakdown | Stacked bar / wallet card | Real-time |
| Campaign Performance Table | Per-campaign: clicks, conversions, earnings, EPC | Sortable table | Daily |
| Referral Source Breakdown | Origin of click (WhatsApp, Instagram, direct) | Donut chart | Daily (UTM-based) |
| Conversion Funnel | Clicks → Conversions → Cleared → Withdrawn | Funnel chart | Daily |

## 15.2 Analytics Technical Architecture

| Layer | Technology | Purpose |
|---|---|---|
| Event Capture | PostgreSQL event_log + Redis pub/sub | All clicks, conversions, wallet events written to append-only log in real-time |
| Pre-Aggregation | PostgreSQL materialized views (daily snapshots) | Pre-computed analytics tables for fast dashboard queries; refreshed hourly |
| Real-Time Updates | WebSocket / Server-Sent Events (SSE) | Live wallet balance and conversion updates pushed to connected clients |
| Export Engine | BullMQ background jobs | Large CSV exports processed asynchronously; user notified when ready |
| Phase 2: Streaming | Apache Kafka + ClickHouse | High-volume event streaming; sub-second analytics queries at scale |

---

# SECTION 16 | Implementation Checklist & Launch Criteria

## 16.1 Pre-Launch Technical Checklist

| Category | Item | Status |
|---|---|---|
| Infrastructure | AWS VPC, ECS Fargate, RDS PostgreSQL, ElastiCache Redis provisioned | Pre-launch required |
| Infrastructure | CI/CD pipeline (GitHub Actions) — test → build → deploy automated | Pre-launch required |
| Infrastructure | Domain, SSL certificate, WAF rules, CDN configured | Pre-launch required |
| Security | JWT RS256 asymmetric signing; refresh token rotation active | Pre-launch required |
| Security | Rate limiting (Redis sliding window) on all public endpoints | Pre-launch required |
| Security | Penetration test completed; critical vulnerabilities resolved | Pre-launch required |
| Payments | Paystack live API keys integrated and tested end-to-end | Pre-launch required |
| Payments | End-to-end payout test: earn → clear → withdraw → bank credit confirmed | Pre-launch required |
| Compliance | Privacy Policy and Terms of Service reviewed by legal counsel | Pre-launch required |
| Compliance | BVN KYC flow tested with Dojah in production mode | Pre-launch required |
| Fraud | All fraud rules tested with simulated attack scenarios | Pre-launch required |
| Monitoring | Datadog APM, Sentry error tracking, uptime alerts all active | Pre-launch required |

## 16.2 Launch Criteria

- All 68 Phase 1 screens built, tested, and responsive on mobile (375px minimum viewport).
- End-to-end flow working: business creates campaign → affiliate joins → referral link generated → click tracked → conversion recorded → commission credited → payout processed.
- At least 5 pilot businesses onboarded and validating the platform in production.
- Uptime monitoring showing >99.5% over last 14 consecutive days.
- Security penetration test completed; no critical findings unresolved.
- 100 affiliate accounts registered and at least 50 completed KYC to Standard tier.
- At least ₦5M in payout volume processed successfully through the platform.
- Fraud rate on processed payouts <2%.
- NPS survey completed by pilot users; score >35.
- Customer support SLA active: <4 hour first response during business hours.

---

# SECTION 17 | Appendix — Glossary & References

## 17.1 Glossary

| Term | Definition |
|---|---|
| Affiliate | An individual (creator, influencer, or community member) who promotes a business's products via unique referral links in exchange for commission. |
| Attribution Window | The time period during which a click can be credited to an affiliate. If a user converts within this window, the affiliate earns commission. |
| BVN | Bank Verification Number — a unique 11-digit identifier issued by the CBN to bank account holders. Used for KYC identity verification on Rippl. |
| CPA | Cost Per Acquisition — commission model where the affiliate earns a fixed fee for each confirmed customer signup or registration. |
| CPS | Cost Per Sale — commission model where the affiliate earns a percentage of the order value for each confirmed sale. |
| EPC | Earnings Per Click — total affiliate earnings divided by total clicks. Key efficiency metric for affiliate performance. |
| Fraud Score | A score from 0.0 to 1.0 assigned to each conversion by the fraud engine. Higher = higher likelihood of fraud. |
| GMV | Gross Merchandise Value — total value of transactions attributed to referrals processed through the Rippl platform. |
| KYC | Know Your Customer — process of verifying user identity, required for financial operations and regulatory compliance. |
| MRR | Monthly Recurring Revenue — predictable subscription revenue from active business accounts in a given month. |
| NGN Wallet | A digital wallet denominated in Nigerian Naira, holding affiliate earnings and business payout reserves within Rippl. |
| RBAC | Role-Based Access Control — security model restricting system access based on the roles of individual users. |
| Referral Link | A unique URL generated for each affiliate-campaign pair that tracks clicks and conversions to a specific affiliate. |
| Short Code | The unique alphanumeric identifier appended to rippl.ng/r/ for each referral link — e.g. rippl.ng/r/ABC123. |
| Tracking Pixel | A small JavaScript snippet embedded on the business's website that fires when a conversion event occurs. |
| WHT | Withholding Tax — Nigerian tax deducted at source from affiliate earnings above the threshold, as required by FIRS. |

## 17.2 External References

- Paystack API Documentation: https://paystack.com/docs/api
- Flutterwave Developer Docs: https://developer.flutterwave.com
- Termii SMS API: https://developers.termii.com
- Dojah KYC API: https://docs.dojah.io
- CBN FinTech Guidelines: https://www.cbn.gov.ng
- NITDA NDPR Framework: https://nitda.gov.ng/ndpr
- FIRS Tax Regulations: https://www.firs.gov.ng

---

> **RIPPL MASTER BLUEPRINT v3.0** — Updated June 2026 | Confidential — Internal Use Only | 76 Screens | 17 Sections
> Redistribution requires written approval from the Rippl CEO.
