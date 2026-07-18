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
  IconDotsVertical,
  IconMaximize,
  IconAdjustmentsHorizontal,
  IconArrowUpRight,
  IconHelp,
  IconWallet,
  IconBell,
  IconBriefcase,
  IconSparkles,
  IconPower,
  IconFileCode,
  IconShieldCheck,
  IconTrash
} from "@tabler/icons-react";

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "affiliates" | "settings">("overview");

  // Campaign creation wizard states
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [commRate, setCommRate] = useState("10");
  const [cookieDays, setCookieDays] = useState("30");
  const [commType, setCommType] = useState<"percentage" | "flat">("percentage");

  // Merchant campaigns database
  const [merchantCampaigns, setMerchantCampaigns] = useState([
    { id: 1, name: "Shopify Storefront Launch", conversions: 430, revenue: "₦4,300,000", cost: "₦645,000", status: "Active" },
    { id: 2, name: "WooCommerce Affiliate Program", conversions: 88, revenue: "₦880,000", cost: "₦88,000", status: "Active" },
    { id: 3, name: "Influencer Winter Clearance", conversions: 0, revenue: "₦0", cost: "₦0", status: "Draft" }
  ]);

  // Affiliates list database
  const [affiliatesList, setAffiliatesList] = useState([
    { id: 1, name: "Dwayne Tatum", conversions: 124, revenue: "₦1,240,000", epc: "₦1,500", fraudScore: 12, status: "Active" },
    { id: 2, name: "Funmi Alao", conversions: 87, revenue: "₦870,000", epc: "₦2,100", fraudScore: 28, status: "Active" },
    { id: 3, name: "Chinedu Okafor", conversions: 42, revenue: "₦420,000", epc: "₦880", fraudScore: 78, status: "Flagged" },
    { id: 4, name: "Aisha Bello", conversions: 18, revenue: "₦180,000", epc: "₦1,200", fraudScore: 8, status: "Active" }
  ]);

  // Notification states
  const [walletBalance, setWalletBalance] = useState(420000);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign = {
      id: merchantCampaigns.length + 1,
      name: campaignName,
      conversions: 0,
      revenue: "₦0",
      cost: "₦0",
      status: "Active"
    };
    setMerchantCampaigns([...merchantCampaigns, newCampaign]);
    setShowWizard(false);
    setWizardStep(1);
    setCampaignName("");
    setTargetUrl("");
  };

  const toggleAffiliateStatus = (id: number) => {
    setAffiliatesList(
      affiliatesList.map((aff) => {
        if (aff.id === id) {
          return { ...aff, status: aff.status === "Active" ? "Suspended" : "Active" };
        }
        return aff;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800">
      
      {/* Sidebar navigation */}
      <aside className="w-64 bg-[#0c1015] border-r border-slate-800 flex flex-col justify-between p-6 shrink-0 text-slate-300">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e15b3e] text-white flex items-center justify-center font-bold text-lg">
              №
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-lg">Rippl</span>
              <p className="text-[9px] text-[#e15b3e] font-bold uppercase tracking-wider leading-none mt-0.5">
                Merchant Admin
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Dashboard", Icon: IconReportAnalytics },
              { id: "campaigns", label: "Campaigns Manager", Icon: IconBriefcase },
              { id: "affiliates", label: "Affiliates Table", Icon: IconUsers },
              { id: "settings", label: "Integration Setup", Icon: IconFileCode }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setShowWizard(false); }}
                className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-semibold transition-all active:scale-[0.98] ${
                  activeTab === tab.id
                    ? "bg-[#e15b3e] text-white shadow-lg shadow-[#e15b3e]/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User profile capsule bottom */}
        <div className="flex flex-col gap-4 border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs border border-slate-700">
              M1
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white leading-tight">Shopify Merchant</h4>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider leading-tight">Pro Subscription</p>
            </div>
          </div>
          <Link
            href="/auth"
            className="w-full py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 flex items-center justify-center gap-2 text-[10px] font-bold transition-all"
          >
            <IconPower className="w-3.5 h-3.5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
        
        {/* Top Header Hub */}
        <header className="flex justify-between items-center pb-2 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 capitalize">
              {activeTab === "overview" ? "Merchant Overview" : `${activeTab} Hub`}
            </h1>
            <p className="text-xs text-slate-400 font-light">Manage your campaigns, track payouts, and inspect referrals.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Low Wallet Alert Notification */}
            {walletBalance < 500000 && (
              <div className="bg-orange-50 border border-orange-200/50 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] text-orange-700 font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
                Low Reserve: ₦{walletBalance.toLocaleString()}
              </div>
            )}

            <div className="bg-white border border-slate-200/50 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm text-xs font-semibold text-slate-800">
              <span className="text-slate-400">Total Referral Rev:</span>
              <span className="text-[#e15b3e]">₦5,180,000.00</span>
            </div>
          </div>
        </header>

        {/* 1. OVERVIEW SUBVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Summary KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Referral Revenue</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">₦5.18M</p>
                <p className="text-[9px] text-green-600 font-bold flex items-center gap-0.5">
                  <IconArrowUpRight className="w-3 h-3" /> +18.4% MTD
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Campaigns</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">2 Programs</p>
                <p className="text-[9px] text-slate-400 font-medium">1 template draft</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Affiliates</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">4 Enrolled</p>
                <p className="text-[9px] text-slate-400 font-medium">1 application pending</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 border-l-4 border-l-[#e15b3e]">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total commission Paid</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">₦733,000.00</p>
                <p className="text-[9px] text-slate-400 font-medium">Net calculated from reserves</p>
              </div>
            </div>

            {/* Campaign conversion chart & pending requests */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Active campaigns list */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-slate-800">Your Active Campaigns</h3>
                  <button
                    onClick={() => setActiveTab("campaigns")}
                    className="text-[10px] font-semibold text-[#e15b3e] hover:underline"
                  >
                    Manage all programs
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Program Name</th>
                        <th className="pb-3">Conversions</th>
                        <th className="pb-3">Revenue Generated</th>
                        <th className="pb-3">Commissions Cost</th>
                        <th className="pb-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {merchantCampaigns.map((c) => (
                        <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{c.name}</td>
                          <td className="py-3 text-slate-500">{c.conversions}</td>
                          <td className="py-3 font-semibold text-slate-900">{c.revenue}</td>
                          <td className="py-3 font-semibold text-slate-700">{c.cost}</td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                              c.status === "Active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dispute & KYC warning queue (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Security & Flags</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-red-50 border border-red-100/50 rounded-2xl flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-red-700">
                      <span>HIGH RISK ATTRIBUTION</span>
                      <span>Dispute Open</span>
                    </div>
                    <p className="text-[9px] text-red-600 leading-normal mt-0.5">
                      Affiliate <strong>Chinedu Okafor</strong> flagged for duplicate device IDs on ₦420,000 order.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                      <span>INTEGRATION STATUS</span>
                      <span>Pixel Active</span>
                    </div>
                    <p className="text-[9px] text-slate-500 leading-normal mt-0.5">
                      Javascript tracking pixel firing normally on your checkout confirmation page.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. CAMPAIGNS SUBVIEW */}
        {activeTab === "campaigns" && (
          <div className="flex flex-col gap-6">
            
            {/* Create campaign button header */}
            {!showWizard && (
              <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-400 font-light">Create seasonal programs and adjust custom payouts rules.</p>
                <button
                  onClick={() => { setShowWizard(true); setWizardStep(1); }}
                  className="px-5 py-2 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold shadow-sm"
                >
                  Create Program
                </button>
              </div>
            )}

            {/* Wizard Wizard Panel */}
            {showWizard ? (
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 shadow-md flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-800 text-sm">Campaign Creation Wizard</h3>
                  <span className="text-[10px] bg-slate-150 text-slate-600 px-3 py-1 rounded-full font-bold">
                    Step {wizardStep} of 3
                  </span>
                </div>

                <form onSubmit={handleCreateCampaign} className="space-y-6">
                  
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Campaign Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Winter Sales Campaign"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Target Destination URL</label>
                        <input
                          type="url"
                          required
                          placeholder="https://yourstore.com/offers"
                          value={targetUrl}
                          onChange={(e) => setTargetUrl(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setCommType("percentage")}
                          className={`flex-1 py-3 border rounded-2xl text-xs font-semibold transition-all active:scale-[0.98] ${
                            commType === "percentage" ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]" : "border-slate-200 bg-white"
                          }`}
                        >
                          Percentage Rate (%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCommType("flat")}
                          className={`flex-1 py-3 border rounded-2xl text-xs font-semibold transition-all active:scale-[0.98] ${
                            commType === "flat" ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]" : "border-slate-200 bg-white"
                          }`}
                        >
                          Flat Amount (₦)
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Commission Value</label>
                        <input
                          type="number"
                          required
                          placeholder={commType === "percentage" ? "10%" : "₦ 1,000"}
                          value={commRate}
                          onChange={(e) => setCommRate(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Cookie Duration (Days)</label>
                        <input
                          type="number"
                          required
                          value={cookieDays}
                          onChange={(e) => setCookieDays(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                        />
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] text-slate-400 leading-normal">
                        <strong>Default Rules:</strong> Commissions are marked as pending audit for 14 days to clear chargebacks. Instant payouts process directly from your Rippl reserves.
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (wizardStep > 1) setWizardStep(wizardStep - 1);
                        else setShowWizard(false);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    
                    {wizardStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setWizardStep(wizardStep + 1)}
                        className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#e15b3e] text-white text-xs font-semibold shadow-sm"
                      >
                        Launch Program
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              /* Campaign List rendering */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {merchantCampaigns.map((c) => (
                  <div key={c.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[200px]">
                    <div className="flex justify-between items-start">
                      <span className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/50 flex items-center justify-center text-lg">
                        🛍
                      </span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[8px] font-semibold uppercase tracking-wider">
                        {c.status}
                      </span>
                    </div>

                    <div className="my-4">
                      <h3 className="font-semibold text-sm text-slate-800">{c.name}</h3>
                      <p className="text-[10px] text-slate-400 font-light mt-1">Conversions: {c.conversions}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-2 text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Referred GMV</p>
                        <p className="font-semibold text-slate-800 mt-0.5">{c.revenue}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Payouts Cost</p>
                        <p className="font-semibold text-[#e15b3e] mt-0.5">{c.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* 3. AFFILIATES SUBVIEW */}
        {activeTab === "affiliates" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-sm text-slate-800">Affiliate Partnerships Database</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Ambassador</th>
                    <th className="pb-3">Conversions</th>
                    <th className="pb-3">Generated Revenue</th>
                    <th className="pb-3">EPC Rate</th>
                    <th className="pb-3">Fraud Risk</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliatesList.map((aff) => (
                    <tr key={aff.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-800">{aff.name}</td>
                      <td className="py-3 text-slate-500">{aff.conversions}</td>
                      <td className="py-3 font-semibold text-slate-900">{aff.revenue}</td>
                      <td className="py-3 font-semibold text-slate-700">{aff.epc}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                          aff.fraudScore < 20 ? "bg-green-50 text-green-600" :
                          aff.fraudScore < 50 ? "bg-yellow-50 text-yellow-600" :
                          "bg-red-50 text-red-600 animate-pulse"
                        }`}>
                          {aff.fraudScore}% Risk
                        </span>
                      </td>
                      <td className="py-3 text-right flex justify-end gap-2">
                        <button
                          onClick={() => toggleAffiliateStatus(aff.id)}
                          className={`px-3 py-1 rounded-full text-[9px] font-semibold transition-colors ${
                            aff.status === "Active"
                              ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
                              : "bg-red-50 text-red-600 hover:bg-green-50 hover:text-green-600"
                          }`}
                        >
                          {aff.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SETTINGS SUBVIEW */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Javascript tracking pixel setup (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-1">Developer Tracking Pixel</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Install the tracking script before the closing body tag on your checkout screen.</p>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Embed Code</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`<script src="https://cdn.rippl.io/v2/pixel.js?id=merchant_shopify_prod"></script>`);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="text-[#e15b3e] hover:underline flex items-center gap-0.5"
                    >
                      {copiedKey ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 text-slate-300 rounded-2xl text-[10px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {`<script>
  (function(r,i,p,p,l){
    r['RipplObject']=p;
    r[p]=r[p]||function(){(r[p].q=r[p].q||[]).push(arguments)};
    l=i.createElement('script');
    l.async=1;l.src='https://cdn.rippl.io/v2/pixel.js?id=merchant_shopify_prod';
    i.getElementsByTagName('head')[0].appendChild(l);
  })(window,document,'rippl');
  
  rippl('track', 'conversion', {
    order_id: "{{ order.id }}",
    value: "{{ order.total_price }}",
    currency: "NGN"
  });
</script>`}
                  </pre>
                </div>
              </div>
            </div>

            {/* API Credentials card (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-4">REST API Credentials</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mb-1">API Key ID</p>
                    <code className="text-[10px] font-mono text-slate-800">pk_live_f89h4q8fha98sfdhuais</code>
                  </div>
                  
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Webhook Endpoint</p>
                    <code className="text-[10px] font-mono text-[#e15b3e]">https://yourserver.com/api/rippl-webhook</code>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-green-700 leading-normal">
                <IconShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Attribution requests are secure and automatically screened for cookie-stuffing and device-spoofing fraud patterns.</span>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
