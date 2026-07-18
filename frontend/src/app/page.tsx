"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  IconBuildingBank,
  IconClock,
  IconLock,
  IconSun,
  IconUsers,
  IconReportAnalytics,
  IconChevronDown,
  IconShare,
  IconSearch,
  IconCopy,
  IconCheck,
  IconArrowUpRight,
  IconBriefcase,
  IconSparkles,
  IconFingerprint,
  IconFileCode,
  IconShieldCheck,
  IconChevronRight,
  IconArrowRight,
  IconMessage,
  IconQuote,
  IconStarFilled,
  IconAlertCircle,
  IconX,
  IconChecks,
  IconCreditCard,
  IconWallet
} from "@tabler/icons-react";

export default function RipplLandingPage() {
  const [activeSegment, setActiveSegment] = useState<"merchants" | "ambassadors">("merchants");

  // ROI Calculator states
  const [conversionVolume, setConversionVolume] = useState(250);
  const [avgOrderValue, setAvgOrderValue] = useState(15000);
  const [commissionPct, setCommissionPct] = useState(10);

  // Testimonials Split Tabs Carousel (Business vs Affiliate tabs)
  const [testimonialTab, setTestimonialTab] = useState<"business" | "affiliate">("business");
  const [bTestimonialIdx, setBTestimonialIdx] = useState(0);
  const [aTestimonialIdx, setATestimonialIdx] = useState(0);

  const businessTestimonials = [
    {
      quote: "Rippl cut our affiliate payout cycle from 60 days to 1. Payouts that used to take 30 days are now reconciled instantly. Our affiliate GMV grew by 180% in 3 months.",
      author: "Funmi Alao",
      role: "E-commerce Manager, Shopify Storefront",
      rating: 5,
      avatar: "FA"
    },
    {
      quote: "The developer integrations are incredibly simple. We installed the Javascript tracking pixel in under 10 minutes, and the webhook callbacks handle dispute checks automatically.",
      author: "Chinedu Okafor",
      role: "Lead Developer, Flutterwave Merchant Partner",
      rating: 5,
      avatar: "CO"
    }
  ];

  const affiliateTestimonials = [
    {
      quote: "As an ambassador, trust is everything. Seeing my commissions clear in real-time and being able to cash out instantly to my bank account has changed the game.",
      author: "Dwayne Tatum",
      role: "CEO Assistant & Tech Influencer",
      rating: 5,
      avatar: "DT"
    },
    {
      quote: "I've tried different networks, but Rippl's lazy KYC setup and instant 24h bank transfers keep my income steady and highly predictable.",
      author: "Amina Yusuf",
      role: "Lifestyle Blogger & Creator",
      rating: 5,
      avatar: "AY"
    }
  ];

  // Pricing Teaser states
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  // Exit intent popup state
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitSubmitted, setExitSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 30) {
        const hasSeen = localStorage.getItem("seen_exit_intent");
        if (!hasSeen) {
          setShowExitIntent(true);
          localStorage.setItem("seen_exit_intent", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // NDPR Cookie Banner states
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleCookieConsent = (accepted: boolean) => {
    localStorage.setItem("cookie_consent", accepted ? "accepted" : "declined");
    setShowCookieBanner(false);
  };

  const calculateRevenue = () => conversionVolume * avgOrderValue;
  const calculateCommissionCost = () => calculateRevenue() * (commissionPct / 100);
  const calculateNetRoi = () => calculateRevenue() - calculateCommissionCost();

  return (
    <div className="min-h-screen bg-[#edf1f5] font-sans antialiased text-slate-800 flex flex-col selection:bg-[#e15b3e]/20 selection:text-[#e15b3e] relative">
      
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-slate-200/40 px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
              №
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">Rippl</span>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">
                Growth Infra
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500">
            <a href="#features" className="hover:text-slate-800 transition-colors">Product</a>
            <a href="#roi-simulator" className="hover:text-slate-800 transition-colors">ROI Simulator</a>
            <a href="#pricing" className="hover:text-slate-800 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-800 transition-colors">FAQs</a>
          </nav>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Log In
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2.5 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center flex flex-col items-center gap-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#e15b3e]/5 blur-3xl -z-10 pointer-events-none"></div>

        {/* Pill highlight */}
        <span className="px-3.5 py-1 rounded-full bg-[#fcece9] text-[#e15b3e] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          <IconSparkles className="w-3.5 h-3.5 animate-pulse" />
          Africa's dedicated Growth Infrastructure
        </span>

        {/* Hero title */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl leading-[1.15]">
          Turn every customer into a growth channel.
        </h1>

        <p className="text-sm text-slate-500 font-light max-w-xl leading-relaxed">
          Rippl is the referral and affiliate infrastructure built for Nigerian businesses — trackable links, instant payouts, zero spreadsheets.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/auth"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold shadow-lg shadow-[#e15b3e]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-1"
          >
            Start a Campaign
            <IconChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            Become an Affiliate
          </Link>
        </div>

        {/* Trust Anchors Badges with CBN and NDPR Elevated */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t border-slate-200/50 w-full max-w-xl">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <IconShieldCheck className="w-4 h-4 text-green-600" />
            <span>NDPR Data Protected</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-600"><IconSparkles className="w-3.5 h-3.5 text-[#e15b3e]" /></span>
            <span>Paystack Secured Payouts</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <IconFingerprint className="w-4 h-4 text-[#e15b3e]" />
            <span>BVN Identity Verified</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="px-2 py-0.5 bg-slate-200/60 rounded text-[9px] text-slate-600 font-extrabold">CBN Compliant</span>
          </div>
        </div>
      </section>

      {/* Social Proof Client Logo strip */}
      <section className="px-6 py-6 border-y border-slate-200/40 bg-white/40 backdrop-blur-sm w-full">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trusted by 200+ Nigerian businesses</span>
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold text-slate-400 tracking-wider">
            <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-default"><IconCreditCard className="w-3.5 h-3.5 text-slate-400" /> paystack</span>
            <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-default"><IconBuildingBank className="w-3.5 h-3.5 text-slate-400" /> flutterwave</span>
            <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-default"><IconWallet className="w-3.5 h-3.5 text-slate-400" /> piggyvest</span>
            <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-default"><IconBriefcase className="w-3.5 h-3.5 text-slate-400" /> shopify ng</span>
            <span className="flex items-center gap-1 hover:text-slate-600 transition-colors cursor-default"><IconShieldCheck className="w-3.5 h-3.5 text-slate-400" /> dojah nodes</span>
          </div>
        </div>
      </section>

      {/* Redesigned Agitation Block: Stark Old Way vs Rippl Way Split (Section 4) */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full text-center space-y-10">
        <div>
          <span className="px-3 py-1 bg-[#fcece9] text-[#e15b3e] text-[9px] font-bold rounded-full uppercase tracking-wider">The Comparison</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-2.5">The Growth Bottleneck</h2>
          <p className="text-xs text-slate-450 font-light mt-1 max-w-md mx-auto">Manual sheets kill trust. Rippl's automated clearing layers keep your brand ambassadors motivated.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Old Way (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 border border-slate-200/50 flex flex-col justify-between gap-6 relative overflow-hidden text-left shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100/50 rounded-full blur-2xl"></div>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-red-50 text-red-650 flex items-center justify-center">
                  <IconX className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">Old Way</span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Manual WhatsApp & Excel Sheets</h3>
              
              <div className="space-y-3.5 pt-1 text-[11px] text-slate-500 font-light leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-red-550 mt-0.5">•</span>
                  <p>Reconciling referred orders on spreadsheets takes weeks of manual reviews.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-550 mt-0.5">•</span>
                  <p>Affiliates get zero transparency on conversion statuses, creating friction.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-550 mt-0.5">•</span>
                  <p>Fails to block duplicate self-referrals or device-fingerprint spoofing.</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-mono text-slate-400 text-center relative z-10">
              [ spreadsheet_attributions_v2.xlsx ]
            </div>
          </div>

          {/* Rippl Way (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 border border-[#e15b3e]/20 shadow-xl shadow-slate-200/50 flex flex-col justify-between gap-6 relative overflow-hidden text-left border-l-4 border-l-[#e15b3e]">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#fcece9]/20 rounded-full blur-3xl"></div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center">
                  <IconSparkles className="w-4 h-4 animate-pulse" />
                </span>
                <span className="text-[10px] font-bold text-[#e15b3e] uppercase tracking-wider bg-[#fcece9] px-2.5 py-0.5 rounded-full">Rippl Way</span>
              </div>
              
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Automated, Secure Infrastructure</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-3.5 text-[11px] text-slate-500 font-light leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><IconCheck className="w-2.5 h-2.5" /></span>
                    <p>Lightweight cookie-pixels attribute checkouts instantly.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><IconCheck className="w-2.5 h-2.5" /></span>
                    <p>Real-time analytics portal shows conversion states.</p>
                  </div>
                </div>
                
                <div className="space-y-3.5 text-[11px] text-slate-500 font-light leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><IconCheck className="w-2.5 h-2.5" /></span>
                    <p>Fraud engine blocks self-referral IP matching loops.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><IconCheck className="w-2.5 h-2.5" /></span>
                    <p>Deposited reserves settle cashouts in &lt;24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#fcece9]/40 border border-[#fbdcd4]/40 rounded-2xl flex items-center justify-between relative z-10">
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Wallet Cleared Reserves</p>
                <p className="text-lg font-extrabold text-slate-900 mt-1 leading-none">₦81,450.00</p>
              </div>
              <span className="px-3.5 py-1.5 bg-black text-white text-[9px] font-bold rounded-xl shadow-sm uppercase tracking-wider flex items-center gap-1">
                <IconShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Audience Segmented How It Works (Section 5) */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Toggle selectors */}
        <div className="flex bg-white/60 backdrop-blur-sm border border-slate-200/40 p-1.5 rounded-full max-w-md mx-auto shadow-sm">
          <button
            onClick={() => setActiveSegment("merchants")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeSegment === "merchants"
                ? "bg-black text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <IconBriefcase className="w-4 h-4" />
            For Businesses
          </button>
          <button
            onClick={() => setActiveSegment("ambassadors")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeSegment === "ambassadors"
                ? "bg-black text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <IconUsers className="w-4 h-4" />
            For Affiliates
          </button>
        </div>

        {/* Step-by-step visual roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeSegment === "merchants" ? (
            <>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Install Pixel</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Embed our lightweight tracking script on checkout pages to capture referrals automatically.</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-slate-150 text-slate-700 flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Set Commission</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Set flat rates or percentages per conversion type, cookie periods, and clearance rules.</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-slate-150 text-slate-700 flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Approve Payouts</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Fund reserve balances to trigger automated, fraud-aware payments directly to bank details.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Sign Up</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Browse verified brand campaigns on the marketplace. Sign up easily with no upfront fees.</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-slate-150 text-slate-700 flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Share Link</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Generate unique UTM affiliate links and tracking banners to share with your audience.</p>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between min-h-[180px]">
                <span className="w-10 h-10 rounded-full bg-slate-150 text-slate-700 flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs mt-4">Get Paid</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-1 leading-relaxed">Request payments to bank details. Funds transfer instantly within 24 hours.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Outcome Framed Feature Highlights (Section 7) */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full space-y-12">
        {/* Highlight 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-left">
            <span className="px-3 py-1 bg-[#fcece9] text-[#e15b3e] text-[9px] font-bold rounded-full uppercase tracking-wider">Fast Liquidity</span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">Affiliates paid in &lt;24h, not 90 days</h3>
            <p className="text-xs text-slate-450 font-light leading-relaxed">
              We eliminate traditional clearing delays. Once merchants approve conversions, funds resolve directly into available balances, letting ambassadors withdraw bank transfers instantly.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm min-h-[150px] flex items-center justify-center text-center">
            <div>
              <p className="text-4xl font-extrabold text-[#e15b3e]">Instant</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Payout Resolution Uptime</p>
            </div>
          </div>
        </div>

        {/* Highlight 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 space-y-4 text-left">
            <span className="px-3 py-1 bg-slate-100 text-slate-750 text-[9px] font-bold rounded-full uppercase tracking-wider">Secure Safeguards</span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">BVN-verified, IP-scored, self-referral blocked automatically</h3>
            <p className="text-xs text-slate-450 font-light leading-relaxed">
              Our embedded anti-fraud engine performs device fingerprint checks, logs geo IP scopes, and triggers progressive KYC lookups to protect businesses from self-referral leakage.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm min-h-[150px] flex items-center justify-center text-center">
            <div>
              <p className="text-4xl font-extrabold text-slate-900">0%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Duplicate Referral Tolerance</p>
            </div>
          </div>
        </div>

        {/* Highlight 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-left">
            <span className="px-3 py-1 bg-slate-100 text-slate-750 text-[9px] font-bold rounded-full uppercase tracking-wider">Real-time Tracking</span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">See every click, every conversion, live</h3>
            <p className="text-xs text-slate-450 font-light leading-relaxed">
              No more manual guesswork or data reconciliation tables. Our cookie pixel tracks referred actions instantly and sends real-time attribution details straight to your merchant dashboard.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm min-h-[150px] flex items-center justify-center text-center">
            <div>
              <p className="text-4xl font-extrabold text-slate-900">Live</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Attribution Sync Latency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI / Earnings Calculator (Section 6) */}
      <section id="roi-simulator" className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-xl p-8 flex flex-col lg:flex-row items-stretch gap-8">
          
          {/* Left panel: Control sliders (7 Cols) */}
          <div className="flex-1 flex flex-col gap-5 justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-800 mb-1">Growth & ROI Simulator</h3>
              <p className="text-xs text-slate-400 font-light">Estimate your monthly referral sales volume and compare commission costs.</p>
            </div>

            <div className="space-y-5">
              {/* Slider 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span className="text-slate-400">Monthly Referred Conversions:</span>
                  <span className="text-[#e15b3e]">{conversionVolume} sales</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={conversionVolume}
                  onChange={(e) => setConversionVolume(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#e15b3e]"
                />
              </div>

              {/* Slider 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span className="text-slate-400">Average Order Value (AOV):</span>
                  <span className="text-[#e15b3e]">₦{avgOrderValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#e15b3e]"
                />
              </div>

              {/* Slider 3 */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                  <span className="text-slate-400">Commission Rate (%):</span>
                  <span className="text-[#e15b3e]">{commissionPct}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={commissionPct}
                  onChange={(e) => setCommissionPct(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#e15b3e]"
                />
              </div>
            </div>
          </div>

          {/* Right panel: Financial projections (5 Cols) */}
          <div className="w-full lg:w-80 rounded-3xl p-6 bg-slate-50 border border-slate-100 flex flex-col justify-between gap-6 shrink-0">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Projections</h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Gross Referral Sales:</span>
                <span className="font-semibold text-slate-800">₦{calculateRevenue().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-200/40 pt-3">
                <span className="text-slate-500">Commissions Owed:</span>
                <span className="font-semibold text-[#e15b3e]">₦{calculateCommissionCost().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold border-t border-slate-200/40 pt-3">
                <span className="text-slate-800">Net Business profit:</span>
                <span className="text-green-600">₦{calculateNetRoi().toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/auth"
              className="w-full py-3 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-semibold text-center transition-all active:scale-[0.97]"
            >
              Start Free Trial
            </Link>
          </div>

        </div>
      </section>

      {/* Deeper Social Proof split tab testimonials (Section 9) */}
      <section id="testimonials" className="px-6 py-12 max-w-5xl mx-auto w-full text-center space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Objection Handling Stories</h2>
          <p className="text-xs text-slate-400 font-light mt-1">Select standard tabs to review specific user feedback.</p>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Testimonial tabs selector */}
          <div className="flex border-b border-slate-200/50 justify-center gap-6">
            <button
              onClick={() => setTestimonialTab("business")}
              className={`pb-2.5 text-xs font-bold transition-all ${
                testimonialTab === "business" ? "border-b-2 border-b-[#e15b3e] text-[#e15b3e]" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              For Businesses
            </button>
            <button
              onClick={() => setTestimonialTab("affiliate")}
              className={`pb-2.5 text-xs font-bold transition-all ${
                testimonialTab === "affiliate" ? "border-b-2 border-b-[#e15b3e] text-[#e15b3e]" : "text-slate-450 hover:text-slate-700"
              }`}
            >
              For Affiliates
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm p-8 flex flex-col gap-6 relative text-left">
            <span className="absolute -top-6 left-8 text-6xl text-[#e15b3e]/10 font-serif pointer-events-none select-none">“</span>
            
            <p className="text-xs text-slate-600 font-light italic leading-relaxed">
              {testimonialTab === "business" 
                ? businessTestimonials[bTestimonialIdx].quote
                : affiliateTestimonials[aTestimonialIdx].quote}
            </p>

            <div className="flex items-center gap-1.5 text-amber-450">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarFilled key={i} className="w-3.5 h-3.5" />
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center font-extrabold text-xs">
                  {testimonialTab === "business" 
                    ? businessTestimonials[bTestimonialIdx].avatar
                    : affiliateTestimonials[aTestimonialIdx].avatar}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {testimonialTab === "business" 
                      ? businessTestimonials[bTestimonialIdx].author
                      : affiliateTestimonials[aTestimonialIdx].author}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">
                    {testimonialTab === "business" 
                      ? businessTestimonials[bTestimonialIdx].role
                      : affiliateTestimonials[aTestimonialIdx].role}
                  </p>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    if (testimonialTab === "business") {
                      setBTestimonialIdx((prev) => (prev > 0 ? prev - 1 : businessTestimonials.length - 1));
                    } else {
                      setATestimonialIdx((prev) => (prev > 0 ? prev - 1 : affiliateTestimonials.length - 1));
                    }
                  }}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  &larr;
                </button>
                <button
                  onClick={() => {
                    if (testimonialTab === "business") {
                      setBTestimonialIdx((prev) => (prev < businessTestimonials.length - 1 ? prev + 1 : 0));
                    } else {
                      setATestimonialIdx((prev) => (prev < affiliateTestimonials.length - 1 ? prev + 1 : 0));
                    }
                  }}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section (Section 10) - Redesigned based on pricing section inspo.png */}
      <section id="pricing" className="px-6 py-16 max-w-5xl mx-auto w-full text-center space-y-8">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-bold text-[#e15b3e] uppercase tracking-widest flex items-center gap-1">
            ✦ Pricing Plans
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Flexible SaaS Pricing Packages</h2>
          <p className="text-xs text-slate-450 font-light max-w-xs mx-auto">Choose the right plan for your team to scale referrals.</p>
        </div>

        {/* Pricing cycle selector toggle switch */}
        <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200/50 max-w-[220px] mx-auto shadow-inner">
          <button
            onClick={() => setBillingCycle("annually")}
            className={`px-6 py-1.5 text-[10px] font-bold rounded-full transition-all ${
              billingCycle === "annually" ? "bg-[#e15b3e] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-1.5 text-[10px] font-bold rounded-full transition-all ${
              billingCycle === "monthly" ? "bg-[#e15b3e] text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Pricing packages cards in a 3-column matrix grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
          
          {/* Card 1: Starter Plan */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Top section */}
            <div className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Starter Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  Perfect for startups looking to launch custom referral campaigns.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦15,000" : "₦12,750"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98]"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            {/* Bottom section */}
            <div className="p-6 bg-slate-50 text-left border-t border-slate-200/50 flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                {[
                  "Up to 50 active affiliates",
                  "Basic click & conversion logs",
                  "Standard email support",
                  "Paystack payment clearances"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Growth Plan (Highlighted Center Card) */}
          <div className="rounded-3xl border-2 border-[#e15b3e] shadow-xl flex flex-col justify-between overflow-hidden relative">
            {/* Top section with grid pattern overlay background */}
            <div 
              style={{
                backgroundImage: 'linear-gradient(to right, #fcece9 1px, transparent 1px), linear-gradient(to bottom, #fcece9 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
              className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white relative overflow-hidden"
            >
              <div className="space-y-1 relative z-10">
                <h4 className="font-extrabold text-slate-900 text-sm">Growth Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  Best for growing businesses that need deeper insights.
                </p>
              </div>
              <div className="mt-4 space-y-4 relative z-10">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦45,000" : "₦38,250"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98] shadow-md shadow-[#e15b3e]/10"
                >
                  Get Started
                </Link>
              </div>
            </div>
            {/* Bottom section (Solid brand orange background) */}
            <div className="p-6 bg-[#e15b3e] text-left flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-[#fcece9] uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-white font-medium">
                {[
                  "Up to 500 active affiliates",
                  "Unlimited campaign programs",
                  "Up to ₦10M monthly payouts",
                  "Standard double-cookie checks",
                  "BVN progressive KYC validation"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-white shrink-0" />
                    <span className="text-[10px] text-[#fcece9] font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Pro Enterprise Plan */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Top section */}
            <div className="p-6 text-left flex flex-col justify-between min-h-[220px] bg-white">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-900 text-sm">Business Plan</h4>
                <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                  Ideal for scaling companies that need full control and automation.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-3xl font-extrabold text-slate-950 leading-none">
                  {billingCycle === "monthly" ? "₦150,000" : "₦127,500"}{" "}
                  <span className="text-[10px] text-slate-400 font-light">/month</span>
                </p>
                <Link
                  href="/auth"
                  className="w-full block py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold text-center rounded-xl transition-all active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            </div>
            {/* Bottom section */}
            <div className="p-6 bg-slate-50 text-left border-t border-slate-200/50 flex-grow flex flex-col gap-4">
              <h5 className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Includes:</h5>
              <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                {[
                  "Everything in Growth Plan",
                  "Dedicated account manager",
                  "Custom webhook event selectors",
                  "Extended SLA uptime guarantee",
                  "FIRS, CBN, and NDPR tax exports"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section (Section 11) */}
      <section id="faq" className="px-6 py-12 max-w-2xl mx-auto w-full space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Pre-Emptive Support FAQ</h2>
          <p className="text-xs text-slate-400 font-light mt-1">Objection handling queries answered instantly.</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "Is this legal and compliant in Nigeria?", a: "Yes. Rippl is fully NDPR data compliant and operates payout clearances securely integrated with licensed central platforms." },
            { q: "How fast do affiliates receive cashouts?", a: "Affiliates receive bank cashout transfers instantly in under 24 hours once merchant approvals clear pending buffers." },
            { q: "What if someone tries to cheat the system?", a: "Our system performs double-cookie tests, device fingerprint matching, and logs IP details to suspend fraudulent attributions automatically." },
            { q: "Can I upgrade or downgrade my plan?", a: "Yes. You can manage subscription plans, change billing preferences, or download invoices directly from Billing." },
            { q: "What integration methods are supported?", a: "We support a lightweight web SDK tracking pixel, custom API attribution webhooks, and popular platform plugins (Shopify and WooCommerce)." },
            { q: "Are there any hidden payout or transaction fees?", a: "None. Affiliates cash out cleared earnings directly to local banks with standard processing fees. Businesses only pay their selected monthly subscription and defined payouts." }
          ].map((faq, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200/50 rounded-2xl text-xs">
              <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="text-red-550">Q.</span> {faq.q}
              </h4>
              <p className="text-slate-500 font-light mt-1.5 leading-relaxed pl-4 border-l border-slate-150">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Multi-Column SaaS Footer (Section 13) */}
      <footer className="mt-auto bg-white border-t border-slate-200/40 pt-16 pb-8 px-6 md:px-12 flex flex-col gap-10 text-xs text-slate-500 font-medium z-30">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info (Double width on desktop) */}
          <div className="col-span-2 space-y-4 text-left">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                №
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">Rippl</span>
            </Link>
            <p className="text-[11px] text-slate-400 font-light max-w-xs leading-relaxed">
              Nigeria & emerging market's first growth and rewards infrastructure. Empowering brands to launch automated, fraud-aware referral channels.
            </p>
            <div className="flex gap-2.5 pt-1">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-wider">NDPR</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-wider">CBN Guideline</span>
              <span className="px-2 py-0.5 rounded-full bg-[#fcece9] text-[8px] font-bold text-[#e15b3e] uppercase tracking-wider">Paystack Partner</span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Products</h4>
            <Link href="/auth" className="hover:text-slate-900 transition-colors">For Merchants</Link>
            <Link href="/auth" className="hover:text-slate-900 transition-colors">For Ambassadors</Link>
            <a href="#roi-simulator" className="hover:text-slate-900 transition-colors">ROI Simulator</a>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company</h4>
            <a href="#" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Careers</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Blog & News</a>
          </div>

          {/* Column 4: Help & Legal */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trust & Legal</h4>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GDPR & Cookies</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Compliance reports</a>
          </div>

        </div>

        {/* Bottom Partnership Bar */}
        <div className="max-w-5xl mx-auto w-full border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] text-slate-400 leading-relaxed font-medium">
          <p className="max-w-md">
            Payment processing services are securely provided by Paystack and Flutterwave, licensed by the Central Bank of Nigeria (CBN). Rippl is NDPR compliant and operates under strict anti-money laundering frameworks.
          </p>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span>&copy; 2026 Rippl Inc. All rights reserved.</span>
            <a href="https://wa.me/2348000000000" className="text-[#e15b3e] font-bold hover:underline flex items-center gap-1 text-[9px] uppercase tracking-wider">
              <IconMessage className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </footer>

      {/* Exit Intent Capturer modal popup (Section 12) */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-[2rem] border border-slate-200 shadow-2xl p-6 relative flex flex-col gap-4 animate-in zoom-in duration-200">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute right-4 top-4 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <IconX className="w-3.5 h-3.5" />
            </button>

            <span className="w-10 h-10 rounded-xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center text-lg">
              <IconFileCode className="w-5 h-5" />
            </span>

            <div className="text-left space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Grow Your Referral Channel</h3>
              <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                Download the free <strong>Affiliate Program Starter Guide</strong>. Learn how to recruit your first 100 ambassadors and set optimal commission rules.
              </p>
            </div>

            {exitSubmitted ? (
              <div className="p-3 bg-green-50 border border-green-200/50 rounded-xl text-[10px] text-green-700 font-semibold text-center flex items-center justify-center gap-1.5">
                <IconChecks className="w-4 h-4" /> Download link sent to your inbox!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setExitSubmitted(true);
                  setTimeout(() => setShowExitIntent(false), 2500);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={exitEmail}
                  onChange={(e) => setExitEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#e15b3e]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                >
                  Send Free Guide
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* NDPR Cookie Consent Banner popup (Section 12.1) */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white border border-slate-200 shadow-2xl rounded-3xl p-5 z-50 flex flex-col gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="text-left space-y-1">
            <h4 className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
              <IconAlertCircle className="w-4 h-4 text-[#e15b3e]" />
              Cookie Privacy Consent
            </h4>
            <p className="text-[10px] text-slate-400 font-light leading-relaxed">
              Rippl uses cookies to attribute referred conversions and secure account sessions compliant with Nigerian NDPR policies.
            </p>
          </div>
          <div className="flex gap-2 text-[10px] font-bold">
            <button
              onClick={() => handleCookieConsent(true)}
              className="flex-1 py-2 bg-black hover:bg-slate-800 text-white rounded-xl"
            >
              Accept All
            </button>
            <button
              onClick={() => handleCookieConsent(false)}
              className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl"
            >
              Preferences
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for keyframe stroke-dash animations */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>

    </div>
  );
}
