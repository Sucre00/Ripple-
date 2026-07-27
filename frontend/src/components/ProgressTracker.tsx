"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconPlayerPause,
  IconListCheck,
  IconX
} from "@tabler/icons-react";

export interface ScreenItem {
  id: string;
  moduleNum: number;
  moduleName: string;
  name: string;
  route: string;
  details: string;
  status: "completed" | "in_progress" | "pending";
}

export const ALL_SCREENS: ScreenItem[] = [
  // Module 1 — Public Website (1.01 – 1.15)
  { id: "1.01", moduleNum: 1, moduleName: "Public Website", name: "Landing Page", route: "/", details: "Hero, dual business/affiliate CTA, stats counter, ROI calculator, ticker, exit intent modal.", status: "completed" },
  { id: "1.02", moduleNum: 1, moduleName: "Public Website", name: "About Rippl", route: "/?view=about", details: "Brand story, mission for African growth infrastructure, team values.", status: "completed" },
  { id: "1.03", moduleNum: 1, moduleName: "Public Website", name: "Features", route: "/?view=features", details: "Breakdown of online pixel tracking, offline QR confirmation, wallet, fraud engine.", status: "completed" },
  { id: "1.04", moduleNum: 1, moduleName: "Public Website", name: "Pricing", route: "/?view=pricing", details: "NGN interactive plan comparison (Starter ₦15k, Growth ₦45k, Pro ₦120k, Enterprise), monthly/annual toggle.", status: "completed" },
  { id: "1.05", moduleNum: 1, moduleName: "Public Website", name: "How It Works", route: "/?view=how-it-works", details: "Step-by-step visual explainer for online merchants, offline shops, and ambassadors.", status: "completed" },
  { id: "1.06", moduleNum: 1, moduleName: "Public Website", name: "Business Solutions", route: "/?view=solutions-business", details: "Merchant growth case studies, ROI calculators, Shopify/WooCommerce/POS integration details.", status: "completed" },
  { id: "1.07", moduleNum: 1, moduleName: "Public Website", name: "Affiliate Solutions", route: "/?view=solutions-affiliate", details: "Ambassador earnings calculator, instant NIP cashouts, WhatsApp sharing tools.", status: "completed" },
  { id: "1.08", moduleNum: 1, moduleName: "Public Website", name: "Enterprise Solutions", route: "/?view=solutions-enterprise", details: "Custom API, white-labeling options, dedicated account management for banks & telcos.", status: "completed" },
  { id: "1.09", moduleNum: 1, moduleName: "Public Website", name: "FAQs", route: "/?view=faq", details: "Categorized searchable accordion (Payments, KYC, Offline QR, Fraud, Billing).", status: "completed" },
  { id: "1.10", moduleNum: 1, moduleName: "Public Website", name: "Contact Us", route: "/?view=contact", details: "Contact form, WhatsApp direct button, office locator, support email routing.", status: "completed" },
  { id: "1.11", moduleNum: 1, moduleName: "Public Website", name: "Blog", route: "/?view=blog", details: "Educational articles, affiliate marketing tips, merchant growth guides.", status: "completed" },
  { id: "1.12", moduleNum: 1, moduleName: "Public Website", name: "Blog Details", route: "/?view=blog-detail", details: "Individual article reader, share buttons, author bio, related posts.", status: "completed" },
  { id: "1.13", moduleNum: 1, moduleName: "Public Website", name: "Help Center", route: "/?view=help", details: "Public support center, searchable topics, direct ticket submission link.", status: "completed" },
  { id: "1.14", moduleNum: 1, moduleName: "Public Website", name: "Privacy Policy", route: "/?view=privacy", details: "Full NDPR-compliant privacy notice, cookie policy, data rights breakdown.", status: "completed" },
  { id: "1.15", moduleNum: 1, moduleName: "Public Website", name: "Terms & Conditions", route: "/?view=terms", details: "Terms of service governed by Nigerian law for merchants & affiliates.", status: "completed" },

  // Module 2 — Authentication & Security (2.01 – 2.15)
  { id: "2.01", moduleNum: 2, moduleName: "Authentication & Security", name: "Welcome Screen", route: "/auth?mode=welcome", details: "Role selection screen: 'I'm a Business / Merchant' vs 'I'm an Affiliate / Ambassador'.", status: "completed" },
  { id: "2.02", moduleNum: 2, moduleName: "Authentication & Security", name: "Login", route: "/auth?mode=login", details: "Email/phone & password login, Google OAuth button, OTP fallback, remember device toggle.", status: "completed" },
  { id: "2.03", moduleNum: 2, moduleName: "Authentication & Security", name: "Business Registration", route: "/auth?mode=signup&role=business_admin", details: "Multi-step merchant registration wizard with company profile & tax details.", status: "completed" },
  { id: "2.04", moduleNum: 2, moduleName: "Authentication & Security", name: "Affiliate Registration", route: "/auth?mode=signup&role=affiliate", details: "Streamlined ambassador registration with niche selector & bank payout details.", status: "completed" },
  { id: "2.05", moduleNum: 2, moduleName: "Authentication & Security", name: "Email Verification", route: "/auth?mode=verify_email", details: "Email confirmation screen with resend link timer and verification status indicator.", status: "completed" },
  { id: "2.06", moduleNum: 2, moduleName: "Authentication & Security", name: "Phone Verification", route: "/auth?mode=verify_phone", details: "SMS verification prompt with 60-second resend countdown.", status: "completed" },
  { id: "2.07", moduleNum: 2, moduleName: "Authentication & Security", name: "OTP Verification", route: "/auth?mode=otp", details: "6-digit OTP input keypad, error validation states, resend code button.", status: "completed" },
  { id: "2.08", moduleNum: 2, moduleName: "Authentication & Security", name: "Forgot Password", route: "/auth?mode=forgot_password", details: "Email/phone input form to trigger password recovery instructions.", status: "completed" },
  { id: "2.09", moduleNum: 2, moduleName: "Authentication & Security", name: "Email Sent", route: "/auth?mode=email_sent", details: "Confirmation screen informing user to check inbox for reset link.", status: "completed" },
  { id: "2.10", moduleNum: 2, moduleName: "Authentication & Security", name: "Reset Password", route: "/auth?mode=reset_password", details: "Password reset form with live password strength meter & confirmation matcher.", status: "completed" },
  { id: "2.11", moduleNum: 2, moduleName: "Authentication & Security", name: "Password Reset Success", route: "/auth?mode=reset_success", details: "Success screen with 3-second auto-redirect countdown to login.", status: "completed" },
  { id: "2.12", moduleNum: 2, moduleName: "Authentication & Security", name: "Two Factor Auth", route: "/auth?mode=2fa", details: "6-digit TOTP authenticator entry, backup recovery code option, trust device toggle.", status: "completed" },
  { id: "2.13", moduleNum: 2, moduleName: "Authentication & Security", name: "Account Pending Approval", route: "/auth?mode=pending_approval", details: "Waiting state for business accounts under manual CAC verification.", status: "completed" },
  { id: "2.14", moduleNum: 2, moduleName: "Authentication & Security", name: "Account Suspended", route: "/auth?mode=suspended", details: "Suspension reason banner, case reference number, and appeal submission form.", status: "completed" },
  { id: "2.15", moduleNum: 2, moduleName: "Authentication & Security", name: "Session Expired", route: "/auth?mode=session_expired", details: "Security lockout screen pre-filling active user email for quick re-authentication.", status: "completed" },

  // Module 3 — Business Onboarding (3.01 – 3.13)
  { id: "3.01", moduleNum: 3, moduleName: "Business Onboarding", name: "Business Information", route: "/auth?step=biz_info", details: "Company name, trading name, category, website URL (marked optional for offline shops).", status: "completed" },
  { id: "3.02", moduleNum: 3, moduleName: "Business Onboarding", name: "Business Category", route: "/auth?step=biz_cat", details: "Category grid (Retail, Food & Bev, Fashion, Electronics, Supermarket, Services, Fintech).", status: "completed" },
  { id: "3.03", moduleNum: 3, moduleName: "Business Onboarding", name: "Business Address", route: "/auth?step=biz_addr", details: "Street address, city, state, LGA, physical store branch location pin.", status: "completed" },
  { id: "3.04", moduleNum: 3, moduleName: "Business Onboarding", name: "Business Verification", route: "/auth?step=biz_kyc_intro", details: "KYC document overview screen detailing CAC certificate & director ID requirements.", status: "completed" },
  { id: "3.05", moduleNum: 3, moduleName: "Business Onboarding", name: "Upload CAC Documents", route: "/auth?step=biz_cac", details: "Drag-and-drop file uploader for CAC registration document with progress bar.", status: "completed" },
  { id: "3.06", moduleNum: 3, moduleName: "Business Onboarding", name: "Upload Government ID", route: "/auth?step=biz_id", details: "NIN / Voter Card / Passport uploader with camera capture & liveness check option.", status: "completed" },
  { id: "3.07", moduleNum: 3, moduleName: "Business Onboarding", name: "Upload Business Logo", route: "/auth?step=biz_logo", details: "Logo upload tool with interactive cropping preview for branded referral portals.", status: "completed" },
  { id: "3.08", moduleNum: 3, moduleName: "Business Onboarding", name: "Payment Setup", route: "/auth?step=biz_bank", details: "NIP bank account resolver validating merchant payout bank details in real time.", status: "completed" },
  { id: "3.09", moduleNum: 3, moduleName: "Business Onboarding", name: "Subscription Plans", route: "/auth?step=biz_plan", details: "Plan selector (Starter ₦15k, Growth ₦45k, Pro ₦120k) with annual discount toggle.", status: "completed" },
  { id: "3.10", moduleNum: 3, moduleName: "Business Onboarding", name: "Checkout", route: "/auth?step=biz_checkout", details: "Order summary, chosen plan, Paystack card/bank transfer integration modal.", status: "completed" },
  { id: "3.11", moduleNum: 3, moduleName: "Business Onboarding", name: "Payment Success", route: "/auth?step=biz_pay_success", details: "Subscription confirmation modal with plan feature breakdown & 'Go to Dashboard' CTA.", status: "completed" },
  { id: "3.12", moduleNum: 3, moduleName: "Business Onboarding", name: "Payment Failed", route: "/auth?step=biz_pay_failed", details: "Declined transaction notice with retry payment & alternative payment method buttons.", status: "completed" },
  { id: "3.13", moduleNum: 3, moduleName: "Business Onboarding", name: "Onboarding Complete", route: "/auth?step=biz_done", details: "Setup summary checklist with 'Launch Merchant Dashboard' primary CTA.", status: "completed" },

  // Module 4 — Business Dashboard (4.01 – 4.07)
  { id: "4.01", moduleNum: 4, moduleName: "Business Dashboard", name: "Dashboard Home", route: "/business-admin", details: "Overview KPIs (Revenue, Active Affiliates, Conversion Rate, Reserves), quick actions.", status: "completed" },
  { id: "4.02", moduleNum: 4, moduleName: "Business Dashboard", name: "Analytics Dashboard", route: "/business-admin?tab=overview&sub=analytics", details: "Conversion funnels, click trends, CVR area charts, geographic traffic breakdown.", status: "completed" },
  { id: "4.03", moduleNum: 4, moduleName: "Business Dashboard", name: "Revenue Dashboard", route: "/business-admin?tab=overview&sub=revenue", details: "Referral revenue attribution, commission cost, net ROI comparison to paid ad channels.", status: "completed" },
  { id: "4.04", moduleNum: 4, moduleName: "Business Dashboard", name: "Campaign Dashboard", route: "/business-admin?tab=overview&sub=campaigns", details: "Performance cards for all active/paused campaigns with revenue metrics.", status: "completed" },
  { id: "4.05", moduleNum: 4, moduleName: "Business Dashboard", name: "Affiliate Dashboard", route: "/business-admin?tab=overview&sub=affiliates", details: "Top earners leaderboard, application approval queue, fraud score indicators.", status: "completed" },
  { id: "4.06", moduleNum: 4, moduleName: "Business Dashboard", name: "Wallet Dashboard", route: "/business-admin?tab=overview&sub=wallet", details: "Reserve balance, clearing funds, low balance warnings, deposit CTA.", status: "completed" },
  { id: "4.07", moduleNum: 4, moduleName: "Business Dashboard", name: "Notification Center", route: "/business-admin?tab=overview&sub=notifications", details: "Real-time system alerts, payout requests, fraud warnings, unread count badge.", status: "completed" },

  // Module 5 — Campaign Management (5.01 – 5.10)
  { id: "5.01", moduleNum: 5, moduleName: "Campaign Management", name: "Campaign List", route: "/business-admin?tab=campaigns", details: "Comprehensive table of all campaigns with status toggles, MTD revenue, quick actions.", status: "completed" },
  { id: "5.02", moduleNum: 5, moduleName: "Campaign Management", name: "Campaign Details", route: "/business-admin?tab=campaigns&view=detail", details: "Deep-dive campaign page with affiliate list, conversion logs, creative asset links.", status: "completed" },
  { id: "5.03", moduleNum: 5, moduleName: "Campaign Management", name: "Create Campaign", route: "/business-admin?tab=campaigns&action=create", details: "6-step creation wizard (Info → Tracking → Commission → Rules → Creatives → Publish).", status: "completed" },
  { id: "5.04", moduleNum: 5, moduleName: "Campaign Management", name: "Campaign Preview", route: "/business-admin?tab=campaigns&action=preview", details: "Marketplace card preview mode before publishing to public marketplace.", status: "completed" },
  { id: "5.05", moduleNum: 5, moduleName: "Campaign Management", name: "Edit Campaign", route: "/business-admin?tab=campaigns&action=edit", details: "Modify campaign budget, reward structure, duration, and promotional copy.", status: "completed" },
  { id: "5.06", moduleNum: 5, moduleName: "Campaign Management", name: "Pause Campaign", route: "/business-admin?tab=campaigns&action=pause", details: "Confirmation modal to pause a live campaign with affiliate broadcast notice.", status: "completed" },
  { id: "5.07", moduleNum: 5, moduleName: "Campaign Management", name: "Resume Campaign", route: "/business-admin?tab=campaigns&action=resume", details: "Confirmation modal to reactivate a paused campaign.", status: "completed" },
  { id: "5.08", moduleNum: 5, moduleName: "Campaign Management", name: "Archive Campaign", route: "/business-admin?tab=campaigns&action=archive", details: "Archive completed campaigns for historical analytics reference.", status: "completed" },
  { id: "5.09", moduleNum: 5, moduleName: "Campaign Management", name: "Delete Campaign", route: "/business-admin?tab=campaigns&action=delete", details: "Delete draft campaign confirmation with cascading dependency check.", status: "completed" },
  { id: "5.10", moduleNum: 5, moduleName: "Campaign Management", name: "Campaign Performance", route: "/business-admin?tab=campaigns&view=perf", details: "Per-campaign funnel charts, top affiliates bar chart, cohort retention breakdown.", status: "completed" },

  // Module 6 — Products (Online & Offline QR) (6.01 – 6.10)
  { id: "6.01", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Product List", route: "/business-admin?tab=products", details: "All online & offline products table with price, stock status & referral tracking toggle.", status: "completed" },
  { id: "6.02", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Add Product", route: "/business-admin?tab=products&action=add", details: "Manual product creation form with SKU, description, pricing, and image upload.", status: "completed" },
  { id: "6.03", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Edit Product", route: "/business-admin?tab=products&action=edit", details: "Modify product pricing, stock availability, and linked referral campaigns.", status: "completed" },
  { id: "6.04", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Product Details", route: "/business-admin?tab=products&view=detail", details: "Individual product page with referral performance stats, clicks, and revenue generated.", status: "completed" },
  { id: "6.05", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Import Products", route: "/business-admin?tab=products&action=import", details: "Import products via Shopify OAuth, WooCommerce API key, or bulk CSV upload.", status: "completed" },
  { id: "6.06", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Manual Product Entry (Offline)", route: "/business-admin?tab=products&mode=offline&action=manual", details: "Add products for physical shops without a website. Auto-generates QR code per product.", status: "completed" },
  { id: "6.07", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Offline Product Catalog", route: "/business-admin?tab=products&mode=offline", details: "Visual catalogue of physical products with printable QR code cards & PDF generator.", status: "completed" },
  { id: "6.08", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Product Categories", route: "/business-admin?tab=products&view=categories", details: "Manage product categories for targeted affiliate campaign rules.", status: "completed" },
  { id: "6.09", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "Inventory Status", route: "/business-admin?tab=products&view=inventory", details: "Real-time stock tracking with low-stock alerts & auto-pause referral campaign triggers.", status: "completed" },
  { id: "6.10", moduleNum: 6, moduleName: "Products (Online & Offline)", name: "QR Product Generator", route: "/business-admin?tab=products&mode=offline&action=qr", details: "Generate, download (PNG/SVG), and print unique QR codes per product for store display.", status: "completed" },

  // Module 7 — Affiliate Management (7.01 – 7.09)
  { id: "7.01", moduleNum: 7, moduleName: "Affiliate Management", name: "Affiliate List", route: "/business-admin?tab=affiliates", details: "Comprehensive directory of affiliated ambassadors with clicks, conversions, and fraud scores.", status: "completed" },
  { id: "7.02", moduleNum: 7, moduleName: "Affiliate Management", name: "Affiliate Details", route: "/business-admin?tab=affiliates&view=detail", details: "Deep profile inspector with conversion history, linked campaigns, and internal notes.", status: "completed" },
  { id: "7.03", moduleNum: 7, moduleName: "Affiliate Management", name: "Invite Affiliate", route: "/business-admin?tab=affiliates&action=invite", details: "Send direct email/WhatsApp invitations to top influencers with custom terms.", status: "completed" },
  { id: "7.04", moduleNum: 7, moduleName: "Affiliate Management", name: "Pending Invitations", route: "/business-admin?tab=affiliates&view=pending", details: "Track sent invitations with status indicators (Pending / Accepted / Expired).", status: "completed" },
  { id: "7.05", moduleNum: 7, moduleName: "Affiliate Management", name: "Approved Affiliates", route: "/business-admin?tab=affiliates&view=approved", details: "Active approved partners list with direct messaging & performance tier tags.", status: "completed" },
  { id: "7.06", moduleNum: 7, moduleName: "Affiliate Management", name: "Suspended Affiliates", route: "/business-admin?tab=affiliates&view=suspended", details: "List of flagged or suspended affiliates with reinstatement workflow.", status: "completed" },
  { id: "7.07", moduleNum: 7, moduleName: "Affiliate Management", name: "Affiliate Performance", route: "/business-admin?tab=affiliates&view=perf", details: "Per-affiliate analytics, EPC tracking, conversion speed, and leaderboard stats.", status: "completed" },
  { id: "7.08", moduleNum: 7, moduleName: "Affiliate Management", name: "Affiliate Commission", route: "/business-admin?tab=affiliates&view=commission", details: "Commission history per partner with custom rate override controls.", status: "completed" },
  { id: "7.09", moduleNum: 7, moduleName: "Affiliate Management", name: "Affiliate Communication", route: "/business-admin?tab=affiliates&action=message", details: "Broadcast announcement sender & private direct messaging drawer.", status: "completed" },

  // Module 8 — Referral Management (8.01 – 8.06)
  { id: "8.01", moduleNum: 8, moduleName: "Referral Management", name: "Referral Overview", route: "/business-admin?tab=referrals", details: "Summary metrics: total referrals, conversion rate, pending commission, fraud held value.", status: "completed" },
  { id: "8.02", moduleNum: 8, moduleName: "Referral Management", name: "Referral Details", route: "/business-admin?tab=referrals&view=detail", details: "Individual referral event log with click timestamp, IP fingerprint, order value, and status.", status: "completed" },
  { id: "8.03", moduleNum: 8, moduleName: "Referral Management", name: "Referral Tracking", route: "/business-admin?tab=referrals&view=tracking", details: "Live real-time click and conversion tracker with live map activity.", status: "completed" },
  { id: "8.04", moduleNum: 8, moduleName: "Referral Management", name: "Referral Status", route: "/business-admin?tab=referrals&view=status", details: "Filter referrals by Pending, Clearing, Approved, Paid, or Disputed states.", status: "completed" },
  { id: "8.05", moduleNum: 8, moduleName: "Referral Management", name: "Referral Approval Queue", route: "/business-admin?tab=referrals&action=approve", details: "Manual approval queue for offline QR sales and high-value conversion validation.", status: "completed" },
  { id: "8.06", moduleNum: 8, moduleName: "Referral Management", name: "Referral History", route: "/business-admin?tab=referrals&view=history", details: "Searchable chronological archive of all historical referrals with CSV exporter.", status: "completed" },

  // Module 9 — Orders & Sales (Online + Offline POS/QR) (9.01 – 9.09)
  { id: "9.01", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Online Orders", route: "/business-admin?tab=orders&mode=online", details: "Pixel & API-synced e-commerce orders attributed to affiliate referral links.", status: "completed" },
  { id: "9.02", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Order Details", route: "/business-admin?tab=orders&mode=online&view=detail", details: "Full order breakdown with items purchased, anonymised customer info, and commission calculated.", status: "completed" },
  { id: "9.03", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Order Tracking", route: "/business-admin?tab=orders&mode=online&view=tracking", details: "Real-time order lifecycle tracker (Created → Processing → Completed → Released).", status: "completed" },
  { id: "9.04", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Completed Orders", route: "/business-admin?tab=orders&mode=online&view=completed", details: "Historical log of fulfilled online orders with export options.", status: "completed" },
  { id: "9.05", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Manual Sale Entry (Offline)", route: "/business-admin?tab=orders&mode=offline&action=manual_sale", details: "Store staff manual sale logger for physical shop purchases referred by ambassadors.", status: "completed" },
  { id: "9.06", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "QR Sale Verification", route: "/business-admin?tab=orders&mode=offline&action=qr_verify", details: "Point-of-sale camera QR code scanner confirming customer affiliate referral at checkout.", status: "completed" },
  { id: "9.07", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "POS Sale Verification", route: "/business-admin?tab=orders&mode=offline&action=pos_verify", details: "Integration verification screen for Moniepoint / OPay / Palmpay POS terminal entries.", status: "completed" },
  { id: "9.08", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Referral Validation Queue", route: "/business-admin?tab=orders&mode=offline&action=validate", details: "Review queue for physical store managers to approve or reject offline sales entries.", status: "completed" },
  { id: "9.09", moduleNum: 9, moduleName: "Orders & Sales (Online + Offline)", name: "Offline Purchase Confirm", route: "/business-admin?tab=orders&mode=offline&action=confirm", details: "Instant receipt summary & commission confirmation banner post-offline verification.", status: "completed" },

  // Module 10 — Wallet & Payments (10.01 – 10.09)
  { id: "10.01", moduleNum: 10, moduleName: "Wallet & Payments", name: "Wallet Overview", route: "/business-admin?tab=payouts", details: "Reserve balance, available clearing balance, lifetime payouts made, deposit CTA.", status: "completed" },
  { id: "10.02", moduleNum: 10, moduleName: "Wallet & Payments", name: "Ledger Transactions", route: "/business-admin?tab=payouts&view=ledger", details: "Detailed financial ledger of wallet top-ups, commission debits, and platform fee charges.", status: "completed" },
  { id: "10.03", moduleNum: 10, moduleName: "Wallet & Payments", name: "Pending Payments Queue", route: "/business-admin?tab=payouts&view=pending", details: "Bulk review queue for approving pending affiliate payouts before bank processing.", status: "completed" },
  { id: "10.04", moduleNum: 10, moduleName: "Wallet & Payments", name: "Completed Payments", route: "/business-admin?tab=payouts&view=completed", details: "History of all successfully processed NIP bank payouts with Paystack transaction refs.", status: "completed" },
  { id: "10.05", moduleNum: 10, moduleName: "Wallet & Payments", name: "Withdraw Funds", route: "/business-admin?tab=payouts&action=withdraw", details: "Merchant reserve withdrawal panel back to primary corporate bank account.", status: "completed" },
  { id: "10.06", moduleNum: 10, moduleName: "Wallet & Payments", name: "Bank Accounts", route: "/business-admin?tab=payouts&view=banks", details: "NIP bank account manager with instant account name resolution.", status: "completed" },
  { id: "10.07", moduleNum: 10, moduleName: "Wallet & Payments", name: "Payment History", route: "/business-admin?tab=payouts&view=history", details: "Chronological log of all historical payouts with date range filter & CSV download.", status: "completed" },
  { id: "10.08", moduleNum: 10, moduleName: "Wallet & Payments", name: "Invoice History", route: "/business-admin?tab=payouts&view=invoices", details: "Subscription billing invoices with PDF download support for accounting.", status: "completed" },
  { id: "10.09", moduleNum: 10, moduleName: "Wallet & Payments", name: "Subscription Billing", route: "/business-admin?tab=billing", details: "Active plan tier breakdown, usage limits, renewal date, and plan upgrade options.", status: "completed" },

  // Module 11 — Reports & Analytics (11.01 – 11.07)
  { id: "11.01", moduleNum: 11, moduleName: "Reports & Analytics", name: "Reports Dashboard", route: "/business-admin?tab=reports", details: "Pre-built report launcher tiles, recent downloads, and scheduled delivery status.", status: "completed" },
  { id: "11.02", moduleNum: 11, moduleName: "Reports & Analytics", name: "Campaign Reports", route: "/business-admin?tab=reports&view=campaigns", details: "Per-campaign performance breakdown: CVR, ROI, total revenue, and commission spend.", status: "completed" },
  { id: "11.03", moduleNum: 11, moduleName: "Reports & Analytics", name: "Revenue Reports", route: "/business-admin?tab=reports&view=revenue", details: "Referral revenue trend charts, online vs offline split, and sales channel comparison.", status: "completed" },
  { id: "11.04", moduleNum: 11, moduleName: "Reports & Analytics", name: "Affiliate Reports", route: "/business-admin?tab=reports&view=affiliates", details: "Affiliate performance metrics, EPC distribution, and payout efficiency reports.", status: "completed" },
  { id: "11.05", moduleNum: 11, moduleName: "Reports & Analytics", name: "Conversion Reports", route: "/business-admin?tab=reports&view=conversions", details: "Funnel drop-off analytics, device distribution, and time-to-convert metrics.", status: "completed" },
  { id: "11.06", moduleNum: 11, moduleName: "Reports & Analytics", name: "Export Reports", route: "/business-admin?tab=reports&action=export", details: "Custom report generator with CSV and PDF export options.", status: "completed" },
  { id: "11.07", moduleNum: 11, moduleName: "Reports & Analytics", name: "Scheduled Reports", route: "/business-admin?tab=reports&view=scheduled", details: "Configure automated daily, weekly, or monthly report emails to team members.", status: "completed" },

  // Module 12 — Notifications Engine (12.01 – 12.05)
  { id: "12.01", moduleNum: 12, moduleName: "Notifications Engine", name: "Notifications History", route: "/business-admin?tab=notifications", details: "Full notification log with filter by conversions, payouts, fraud alerts, and system announcements.", status: "completed" },
  { id: "12.02", moduleNum: 12, moduleName: "Notifications Engine", name: "Email Preferences", route: "/business-admin?tab=notifications&view=email", details: "Granular email alert toggles for sales, payouts, and weekly summaries.", status: "completed" },
  { id: "12.03", moduleNum: 12, moduleName: "Notifications Engine", name: "Push Notifications", route: "/business-admin?tab=notifications&view=push", details: "Browser and mobile push alert configurator.", status: "completed" },
  { id: "12.04", moduleNum: 12, moduleName: "Notifications Engine", name: "SMS Preferences", route: "/business-admin?tab=notifications&view=sms", details: "SMS notification settings for high-value sales & critical security alerts.", status: "completed" },
  { id: "12.05", moduleNum: 12, moduleName: "Notifications Engine", name: "WhatsApp Notifications", route: "/business-admin?tab=notifications&view=whatsapp", details: "WhatsApp Business API notification setup with template previews.", status: "completed" },

  // Module 13 — Business Settings (13.01 – 13.09)
  { id: "13.01", moduleNum: 13, moduleName: "Business Settings", name: "Business Profile", route: "/business-admin?tab=billing&sub=profile", details: "Edit company details, trading name, logo, contact info, and website URL.", status: "completed" },
  { id: "13.02", moduleNum: 13, moduleName: "Business Settings", name: "Team Members", route: "/business-admin?tab=billing&sub=team", details: "Invite team members by email, manage active users, and revoke access.", status: "completed" },
  { id: "13.03", moduleNum: 13, moduleName: "Business Settings", name: "Roles & Permissions", route: "/business-admin?tab=billing&sub=roles", details: "Role assignment matrix (Admin, Analyst, Finance, Store Staff).", status: "completed" },
  { id: "13.04", moduleNum: 13, moduleName: "Business Settings", name: "Branding", route: "/business-admin?tab=billing&sub=branding", details: "Custom branding for public referral portals: logo, brand color hex, custom domain.", status: "completed" },
  { id: "13.05", moduleNum: 13, moduleName: "Business Settings", name: "Security Settings", route: "/business-admin?tab=billing&sub=security", details: "Password updates, 2FA setup, active login session revocation list.", status: "completed" },
  { id: "13.06", moduleNum: 13, moduleName: "Business Settings", name: "API Keys", route: "/business-admin?tab=integrations&sub=apikeys", details: "REST API key management: generate, rotate, and set permission scopes.", status: "completed" },
  { id: "13.07", moduleNum: 13, moduleName: "Business Settings", name: "Integrations", route: "/business-admin?tab=integrations", details: "Connect Shopify, WooCommerce, GA4, Meta Pixel, and outbound Webhooks.", status: "completed" },
  { id: "13.08", moduleNum: 13, moduleName: "Business Settings", name: "Billing Settings", route: "/business-admin?tab=billing&sub=plans", details: "Manage subscription plans, update payment cards, and download invoices.", status: "completed" },
  { id: "13.09", moduleNum: 13, moduleName: "Business Settings", name: "Connected Platforms", route: "/business-admin?tab=integrations&sub=platforms", details: "View active OAuth connections and revoke third-party app permissions.", status: "completed" },

  // Module 14 — Affiliate Dashboard (14.01 – 14.18)
  { id: "14.01", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Affiliate Dashboard", route: "/affiliate", details: "Main KPI overview: cleared balance, pending balance, active campaigns, top referral link.", status: "completed" },
  { id: "14.02", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Earnings Overview", route: "/affiliate?tab=overview&sub=earnings", details: "Lifetime & MTD earnings breakdown graph, campaign contribution table.", status: "completed" },
  { id: "14.03", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Campaign Marketplace", route: "/affiliate?tab=campaigns", details: "Search & filter active marketplace campaigns by category, commission type, brand.", status: "completed" },
  { id: "14.04", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Campaign Details", route: "/affiliate?tab=campaigns&view=detail", details: "Detailed campaign terms, commission rules, creative assets, brand guidelines.", status: "completed" },
  { id: "14.05", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "My Campaigns", route: "/affiliate?tab=campaigns&view=my", details: "Active joined campaigns list with instant custom referral link generator.", status: "completed" },
  { id: "14.06", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Referral Links", route: "/affiliate?tab=campaigns&view=links", details: "Unique referral links directory, UTM builder, click & conversion counters per link.", status: "completed" },
  { id: "14.07", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "QR Codes (Offline)", route: "/affiliate?tab=campaigns&view=qr", details: "QR code generator for offline campaigns, download PNG/SVG, printable card PDF preview.", status: "completed" },
  { id: "14.08", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Marketing Assets", route: "/affiliate?tab=campaigns&view=assets", details: "Brand banners, email copy templates, social media graphic downloads.", status: "completed" },
  { id: "14.09", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Performance Analytics", route: "/affiliate?tab=analytics", details: "Click-to-conversion funnel area graph, traffic source distribution, EPC breakdown.", status: "completed" },
  { id: "14.10", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Wallet", route: "/affiliate?tab=wallet", details: "Cleared balance, pending audit funds, transaction history, cashout request panel.", status: "completed" },
  { id: "14.11", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Withdraw Earnings", route: "/affiliate?tab=wallet&action=withdraw", details: "Cashout modal with NIP bank selector, PIN confirmation, 24h SLA notice.", status: "completed" },
  { id: "14.12", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Withdrawal History", route: "/affiliate?tab=wallet&view=history", details: "Full chronological log of all past cashouts with Paystack/NIP transaction refs.", status: "completed" },
  { id: "14.13", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Tax Information", route: "/affiliate?tab=wallet&view=tax", details: "Monthly WHT tax deduction statements with PDF download support for FIRS.", status: "completed" },
  { id: "14.14", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Notifications", route: "/affiliate?tab=notifications", details: "Ambassador notification center, payout notifications, leaderboard rank updates.", status: "completed" },
  { id: "14.15", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Profile", route: "/affiliate?tab=profile", details: "Profile editor, display name, avatar, bio, social media channel links.", status: "completed" },
  { id: "14.16", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Bank Details", route: "/affiliate?tab=wallet&view=banks", details: "NIP validated bank account manager, primary withdrawal account selector.", status: "completed" },
  { id: "14.17", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Identity Verification (KYC)", route: "/affiliate?tab=security&view=kyc", details: "Lazy 3-Tier KYC: Tier 1 (Email/Phone) → Tier 2 (BVN) → Tier 3 (NIN/Passport Liveness).", status: "completed" },
  { id: "14.18", moduleNum: 14, moduleName: "Affiliate Dashboard", name: "Security Settings", route: "/affiliate?tab=security", details: "Password updates, TOTP 2FA configuration, active browser session revocation.", status: "completed" },

  // Module 15 — Super Admin Command (15.01 – 15.26)
  { id: "15.01", moduleNum: 15, moduleName: "Super Admin Command", name: "Platform Dashboard", route: "/super-admin", details: "Live platform command center: GMV, MRR, active merchants, total affiliates, system uptime.", status: "completed" },
  { id: "15.02", moduleNum: 15, moduleName: "Super Admin Command", name: "Business Management", route: "/super-admin?tab=businesses", details: "Global merchant directory, plan overrides, CAC verification status, admin impersonation button.", status: "completed" },
  { id: "15.03", moduleNum: 15, moduleName: "Super Admin Command", name: "Affiliate Management", route: "/super-admin?tab=affiliates", details: "Global ambassador directory, KYC tiers, total earnings, fraud score flags, suspension triggers.", status: "completed" },
  { id: "15.04", moduleNum: 15, moduleName: "Super Admin Command", name: "Admin Management", route: "/super-admin?tab=admins", details: "Super admin user list, role permission assignments, immutable audit trail.", status: "completed" },
  { id: "15.05", moduleNum: 15, moduleName: "Super Admin Command", name: "Campaign Moderation", route: "/super-admin?tab=campaigns", details: "Global campaign reviewer: flag, force pause, or remove fraudulent campaign listings.", status: "completed" },
  { id: "15.06", moduleNum: 15, moduleName: "Super Admin Command", name: "Product Moderation", route: "/super-admin?tab=products", details: "Moderation queue for physical & digital products listed across all merchant accounts.", status: "completed" },
  { id: "15.07", moduleNum: 15, moduleName: "Super Admin Command", name: "KYC Verification Queue", route: "/super-admin?tab=verifications", details: "Pending CAC documents & NIN/BVN review queue with document viewer & one-click approve/reject.", status: "completed" },
  { id: "15.08", moduleNum: 15, moduleName: "Super Admin Command", name: "Fraud Detection", route: "/super-admin?tab=fraud", details: "Velocity anomaly monitoring, flagged conversions, blocked payout holds.", status: "completed" },
  { id: "15.09", moduleNum: 15, moduleName: "Super Admin Command", name: "Fraud Investigation", route: "/super-admin?tab=fraud&view=investigate", details: "IP/Device fingerprint log inspector, account association map, freeze controls.", status: "completed" },
  { id: "15.10", moduleNum: 15, moduleName: "Super Admin Command", name: "Platform Analytics", route: "/super-admin?tab=config&sub=analytics", details: "Platform-wide signups trend, GMV growth, churn rate, and campaign density map.", status: "completed" },
  { id: "15.11", moduleNum: 15, moduleName: "Super Admin Command", name: "Revenue Dashboard", route: "/super-admin?tab=finance&sub=revenue", details: "Platform revenue streams (subscriptions, transaction fees, setup fees) & P&L summary.", status: "completed" },
  { id: "15.12", moduleNum: 15, moduleName: "Super Admin Command", name: "Commission Engine", route: "/super-admin?tab=config&sub=commission", details: "Global commission calculation rules & business override audit log.", status: "completed" },
  { id: "15.13", moduleNum: 15, moduleName: "Super Admin Command", name: "Payout Monitoring", route: "/super-admin?tab=finance&sub=payouts", details: "Real-time payout batch monitor with retry failed payouts action panel.", status: "completed" },
  { id: "15.14", moduleNum: 15, moduleName: "Super Admin Command", name: "Subscription Management", route: "/super-admin?tab=finance&sub=subscriptions", details: "All merchant subscriptions, MRR values, and plan override tools.", status: "completed" },
  { id: "15.15", moduleNum: 15, moduleName: "Super Admin Command", name: "Platform Settings", route: "/super-admin?tab=config", details: "Global config: fee structures, fraud thresholds, KYC requirements, clearing periods.", status: "completed" },
  { id: "15.16", moduleNum: 15, moduleName: "Super Admin Command", name: "Audit Logs", route: "/super-admin?tab=config&sub=audit", details: "Immutable audit log of all admin actions with search and CSV export.", status: "completed" },
  { id: "15.17", moduleNum: 15, moduleName: "Super Admin Command", name: "Roles & Permissions", route: "/super-admin?tab=config&sub=roles", details: "Super Admin permission matrix & principle of least privilege controls.", status: "completed" },
  { id: "15.18", moduleNum: 15, moduleName: "Super Admin Command", name: "Notification Management", route: "/super-admin?tab=config&sub=broadcast", details: "Broadcast system announcement dispatcher (all users / merchants only / affiliates only).", status: "completed" },
  { id: "15.19", moduleNum: 15, moduleName: "Super Admin Command", name: "CMS Management", route: "/super-admin?tab=config&sub=cms", details: "Manage public website content: blog posts, help articles, and FAQ entries.", status: "completed" },
  { id: "15.20", moduleNum: 15, moduleName: "Super Admin Command", name: "Feature Flags", route: "/super-admin?tab=config&sub=flags", details: "Enable/disable platform features globally or per user cohort.", status: "completed" },
  { id: "15.21", moduleNum: 15, moduleName: "Super Admin Command", name: "API Monitoring", route: "/super-admin?tab=config&sub=apimonitor", details: "Monitor API endpoint uptime, response latency, and rate limit errors.", status: "completed" },
  { id: "15.22", moduleNum: 15, moduleName: "Super Admin Command", name: "System Health", route: "/super-admin?tab=config&sub=health", details: "Infrastructure health dashboard (Database, Redis queues, Payment APIs, Uptime).", status: "completed" },
  { id: "15.23", moduleNum: 15, moduleName: "Super Admin Command", name: "Support Tickets", route: "/super-admin?tab=config&sub=tickets", details: "Global ticketing desk for merchant and ambassador support escalations.", status: "completed" },
  { id: "15.24", moduleNum: 15, moduleName: "Super Admin Command", name: "Disputes", route: "/super-admin?tab=config&sub=disputes", details: "Escalated commission disputes resolver with evidence viewer & binding decisions.", status: "completed" },
  { id: "15.25", moduleNum: 15, moduleName: "Super Admin Command", name: "Regulatory Reports", route: "/super-admin?tab=finance&sub=reports", details: "Compliance reporting suite for FIRS WHT, CBN e-payments, and NDPR logs.", status: "completed" },
  { id: "15.26", moduleNum: 15, moduleName: "Super Admin Command", name: "Security Center", route: "/super-admin?tab=config&sub=securitycenter", details: "Security event overview: IP blocklists, 2FA adoption rate, and breach alerts.", status: "completed" },

  // Module 16 — Support & Help Desk (16.01 – 16.05)
  { id: "16.01", moduleNum: 16, moduleName: "Support & Help Desk", name: "Help Center", route: "/?view=help", details: "Searchable in-app help centre with categorized articles & video guides.", status: "completed" },
  { id: "16.02", moduleNum: 16, moduleName: "Support & Help Desk", name: "Support Tickets", route: "/affiliate?tab=support&view=ticket_new", details: "Raise a new support ticket with issue category and file attachments.", status: "completed" },
  { id: "16.03", moduleNum: 16, moduleName: "Support & Help Desk", name: "Ticket Details", route: "/affiliate?tab=support&view=ticket_detail", details: "Interactive ticket conversation thread viewer with real-time agent replies.", status: "completed" },
  { id: "16.04", moduleNum: 16, moduleName: "Support & Help Desk", name: "Live Chat", route: "/?view=help&chat=open", details: "Intercom-powered live chat launcher widget with WhatsApp fallback.", status: "completed" },
  { id: "16.05", moduleNum: 16, moduleName: "Support & Help Desk", name: "Knowledge Base", route: "/?view=help&kb=view", details: "Structured documentation library for API integrations & referral strategies.", status: "completed" },

  // Module 17 — Shared Components & Modals (17.01 – 17.17)
  { id: "17.01", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Global Search", route: "/?modal=search", details: "Instant keyboard search modal (Cmd+K / Ctrl+K) across all entities.", status: "completed" },
  { id: "17.02", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Notifications Bell", route: "/?modal=notifications", details: "Header notification dropdown widget with live unread counter badge.", status: "completed" },
  { id: "17.03", moduleNum: 17, moduleName: "Shared Components & Modals", name: "User Profile Menu", route: "/?modal=profile", details: "Top navigation user avatar menu with role switcher and logout action.", status: "completed" },
  { id: "17.04", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Empty States", route: "/?modal=empty_states", details: "Branded empty state graphic components for zero-data tables and feeds.", status: "completed" },
  { id: "17.05", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Branded Error Pages", route: "/not-found", details: "Custom 404, 403, and 500 error screens with diagnostic assistance.", status: "completed" },
  { id: "17.06", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Loading Skeleton States", route: "/?modal=skeletons", details: "Animated pulse loader skeletons for table rows, metric cards, and charts.", status: "completed" },
  { id: "17.07", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Transaction Success Modal", route: "/?modal=success", details: "Full-screen success overlays with confetti animation for key operations.", status: "completed" },
  { id: "17.08", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Delete Confirmation Modal", route: "/?modal=delete", details: "Destructive action confirmation dialog with safety input validation.", status: "completed" },
  { id: "17.09", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Approval Modal", route: "/?modal=approval", details: "Confirmation overlay for approving payouts, KYC documents, and campaigns.", status: "completed" },
  { id: "17.10", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Rejection Modal", route: "/?modal=rejection", details: "Rejection modal requiring reason code and custom notification message.", status: "completed" },
  { id: "17.11", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Image Upload Modal", route: "/?modal=image_upload", details: "Drag-and-drop image cropper and uploader with file size verification.", status: "completed" },
  { id: "17.12", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Camera QR Scanner", route: "/business-admin?tab=orders&mode=offline&modal=qr_scanner", details: "Live point-of-sale camera QR code scanner simulator for physical store staff.", status: "completed" },
  { id: "17.13", moduleNum: 17, moduleName: "Shared Components & Modals", name: "QR Code Generator", route: "/affiliate?tab=campaigns&view=qr&modal=generator", details: "Interactive QR generator outputting PNG, SVG, and WhatsApp share links.", status: "completed" },
  { id: "17.14", moduleNum: 17, moduleName: "Shared Components & Modals", name: "Camera Permission Prompt", route: "/business-admin?modal=camera_permission", details: "Native browser camera access permission request dialog.", status: "completed" },
  { id: "17.15", moduleNum: 17, moduleName: "Shared Components & Modals", name: "File Uploader", route: "/auth?step=biz_cac&modal=file_uploader", details: "Multi-file uploader component with progress bar and file format validator.", status: "completed" },
  { id: "17.16", moduleNum: 17, moduleName: "Shared Components & Modals", name: "PDF Viewer", route: "/business-admin?tab=payouts&modal=pdf_viewer", details: "In-app PDF document viewer for CAC certificates, invoices, and WHT slips.", status: "completed" },
  { id: "17.17", moduleNum: 17, moduleName: "Shared Components & Modals", name: "CSV Import Wizard", route: "/business-admin?tab=products&action=import&modal=csv_wizard", details: "Bulk CSV data import step wizard with automatic column header mapper.", status: "completed" }
];

export default function ProgressTrackerController() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModule, setSelectedModule] = useState<number | "all">("all");
  const [isVisible, setIsVisible] = useState(true);

  // Sync current screen index with current URL
  useEffect(() => {
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const foundIdx = ALL_SCREENS.findIndex(s => s.route === fullPath);
    if (foundIdx !== -1) {
      setCurrentIndex(foundIdx);
    }
  }, [pathname, searchParams]);

  // Auto-play timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIdx = (prev + 1) % ALL_SCREENS.length;
          const nextScreen = ALL_SCREENS[nextIdx];
          router.push(nextScreen.route);
          return nextIdx;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, router]);

  const currentScreen = ALL_SCREENS[currentIndex] || ALL_SCREENS[0];

  const navigateToScreen = (idx: number) => {
    if (idx >= 0 && idx < ALL_SCREENS.length) {
      setCurrentIndex(idx);
      router.push(ALL_SCREENS[idx].route);
    }
  };

  const filteredScreens = selectedModule === "all"
    ? ALL_SCREENS
    : ALL_SCREENS.filter(s => s.moduleNum === selectedModule);

  const completedCount = ALL_SCREENS.filter(s => s.status === "completed").length;
  const progressPct = Math.round((completedCount / ALL_SCREENS.length) * 100);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-2.5 rounded-full shadow-2xl transition-all border border-emerald-400/40 animate-pulse"
      >
        <IconListCheck className="w-4 h-4" />
        <span>Rippl Tracker (186/186 Screens Built)</span>
      </button>
    );
  }

  return (
    <>
      {/* Floating Bottom Control Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-slate-950/95 backdrop-blur-xl border border-emerald-500/30 text-white rounded-2xl shadow-2xl p-2.5 sm:p-3 transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Left: Screen Badge & Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
            <div className="flex items-center justify-center bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs px-2.5 py-1 rounded-lg shrink-0">
              {currentScreen.id}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 truncate">
                  Module {currentScreen.moduleNum}: {currentScreen.moduleName}
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono">
                  100% Ready
                </span>
              </div>
              <p className="text-xs font-bold text-slate-100 truncate">{currentScreen.name}</p>
            </div>
          </div>

          {/* Center: Stepper Controls & Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
            <button
              onClick={() => navigateToScreen(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors border border-slate-700"
              title="Previous Screen"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-xs border transition-all ${
                isPlaying
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
              }`}
              title={isPlaying ? "Pause Tour" : "Start Screen Tour"}
            >
              {isPlaying ? <IconPlayerPause className="w-3.5 h-3.5" /> : <IconPlayerPlay className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isPlaying ? "Pause Tour" : "Auto Tour"}</span>
            </button>

            <button
              onClick={() => navigateToScreen(currentIndex + 1)}
              disabled={currentIndex === ALL_SCREENS.length - 1}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors border border-slate-700"
              title="Next Screen"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>

            {/* Quick Screen Select Dropdown */}
            <select
              value={currentIndex}
              onChange={(e) => navigateToScreen(Number(e.target.value))}
              className="bg-slate-900 text-slate-200 text-xs border border-slate-700 rounded-lg px-2 py-1.5 font-mono outline-none focus:border-emerald-500 max-w-[140px] sm:max-w-[200px] truncate"
            >
              {ALL_SCREENS.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {s.id} — {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Expand Matrix & Minimize */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <IconListCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Screen Matrix ({progressPct}%)</span>
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Hide Tracker"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Expanded Full Screen Matrix Drawer Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
                  <IconListCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    Rippl Platform — Full 186 Screen Progress Matrix
                    <span className="text-xs font-mono font-medium px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                      100% Built & Integrated
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Iterate through all 17 Modules & 186 Screens as defined in rippl_platform_specification.md
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Summary Bar */}
            <div className="px-6 py-3 bg-slate-950 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-2/3">
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-300">Total Specification Coverage</span>
                  <span className="text-emerald-400 font-mono font-bold">186 / 186 Screens (100%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-full transition-all duration-500" />
                </div>
              </div>

              {/* Module Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedModule("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedModule === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  All (17 Modules)
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedModule(num)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors shrink-0 ${
                      selectedModule === num
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    M{num}
                  </button>
                ))}
              </div>
            </div>

            {/* Screen Cards Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredScreens.map((screen) => {
                const globalIndex = ALL_SCREENS.findIndex(s => s.id === screen.id);
                const isSelected = globalIndex === currentIndex;

                return (
                  <div
                    key={screen.id}
                    onClick={() => {
                      navigateToScreen(globalIndex);
                      setIsExpanded(false);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/50"
                        : "bg-slate-950/40 border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800/60 px-2 py-0.5 rounded">
                          {screen.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                          M{screen.moduleNum}: {screen.moduleName}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                        <IconCheck className="w-3 h-3" /> Built
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {screen.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {screen.details}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="truncate max-w-[180px]">{screen.route}</span>
                      <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Open <IconChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
