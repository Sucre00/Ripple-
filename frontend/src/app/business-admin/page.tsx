"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/config";
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
  IconTrash,
  IconUsersGroup,
  IconAlertTriangle,
  IconCreditCard,
  IconDownload,
  IconX
} from "@tabler/icons-react";

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "affiliates" | "payouts" | "integrations" | "billing">("overview");

  // Tab synchronization with URL search parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const validTabs = ["overview", "campaigns", "affiliates", "payouts", "integrations", "billing"];
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
    setShowWizard(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.pushState(null, "", url.pathname + url.search);
    }
  };

  // Merchant Guided Onboarding Checklist
  const [checklist, setChecklist] = useState({
    profile: true,
    pixel: false,
    campaign: false,
    recruit: false,
    fund: false,
    payout: false
  });

  const [webhookUrl, setWebhookUrl] = useState("");
  const [isSavingWebhook, setIsSavingWebhook] = useState(false);

  const fetchWebhookConfig = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/webhook?merchant_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setWebhookUrl(data.webhook_url || "");
      }
    } catch (e) {
      console.error("Failed to load webhook configuration", e);
    }
  };

  const saveWebhookConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWebhook(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/webhook/configure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId, webhook_url: webhookUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save webhook URL");
      }
      alert("Webhook URL configured successfully!");
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setIsSavingWebhook(false);
    }
  };

  const fetchOnboardingProgress = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/onboarding?user_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setChecklist(prev => ({ ...prev, ...data }));
        }
      }
    } catch (e) {
      console.error("Failed to load onboarding checklist", e);
    }
  };

  const saveOnboardingProgress = async (id: string, updated: typeof checklist) => {
    try {
      await fetch(`${API_BASE_URL}/api/user/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, progress: updated }),
      });
    } catch (e) {
      console.error("Failed to save onboarding checklist", e);
    }
  };

  const updateChecklist = (key: keyof typeof checklist, value: boolean) => {
    const updated = { ...checklist, [key]: value };
    setChecklist(updated);
    saveOnboardingProgress(merchantId, updated);
  };

  const onboardingProgress = useMemo(() => {
    const steps = Object.values(checklist);
    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }, [checklist]);

  // Campaign creation wizard states
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [commRate, setCommRate] = useState("10");
  const [cookieDays, setCookieDays] = useState("30");
  const [commType, setCommType] = useState<"percentage" | "flat">("percentage");

  // Helper to read cookies
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const [merchantId, setMerchantId] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Merchant campaigns database
  const [merchantCampaigns, setMerchantCampaigns] = useState<any[]>([]);

  const fetchDashboard = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/dashboard?merchant_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (e) {
      console.error("Failed to load merchant dashboard", e);
    }
  };

  const fetchCampaigns = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/campaigns?merchant_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setMerchantCampaigns(data);
      }
    } catch (e) {
      console.error("Failed to load campaigns", e);
    }
  };

  const fetchAffiliates = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/affiliates?merchant_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setAffiliatesList(data.enrolled);
        setAffiliateApplications(data.applications);
      }
    } catch (e) {
      console.error("Failed to load affiliates", e);
    }
  };

  const fetchPayouts = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/payouts?merchant_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setPendingPayouts(data.pending);
        setActiveDisputes(data.disputed);
      }
    } catch (e) {
      console.error("Failed to load payouts", e);
    }
  };

  useEffect(() => {
    const id = getCookie("user_id") || "business-user-uuid-2222";
    setMerchantId(id);
    setIsLoadingData(true);
    Promise.all([
      fetchDashboard(id),
      fetchCampaigns(id),
      fetchAffiliates(id),
      fetchPayouts(id),
      fetchOnboardingProgress(id),
      fetchWebhookConfig(id)
    ]).finally(() => {
      setIsLoadingData(false);
    });
  }, []);

  // Affiliates list database
  const [affiliatesList, setAffiliatesList] = useState<any[]>([]);

  // Affiliate Application requests queue (Screen #43)
  const [affiliateApplications, setAffiliateApplications] = useState<any[]>([]);

  // Payout Management states (Screen #48)
  const [pendingPayouts, setPendingPayouts] = useState<any[]>([]);

  const [activeDisputes, setActiveDisputes] = useState<any[]>([]);

  // Wallet Reserves funding states (Screen #49)
  const [walletBalance, setWalletBalance] = useState(420000);
  const [reservedBalance, setReservedBalance] = useState(49500);
  const [showFundModal, setShowFundModal] = useState(false);

  // Listen to Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowFundModal(false);
      }
    };
    if (showFundModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFundModal]);
  const [fundAmount, setFundAmount] = useState("");
  const [isFunding, setIsFunding] = useState(false);

  // Pixel Tester states (Screen #54)
  const [testUrl, setTestUrl] = useState("https://kolastores.com/checkout/success");
  const [testOrderValue, setTestOrderValue] = useState("15000");
  const [testIp, setTestIp] = useState("192.168.1.1");
  const [testReferralCode, setTestReferralCode] = useState("dwayne-stores");
  const [pixelTestStatus, setPixelTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [pixelResultPayload, setPixelResultPayload] = useState<any>(null);

  // Team management (Screen #56)
  const [teamMembers, setTeamMembers] = useState([
    { email: "owner@merchant.com", role: "Owner", status: "Active" },
    { email: "finance@merchant.com", role: "Finance Manager", status: "Active" },
    { email: "analyst@merchant.com", role: "Marketing Analyst", status: "Pending Invite" }
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Marketing Analyst");

  // Other UI helper states
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: merchantId,
          name: campaignName,
          target_url: targetUrl,
          commission_type: commType,
          commission_value: Number(commRate),
          cookie_duration_days: Number(cookieDays)
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create campaign");
      }
      
      alert("Campaign created successfully!");
      await fetchCampaigns(merchantId);
      await fetchDashboard(merchantId);
      
      setShowWizard(false);
      setWizardStep(1);
      setCampaignName("");
      setTargetUrl("");
      updateChecklist("campaign", true);
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    }
  };

  const handleFundReserves = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFunding(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/wallet/fund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: merchantId,
          amount: Number(fundAmount)
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fund reserves");
      }
      alert("Reserves funded successfully!");
      await fetchDashboard(merchantId);
      setShowFundModal(false);
      setFundAmount("");
      updateChecklist("fund", true);
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setIsFunding(false);
    }
  };

  const handleApprovePayout = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/payouts/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId, conversion_id: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to approve payout");
      }
      alert("Payout approved successfully!");
      await fetchPayouts(merchantId);
      await fetchDashboard(merchantId);
      updateChecklist("payout", true);
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const handleDisputePayout = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/payouts/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId, conversion_id: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispute payout");
      }
      alert("Payout flagged as disputed.");
      await fetchPayouts(merchantId);
      await fetchDashboard(merchantId);
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };



  const toggleAffiliateStatus = (id: any) => {
    setAffiliatesList(
      affiliatesList.map((aff) => {
        if (aff.id === id) {
          const isAct = aff.status === "Active" || aff.status === "active";
          return { ...aff, status: isAct ? "Suspended" : "Active" };
        }
        return aff;
      })
    );
  };

  const handleApproveApplication = async (appId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/affiliates/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId, application_id: appId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to approve affiliate");
      }
      alert("Affiliate approved successfully!");
      await fetchAffiliates(merchantId);
      await fetchDashboard(merchantId);
      updateChecklist("recruit", true);
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const handleRejectApplication = async (appId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/merchant/affiliates/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchant_id: merchantId, application_id: appId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to decline application");
      }
      alert("Application declined.");
      await fetchAffiliates(merchantId);
    } catch (e: any) {
      alert(e.message || "An error occurred.");
    }
  };

  const runPixelTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setPixelTestStatus("testing");
    setPixelResultPayload(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/pixel/conversion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referral_code: testReferralCode,
          order_id: "ORD-TEST-" + Math.floor(10000 + Math.random() * 90000),
          order_value: Number(testOrderValue),
          ip: testIp,
          user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "Mozilla/5.0"
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Pixel request failed");
      }
      setPixelResultPayload(data);
      setPixelTestStatus("success");
      updateChecklist("pixel", true);
      await fetchPayouts(merchantId);
      await fetchDashboard(merchantId);
    } catch (err: any) {
      console.error(err);
      setPixelTestStatus("error");
    }
  };

  const inviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamMembers([...teamMembers, { email: inviteEmail, role: inviteRole, status: "Pending Invite" }]);
    setInviteEmail("");
  };

  return (
    <div className="h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0c1015] border-r border-slate-800 flex flex-col justify-between p-6 shrink-0 text-slate-300 z-30 h-full">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center bg-white px-3 py-1.5 rounded-xl">
            <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-6 w-auto" />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Dashboard", Icon: IconReportAnalytics },
              { id: "campaigns", label: "Campaigns Manager", Icon: IconBriefcase },
              { id: "affiliates", label: "Affiliates Hub", Icon: IconUsers },
              { id: "payouts", label: "Payouts & Disputes", Icon: IconWallet },
              { id: "integrations", label: "Integration Tester", Icon: IconFileCode },
              { id: "billing", label: "Billing & Team", Icon: IconCreditCard }
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

        {/* User Profile avatar info */}
        <div className="flex flex-col gap-4 border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs border border-slate-700">
              M1
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-white leading-tight">Shopify Merchant</h4>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider leading-tight">Pro Plan active</p>
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
        
        {/* Top Header Hub Bar */}
        <header className="flex justify-between items-center pb-2 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 capitalize">
              {activeTab === "overview" ? "Merchant Overview" : `${activeTab} Hub`}
            </h1>
            <p className="text-xs text-slate-400 font-light">Manage campaign attributions, fund reserves, and track payouts.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet Low Balance Alert */}
            {walletBalance < 500000 && (
              <div className="bg-orange-50 border border-orange-200/50 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10px] text-orange-700 font-semibold shadow-sm animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                Low Reserve: ₦{walletBalance.toLocaleString()}
              </div>
            )}

            <button
              onClick={() => setShowFundModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-200/50 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm text-xs font-semibold text-slate-800"
            >
              <span>Reserves:</span>
              <span className="text-[#e15b3e]">₦{walletBalance.toLocaleString()}</span>
            </button>
          </div>
        </header>

        {/* 1. OVERVIEW SUBVIEW (includes merchant guided setup checklist) */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Merchant guided setup checklist */}
            <div className="bg-white border border-slate-200/50 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 animate-in fade-in duration-200">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-1.5">
                    Merchant Integration Checklist
                    <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-2 py-0.5 rounded-full font-bold">
                      {onboardingProgress}% Completed
                    </span>
                  </h3>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#e15b3e] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${onboardingProgress}%` }}
                  ></div>
                </div>
                
                {/* Visual steps grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { key: "profile", label: "Verify Company Profile" },
                    { key: "pixel", label: "Install Tracking Pixel" },
                    { key: "campaign", label: "Create First Campaign" },
                    { key: "recruit", label: "Approve First Ambassador" },
                    { key: "fund", label: "Fund Wallet Reserves" },
                    { key: "payout", label: "Clear First Commission" }
                  ].map((step) => {
                    const isDone = (checklist as any)[step.key];
                    return (
                      <div
                        key={step.key}
                        className={`px-3 py-2 rounded-xl border text-[10px] font-semibold text-left flex items-center justify-between ${
                          isDone
                            ? "border-green-200 bg-green-50/50 text-green-700"
                            : "border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        <span>{step.label}</span>
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          isDone ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {isDone ? "✓" : ""}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Referral Revenue</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  ₦{dashboardData ? (dashboardData.conversions.reduce((acc: number, c: any) => acc + c.order_value, 0) / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <p className="text-[9px] text-green-600 font-bold flex items-center gap-0.5">
                  <IconArrowUpRight className="w-3 h-3" /> +18.4% MTD
                </p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Campaigns</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">{dashboardData ? dashboardData.total_campaigns : 0} Programs</p>
                <p className="text-[9px] text-slate-400 font-medium">Auto-approved validation</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Active Affiliates</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">{dashboardData ? dashboardData.total_links : 0} Enrolled</p>
                <p className="text-[9px] text-slate-400 font-medium">{affiliateApplications.length} application pending</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total commission Paid</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">
                  ₦{dashboardData ? (dashboardData.conversions.filter((c: any) => c.status === "paid" || c.status === "cleared").reduce((acc: number, c: any) => acc + c.commission_amount, 0) / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
              </div>
            </div>

            {/* Campaign conversion chart & security logs */}
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
                          <td className="py-3 text-slate-500">{c.conversions_count}</td>
                          <td className="py-3 font-semibold text-slate-900">
                            ₦{(c.revenue / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 font-semibold text-slate-700">
                            ₦{(c.cost / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                              c.status === "active" || c.status === "Active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
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

              {/* Fraud flags security log */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Security & Flags</h3>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    {activeDisputes.length > 0 ? (
                      <div className="p-3 bg-red-50 border border-red-100/50 rounded-2xl flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-red-700">
                          <span>HIGH RISK ATTRIBUTION</span>
                          <span>Dispute Open</span>
                        </div>
                        <p className="text-[9px] text-red-600 leading-normal mt-0.5 font-medium">
                          Affiliate <strong>{activeDisputes[0].name}</strong> flagged for duplicate device IDs on order.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-green-50 border border-green-100/50 rounded-2xl text-[9px] text-green-700 font-medium">
                        All attributions matched successfully. No active dispute flags detected.
                      </div>
                    )}

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                        <span>INTEGRATION STATUS</span>
                        <span>Pixel Active</span>
                      </div>
                      <p className="text-[9px] text-slate-500 leading-normal mt-0.5 font-medium">
                        Javascript tracking pixel firing normally on your checkout confirmation page.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-2 mt-4 text-[9px] text-slate-400">
                  <IconShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
                  Attributions require Paystack checkout verify syncs.
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
              <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in duration-200">
                <p className="text-xs text-slate-400 font-light">Create seasonal programs and adjust custom commission rules.</p>
                <button
                  onClick={() => { setShowWizard(true); setWizardStep(1); }}
                  className="px-5 py-2 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Create Program
                </button>
              </div>
            )}

            {/* Campaign Creation Wizard (Matches Screen #38 specifications) */}
            {showWizard ? (
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200/50 shadow-md flex flex-col gap-6 animate-in zoom-in duration-200 max-w-2xl mx-auto w-full">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-semibold text-slate-800 text-sm">Campaign Creation Wizard</h3>
                  <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold">
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
                          inputMode="numeric"
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
                          inputMode="numeric"
                          required
                          value={cookieDays}
                          onChange={(e) => setCookieDays(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                        />
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] text-slate-400 leading-normal">
                        <strong>Default Rules:</strong> Commissions are marked as pending audit for 14 days to clear chargebacks. Payouts process directly from your Rippl wallet reserves.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {merchantCampaigns.map((c) => (
                  <div key={c.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[200px]">
                    <div className="flex justify-between items-start">
                      <span className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/50 flex items-center justify-center">
                        <IconBriefcase className="w-5 h-5 text-slate-600" />
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                        c.status === "active" || c.status === "Active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="my-4">
                      <h3 className="font-semibold text-sm text-slate-800">{c.name}</h3>
                      <p className="text-[10px] text-slate-400 font-light mt-1">Conversions: {c.conversions_count}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-2 text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Referred GMV</p>
                        <p className="font-semibold text-slate-800 mt-0.5">
                          ₦{(c.revenue / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Payouts Cost</p>
                        <p className="font-semibold text-[#e15b3e] mt-0.5">
                          ₦{(c.cost / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* 3. AFFILIATES & APPLICATIONS SUBVIEW (Screen #43/44) */}
        {activeTab === "affiliates" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Left side: Enrolled Affiliates database table (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
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
                    {affiliatesList.map((aff) => {
                      const fraudScore = (aff.email.charCodeAt(0) % 35) + 5;
                      const epc = aff.conversions > 0 ? (aff.revenue / aff.conversions) : 0;
                      return (
                        <tr key={aff.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{aff.name}</td>
                          <td className="py-3 text-slate-500">{aff.conversions}</td>
                          <td className="py-3 font-semibold text-slate-900">
                            ₦{(aff.revenue / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 font-semibold text-slate-700">
                            ₦{(epc / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                              fraudScore < 20 ? "bg-green-50 text-green-600" :
                              fraudScore < 50 ? "bg-yellow-50 text-yellow-600" :
                              "bg-red-50 text-red-600 animate-pulse"
                            }`}>
                              {fraudScore}% Risk
                            </span>
                          </td>
                          <td className="py-3 text-right flex justify-end gap-2">
                            <button
                              onClick={() => toggleAffiliateStatus(aff.id)}
                              className={`px-3 py-1 rounded-full text-[9px] font-semibold transition-colors ${
                                aff.status === "Active" || aff.status === "active"
                                  ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
                                  : "bg-red-50 text-red-600 hover:bg-green-50 hover:text-green-600"
                              }`}
                            >
                              {aff.status === "Active" || aff.status === "active" ? "Suspend" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: Application queue (4 Cols - Screen #43) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Application Requests</h3>
              
              <div className="flex flex-col gap-3">
                {affiliateApplications.length > 0 ? (
                  affiliateApplications.map((app) => (
                    <div key={app.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2.5">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">{app.name}</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">{app.niche} • {app.followers} fans</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveApplication(app.id)}
                          className="flex-1 py-1.5 bg-black hover:bg-slate-800 text-white rounded-xl text-[9px] font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectApplication(app.id)}
                          className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl text-[9px] font-semibold"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 font-light text-center py-6">No pending applications</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 4. PAYOUTS & DISPUTES SUBVIEW (Screen #48/52) */}
        {activeTab === "payouts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Left side: Commission approvals queue (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm text-slate-800">Pending Commission Approvals</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="pb-3">Affiliate</th>
                      <th className="pb-3">Campaign</th>
                      <th className="pb-3">Order Value</th>
                      <th className="pb-3">Payout Owed</th>
                      <th className="pb-3 text-center">Risk Factor</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayouts.length > 0 ? (
                      pendingPayouts.map((p) => (
                        <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{p.affiliate_name}</td>
                          <td className="py-3 text-slate-500">{p.campaign_name}</td>
                          <td className="py-3 text-slate-600 font-medium">
                            ₦{(p.order_value / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 font-semibold text-[#e15b3e]">
                            ₦{(p.commission_amount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                              p.risk_score < 20 ? "bg-green-50 text-green-600" :
                              p.risk_score < 50 ? "bg-yellow-50 text-yellow-600" :
                              "bg-red-50 text-red-600 animate-pulse"
                            }`}>
                              {p.risk_score}% risk
                            </span>
                          </td>
                          <td className="py-3 text-right flex justify-end gap-2">
                            <button
                              onClick={() => handleApprovePayout(p.id)}
                              className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-full text-[9px] font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDisputePayout(p.id)}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-[9px] font-bold"
                            >
                              Dispute
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-slate-400 font-light">All pending payouts are processed.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: Active disputes list (4 Cols - Screen #52) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Active Disputes Queue</h3>
              
              <div className="flex flex-col gap-3">
                {activeDisputes.length > 0 ? (
                  activeDisputes.map((disp) => (
                    <div key={disp.id} className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-xs">{disp.affiliate_name}</h4>
                          <p className="text-[9px] text-slate-400 mt-0.5">Conversion ID: {disp.id}</p>
                        </div>
                        <span className="text-[10px] font-bold text-red-600">
                          ₦{(disp.commission_amount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-light leading-normal bg-white p-2 rounded-lg border border-slate-100">
                        <strong>Reason:</strong> High fraud score / Attribution risk
                      </p>
                      
                      <button
                        onClick={() => handleApprovePayout(disp.id)}
                        className="w-full mt-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-[9px] font-semibold text-slate-600"
                      >
                        Dismiss Dispute & Approve
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 font-light text-center py-6">No active dispute files</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 5. INTEGRATIONS & PIXEL TESTER SUBVIEW (Screen #53/54/55) */}
        {activeTab === "integrations" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Left side: Pixel Tester debugger (7 Cols - Screen #54) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-1">Pixel Installation Debugger</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Verify if your Shopify/WooCommerce tracking pixel setup resolves clicks and conversions correctly.</p>
                
                <form onSubmit={runPixelTest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Test URL Address</label>
                      <input
                        type="url"
                        required
                        placeholder="https://yourstore.com/checkout/success"
                        value={testUrl}
                        onChange={(e) => setTestUrl(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Referral Code Slug</label>
                      <input
                        type="text"
                        required
                        placeholder="dwayne-stores"
                        value={testReferralCode}
                        onChange={(e) => setTestReferralCode(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Simulated Order Value (NGN)</label>
                      <input
                        type="number"
                        inputMode="numeric"
                        required
                        placeholder="15000"
                        value={testOrderValue}
                        onChange={(e) => setTestOrderValue(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Simulated Customer IP</label>
                      <input
                        type="text"
                        required
                        placeholder="192.168.1.1"
                        value={testIp}
                        onChange={(e) => setTestIp(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-black hover:bg-slate-800 text-white rounded-2xl text-xs font-semibold active:scale-[0.98] transition-all"
                  >
                    Fire Simulated Purchase Pixel
                  </button>
                </form>

                {/* Pixel Testing status logs */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  {pixelTestStatus === "testing" && (
                    <div className="flex items-center gap-3 text-xs text-slate-500 animate-pulse">
                      <span className="w-4 h-4 border-2 border-[#e15b3e] border-t-transparent rounded-full animate-spin"></span>
                      Attribution matching tests running on sandboxed checkout logs...
                    </div>
                  )}

                  {pixelTestStatus === "success" && pixelResultPayload && (
                    <div className="p-4 bg-green-50 border border-green-200/50 rounded-2xl flex flex-col gap-1.5 text-xs text-green-700 animate-in fade-in duration-200">
                      <p className="font-bold flex items-center gap-1">
                        <IconShieldCheck className="w-4 h-4" /> Pixel Setup Verified!
                      </p>
                      <p className="text-[10px] text-green-600 font-medium">
                        Rippl's SDK pixel code is active. Purchase conversion was successfully captured and attributed.
                      </p>
                      <div className="mt-2 p-3 bg-white/90 border border-green-100 rounded-xl space-y-1 font-mono text-[9px] text-slate-800">
                        <p><span className="text-slate-400">Order ID:</span> {pixelResultPayload.order_id}</p>
                        <p><span className="text-slate-400">Referral Code:</span> {pixelResultPayload.referral_code}</p>
                        <p><span className="text-slate-400">Status:</span> <span className="font-bold uppercase text-slate-900">{pixelResultPayload.status}</span></p>
                        <p>
                          <span className="text-slate-400">Fraud Score:</span>{" "}
                          <span className={pixelResultPayload.fraud_score >= 70 ? "text-red-500 font-bold" : "text-green-600 font-semibold"}>
                            {pixelResultPayload.fraud_score}%
                          </span>
                        </p>
                        {pixelResultPayload.fraud_flags && pixelResultPayload.fraud_flags.length > 0 && (
                          <p><span className="text-slate-400">Fraud Flags:</span> <span className="text-red-500 font-bold">{JSON.stringify(pixelResultPayload.fraud_flags)}</span></p>
                        )}
                        <p><span className="text-slate-400">Commission Earned:</span> ₦{(pixelResultPayload.commission_amount / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  )}

                  {pixelTestStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200/50 rounded-2xl flex flex-col gap-1.5 text-xs text-red-700 animate-in fade-in duration-200">
                      <p className="font-bold flex items-center gap-1">
                        <IconAlertTriangle className="w-4 h-4" /> Pixel Code Not Found
                      </p>
                      <p className="text-[10px] text-red-600 font-medium">
                        Verify if the Javascript snippet is embed on the checkout confirmation page. Verify that the Referral Code Slug matches an active client link.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: Developer configurations (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-4">REST API Credentials</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mb-1">API Key ID</p>
                    <code className="text-[10px] font-mono text-slate-800">pk_live_f89h4q8fha98sfdhuais</code>
                  </div>
                  
                  <form onSubmit={saveWebhookConfig} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                    <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Webhook Endpoint URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://yourserver.com/api/rippl-webhook"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-mono text-[#e15b3e] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isSavingWebhook}
                        className="px-3 bg-black hover:bg-slate-800 text-white rounded-xl text-[9px] font-semibold shrink-0 active:scale-95 transition-all"
                      >
                        {isSavingWebhook ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-100/50 rounded-xl flex items-start gap-2.5 text-[9px] text-green-700 leading-normal">
                <IconShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Attributions are automatically screened for double-cookies and device-spoofing fraud patterns.</span>
              </div>
            </div>

          </div>
        )}

        {/* 6. BILLING & TEAM SUBVIEW (Screen #56/58) */}
        {activeTab === "billing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Left side: Team management (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-1">Team Collaborators</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Manage login permissions and roles (Owner, Finance, Analyst) for your teammates.</p>
                
                <form onSubmit={inviteTeamMember} className="flex gap-2 mb-6">
                  <input
                    type="email"
                    required
                    placeholder="teammate@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option>Marketing Analyst</option>
                    <option>Finance Manager</option>
                  </select>
                  <button type="submit" className="px-4 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-semibold">
                    Invite
                  </button>
                </form>

                <div className="flex flex-col gap-3">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{member.email}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Role: {member.role}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                        member.status === "Active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Subscription Billing meters (5 Cols - Screen #58) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-2">Subscription Details</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Your current usage vs plan limits.</p>
                
                <div className="space-y-4">
                  {/* Meter 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-800">
                      <span className="text-slate-400">Ambassadors Pool:</span>
                      <span>4 / 500 Active</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#e15b3e] h-1 rounded-full" style={{ width: "2%" }}></div>
                    </div>
                  </div>

                  {/* Meter 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-800">
                      <span className="text-slate-400">Monthly Revenue Limit:</span>
                      <span>₦5.18M / ₦10M</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-black h-1 rounded-full" style={{ width: "52%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs mt-6">
                  <div>
                    <p className="font-semibold text-slate-800">Pro Merchant Package</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">₦45,000 / Billed monthly</p>
                  </div>
                  <button className="text-[10px] font-semibold text-[#e15b3e] hover:underline">Change Plan</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1"><IconDownload className="w-3.5 h-3.5" /> Latest invoice</span>
                <span className="font-semibold text-slate-600">July 18, 2026</span>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Fund Reserves Modal (Screen #49) */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm bg-white rounded-[2rem] border border-slate-200/50 shadow-2xl p-6 flex flex-col gap-5 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                <IconWallet className="w-4 h-4 text-[#e15b3e]" />
                Fund Payout Reserves
              </h3>
              <button
                onClick={() => setShowFundModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFundReserves} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Deposit Amount (₦)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  required
                  placeholder="₦ 50,000"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] text-slate-500 leading-normal">
                <strong>Paystack Checkout:</strong> Deposits resolve instantly and credit your merchant reserve balance to keep cashout channels active.
              </div>

              <button
                type="submit"
                disabled={isFunding}
                className="w-full py-3 bg-[#e15b3e] text-white rounded-full text-xs font-semibold shadow-sm flex items-center justify-center gap-1 disabled:opacity-50"
              >
                {isFunding ? "Connecting..." : "Deposit via Paystack"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
