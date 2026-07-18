"use client";

import React, { useState } from "react";
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
  IconStarFilled
} from "@tabler/icons-react";

export default function RipplLandingPage() {
  const [activeSegment, setActiveSegment] = useState<"merchants" | "ambassadors">("merchants");

  // ROI Calculator states
  const [conversionVolume, setConversionVolume] = useState(250);
  const [avgOrderValue, setAvgOrderValue] = useState(15000);
  const [commissionPct, setCommissionPct] = useState(10);

  // Testimonials Carousel states
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonials = [
    {
      quote: "Rippl transformed how we run influencer marketing. Payouts that used to take 30 days are now reconciled instantly. Our affiliate GMV grew by 180% in 3 months.",
      author: "Funmi Alao",
      role: "E-commerce Manager, Shopify Storefront",
      rating: 5,
      avatar: "FA"
    },
    {
      quote: "As an ambassador, trust is everything. Seeing my commissions clear in real-time and being able to cash out instantly to my bank account has changed the game.",
      author: "Dwayne Tatum",
      role: "CEO Assistant & Tech Influencer",
      rating: 5,
      avatar: "DT"
    },
    {
      quote: "The developer integrations are incredibly simple. We installed the Javascript tracking pixel in under 10 minutes, and the webhook callbacks handle dispute checks automatically.",
      author: "Chinedu Okafor",
      role: "Lead Developer, Flutterwave Merchant Partner",
      rating: 5,
      avatar: "CO"
    }
  ];

  const calculateRevenue = () => conversionVolume * avgOrderValue;
  const calculateCommissionCost = () => calculateRevenue() * (commissionPct / 100);
  const calculateNetRoi = () => calculateRevenue() - calculateCommissionCost();

  return (
    <div className="min-h-screen bg-[#edf1f5] font-sans antialiased text-slate-800 flex flex-col selection:bg-[#e15b3e]/20 selection:text-[#e15b3e]">
      
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-slate-200/40 px-6 py-4 flex items-center justify-between z-45">
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
            <a href="#features" className="hover:text-slate-800 transition-colors">Products</a>
            <a href="#referral-flow" className="hover:text-slate-800 transition-colors">How it works</a>
            <a href="#roi-simulator" className="hover:text-slate-800 transition-colors">ROI Simulator</a>
            <a href="#testimonials" className="hover:text-slate-800 transition-colors">Reviews</a>
            <Link href="/design-system" className="hover:text-slate-800 transition-colors">Design System</Link>
            <Link href="/archive-dashboard" className="text-[#e15b3e] hover:text-[#d04e32] transition-colors font-bold">Mockup Archive</Link>
          </nav>
        </div>

        {/* Auth CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Sign In
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
        <span className="px-3.5 py-1 rounded-full bg-[#fcece9] text-[#e15b3e] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse">
          <IconSparkles className="w-3.5 h-3.5" />
          Africa's dedicated Growth Infrastructure
        </span>

        {/* Hero title */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl leading-[1.15]">
          Launch People-Powered Growth. Reconcile Payments Instantly.
        </h1>

        <p className="text-sm text-slate-500 font-light max-w-xl leading-relaxed">
          Enable any business, creator, or community to scale custom referral and affiliate programs. Automated tracking pixels, progressive KYC validations, and instant wallet transfers.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/auth"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold shadow-lg shadow-[#e15b3e]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-1"
          >
            Launch Program
            <IconChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            Discover Campaigns
          </Link>
        </div>

        {/* Platform Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t border-slate-200/50 w-full max-w-lg">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <IconShieldCheck className="w-4 h-4 text-green-600" />
            <span>NDPR Data Protected</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">⚡</span>
            <span>Paystack Secured Payouts</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <IconFingerprint className="w-4 h-4 text-[#e15b3e]" />
            <span>BVN Identity Verified</span>
          </div>
        </div>
      </section>

      {/* Platform Stats Row Section */}
      <section className="px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-200/50 shadow-sm rounded-3xl p-6 md:p-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-150">
          <div className="py-4 md:py-0 md:px-4">
            <h3 className="text-3xl font-extrabold text-[#e15b3e]">₦500M+</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Payout Volume Reconciled</p>
          </div>
          <div className="py-4 md:py-0 md:px-4">
            <h3 className="text-3xl font-extrabold text-slate-900">75,000+</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Active Ambassadors</p>
          </div>
          <div className="py-4 md:py-0 md:px-4">
            <h3 className="text-3xl font-extrabold text-slate-900">99.98%</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Reconciliation Uptime SLA</p>
          </div>
        </div>
      </section>

      {/* Animated Referral Flow Illustration Section */}
      <section id="referral-flow" className="px-6 py-12 max-w-5xl mx-auto w-full text-center space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">How the Rippl Loop Works</h2>
          <p className="text-xs text-slate-400 font-light mt-1">Seamless attributions from copyable links to cashouts.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center gap-3 relative z-10">
            <span className="w-12 h-12 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center font-bold text-lg">
              1
            </span>
            <h4 className="font-semibold text-slate-800 text-xs">Share custom link</h4>
            <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed">
              Ambassadors generate and copy unique UTM links directly from their dashboard.
            </p>
          </div>

          {/* Connected SVG arrow/line */}
          <div className="hidden md:block absolute left-[28%] top-[40%] w-[15%] h-8 pointer-events-none">
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 20">
              <path d="M 0 10 Q 50 20 100 10" stroke="#e15b3e" strokeWidth="2" strokeDasharray="4" className="animate-[dash_10s_linear_infinite]" />
              <polygon points="98,10 90,6 92,10 90,14" fill="#e15b3e" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center gap-3 relative z-10">
            <span className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg">
              2
            </span>
            <h4 className="font-semibold text-slate-800 text-xs">Checkout tracking</h4>
            <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed">
              The merchant storefront pixel triggers, matching referred sales dynamically.
            </p>
          </div>

          {/* Connected SVG arrow/line 2 */}
          <div className="hidden md:block absolute left-[62%] top-[40%] w-[15%] h-8 pointer-events-none">
            <svg className="w-full h-full" fill="none" viewBox="0 0 100 20">
              <path d="M 0 10 Q 50 20 100 10" stroke="#e15b3e" strokeWidth="2" strokeDasharray="4" className="animate-[dash_10s_linear_infinite]" />
              <polygon points="98,10 90,6 92,10 90,14" fill="#e15b3e" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center gap-3 relative z-10">
            <span className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              3
            </span>
            <h4 className="font-semibold text-slate-800 text-xs">Instant Cashout</h4>
            <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed">
              Reserves clear into the wallet, ready to cash out directly to the bank.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Segment Product Features Preview */}
      <section id="features" className="px-6 py-12 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Segment selection buttons */}
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
            For Merchants
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
            For Ambassadors
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {activeSegment === "merchants" ? (
            <>
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center text-lg">
                  <IconFileCode className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Developer Integrations</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Install tracking pixels or trigger conversion webhooks securely to attribute referred customer purchases.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
                  <IconReportAnalytics className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Commission Rule Builder</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Define custom percentage rewards or flat referral bonuses with seasonal cookie lifetimes and clearance buffers.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
                  <IconShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Anti-Fraud Engine</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Reconcile attributions automatically with double-cookie checks, IP logs tracking, and device fingerprints.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center text-lg">
                  <IconBuildingBank className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Instant Bank Cashouts</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Withdraw cleared available earnings directly to standard bank accounts in seconds.
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
                  <IconShare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">One-Click Link Sharing</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Generate short UTM referral codes with unique visual QR codes. Share directly on WhatsApp and Twitter.
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow min-h-[220px] flex flex-col justify-between">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
                  <IconSun className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">BVN Identity Safeguards</h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    Progressive KYC validations ensure payouts comply with emerging markets AML requirements.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* Interactive ROI Calculator Simulator */}
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

      {/* Customer Testimonials Carousel Section */}
      <section id="testimonials" className="px-6 py-12 max-w-5xl mx-auto w-full text-center space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">What Our Partners Say</h2>
          <p className="text-xs text-slate-400 font-light mt-1">Reviews from merchants and brand ambassadors building with Rippl.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm p-8 max-w-2xl mx-auto flex flex-col gap-6 relative">
          <span className="absolute -top-6 left-8 text-6xl text-[#e15b3e]/10 font-serif pointer-events-none select-none">“</span>
          
          <p className="text-sm text-slate-600 font-light italic leading-relaxed">
            {testimonials[testimonialIdx].quote}
          </p>

          <div className="flex justify-center items-center gap-1.5 text-amber-400">
            {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
              <IconStarFilled key={i} className="w-4 h-4" />
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center font-bold text-xs">
                {testimonials[testimonialIdx].avatar}
              </span>
              <div className="text-left">
                <h4 className="text-xs font-semibold text-slate-800 leading-tight">
                  {testimonials[testimonialIdx].author}
                </h4>
                <p className="text-[9px] text-slate-400 leading-none mt-0.5">
                  {testimonials[testimonialIdx].role}
                </p>
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                &larr;
              </button>
              <button
                onClick={() => setTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Multi-Column SaaS Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200/40 pt-16 pb-8 px-6 md:px-12 flex flex-col gap-10 text-xs text-slate-500 font-medium">
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
            <Link href="/design-system" className="hover:text-slate-900 transition-colors">Design System</Link>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-3 text-left">
            <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company</h4>
            <a href="#" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Careers</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Blog & News</a>
            <Link href="/archive-dashboard" className="hover:text-slate-900 transition-colors">Mockup Archive</Link>
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
          <span className="shrink-0">&copy; 2026 Rippl Inc. All rights reserved.</span>
        </div>
      </footer>

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
