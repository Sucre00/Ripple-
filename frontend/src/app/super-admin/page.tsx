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
  IconFingerprint,
  IconAlertCircle
} from "@tabler/icons-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "signups" | "finance" | "config">("overview");

  // Platform ledger database
  const [ledgerData] = useState([
    { id: "TX-901", business: "Shopify Storefront", type: "Subscription Fee", amount: "₦45,000", status: "reconciled", date: "Today" },
    { id: "TX-902", business: "Flutterwave Merchant", type: "Cashout Transaction Fee", amount: "₦1,220", status: "reconciled", date: "Today" },
    { id: "TX-903", business: "Paystack Store", type: "Subscription Fee", amount: "₦15,000", status: "pending", date: "Yesterday" }
  ]);

  // Verification queues
  const [businessQueue, setBusinessQueue] = useState([
    { id: 1, name: "Shopify Merchant", cacNumber: "RC1928374", director: "Jane Doe", date: "Yesterday", status: "Pending Verification" },
    { id: 2, name: "WooCommerce Seller", cacNumber: "RC2938475", director: "John Smith", date: "July 15, 2026", status: "Pending Verification" }
  ]);

  // Global settings override
  const [commissionCut, setCommissionCut] = useState("1.5");
  const [clearingDays, setClearingDays] = useState("14");
  const [minCashout, setMinCashout] = useState("2000");

  const verifyBusiness = (id: number, approve: boolean) => {
    setBusinessQueue(
      businessQueue.map((item) => {
        if (item.id === id) {
          return { ...item, status: approve ? "Verified" : "Rejected" };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800">
      
      {/* Sidebar navigation */}
      <aside className="w-64 bg-[#0a0d10] border-r border-slate-900 flex flex-col justify-between p-6 shrink-0 text-slate-400">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
              №
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-lg">Rippl</span>
              <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider leading-none mt-0.5">
                Super Command
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Global metrics", Icon: IconReportAnalytics },
              { id: "signups", label: "Verification Queue", Icon: IconFingerprint },
              { id: "finance", label: "Finance Ledger", Icon: IconWallet },
              { id: "config", label: "Platform Settings", Icon: IconAdjustmentsHorizontal }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-semibold transition-all active:scale-[0.98] ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
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
              SA
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white leading-tight">Super Admin</h4>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider leading-tight">Root access</p>
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
              {activeTab === "overview" ? "Platform Overseer" : `Command ${activeTab}`}
            </h1>
            <p className="text-xs text-slate-400 font-light">Global overview of transactions, corporate audits, and platform controls.</p>
          </div>
        </header>

        {/* 1. OVERVIEW SUBVIEW */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Summary KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Gross Payout Volume</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">₦42.1M</p>
                <p className="text-[9px] text-slate-400 font-medium">Reconciled this MTD</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Platform Fee Revenue</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">₦1.84M</p>
                <p className="text-[9px] text-slate-400 font-medium">1.5% average fee cut</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Registered merchants</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">104 Brands</p>
                <p className="text-[9px] text-slate-400 font-medium">2 awaiting verification check</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 border-l-4 border-l-red-600">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Ambassadors</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">2,410 Users</p>
                <p className="text-[9px] text-slate-400 font-medium">Daily signup frequency: +42</p>
              </div>
            </div>

            {/* Platform systems status */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Incident log tracker */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-slate-800">Platform System Uptime</h3>
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[9px] font-semibold uppercase tracking-wider">
                    99.98% Healthy
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Paystack payout engine</span>
                    <span className="text-green-600 font-semibold">Connected</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Flutterwave payout engine</span>
                    <span className="text-green-600 font-semibold">Connected</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Dojah BVN Lookup Node</span>
                    <span className="text-green-600 font-semibold">Connected</span>
                  </div>
                </div>
              </div>

              {/* Dispute & KYC warning queue (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Security & Flags</h3>
                  
                  <div className="p-3 bg-red-50 border border-red-100/50 rounded-2xl flex flex-col gap-1 mt-4">
                    <div className="flex justify-between items-center text-[10px] font-bold text-red-700">
                      <span>ACTIVE FRAUD ALERT</span>
                    </div>
                    <p className="text-[9px] text-red-600 leading-normal mt-0.5">
                      Sub-affiliate circle IP spoof detected on 4 accounts. Suspended pending arbitration.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2 mt-4 text-[9px] text-slate-500">
                  <IconAlertCircle className="w-4 h-4 shrink-0 text-slate-400" />
                  All command actions are logged under audit records.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. SIGNUPS SUBVIEW */}
        {activeTab === "signups" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-sm text-slate-800">Corporate CAC Verification Queue</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">CAC Code</th>
                    <th className="pb-3">Verified Director</th>
                    <th className="pb-3">Signup Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {businessQueue.map((item) => (
                    <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-800">{item.name}</td>
                      <td className="py-3 text-slate-500">{item.cacNumber}</td>
                      <td className="py-3 font-semibold text-slate-900">{item.director}</td>
                      <td className="py-3 text-slate-400">{item.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                          item.status === "Verified" ? "bg-green-50 text-green-600" :
                          item.status === "Rejected" ? "bg-red-50 text-red-600" :
                          "bg-yellow-50 text-yellow-600"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 text-right flex justify-end gap-2">
                        {item.status === "Pending Verification" && (
                          <>
                            <button
                              onClick={() => verifyBusiness(item.id, true)}
                              className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-full text-[9px] font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => verifyBusiness(item.id, false)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-[9px] font-semibold"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. FINANCE SUBVIEW */}
        {activeTab === "finance" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-sm text-slate-800">Global Ledger Reconciliation</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Transaction ID</th>
                    <th className="pb-3">Related Business</th>
                    <th className="pb-3">Billing Type</th>
                    <th className="pb-3">Reconciled Amount</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-800">{item.id}</td>
                      <td className="py-3 text-slate-500">{item.business}</td>
                      <td className="py-3 font-semibold text-slate-900">{item.type}</td>
                      <td className="py-3 font-semibold text-slate-700">{item.amount}</td>
                      <td className="py-3 text-slate-400">{item.date}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                          item.status === "reconciled" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CONFIG SUBVIEW */}
        {activeTab === "config" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Global parameter config (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-1">Global System Configuration</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Modify platform-wide fee commissions, clearing durations, and cashout criteria.</p>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Transaction Payout Fee (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={commissionCut}
                      onChange={(e) => setCommissionCut(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Default Clearing Hold (Days)</label>
                    <input
                      type="number"
                      value={clearingDays}
                      onChange={(e) => setClearingDays(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Minimum cashout threshold (₦)</label>
                    <input
                      type="number"
                      value={minCashout}
                      onChange={(e) => setMinCashout(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors">
                Save Platform Overrides
              </button>
            </div>

            {/* KYC parameters (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-4">KYC tier verification Limits</h3>
                
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 1: Phone OTP</span>
                    <span className="text-slate-500">₦20,000/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 2: BVN Check</span>
                    <span className="text-slate-[#e15b3e] font-semibold">₦1,000,000/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 3: Government ID</span>
                    <span className="text-green-600 font-semibold">Unlimited</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-red-700 leading-normal">
                <IconShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>KYC overrides are synced automatically across the Dojah validation engine. Upgrades clear inside 48 hours SLA.</span>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
