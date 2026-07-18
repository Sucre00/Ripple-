"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconBuildingBank,
  IconClock,
  IconLock,
  IconSun,
  IconMoodAngry,
  IconMoodSad,
  IconMoodNeutral,
  IconMoodSmile,
  IconMoodCrazyHappy,
  IconUsers,
  IconReportAnalytics,
  IconChevronDown,
  IconShare,
  IconSearch,
  IconCopy,
  IconCheck,
  IconDotsVertical,
  IconMaximize,
  IconAdjustmentsHorizontal,
  IconArrowUpRight,
  IconHelp,
  IconWallet,
  IconBell,
  IconUser,
  IconBriefcase,
  IconSparkles,
  IconPower
} from "@tabler/icons-react";

export default function AffiliateDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "wallet" | "analytics" | "support">("overview");
  
  // Link generation states
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Bank resolve and withdrawal states
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPin, setWithdrawPin] = useState("");
  const [savedBank, setSavedBank] = useState({ name: "Access Bank", number: "1029384756", holder: "Dwayne Tatum" });
  const [withdrawStep, setWithdrawStep] = useState<"form" | "confirm" | "success">("form");
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);

  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);

  const campaignsData = [
    { id: 1, name: "Shopify NG Campaign", brand: "Shopify NG", commission: "15%", cookie: "30 Days", type: "CPS", logo: "🛍", active: true },
    { id: 2, name: "Flutterwave Merchant Referral", brand: "Flutterwave", commission: "₦1,500 flat", cookie: "60 Days", type: "CPA", logo: "🌊", active: true },
    { id: 3, name: "PiggyVest Onboarding", brand: "PiggyVest", commission: "₦500 flat", cookie: "15 Days", type: "CPL", logo: "🐷", active: false },
    { id: 4, name: "Paystack Store Setup", brand: "Paystack", commission: "10%", cookie: "45 Days", type: "CPS", logo: "💳", active: true }
  ];

  const referralsData = [
    { id: 101, name: "Funmi Alao", campaign: "Shopify NG", amount: "₦4,500", date: "Today", status: "cleared" },
    { id: 102, name: "Chinedu Okafor", campaign: "Flutterwave", amount: "₦1,500", date: "Yesterday", status: "clearing" },
    { id: 103, name: "Tunde Bakare", campaign: "Paystack", amount: "₦2,300", date: "July 16, 2026", status: "pending" },
    { id: 104, name: "Aisha Bello", campaign: "PiggyVest", amount: "₦500", date: "July 12, 2026", status: "disputed" }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawStep === "form") {
      setWithdrawStep("confirm");
    } else if (withdrawStep === "confirm") {
      setIsProcessingWithdraw(true);
      setTimeout(() => {
        setIsProcessingWithdraw(false);
        setWithdrawStep("success");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200/50 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
              №
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">Rippl</span>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">
                Affiliate Portal
              </p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Dashboard", Icon: IconUsers },
              { id: "campaigns", label: "Marketplace", Icon: IconBriefcase },
              { id: "wallet", label: "Wallet & Cashout", Icon: IconWallet },
              { id: "analytics", label: "Analytics", Icon: IconReportAnalytics },
              { id: "support", label: "Help & Support", Icon: IconHelp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-semibold transition-all active:scale-[0.98] ${
                  activeTab === tab.id
                    ? "bg-[#e15b3e]/10 text-[#e15b3e] border border-[#e15b3e]/20"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent"
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile capsule bottom */}
        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#e15b3e] text-white flex items-center justify-center font-bold text-xs">
              DT
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-slate-800 leading-tight">Dwayne Tatum</h4>
              <p className="text-[9px] text-slate-400 font-light uppercase tracking-wider leading-tight">Tier 2 Verified</p>
            </div>
          </div>
          <Link
            href="/auth"
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 text-[10px] font-bold transition-all"
          >
            <IconPower className="w-3.5 h-3.5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
        
        {/* Top Hub Bar */}
        <header className="flex justify-between items-center pb-2 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 capitalize">
              {activeTab === "overview" ? "Performance Dashboard" : `${activeTab} Hub`}
            </h1>
            <p className="text-xs text-slate-400 font-light">Welcome back, Dwayne. Here is your platform overview.</p>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Quick Balance */}
            <div className="bg-white border border-slate-200/50 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm text-xs font-semibold text-slate-800">
              <span className="text-slate-400">Available Balance:</span>
              <span className="text-[#e15b3e]">₦81,450.00</span>
            </div>

            {/* Notifications toggle */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200/50 shadow-sm relative active:scale-95 transition-all text-slate-700"
            >
              <IconBell className="w-4 h-4" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#e15b3e]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 z-50 flex flex-col gap-3">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unread Alerts</h4>
                <div className="flex flex-col gap-2">
                  <div className="text-xs p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <p className="font-semibold text-slate-800">Payout Approved</p>
                    <p className="text-[10px] text-slate-500">Your commission of ₦4,500 has been cleared!</p>
                  </div>
                  <div className="text-xs p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <p className="font-semibold text-slate-800">PiggyVest Campaign Updated</p>
                    <p className="text-[10px] text-slate-500">The cookie window is now set to 30 Days.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic subpages rendering */}

        {/* 1. OVERVIEW SUBVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Wallet Balances Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pending Audit</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">₦125,000.00</p>
                <p className="text-[9px] text-slate-400 font-medium">Under active review checks</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Clearing Ledger</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">₦43,200.00</p>
                <p className="text-[9px] text-slate-400 font-medium">Fraud-cleared; clearing phase</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow border-l-4 border-l-[#e15b3e]">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Cleared & Available</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">₦81,450.00</p>
                <button
                  onClick={() => setActiveTab("wallet")}
                  className="mt-2 text-left text-[10px] font-semibold text-[#e15b3e] hover:underline flex items-center gap-0.5"
                >
                  Cash out now &rarr;
                </button>
              </div>
            </div>

            {/* Quick Actions Greeting */}
            <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Ready to share your links? <IconSparkles className="w-5 h-5 text-slate-600" />
                </h2>
                <p className="text-xs text-slate-400 font-light">Copy your global tracking ID or explore campaigns marketplace.</p>
              </div>
              
              <button
                onClick={() => {
                  setSelectedCampaign(campaignsData[0]);
                  setGeneratedLink("https://rippl.io/r/dwayne-shopify");
                  setShowLinkModal(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold shadow-lg shadow-[#e15b3e]/20 transition-all active:scale-95"
              >
                Generate Link
              </button>
            </div>

            {/* Grid of recent activities & statistics summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Recent Referrals list (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-slate-800">Recent Referrals activity</h3>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="text-[10px] font-semibold text-[#e15b3e] hover:underline"
                  >
                    View detailed analytics
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Referred Customer</th>
                        <th className="pb-3">Campaign</th>
                        <th className="pb-3">Commission</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralsData.map((ref) => (
                        <tr key={ref.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{ref.name}</td>
                          <td className="py-3 text-slate-500">{ref.campaign}</td>
                          <td className="py-3 font-semibold text-slate-900">{ref.amount}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                              ref.status === "cleared" ? "bg-green-50 text-green-600" :
                              ref.status === "clearing" ? "bg-blue-50 text-blue-600" :
                              ref.status === "pending" ? "bg-yellow-50 text-yellow-600" :
                              "bg-red-50 text-red-600"
                            }`}>
                              {ref.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-slate-400 font-medium">{ref.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPI metrics visual breakdown (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Micro Funnel chart */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[160px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Conversion Funnel</span>
                    <span className="text-[9px] font-semibold bg-[#fcece9] text-[#e15b3e] px-2 py-0.5 rounded-full">This MTD</span>
                  </div>
                  
                  <div className="flex items-end justify-between h-14 px-2 my-2">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-4 h-12 bg-slate-100 rounded-full relative">
                        <span className="absolute bottom-0 w-4 h-12 bg-[#e15b3e]/30 rounded-full"></span>
                      </span>
                      <span className="text-[8px] font-medium text-slate-400">Clicks (1.2k)</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-4 h-12 bg-slate-100 rounded-full relative">
                        <span className="absolute bottom-0 w-4 h-8 bg-[#e15b3e]/60 rounded-full"></span>
                      </span>
                      <span className="text-[8px] font-medium text-slate-400">Claims (430)</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-4 h-12 bg-slate-100 rounded-full relative">
                        <span className="absolute bottom-0 w-4 h-3 bg-[#e15b3e] rounded-full"></span>
                      </span>
                      <span className="text-[8px] font-medium text-slate-400">Cleared (48)</span>
                    </div>
                  </div>
                </div>

                {/* 13 Days dot matrix tracker */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[160px]">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase">
                        <IconClock className="w-3.5 h-3.5" />
                        <span>Account age status</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">13 Active Days</p>
                  </div>
                  <div className="grid grid-cols-10 gap-1.5 my-3">
                    {Array.from({ length: 30 }).map((_, index) => {
                      let isOrange = false;
                      if (index < 8) isOrange = true;
                      else if (index >= 10 && index < 15) isOrange = true;
                      return (
                        <span
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            isOrange ? "bg-[#e15b3e]" : "bg-slate-100"
                          }`}
                        ></span>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 2. CAMPAIGNS SUBVIEW */}
        {activeTab === "campaigns" && (
          <div className="flex flex-col gap-6">
            
            {/* Search and Filters bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-full md:w-80 relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter campaigns ..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                {["All Categories", "Fintech", "E-commerce", "SaaS"].map((cat, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors ${
                      i === 0 ? "bg-[#e15b3e] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Campaign grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campaignsData.map((c) => (
                <div key={c.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[220px]">
                  <div className="flex justify-between items-start">
                    <span className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">
                      {c.logo}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                      c.active ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                    }`}>
                      {c.active ? "Active" : "Apply Only"}
                    </span>
                  </div>

                  <div className="my-4">
                    <h3 className="font-semibold text-sm text-slate-800">{c.name}</h3>
                    <p className="text-[10px] text-slate-400 font-light mt-1">Cookie Window: {c.cookie}</p>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-2">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">Payout Rate</p>
                      <p className="text-xs font-semibold text-[#e15b3e] mt-0.5">{c.commission}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCampaign(c);
                        setGeneratedLink(`https://rippl.io/r/dwayne-${c.brand.toLowerCase()}`);
                        setShowLinkModal(true);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-black text-white text-[10px] font-semibold hover:bg-slate-800 transition-all"
                    >
                      Get Link
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 3. WALLET SUBVIEW */}
        {activeTab === "wallet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side: Cashout request form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px] hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-2">Request Cashout</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Cleared earnings are transferred directly to your bank.</p>
                
                {withdrawStep === "form" && (
                  <form onSubmit={handleWithdraw} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Amount (Min ₦2,000)
                      </label>
                      <input
                        type="number"
                        required
                        min="2000"
                        max="81450"
                        placeholder="₦ 5,000"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Cashout Destination
                      </label>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">🏦</span>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{savedBank.name}</p>
                            <p className="text-[10px] text-slate-400">{savedBank.number} • {savedBank.holder}</p>
                          </div>
                        </div>
                        <button type="button" className="text-[10px] font-semibold text-[#e15b3e] hover:underline">
                          Edit Bank
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1"
                    >
                      Review Cashout Request
                    </button>
                  </form>
                )}

                {withdrawStep === "confirm" && (
                  <form onSubmit={handleWithdraw} className="flex flex-col gap-4">
                    <div className="p-4 rounded-2xl bg-[#fcece9]/50 border border-[#fbdcd4] text-xs flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Gross Cashout:</span>
                        <span className="font-semibold text-slate-800">₦{Number(withdrawAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200/50 pt-2">
                        <span>WHT Withholding (5%):</span>
                        <span>- ₦{(Number(withdrawAmount) * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold text-sm border-t border-slate-200/50 pt-2">
                        <span className="text-slate-800">Net payout:</span>
                        <span className="text-[#e15b3e]">₦{(Number(withdrawAmount) * 0.95).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Enter 4-Digit Security PIN
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="••••"
                        value={withdrawPin}
                        onChange={(e) => setWithdrawPin(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 text-center tracking-widest focus:outline-none focus:border-[#e15b3e]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingWithdraw}
                      className="w-full mt-4 py-3 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      {isProcessingWithdraw ? "Processing..." : "Confirm Cashout Transfer"}
                    </button>
                  </form>
                )}

                {withdrawStep === "success" && (
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl font-bold">✓</span>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Cashout Triggered Successfully!</h4>
                      <p className="text-xs text-slate-400 font-light mt-1 max-w-xs mx-auto">
                        Your net payout is being processed via standard clearing paths to Access Bank. Estimated arrival in 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setWithdrawStep("form");
                        setWithdrawAmount("");
                        setWithdrawPin("");
                      }}
                      className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold hover:bg-slate-200"
                    >
                      Make another request
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Bank detail overview cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Linked Accounts details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-sm text-slate-800">Linked Accounts</h3>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                    <span className="text-slate-400">Standard Payout:</span>
                    <span>Access Bank</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200/40 pt-2 mt-1">
                    <span>Account Number:</span>
                    <span>1029384756</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200/40 pt-2">
                    <span>Verification:</span>
                    <span className="text-green-600 font-semibold uppercase tracking-wider text-[9px]">Verified</span>
                  </div>
                </div>
              </div>

              {/* BVN Standard KYC level notice */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2.5">
                  <IconSun className="w-5 h-5 text-[#e15b3e] shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xs text-slate-800">Standard KYC Tier 2</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                      Your identity has been verified via basic BVN records. Daily cashout limit: ₦1,000,000. Upgrade to Tier 3 for unlimited transfers.
                    </p>
                  </div>
                </div>
                <button className="w-full mt-2 py-1.5 rounded-xl bg-[#fcece9] text-[#e15b3e] text-[10px] font-semibold hover:bg-[#fbdcd4] transition-colors">
                  Upgrade Limits
                </button>
              </div>

            </div>

          </div>
        )}

        {/* 4. ANALYTICS SUBVIEW */}
        {activeTab === "analytics" && (
          <div className="flex flex-col gap-6">
            
            {/* SVG Graph 1: Click to conversion ratio */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm text-slate-800">Earning Performance History</h3>
              <div className="w-full h-44 bg-slate-50/50 border border-slate-100 p-4 rounded-2xl relative">
                <svg className="w-full h-full" viewBox="0 0 500 120">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e15b3e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#e15b3e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="1" />
                  
                  {/* Wave area graph */}
                  <path
                    d="M 10,90 Q 60,30 110,60 T 210,20 T 310,80 T 410,30 T 490,10 L 490,100 L 10,100 Z"
                    fill="url(#areaGrad)"
                  />
                  <path
                    d="M 10,90 Q 60,30 110,60 T 210,20 T 310,80 T 410,30 T 490,10"
                    fill="none"
                    stroke="#e15b3e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="110" cy="60" r="3" fill="#e15b3e" />
                  <circle cx="210" cy="20" r="3" fill="#e15b3e" />
                  <circle cx="410" cy="30" r="3" fill="#e15b3e" />
                </svg>
              </div>
            </div>

            {/* Sub-grid of split metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Traffic sources */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-xs text-slate-800 mb-4">Traffic Referral sources</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { source: "WhatsApp Channel", pct: "64%", value: "₦54,100" },
                    { source: "Twitter / X Links", pct: "22%", value: "₦18,600" },
                    { source: "Instagram Bio Redirect", pct: "14%", value: "₦8,750" }
                  ].map((src, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{src.source}</span>
                      <div className="flex items-center gap-3">
                        <span className="w-16 h-2 bg-slate-100 rounded-full relative overflow-hidden">
                          <span className="absolute left-0 top-0 bottom-0 bg-[#e15b3e] rounded-full" style={{ width: src.pct }}></span>
                        </span>
                        <span className="font-semibold text-slate-800">{src.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Retention */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-xs text-slate-800 mb-4">Conversion Success rate</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Average Click-to-Conversion:</span>
                    <span className="font-semibold text-green-600">8.2%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-slate-50 pt-3">
                    <span className="text-slate-500">Disputed/Reversed Payouts:</span>
                    <span className="font-semibold text-red-500">1.4%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 5. SUPPORT SUBVIEW */}
        {activeTab === "support" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Open tickets list (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm text-slate-800 mb-4">Your Support Tickets</h3>
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">piggyvest Commission clearing delay</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Ticket #RPL-2918 • Opened Yesterday</p>
                  </div>
                  <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full text-[8px] font-semibold uppercase tracking-wider">
                    In Progress
                  </span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Access Bank account resolve resolve</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Ticket #RPL-2894 • Closed July 14, 2026</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[8px] font-semibold uppercase tracking-wider">
                    Resolved
                  </span>
                </div>
              </div>
            </div>

            {/* Raise new ticket details form (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-2">Raise Support Ticket</h3>
                <p className="text-[10px] text-slate-400 font-light mb-4">Describe the issue and our operations team will respond inside 24 hours.</p>
                
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Delayed cashout request"
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Details</label>
                    <textarea
                      rows={3}
                      placeholder="Enter specific transaction details or links..."
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-colors">
                Submit Ticket
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Link Generator Modal Popup */}
      {showLinkModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200/50 shadow-2xl p-6 flex flex-col gap-5 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <h3 className="font-semibold text-slate-800 text-sm">Campaign referral Link</h3>
              <button
                onClick={() => setShowLinkModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shrink-0">
                {selectedCampaign.logo}
              </span>
              <div>
                <h4 className="font-semibold text-slate-800 text-xs leading-tight">{selectedCampaign.name}</h4>
                <p className="text-[9px] text-slate-400 font-medium leading-none mt-1">Payout: {selectedCampaign.commission}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">UTM Custom Referral Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 bg-black hover:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
                >
                  {copiedLink ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-green-50 border border-green-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-green-700 leading-normal mt-1">
              <span className="font-bold shrink-0">ℹ</span>
              <span>Attributions are backed by double-cookie fallback checks. Cleared payouts arrive directly inside your clearing wallet ledger.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
