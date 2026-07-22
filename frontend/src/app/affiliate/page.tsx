"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  IconPower,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconShieldCheck,
  IconCertificate,
  IconPhoto,
  IconUserCheck,
  IconTrash,
  IconFingerprint,
  IconCreditCard,
  IconX
} from "@tabler/icons-react";

export default function AffiliateDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "wallet" | "analytics" | "leaderboard" | "security" | "support">("overview");

  // Tab synchronization with URL search parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const validTabs = ["overview", "campaigns", "wallet", "analytics", "leaderboard", "security", "support"];
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

  // Helper to read cookies
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  // State definitions
  const [affiliateId, setAffiliateId] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [campaignsList, setCampaignsList] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [joinSlug, setJoinSlug] = useState<string>("");
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [leaderboardList, setLeaderboardList] = useState<any[]>([]);
  const [ticketsList, setTicketsList] = useState<any[]>([]);
  const [ticketSubject, setTicketSubject] = useState<string>("");
  const [ticketDetails, setTicketDetails] = useState<string>("");
  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  // Fetch functions
  const fetchDashboard = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/affiliate/dashboard?affiliate_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (e) {
      console.error("Failed to load affiliate dashboard", e);
    }
  };

  const fetchCampaigns = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/affiliate/marketplace?affiliate_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setCampaignsList(data);
      }
    } catch (e) {
      console.error("Failed to load marketplace campaigns", e);
    }
  };

  const fetchLeaderboard = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/affiliate/leaderboard?affiliate_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboardList(data);
      }
    } catch (e) {
      console.error("Failed to load leaderboard data", e);
    }
  };

  const fetch2fa = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/user/2fa?user_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setTwoFactorEnabled(data.enabled);
      }
    } catch (e) {
      console.error("Failed to load 2FA status", e);
    }
  };

  const fetchTickets = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/support/tickets?user_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setTicketsList(data);
      }
    } catch (e) {
      console.error("Failed to load support tickets", e);
    }
  };

  useEffect(() => {
    const id = getCookie("user_id") || "affiliate-user-uuid-1111";
    setAffiliateId(id);
    setIsLoadingData(true);
    
    Promise.all([
      fetchDashboard(id),
      fetchCampaigns(id),
      fetchLeaderboard(id),
      fetch2fa(id),
      fetchTickets(id),
      fetchOnboardingProgress(id)
    ]).finally(() => {
      setIsLoadingData(false);
    });
  }, []);

  const handleJoinCampaign = async (campaignId: string) => {
    if (!joinSlug) {
      alert("Please enter a custom referral link slug.");
      return;
    }
    setIsJoining(true);
    try {
      const res = await fetch("http://localhost:8080/api/affiliate/link/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliate_id: affiliateId,
          campaign_id: campaignId,
          code: joinSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to join campaign");
      }
      
      alert("Referral link generated successfully!");
      setJoinSlug("");
      await fetchCampaigns(affiliateId);
      await fetchDashboard(affiliateId);
      
      // Update selected campaign reference
      const updatedCampaign = campaignsList.find(c => c.id === campaignId);
      if (updatedCampaign) {
        setSelectedCampaign({ ...updatedCampaign, referral_code: joinSlug });
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setIsJoining(false);
    }
  };

  const renderLogoIcon = (logoStr: string) => {
    switch (logoStr) {
      case "🛍":
        return <IconBriefcase className="w-5 h-5 text-slate-600" />;
      case "🌊":
        return <IconBuildingBank className="w-5 h-5 text-slate-600" />;
      case "🐷":
        return <IconWallet className="w-5 h-5 text-slate-600" />;
      case "💳":
        return <IconCreditCard className="w-5 h-5 text-slate-600" />;
      default:
        return <IconBriefcase className="w-5 h-5 text-slate-600" />;
    }
  };
  
  // Guided Onboarding Checklist States
  const [checklist, setChecklist] = useState({
    profile: true,
    phone: false,
    campaign: false,
    share: false,
    kyc: false,
    withdraw: false
  });

  const fetchOnboardingProgress = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/user/onboarding?user_id=${id}`);
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
      await fetch("http://localhost:8080/api/user/onboarding", {
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
    saveOnboardingProgress(affiliateId, updated);
  };

  const onboardingProgress = useMemo(() => {
    const steps = Object.values(checklist);
    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }, [checklist]);

  // Campaign Marketplace states
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [utmSource, setUtmSource] = useState("whatsapp");
  const [utmMedium, setUtmMedium] = useState("social");
  const [copiedLink, setCopiedLink] = useState(false);

  // Link analytics preview toggle
  const generatedLink = useMemo(() => {
    if (!selectedCampaign) return "";
    if (!selectedCampaign.referral_code) return "Unregistered Campaign";
    return `http://localhost:3000/r/${selectedCampaign.referral_code}?utm_source=${utmSource}&utm_medium=${utmMedium}`;
  }, [selectedCampaign, utmSource, utmMedium]);

  // Dynamic Traffic source analyzer
  const trafficSources = useMemo(() => {
    if (!dashboardData || !dashboardData.conversions || dashboardData.conversions.length === 0) {
      return [
        { source: "WhatsApp Channel Referrals", pct: "60%", value: "₦0.00" },
        { source: "Twitter / X Referrals", pct: "30%", value: "₦0.00" },
        { source: "Direct Traffic Referrals", pct: "10%", value: "₦0.00" }
      ];
    }
    const sourcesMap: Record<string, number> = {};
    let totalVal = 0;
    
    dashboardData.conversions.forEach((c: any) => {
      const src = c.utm_source || "direct";
      sourcesMap[src] = (sourcesMap[src] || 0) + c.commission_amount;
      totalVal += c.commission_amount;
    });

    if (totalVal === 0) {
      return [
        { source: "Direct Traffic Referrals", pct: "100%", value: "₦0.00" }
      ];
    }

    return Object.entries(sourcesMap).map(([source, val]) => {
      const pct = Math.round((val / totalVal) * 100);
      const name = source.charAt(0).toUpperCase() + source.slice(1);
      return {
        source: `${name} Referrals`,
        pct: `${pct}%`,
        value: `₦${(val / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
      };
    });
  }, [dashboardData]);

  // Progressive KYC Modal states
  const [showKycModal, setShowKycModal] = useState(false);
  const [kycStep, setKycStep] = useState<"bvn" | "verify" | "upload" | "selfie" | "success">("bvn");

  // Listen to Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowKycModal(false);
      }
    };
    if (showKycModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showKycModal]);
  const [bvnNumber, setBvnNumber] = useState("");
  const [kycLevel, setKycLevel] = useState<"Tier 2" | "Tier 3">("Tier 2");

  // Bank resolve and cashout states
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPin, setWithdrawPin] = useState("");
  const [savedBank, setSavedBank] = useState({ name: "Access Bank", number: "1029384756", holder: "Dwayne Tatum" });
  const [withdrawStep, setWithdrawStep] = useState<"form" | "confirm" | "success">("form");
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);

  // Security sessions manager states
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: "macOS Sequoia", browser: "Chrome", location: "Lagos, NG", current: true },
    { id: 2, device: "iPhone 15 Pro", browser: "Safari", location: "Abuja, NG", current: false },
    { id: 3, device: "Windows 11", browser: "Edge", location: "Enugu, NG", current: false }
  ]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2faSetup, setShow2faSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // Notification center states
  const [showNotifications, setShowNotifications] = useState(false);

  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Chinedu Okafor", conversions: 480, earnings: "₦1,840,000", badge: "Platinum", active: false },
    { rank: 2, name: "Funmi Alao", conversions: 198, earnings: "₦780,000", badge: "Gold", active: false },
    { rank: 3, name: "Aisha Bello", conversions: 62, earnings: "₦240,000", badge: "Silver", active: false },
    { rank: 4, name: "Dwayne Tatum (You)", conversions: 48, earnings: "₦81,450", badge: "Silver", active: true },
    { rank: 5, name: "Tunde Bakare", conversions: 24, earnings: "₦36,000", badge: "Bronze", active: false }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    updateChecklist("share", true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleVerifyBvn = (e: React.FormEvent) => {
    e.preventDefault();
    setKycStep("verify");
    setTimeout(() => {
      setKycStep("upload");
    }, 2000);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawStep === "form") {
      setWithdrawStep("confirm");
    } else if (withdrawStep === "confirm") {
      if (withdrawPin !== "1234") {
        alert("Invalid security PIN. Try entering '1234'.");
        return;
      }
      setIsProcessingWithdraw(true);
      try {
        const res = await fetch("http://localhost:8080/api/affiliate/withdraw", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            affiliate_id: affiliateId,
            amount: Number(withdrawAmount) * 100, // convert Naira to kobo
            pin: withdrawPin,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Withdrawal request failed");
        }

        // Reload data
        await fetchDashboard(affiliateId);

        setWithdrawStep("success");
        updateChecklist("withdraw", true);
      } catch (err: any) {
        alert(err.message || "Unable to complete cashout.");
      } finally {
        setIsProcessingWithdraw(false);
      }
    }
  };

  const handleRevokeSession = (id: number) => {
    setActiveSessions(activeSessions.filter(s => s.id !== id));
  };

  const handleSetup2fa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/user/2fa/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: affiliateId, enable: true }),
      });
      if (res.ok) {
        setTwoFactorEnabled(true);
        setShow2faSetup(false);
        setVerificationCode("");
        alert("Two-Factor Authentication enabled successfully!");
      }
    } catch (err) {
      console.error("Failed to enable 2FA", err);
    }
  };

  const handleDisable2fa = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user/2fa/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: affiliateId, enable: false }),
      });
      if (res.ok) {
        setTwoFactorEnabled(false);
        alert("Two-Factor Authentication disabled.");
      }
    } catch (err) {
      console.error("Failed to disable 2FA", err);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDetails) {
      alert("Please fill in both subject and details.");
      return;
    }
    setIsSubmittingTicket(true);
    try {
      const res = await fetch("http://localhost:8080/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: affiliateId,
          subject: ticketSubject,
          details: ticketDetails,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to raise support ticket");
      }
      setTicketsList([data, ...ticketsList]);
      setTicketSubject("");
      setTicketDetails("");
      alert("Support ticket raised successfully!");
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  return (
    <div className="h-screen bg-[#edf1f5] flex font-sans antialiased text-slate-800 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200/50 flex flex-col justify-between p-6 shrink-0 z-30 h-full">
        <div className="space-y-8">
          {/* Brand header */}
          <Link href="/" className="flex items-center">
            <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-8 w-auto" />
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Dashboard", Icon: IconUsers },
              { id: "campaigns", label: "Marketplace", Icon: IconBriefcase },
              { id: "wallet", label: "Wallet & Cashout", Icon: IconWallet },
              { id: "analytics", label: "Analytics", Icon: IconReportAnalytics },
              { id: "leaderboard", label: "Leaderboard", Icon: IconCertificate },
              { id: "security", label: "Security Settings", Icon: IconLock },
              { id: "support", label: "Help & Support", Icon: IconHelp }
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
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
              <p className="text-[9px] text-slate-400 font-light uppercase tracking-wider leading-tight">
                {kycLevel} Verified
              </p>
            </div>
          </div>
          <Link
            href="/auth?logout=true"
            onClick={() => {
              document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 flex items-center justify-center gap-2 text-[10px] font-bold transition-all"
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

            {/* Notifications Toggle */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200/50 shadow-sm relative active:scale-95 transition-all text-slate-700"
            >
              <IconBell className="w-4 h-4" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#e15b3e]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
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

        {/* 1. OVERVIEW SUBVIEW (includes guided checklist) */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            
            {/* Guided Onboarding Checklist Widget */}
            <div className="bg-white border border-slate-200/50 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-1.5">
                    Onboarding Progress
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
                    { key: "profile", label: "Complete Profile" },
                    { key: "phone", label: "Verify Phone" },
                    { key: "campaign", label: "Browse Marketplace" },
                    { key: "share", label: "Share First Link" },
                    { key: "kyc", label: "Verify Identity" },
                    { key: "withdraw", label: "Request Cashout" }
                  ].map((step) => {
                    const isDone = (checklist as any)[step.key];
                    return (
                      <button
                        key={step.key}
                        onClick={() => {
                          updateChecklist(step.key as any, !isDone);
                        }}
                        className={`px-3 py-2 rounded-xl border text-[10px] font-semibold text-left transition-all active:scale-[0.98] flex items-center justify-between ${
                          isDone
                            ? "border-green-200 bg-green-50/50 text-green-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <span>{step.label}</span>
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          isDone ? "bg-green-600 text-white" : "bg-slate-100 text-slate-400"
                        }`}>
                          {isDone ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Wallet Balances Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pending Audit</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  ₦{dashboardData ? (dashboardData.pending_balance / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <p className="text-[9px] text-slate-400 font-medium">Under active review checks</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Clearing Ledger</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">
                  ₦{dashboardData ? (dashboardData.clearing_balance / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <p className="text-[9px] text-slate-400 font-medium">Fraud-cleared; clearing phase</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Cleared & Available</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">
                  ₦{dashboardData ? (dashboardData.cleared_balance / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 }) : "0.00"}
                </p>
                <button
                  onClick={() => setActiveTab("wallet")}
                  className="mt-2 text-left text-[10px] font-semibold text-[#e15b3e] hover:underline flex items-center gap-0.5"
                >
                  Cash out now &rarr;
                </button>
              </div>
            </div>

            {/* Conversational helper banner */}
            <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  Need custom marketing assets? <IconSparkles className="w-5 h-5 text-slate-600" />
                </h2>
                <p className="text-xs text-slate-400 font-light">Browse the campaign list and download branding banners per campaign.</p>
              </div>
              
              <button
                onClick={() => setActiveTab("campaigns")}
                className="px-5 py-2.5 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Browse Campaigns
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
                      {(dashboardData?.conversions || []).map((ref: any) => (
                        <tr key={ref.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-slate-800">{ref.order_id}</td>
                          <td className="py-3 text-slate-500">{ref.campaign_name}</td>
                          <td className="py-3 font-semibold text-slate-900">
                            ₦{(ref.commission_amount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                              ref.status === "cleared" || ref.status === "approved" || ref.status === "paid" ? "bg-green-50 text-green-600" :
                              ref.status === "clearing" ? "bg-blue-50 text-blue-600" :
                              ref.status === "pending" ? "bg-yellow-50 text-yellow-600" :
                              "bg-red-50 text-red-600"
                            }`}>
                              {ref.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-slate-400 font-medium">
                            {new Date(ref.converted_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                          </td>
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
                      <span className="text-[8px] font-medium text-slate-400">Clicks ({dashboardData?.total_clicks || 0})</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-4 h-12 bg-slate-100 rounded-full relative">
                        <span className="absolute bottom-0 w-4 h-8 bg-[#e15b3e]/60 rounded-full"></span>
                      </span>
                      <span className="text-[8px] font-medium text-slate-400">Claims ({dashboardData?.total_conversions || 0})</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-4 h-12 bg-slate-100 rounded-full relative">
                        <span className="absolute bottom-0 w-4 h-3 bg-[#e15b3e] rounded-full"></span>
                      </span>
                      <span className="text-[8px] font-medium text-slate-400">
                        Approved ({(dashboardData?.conversions || []).filter((c: any) => c.status === "approved" || c.status === "paid").length})
                      </span>
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

        {/* 2. CAMPAIGNS & MARKETPLACE SUBVIEW (Includes campaign assets & details) */}
        {activeTab === "campaigns" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side: Campaign Marketplace List (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Search filter banner */}
              <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex-1 relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search marketplace campaigns ..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#e15b3e]"
                  />
                </div>
              </div>

              {/* Campaign list database */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignsList.map((c) => {
                  const logoStr = c.commission_type === "percentage" ? "🛍" : "🌊";
                  const commissionLabel = c.commission_type === "percentage" 
                    ? `${c.commission_value}%` 
                    : `₦${(c.commission_value / 100).toLocaleString()} flat`;
                  
                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCampaign(c);
                        updateChecklist("campaign", true);
                      }}
                      className={`bg-white rounded-[2rem] p-5 border shadow-sm flex flex-col justify-between min-h-[170px] cursor-pointer hover:shadow-md transition-all ${
                        selectedCampaign?.id === c.id ? "border-[#e15b3e] ring-1 ring-[#e15b3e]" : "border-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                          {renderLogoIcon(logoStr)}
                        </span>
                        <span className="text-[10px] font-bold text-[#e15b3e]">{commissionLabel}</span>
                      </div>

                      <div className="my-2">
                        <h4 className="font-semibold text-xs text-slate-800 leading-tight">{c.name}</h4>
                        <p className="text-[9px] text-slate-400 mt-1">Cookie Window: {c.cookie_duration_days} Days • {c.commission_type.toUpperCase()}</p>
                      </div>

                      <span className="text-[9px] font-semibold text-[#e15b3e] hover:underline flex items-center gap-0.5 self-start">
                        {c.referral_code ? "Configure & share" : "Join Campaign"} &rarr;
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right side: Detailed Campaign Assets Expansion (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[480px]">
              {selectedCampaign ? (
                <div className="flex flex-col gap-5 text-left h-full justify-between">
                  <div className="space-y-4">
                    {/* Header detail */}
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <span className="w-10 h-10 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center shrink-0">
                        {renderLogoIcon(selectedCampaign.commission_type === "percentage" ? "🛍" : "🌊")}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">{selectedCampaign.name}</h4>
                        <p className="text-[9px] text-slate-400 font-medium">
                          Payout Rate: {selectedCampaign.commission_type === "percentage" 
                            ? `${selectedCampaign.commission_value}%` 
                            : `₦${(selectedCampaign.commission_value / 100).toLocaleString()} flat`}
                        </p>
                      </div>
                    </div>

                    {/* Campaign description */}
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Campaign Overview</p>
                      <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-1">
                        {selectedCampaign.desc}
                      </p>
                    </div>

                    {/* Downloadable marketing assets/creatives */}
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2">Creatives & Banners</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-between text-[10px] text-slate-600">
                          <span className="flex items-center gap-1"><IconPhoto className="w-3.5 h-3.5 text-slate-400" /> Banner 300x250</span>
                          <button className="text-[#e15b3e] font-semibold hover:underline">DL</button>
                        </div>
                        <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-between text-[10px] text-slate-600">
                          <span className="flex items-center gap-1"><IconPhoto className="w-3.5 h-3.5 text-slate-400" /> Header 728x90</span>
                          <button className="text-[#e15b3e] font-semibold hover:underline">DL</button>
                        </div>
                      </div>
                    </div>

                    {/* Pre-written Copy templates */}
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Social Copy Script</p>
                      <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl text-[10px] text-slate-500 italic mt-1 leading-normal relative group">
                        "Hey guys! Setup your online storefront in Nigeria in under 10 minutes using Rippl and Shopify. Use my code to launch free today!"
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`"Hey guys! Setup your online storefront in Nigeria in under 10 minutes using Rippl and Shopify. Use my code to launch free today!"`);
                            alert("Copy script copied!");
                          }}
                          className="absolute right-2 bottom-2 text-[#e15b3e] font-bold hover:underline"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    {/* UTM Link customizations */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Custom tracking variables</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">UTM Source</label>
                          <input
                            type="text"
                            value={utmSource}
                            onChange={(e) => setUtmSource(e.target.value)}
                            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px]"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] text-slate-400 font-semibold uppercase tracking-wider">UTM Medium</label>
                          <input
                            type="text"
                            value={utmMedium}
                            onChange={(e) => setUtmMedium(e.target.value)}
                            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button / Join block */}
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    {selectedCampaign.referral_code ? (
                      <>
                        <p className="text-[9px] text-slate-400 font-medium leading-none mb-2">Configure & Copy UTM Link</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={generatedLink}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-500 focus:outline-none"
                          />
                          <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1.5 shrink-0"
                          >
                            {copiedLink ? <IconCheck className="w-3.5 h-3.5 text-green-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                            {copiedLink ? "Copied" : "Copy Link"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Choose Custom Referral Slug</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-[10px] text-slate-500 font-bold flex items-center justify-center shrink-0">
                            rippl.io/r/
                          </span>
                          <input
                            type="text"
                            placeholder="my-promo-code"
                            value={joinSlug}
                            onChange={(e) => setJoinSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                          <button
                            onClick={() => handleJoinCampaign(selectedCampaign.id)}
                            disabled={isJoining}
                            className="px-4 py-2 bg-[#e15b3e] hover:bg-[#c9492e] disabled:bg-slate-400 text-white rounded-xl text-[10px] font-semibold flex items-center justify-center shrink-0"
                          >
                            {isJoining ? "Generating..." : "Join & Generate"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-12 gap-2">
                  <IconBriefcase className="w-10 h-10 text-slate-300" />
                  <p className="text-xs font-semibold">Select a campaign to configure assets</p>
                  <p className="text-[10px] text-slate-400 font-light max-w-xs">Details, pre-written copy scripts, and customizable links will show up here.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 3. WALLET & CASHOUT SUBVIEW (Includes KYC triggers) */}
        {activeTab === "wallet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side: Cashout form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px] hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-2">Request Cashout</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Cleared available earnings are transferred directly to your bank.</p>
                
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
                        max={dashboardData ? Math.floor(dashboardData.cleared_balance / 100) : 0}
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
                          <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                            <IconBuildingBank className="w-4 h-4" />
                          </span>
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
                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200/50 pt-2 font-medium">
                        <span>WHT Withholding (5%):</span>
                        <span>- ₦{(Number(withdrawAmount) * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold text-sm border-t border-slate-200/50 pt-2">
                        <span className="text-slate-800">Net Payout:</span>
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
                    <span className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <IconCheck className="w-6 h-6" />
                    </span>
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
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200/40 pt-2 mt-1 font-medium">
                    <span>Account Number:</span>
                    <span>1029384756</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200/40 pt-2 font-medium">
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
                    <h4 className="font-semibold text-xs text-slate-800">Standard KYC {kycLevel}</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                      {kycLevel === "Tier 2"
                        ? "Your identity has been verified via basic BVN records. Daily cashout limit: ₦1,000,000."
                        : "Enhanced KYC verified via government ID and liveness check. Unlimited daily cashouts."}
                    </p>
                  </div>
                </div>
                {kycLevel === "Tier 2" && (
                  <button
                    onClick={() => { setKycStep("bvn"); setShowKycModal(true); }}
                    className="w-full mt-2 py-1.5 rounded-xl bg-[#fcece9] text-[#e15b3e] text-[10px] font-semibold hover:bg-[#fbdcd4] transition-colors"
                  >
                    Upgrade KYC Limits
                  </button>
                )}
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
                  {trafficSources.map((src, i) => (
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
                    <span className="font-semibold text-green-600">
                      {dashboardData && dashboardData.total_clicks > 0
                        ? ((dashboardData.total_conversions / dashboardData.total_clicks) * 100).toFixed(1) + "%"
                        : "3.2%"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-slate-50 pt-3">
                    <span className="text-slate-500">Disputed/Reversed Payouts:</span>
                    <span className="font-semibold text-red-500">
                      {dashboardData && dashboardData.total_conversions > 0
                        ? ((dashboardData.conversions.filter((c: any) => c.status === "rejected").length / dashboardData.total_conversions) * 100).toFixed(1) + "%"
                        : "0.0%"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 5. LEADERBOARD SUBVIEW (New tab) */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow animate-in fade-in duration-200">
            <div>
              <h3 className="font-semibold text-sm text-slate-800">Affiliate Leaderboard rankings</h3>
              <p className="text-xs text-slate-400 font-light mt-1">Gamified rankings calculated MTD. Boost conversions to achieve Platinum badge rewards.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Rank</th>
                    <th className="pb-3">Ambassador</th>
                    <th className="pb-3 text-center">Conversions</th>
                    <th className="pb-3">MTD Cleared Earnings</th>
                    <th className="pb-3 text-right">Badge Level</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardList.map((user) => (
                    <tr
                      key={user.rank}
                      className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/50 ${
                        user.active ? "bg-[#fcece9]/40 border-l-4 border-l-[#e15b3e]" : ""
                      }`}
                    >
                      <td className="py-3.5 font-bold text-slate-800 text-xs">#{user.rank}</td>
                      <td className="py-3.5 font-semibold text-slate-800">
                        {user.name} {user.active && <span className="text-[9px] bg-[#e15b3e] text-white px-1.5 py-0.5 rounded-full font-bold ml-1">You</span>}
                      </td>
                      <td className="py-3.5 text-center text-slate-600 font-semibold">{user.conversions}</td>
                      <td className="py-3.5 font-semibold text-[#e15b3e]">{user.earnings}</td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider ${
                          user.badge === "Platinum" ? "bg-purple-50 text-purple-600" :
                          user.badge === "Gold" ? "bg-amber-50 text-amber-600" :
                          user.badge === "Silver" ? "bg-slate-100 text-slate-600" :
                          "bg-orange-50 text-orange-600"
                        }`}>
                          {user.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. SECURITY & SESSIONS MANAGER SUBVIEW (New tab) */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-200">
            
            {/* Left side: Active sessions list (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-1">Active Login Sessions</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Inspect and revoke active credentials currently signed in under your account.</p>
                
                <div className="flex flex-col gap-3">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {session.device.includes("iPhone") ? (
                          <IconDeviceMobile className="w-5 h-5 text-slate-400" />
                        ) : (
                          <IconDeviceLaptop className="w-5 h-5 text-slate-400" />
                        )}
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {session.device} • {session.browser}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-0.5">Location: {session.location}</p>
                        </div>
                      </div>

                      {session.current ? (
                        <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Current
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="px-2.5 py-1 rounded-full border border-slate-200 hover:bg-red-50 hover:text-red-500 text-[10px] font-semibold text-slate-500 transition-colors"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: 2FA controls (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div>
                <h3 className="font-semibold text-sm text-slate-800 mb-2">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs text-slate-400 font-light mb-6">Require a Google Authenticator TOTP verification token on log in.</p>
                
                {twoFactorEnabled ? (
                  <div className="p-4 bg-green-50 border border-green-100/50 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-green-700">
                      <IconShieldCheck className="w-4 h-4" />
                      2FA Enabled
                    </div>
                    <p className="text-[10px] text-green-600 leading-normal font-medium">
                      Your credentials are secure. Standard cashouts now verify with MFA prompts.
                    </p>
                    <button
                      onClick={handleDisable2fa}
                      className="mt-2 text-left text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Disable Two-Factor Auth
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => setShow2faSetup(true)}
                      className="w-full py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      Configure 2FA Setup
                    </button>

                    {show2faSetup && (
                      <form onSubmit={handleSetup2fa} className="space-y-3 pt-3 border-t border-slate-150 animate-in fade-in duration-200">
                        <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                          {/* Simulated QR Code */}
                          <div className="w-24 h-24 bg-slate-200 border-2 border-white rounded-lg flex items-center justify-center font-bold text-slate-500 text-[10px] shadow-sm">
                            [ Mock QR Code ]
                          </div>
                          <code className="text-[8px] font-mono text-slate-400">KEY: RPL-2918-FA98-MFA</code>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Verification Token</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center tracking-widest focus:outline-none focus:border-[#e15b3e]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-[#e15b3e] text-white rounded-xl text-xs font-semibold"
                        >
                          Enable Two-Factor Auth
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 7. SUPPORT SUBVIEW */}
        {/* 7. SUPPORT HELP CENTRE SUBVIEW (New tab) */}
        {activeTab === "support" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Open tickets list (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm text-slate-800 mb-4">Your Support Tickets</h3>
              <div className="flex flex-col gap-3">
                {ticketsList.map((ticket) => (
                  <div key={ticket.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-start cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">{ticket.subject}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Ticket #{ticket.id} • {ticket.created_at}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold uppercase tracking-wider ${
                      ticket.status === "Resolved" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Raise new ticket details form (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <form onSubmit={handleSubmitTicket} className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 mb-2">Raise Support Ticket</h3>
                  <p className="text-[10px] text-slate-400 font-light mb-4">Describe the issue and our operations team will respond inside 24 hours.</p>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delayed cashout request"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Details</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Enter specific transaction details or links..."
                        value={ticketDetails}
                        onChange={(e) => setTicketDetails(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="w-full mt-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {isSubmittingTicket ? "Submitting..." : "Submit Ticket"}
                </button>
              </form>
            </div>

          </div>
        )}

      </main>

      {/* Progressive KYC Modal Popup (Matches Screen #27 specifications) */}
      {showKycModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200/50 shadow-2xl p-6 flex flex-col gap-5 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                <IconFingerprint className="w-4 h-4 text-[#e15b3e]" />
                KYC Identity Verification
              </h3>
              <button
                onClick={() => setShowKycModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* KYC Step 1: BVN Input */}
            {kycStep === "bvn" && (
              <form onSubmit={handleVerifyBvn} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">11-Digit Bank Verification Number (BVN)</label>
                  <input
                    type="text"
                    required
                    maxLength={11}
                    placeholder="22283948571"
                    value={bvnNumber}
                    onChange={(e) => setBvnNumber(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none"
                  />
                </div>
                <p className="text-[9px] text-slate-400 leading-normal">
                  Verification runs secure Dojah node query logs matching your banking records. Rippl does not store your BVN.
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e15b3e] text-white rounded-full text-xs font-semibold shadow-sm"
                >
                  Verify BVN Identity
                </button>
              </form>
            )}

            {/* KYC Step 2: Dojah verification loader */}
            {kycStep === "verify" && (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <span className="w-10 h-10 border-3 border-[#e15b3e] border-t-transparent rounded-full animate-spin"></span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">Querying Banking Databases</h4>
                  <p className="text-[9px] text-slate-400 mt-1">Authenticating BVN parameters via secure Dojah nodes...</p>
                </div>
              </div>
            )}

            {/* KYC Step 3: Government ID Photo Upload */}
            {kycStep === "upload" && (
              <div className="space-y-4 text-left">
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-[9px] text-green-700 leading-normal font-medium">
                  ✓ BVN Matched: Dwayne Tatum. Please upload matching identity card photo.
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Government ID Type</label>
                  <select className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <option>NIN Slip</option>
                    <option>Driver's License</option>
                    <option>Voters Card</option>
                  </select>
                </div>

                <div className="h-28 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                  <IconPhoto className="w-8 h-8 text-slate-300" />
                  <span className="text-[10px] font-semibold mt-1">Upload Photo of Card</span>
                </div>

                <button
                  onClick={() => setKycStep("selfie")}
                  className="w-full py-3 bg-[#e15b3e] text-white rounded-full text-xs font-semibold"
                >
                  Continue to Liveness Check
                </button>
              </div>
            )}

            {/* KYC Step 4: Liveness Selfie upload */}
            {kycStep === "selfie" && (
              <div className="space-y-4 text-center">
                <h4 className="font-semibold text-slate-800 text-xs">Liveness Verification Check</h4>
                <p className="text-[9px] text-slate-400">Position your face inside the circle and blink to confirm identity.</p>
                
                <div className="w-32 h-32 rounded-full border-4 border-[#e15b3e] bg-slate-100 mx-auto flex items-center justify-center font-bold text-slate-400 text-[10px]">
                  [ Webcam Active ]
                </div>

                <button
                  onClick={() => {
                    setKycStep("success");
                    setKycLevel("Tier 3");
                    updateChecklist("kyc", true);
                  }}
                  className="w-full py-3 bg-black text-white rounded-full text-xs font-semibold"
                >
                  Confirm Selfie Match
                </button>
              </div>
            )}

            {/* KYC Step 5: Success check */}
            {kycStep === "success" && (
              <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                <span className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <IconCheck className="w-6 h-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">Enhanced Verification Submitted</h4>
                  <p className="text-[9px] text-slate-400 mt-1 max-w-xs leading-normal">
                    Your Tier 3 verification is approved! Cashout limits are now set to unlimited transfers.
                  </p>
                </div>
                <button
                  onClick={() => setShowKycModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold hover:bg-slate-200"
                >
                  Close Modal
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
