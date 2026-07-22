"use client";

import React, { useState, useEffect } from "react";
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
  IconAlertCircle,
  IconDownload,
  IconUserCheck,
  IconScale,
  IconCircleDot
} from "@tabler/icons-react";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "verifications" | "businesses" | "affiliates" | "finance" | "config">("overview");

  // Tab synchronization with URL search parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const validTabs = ["overview", "verifications", "businesses", "affiliates", "finance", "config"];
      if (tab && validTabs.includes(tab)) {
        setActiveTab(tab as any);
      }
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") || "overview";
      setActiveTab(tab as any);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as any);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.pushState(null, "", url.pathname + url.search);
    }
  };

  const [adminData, setAdminData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const fetchAdminOverview = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/overview");
      if (res.ok) {
        const data = await res.json();
        setAdminData(data);
      }
    } catch (e) {
      console.error("Failed to load admin overview", e);
    }
  };

  const fetchVerifications = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/verifications");
      if (res.ok) {
        const data = await res.json();
        setBusinessQueue(data.businesses);
        setKycQueue(data.kyc);
      }
    } catch (e) {
      console.error("Failed to load verifications", e);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/businesses");
      if (res.ok) {
        const data = await res.json();
        setBusinessesList(data);
      }
    } catch (e) {
      console.error("Failed to load businesses", e);
    }
  };

  const fetchAffiliates = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/affiliates");
      if (res.ok) {
        const data = await res.json();
        setAffiliatesList(data);
      }
    } catch (e) {
      console.error("Failed to load affiliates", e);
    }
  };

  const fetchLedger = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/ledger");
      if (res.ok) {
        const data = await res.json();
        setLedgerData(data);
      }
    } catch (e) {
      console.error("Failed to load ledger", e);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        setCommissionCut(data.commission_cut);
        setClearingDays(data.clearing_days);
        setMinCashout(data.min_cashout);
      }
    } catch (e) {
      console.error("Failed to load configs", e);
    }
  };

  useEffect(() => {
    setIsLoadingData(true);
    Promise.all([
      fetchAdminOverview(),
      fetchVerifications(),
      fetchBusinesses(),
      fetchAffiliates(),
      fetchLedger(),
      fetchConfig()
    ]).finally(() => {
      setIsLoadingData(false);
    });
  }, []);

  // Global Ledger Database (Screen #65)
  const [ledgerData, setLedgerData] = useState<any[]>([]);

  // Business verification queue (Screen #61)
  const [businessQueue, setBusinessQueue] = useState<any[]>([]);

  // Manual KYC enhanced Tier 3 review queue (Screen #63)
  const [kycQueue, setKycQueue] = useState<any[]>([]);

  // Platform Corporate Businesses database (Screen #60)
  const [businessesList, setBusinessesList] = useState<any[]>([]);

  // Global Affiliates Database (Screen #62)
  const [affiliatesList, setAffiliatesList] = useState<any[]>([]);

  // Global Platform configs (Screen #70)
  const [commissionCut, setCommissionCut] = useState("1.5");
  const [clearingDays, setClearingDays] = useState("14");
  const [minCashout, setMinCashout] = useState("2000");

  // Fraud alerts log (Screen #67)
  const [fraudAlerts, setFraudAlerts] = useState([
    { id: 501, entity: "Chinedu Okafor", trigger: "Duplicate Device ID match on payout request", risk: "78%", date: "Today", status: "Active Flag" }
  ]);

  const verifyBusiness = async (id: number, approve: boolean) => {
    try {
      const endpoint = approve ? "approve" : "reject";
      const res = await fetch(`http://localhost:8080/api/admin/verifications/business/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update business verification status");
      }
      alert(approve ? "Business verified successfully!" : "Business verification rejected.");
      await fetchVerifications();
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const verifyKyc = async (id: number, approve: boolean) => {
    try {
      const endpoint = approve ? "approve" : "reject";
      const res = await fetch(`http://localhost:8080/api/admin/verifications/kyc/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update KYC status");
      }
      alert(approve ? "KYC approved successfully!" : "KYC rejected.");
      await fetchVerifications();
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const handleUpdateSubscription = async (id: string, newPlan: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/businesses/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_id: id, plan: newPlan }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update subscription plan");
      }
      alert("Subscription plan updated successfully!");
      await fetchBusinesses();
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const toggleWithdrawalRestriction = async (id: string, currentStatus: string) => {
    try {
      const restrict = currentStatus === "active";
      const res = await fetch("http://localhost:8080/api/admin/affiliates/restrict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliate_id: id, restrict }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update affiliate restriction status");
      }
      alert(restrict ? "Affiliate withdrawal restricted." : "Affiliate restriction removed.");
      await fetchAffiliates();
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const handleSaveConfigs = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commission_cut: commissionCut,
          clearing_days: clearingDays,
          min_cashout: minCashout,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update platform overrides");
      }
      alert("Platform configurations saved successfully!");
      await fetchConfig();
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const handleClearFraudAlert = (id: number) => {
    setFraudAlerts(fraudAlerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0a0d10] border-r border-slate-900 flex flex-col justify-between p-6 shrink-0 text-slate-400 z-30 h-full">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center bg-white px-3 py-1.5 rounded-xl">
            <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-6 w-auto" />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Global Metrics", Icon: IconReportAnalytics },
              { id: "verifications", label: "Verification Queue", Icon: IconFingerprint },
              { id: "businesses", label: "Business Accounts", Icon: IconBriefcase },
              { id: "affiliates", label: "Global Affiliates", Icon: IconUsers },
              { id: "finance", label: "Finance Ledger", Icon: IconWallet },
              { id: "config", label: "Platform Settings", Icon: IconAdjustmentsHorizontal }
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
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
              SA
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white leading-tight">Super Admin</h4>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider leading-tight">Root access</p>
            </div>
          </div>
          <Link
            href="/auth?logout=true"
            onClick={() => {
              document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }}
            className="w-full py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40 flex items-center justify-center gap-2 text-[10px] font-bold transition-all"
          >
            <IconPower className="w-3.5 h-3.5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto z-10">
        
        {/* Top Header Hub */}
        <header className="flex justify-between items-center pb-2 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 capitalize">
              {activeTab === "overview" ? "Platform Command" : `Command ${activeTab}`}
            </h1>
            <p className="text-xs text-slate-400 font-light">Global overview of payouts, business verifications, and compliance audits.</p>
          </div>
        </header>

        {/* 1. PLATFORM OVERVIEW SUBVIEW (includes active fraud investigation) */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Platform Stats Summary row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Gross Payout Volume</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  ₦{adminData ? (adminData.platform_gmv / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <p className="text-[9px] text-slate-400 font-medium">Reconciled this MTD</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Platform Fee Revenue</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  ₦{adminData ? ((adminData.total_commissions * 0.015) / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <p className="text-[9px] text-slate-400 font-medium">1.5% average fee cut</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Registered Merchants</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">{adminData ? adminData.total_businesses : 0} Brands</p>
                <p className="text-[9px] text-slate-400 font-medium">{businessQueue.length} awaiting verification</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Ambassadors</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{adminData ? adminData.total_affiliates : 0} Users</p>
                <p className="text-[9px] text-slate-400 font-medium">Daily signup frequency: +42</p>
              </div>
            </div>

            {/* Platform systems status & Fraud Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Uptime logs */}
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
                    <span className="text-green-600 font-semibold flex items-center gap-1"><IconCircleDot className="w-3.5 h-3.5 text-green-500 animate-pulse" /> Connected</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Flutterwave payout engine</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1"><IconCircleDot className="w-3.5 h-3.5 text-green-500 animate-pulse" /> Connected</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Dojah BVN Lookup Node</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1"><IconCircleDot className="w-3.5 h-3.5 text-green-500 animate-pulse" /> Connected</span>
                  </div>
                </div>
              </div>

              {/* Active Fraud Investigation (Screen #67) */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Fraud Investigation Queue</h3>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    {fraudAlerts.length > 0 ? (
                      fraudAlerts.map((alert) => (
                        <div key={alert.id} className="p-3 bg-red-50 border border-red-100/50 rounded-2xl flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-red-700">
                            <span>ALERT #{alert.id}</span>
                            <span>{alert.risk} Risk</span>
                          </div>
                          <p className="text-[9px] text-red-600 leading-normal mt-0.5 font-medium">
                            Entity <strong>{alert.entity}</strong> flagged for: {alert.trigger}
                          </p>
                          <button
                            onClick={() => handleClearFraudAlert(alert.id)}
                            className="mt-2 w-full py-1 bg-white border border-red-200 hover:bg-red-100 text-red-600 rounded-xl text-[9px] font-semibold"
                          >
                            Dismiss & Mark Clear
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-green-50 border border-green-100/50 rounded-2xl text-[9px] text-green-700 font-medium">
                        All attributions clear. No active fraud investigation files.
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2 mt-4 text-[9px] text-slate-400">
                  <IconAlertCircle className="w-4 h-4 shrink-0 text-slate-400" />
                  System overrides log under administrator ID.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. VERIFICATIONS SUBVIEW (Split: CAC Business verify queue + Manual KYC reviews) */}
        {activeTab === "verifications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* CAC Business verify queue (6 Cols - Screen #61) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-slate-800">Corporate CAC Verification Queue</h3>
              
              <div className="flex flex-col gap-3">
                {businessQueue.filter(b => b.status === "Pending Verification").map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">{item.name}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">CAC Code: {item.cacNumber} • Director: {item.director}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                      <button
                        onClick={() => verifyBusiness(item.id, true)}
                        className="flex-1 py-1.5 bg-black hover:bg-slate-800 text-white rounded-xl text-[9px] font-semibold"
                      >
                        Approve CAC
                      </button>
                      <button
                        onClick={() => verifyBusiness(item.id, false)}
                        className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl text-[9px] font-semibold"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
                {businessQueue.filter(b => b.status === "Pending Verification").length === 0 && (
                  <p className="text-[10px] text-slate-400 font-light text-center py-8">CAC verification queue is empty.</p>
                )}
              </div>
            </div>

            {/* Manual KYC reviews (6 Cols - Screen #63) */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-slate-800">Standard KYC Tier 3 reviews</h3>
              
              <div className="flex flex-col gap-3">
                {kycQueue.filter(k => k.status === "Pending Review").map((k) => (
                  <div key={k.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">{k.name}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">BVN match: {k.bvnMatch} • ID: {k.docType} • Selfie match: {k.selfieMatch}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                      <button
                        onClick={() => verifyKyc(k.id, true)}
                        className="flex-1 py-1.5 bg-black hover:bg-slate-800 text-white rounded-xl text-[9px] font-semibold"
                      >
                        Approve KYC
                      </button>
                      <button
                        onClick={() => verifyKyc(k.id, false)}
                        className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl text-[9px] font-semibold"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
                {kycQueue.filter(k => k.status === "Pending Review").length === 0 && (
                  <p className="text-[10px] text-slate-400 font-light text-center py-8">KYC review queue is empty.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 3. BUSINESSES SUBVIEW (includes subscription overrides) */}
        {activeTab === "businesses" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow animate-in fade-in duration-200">
            <h3 className="font-semibold text-sm text-slate-800">Registered Corporate Merchants</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">Active Plan</th>
                    <th className="pb-3">Payout Volume MTD</th>
                    <th className="pb-3 text-center">Campaigns</th>
                    <th className="pb-3 text-center">Affiliates</th>
                    <th className="pb-3 text-right">Subscription Overrides</th>
                  </tr>
                </thead>
                <tbody>
                  {businessesList.map((bus) => (
                    <tr key={bus.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3.5 font-semibold text-slate-800">{bus.name}</td>
                      <td className="py-3.5 font-semibold text-[#e15b3e]">{bus.plan}</td>
                      <td className="py-3.5 font-medium text-slate-600">
                        ₦{(bus.volume / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 text-center text-slate-500 font-semibold">{bus.active_campaigns}</td>
                      <td className="py-3.5 text-center text-slate-500 font-semibold">{bus.affiliates_count}</td>
                      <td className="py-3.5 text-right">
                        <select
                           value={bus.plan}
                           onChange={(e) => handleUpdateSubscription(bus.id, e.target.value)}
                           className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-600 focus:outline-none"
                        >
                           <option>Pro Plan</option>
                           <option>Basic Plan</option>
                           <option>Enterprise Plan</option>
                           <option>Trial Extended</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GLOBAL AFFILIATES SUBVIEW (Screen #62) */}
        {activeTab === "affiliates" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow animate-in fade-in duration-200">
            <h3 className="font-semibold text-sm text-slate-800">Global Affiliate Accounts</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Ambassador Name</th>
                    <th className="pb-3">KYC verified Tier</th>
                    <th className="pb-3">Total Earned</th>
                    <th className="pb-3">Total Withdrawn</th>
                    <th className="pb-3">Account Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliatesList.map((aff) => (
                    <tr key={aff.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3.5 font-semibold text-slate-800">{aff.name}</td>
                      <td className="py-3.5 text-slate-500 font-semibold">{aff.kyc_tier}</td>
                      <td className="py-3.5 font-semibold text-slate-900">
                        ₦{(aff.total_earned / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 font-semibold text-[#e15b3e]">
                        ₦{(aff.total_withdrawn / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                          aff.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600 animate-pulse"
                        }`}>
                          {aff.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => toggleWithdrawalRestriction(aff.id, aff.status)}
                          className={`px-3 py-1 rounded-full text-[9px] font-bold transition-colors ${
                            aff.status === "active"
                              ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500"
                              : "bg-red-50 text-red-500 hover:bg-green-50 hover:text-green-600"
                          }`}
                        >
                          {aff.status === "active" ? "Restrict Cashout" : "Restore account"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. FINANCE SUBVIEW (includes compliance reports generator) */}
        {activeTab === "finance" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Reconciliation table (8 Cols - Screen #65) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
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
                        <td className="py-3 font-semibold text-slate-700">
                          ₦{(item.amount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </td>
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

            {/* Compliance Report Generator (4 Cols - Screen #69) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Compliance Auditor</h3>
                <p className="text-[10px] text-slate-400 font-light mt-1">Export transaction registries formatted for financial regulatory bodies.</p>
                
                <div className="flex flex-col gap-2.5 mt-4">
                  <button
                    onClick={() => alert("FIRS WHT Tax report download complete.")}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl flex items-center justify-between text-[10px] text-slate-600 transition-colors font-semibold"
                  >
                    <span className="flex items-center gap-1.5"><IconDownload className="w-3.5 h-3.5 text-slate-400" /> FIRS WHT Tax report</span>
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => alert("CBN Transaction Ledger download complete.")}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl flex items-center justify-between text-[10px] text-slate-600 transition-colors font-semibold"
                  >
                    <span className="flex items-center gap-1.5"><IconDownload className="w-3.5 h-3.5 text-slate-400" /> CBN transaction ledger</span>
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => alert("NDPR Data Processing Audit log download complete.")}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-xl flex items-center justify-between text-[10px] text-slate-600 transition-colors font-semibold"
                  >
                    <span className="flex items-center gap-1.5"><IconDownload className="w-3.5 h-3.5 text-slate-400" /> NDPR data processing logs</span>
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-red-700 leading-normal">
                <IconShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Reconciliations audit and FIRS withholding logs comply with standard NG tax guidelines.</span>
              </div>
            </div>

          </div>
        )}

        {/* 6. CONFIG SUBVIEW */}
        {activeTab === "config" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Global parameters override (7 Cols - Screen #70) */}
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
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Minimum Cashout Threshold (₦)</label>
                    <input
                      type="number"
                      value={minCashout}
                      onChange={(e) => setMinCashout(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveConfigs}
                className="w-full mt-6 py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-lg shadow-[#e15b3e]/10"
              >
                Save Platform Overrides
              </button>
            </div>

            {/* KYC limits meters */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-4">KYC Tier Verification Limits</h3>
                
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 1: Phone OTP</span>
                    <span className="text-slate-500">₦20,000/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 2: BVN Check</span>
                    <span className="text-[#e15b3e] font-semibold">₦1,000,000/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="font-semibold text-slate-800">Tier 3: Government ID</span>
                    <span className="text-green-600 font-semibold">Unlimited</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-red-700 leading-normal font-medium">
                <IconShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>KYC requirements are synced automatically across the Dojah validation engine. Upgrades verify under 48 hours SLA.</span>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
