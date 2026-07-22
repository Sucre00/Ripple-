"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config";
import {
  IconBuildingBank,
  IconArrowRight,
  IconLock,
  IconMail,
  IconUsers,
  IconBriefcase,
  IconFingerprint,
  IconBrandGoogle,
  IconArrowLeft,
  IconCloudUpload,
  IconChevronRight,
  IconChevronLeft,
  IconCreditCard,
  IconCheck,
  IconDeviceMobile,
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconRefresh,
  IconShieldCheck,
  IconEye,
  IconEyeOff
} from "@tabler/icons-react";

type AuthMode = "login" | "signup" | "forgot_password" | "suspended" | "session_expired";
type Role = "affiliate" | "business_admin" | "super_admin";

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<Role>("affiliate");

  // Password visibility states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const setRoleCookieAndPush = (r: Role, path: string, id?: string) => {
    document.cookie = `user_role=${r}; path=/; max-age=86400; SameSite=Lax`;
    if (id) {
      document.cookie = `user_id=${id}; path=/; max-age=86400; SameSite=Lax`;
    }
    router.push(path);
  };

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);

  // Login specific
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // Business Onboarding Steps (1: Basic, 2: CAC Verification, 3: Plan, 4: Payment)
  const [bizStep, setBizStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "pro">("growth");
  const [uploadedCacFile, setUploadedCacFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Paystack Mock payment details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paystackOtp, setPaystackOtp] = useState("");
  const [showPaystackOtpModal, setShowPaystackOtpModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Affiliate Onboarding Steps (1: Basic, 2: Niche, 3: Bank Routing)
  const [affStep, setAffStep] = useState(1);
  const [niche, setNiche] = useState("fintech");
  const [bankCode, setBankCode] = useState("011"); // First Bank
  const [accountNumber, setAccountNumber] = useState("");
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const [isResolvingBank, setIsResolvingBank] = useState(false);

  // Forgot password
  const [forgotStep, setForgotStep] = useState(1); // 1: request, 2: verify code, 3: reset pass, 4: success
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Suspension information appeal states
  const [appealText, setAppealText] = useState("");
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  const planPricing = {
    starter: "₦15,000",
    growth: "₦45,000",
    pro: "₦120,005"
  };

  const planNames = {
    starter: "Starter Plan",
    growth: "Growth Plan",
    pro: "Pro Plan"
  };

  const bankList = [
    { code: "011", name: "First Bank of Nigeria" },
    { code: "058", name: "Guaranty Trust Bank (GTB)" },
    { code: "035", name: "Wema Bank" },
    { code: "057", name: "Zenith Bank" },
    { code: "033", name: "United Bank for Africa (UBA)" },
    { code: "070", name: "Fidelity Bank" }
  ];

  // Resolve bank account details dummy resolver
  useEffect(() => {
    if (accountNumber.length === 10) {
      setIsResolvingBank(true);
      setResolvedAccountName("");
      const timer = setTimeout(() => {
        setIsResolvingBank(false);
        setResolvedAccountName("DWAYNE TATUM");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setResolvedAccountName("");
    }
  }, [accountNumber]);

  // Handle mock file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedCacFile(fileName);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
    }
  };

  // Switcher to direct to mock triggers
  const handleDirectTrigger = (mode: AuthMode) => {
    setErrorMsg("");
    setAuthMode(mode);
  };

  // Google Login mockup
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const path = role === "affiliate" ? "/affiliate" : role === "business_admin" ? "/business-admin" : "/super-admin";
      const id = role === "affiliate" ? "affiliate-user-uuid-1111" : role === "business_admin" ? "business-user-uuid-2222" : "superadmin-user-uuid-3333";
      setRoleCookieAndPush(role, path, id);
    }, 1200);
  };

  // OTP login SMS verification mockup
  const handleSendOtp = async () => {
    if (!phone) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setOtpSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otpCode, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      
      const path = data.role === "affiliate" ? "/affiliate" : data.role === "business_admin" ? "/business-admin" : "/super-admin";
      setRoleCookieAndPush(data.role, path, data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid OTP code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Unified login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Keep the mock suspension/expired account overrides for testing
    if (email.includes("suspended")) {
      setTimeout(() => {
        setIsLoading(false);
        setAuthMode("suspended");
      }, 1000);
      return;
    }
    if (email.includes("expired")) {
      setTimeout(() => {
        setIsLoading(false);
        setAuthMode("session_expired");
      }, 1000);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");

      const path = data.role === "affiliate" ? "/affiliate" : data.role === "business_admin" ? "/business-admin" : "/super-admin";
      setRoleCookieAndPush(data.role, path, data.id);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid email, password or unauthorized role.");
    } finally {
      setIsLoading(false);
    }
  };

  // Affiliate Signup step logic
  const handleAffiliateNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (affStep === 1) {
      setAffStep(2);
    } else if (affStep === 2) {
      setAffStep(3);
    } else {
      setIsLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            phone,
            name,
            role: "affiliate",
            niche,
            bank_code: bankCode,
            account_number: accountNumber,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");

        setRoleCookieAndPush("affiliate", "/affiliate", data.id);
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to create affiliate profile.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Business Signup step logic
  const handleBusinessNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (bizStep === 1) {
      setBizStep(2);
    } else if (bizStep === 2) {
      if (!uploadedCacFile || !cacNumber) {
        setErrorMsg("Please enter a CAC registration number and upload your certificate.");
        return;
      }
      setErrorMsg("");
      setBizStep(3);
    } else if (bizStep === 3) {
      setBizStep(4);
    }
  };

  // Mock Paystack Payment completion
  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowPaystackOtpModal(true);
    }, 1500);
  };

  const handleConfirmPaystackOtp = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          phone: phone || "+2348000000000",
          name: businessName,
          role: "business_admin",
          business_name: businessName,
          cac_number: cacNumber,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setShowPaystackOtpModal(false);
      setPaymentDone(true);
      setTimeout(() => {
        setRoleCookieAndPush("business_admin", "/business-admin", data.id);
      }, 2000);
    } catch (err: any) {
      setShowPaystackOtpModal(false);
      setErrorMsg(err.message || "Activation validation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password flows
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (forgotStep === 1) {
        setForgotStep(2);
      } else if (forgotStep === 2) {
        if (resetCode !== "1234") {
          setErrorMsg("Invalid code. Use '1234' for resetting.");
          return;
        }
        setErrorMsg("");
        setForgotStep(3);
      } else if (forgotStep === 3) {
        setForgotStep(4);
      }
    }, 1500);
  };

  // Submit appeal suspends
  const handleAppealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/appeal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "suspended@rippl.io", reason: appealText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Appeal request failed");
      setAppealSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit appeal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] flex items-center justify-center font-sans antialiased text-slate-800 selection:bg-[#e15b3e]/20 selection:text-[#e15b3e] p-4 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#e15b3e]/5 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-slate-400/10 blur-3xl -z-10 pointer-events-none"></div>

      {/* Main card grid */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] border border-slate-200/50 shadow-2xl overflow-hidden min-h-[600px] grid grid-cols-1 md:grid-cols-12">
        
        {/* Left pane - brand showcase (desktop only) */}
        <div className="hidden md:flex md:col-span-5 bg-black p-10 flex-col justify-between text-slate-400 relative">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#e15b3e]/5 blur-3xl -z-10 pointer-events-none"></div>

          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-2xl">
              <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-6 w-auto" />
            </Link>
            
            <div className="pt-8 space-y-4">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider">
                Milestone Update
              </span>
              <h2 className="text-2xl font-bold text-white leading-tight">
                ₦1.2 Billion in payout commissions processed.
              </h2>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Join thousands of verified digital brand creators, retail partners, and local businesses managing automatic payments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Trust Anchors Indicators */}
            <div className="space-y-3 pt-6 border-t border-slate-900/60">
              <div className="flex items-center gap-2">
                <IconShieldCheck className="w-4 h-4 text-[#e15b3e]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  CBN Compliance Audited
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed">
                Rippl uses strict regulatory routing standards, secure BVN encryption algorithms, and NDPR compliance protocols.
              </p>
            </div>
            
            <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <button onClick={() => handleDirectTrigger("session_expired")} className="hover:text-[#e15b3e] transition-colors">
                [Expired Demo]
              </button>
              <button onClick={() => handleDirectTrigger("suspended")} className="hover:text-[#e15b3e] transition-colors">
                [Suspended Demo]
              </button>
            </div>
          </div>
        </div>

        {/* Right pane - actual interactive forms */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 flex flex-col justify-center gap-6 relative">
          
          {/* Back button from sub flows */}
          {authMode !== "login" && (
            <button
              onClick={() => {
                setAuthMode("login");
                setBizStep(1);
                setAffStep(1);
                setForgotStep(1);
                setErrorMsg("");
              }}
              className="absolute top-6 left-8 flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider"
            >
              <IconArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 font-medium">
              <IconAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* LOGIN FLOW (Screen #4)                                   */}
          {/* ======================================================== */}
          {authMode === "login" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Welcome to Rippl
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Referral, affiliate, & rewards infrastructure
                </p>
              </div>

              {/* Portal selection */}
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Select Portal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "affiliate", label: "Affiliate", Icon: IconUsers },
                    { id: "business_admin", label: "Business Admin", Icon: IconBriefcase },
                    { id: "super_admin", label: "Super Admin", Icon: IconFingerprint }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setRole(p.id as Role)}
                      className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                        role === p.id
                          ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <p.Icon className="w-4 h-4" />
                      <span className="text-[9px] font-bold">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Method Tab Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/40">
                <button
                  onClick={() => { setLoginMethod("email"); setErrorMsg(""); }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    loginMethod === "email"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Email & Password
                </button>
                <button
                  onClick={() => { setLoginMethod("otp"); setErrorMsg(""); }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    loginMethod === "otp"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Phone & OTP
                </button>
              </div>

              {/* Email Login Form */}
              {loginMethod === "email" ? (
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDirectTrigger("forgot_password")}
                        className="text-[9px] font-semibold text-[#e15b3e] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="w-3.5 h-3.5 border border-slate-200 rounded text-[#e15b3e] focus:ring-[#e15b3e]"
                    />
                    <label htmlFor="remember" className="text-[10px] text-slate-500 font-semibold">
                      Remember this device for 30 days
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-lg shadow-[#e15b3e]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Sign In
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Phone Login with OTP Flow */
                <form onSubmit={otpSent ? handleVerifyLoginOtp : (e) => e.preventDefault()} className="flex flex-col gap-4">
                  {!otpSent ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <IconDeviceMobile className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+234 80 1234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full mt-2 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-[0.98]"
                      >
                        Request OTP Code
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="p-3 bg-[#fcece9] border border-[#e15b3e]/20 rounded-2xl text-[11px] text-slate-655 flex items-center gap-2">
                        <IconInfoCircle className="w-4 h-4 text-[#e15b3e] shrink-0" />
                        <span>Mock verification SMS sent! Enter code <strong>1234</strong> to log in.</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Enter 4-Digit OTP
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          required
                          placeholder="0 0 0 0"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="text-center tracking-[1em] font-extrabold text-lg py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#e15b3e]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-lg shadow-[#e15b3e]/20 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <>Verify & Sign In</>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              )}

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-350 font-bold uppercase tracking-wider">Or</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              {/* Social Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <IconBrandGoogle className="w-4 h-4 text-red-500" />
                Continue with Google
              </button>

              {/* Signup Link */}
              <div className="text-center text-[11px] text-slate-400 font-medium">
                New to the platform?{" "}
                <button
                  onClick={() => handleDirectTrigger("signup")}
                  className="text-[#e15b3e] font-bold hover:underline"
                >
                  Create an account
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SIGNUP ROUTING (AFFILIATE vs BUSINESS)                  */}
          {/* ======================================================== */}
          {authMode === "signup" && (
            role === "affiliate" ? (
              /* AFFILIATE SIGNUP (Momentum Builder - Screen #3) */
              <div className="space-y-6">
                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Affiliate Registration
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Become a partner and cash out commissions instantly
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    <span>Step {affStep} of 3</span>
                    <span>{affStep === 1 ? "Basic Details" : affStep === 2 ? "Audience Profile" : "Bank Verification"}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#e15b3e] h-full transition-all duration-300 ease-out" 
                      style={{ width: `${(affStep / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleAffiliateNext} className="flex flex-col gap-4">
                  {affStep === 1 && (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dwayne Tatum"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Phone Number (for OTP & withdrawals)
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 80 1234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {affStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Primary Niche / Channel Type
                        </label>
                        <select
                          value={niche}
                          onChange={(e) => setNiche(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                        >
                          <option value="fintech">Fintech Content & Investing</option>
                          <option value="ecommerce">E-commerce & Fashion Dropshipping</option>
                          <option value="lifestyle">Lifestyle & Travel Blog</option>
                          <option value="tech">Tech Reviewer & YouTuber</option>
                          <option value="education">Education & Careers</option>
                        </select>
                      </div>

                      {/* Niche Earnings Teaser Widget */}
                      <div className="p-4 bg-gradient-to-r from-black to-slate-900 rounded-2xl text-white space-y-2">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#e15b3e]">
                          Niche Earning Potential
                        </span>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-base font-extrabold">
                            {niche === "fintech" ? "₦480,000/mo" : niche === "ecommerce" ? "₦320,000/mo" : "₦180,000/mo"}
                          </h4>
                          <span className="text-[9px] text-slate-400">top partner average</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-light">
                          Verified from active campaigns inside the marketplace matching your chosen niche categories.
                        </p>
                      </div>
                    </div>
                  )}

                  {affStep === 3 && (
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed">
                        <IconInfoCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Optional: verify your payouts bank account now to unlock immediate payouts routing. Lazy KYC triggers automatically on withdrawal.</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Payout Bank
                        </label>
                        <select
                          value={bankCode}
                          onChange={(e) => setBankCode(e.target.value)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none"
                        >
                          {bankList.map((b) => (
                            <option key={b.code} value={b.code}>{b.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Account Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={10}
                            placeholder="Enter 10-digit number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                          {isResolvingBank && (
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#e15b3e] border-t-transparent rounded-full animate-spin"></span>
                          )}
                        </div>
                      </div>

                      {/* Account Resolution display */}
                      {resolvedAccountName && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between text-xs text-green-800">
                          <div className="flex items-center gap-2">
                            <IconCheck className="w-4 h-4 text-green-600" />
                            <span className="font-bold">{resolvedAccountName}</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-wider text-green-600 font-extrabold bg-green-100 px-2 py-0.5 rounded-full">
                            Resolved
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center mt-4">
                    {affStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setAffStep(affStep - 1)}
                        className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all shadow-md shadow-[#e15b3e]/10 flex items-center gap-1 ml-auto"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          {affStep === 3 ? "Complete Registration" : "Continue"}
                          <IconChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* BUSINESS ADMIN SIGNUP (Frictionless Onboarding - Screen #2) */
              <div className="space-y-6">
                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Business Registration
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Create referral infrastructure for your products
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    <span>Step {bizStep} of 4</span>
                    <span>
                      {bizStep === 1 && "Account Info"}
                      {bizStep === 2 && "CAC Verification"}
                      {bizStep === 3 && "Plan Selection"}
                      {bizStep === 4 && "Billing Activation"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#e15b3e] h-full transition-all duration-300 ease-out" 
                      style={{ width: `${(bizStep / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {bizStep <= 3 ? (
                  <form onSubmit={handleBusinessNext} className="flex flex-col gap-4">
                    {bizStep === 1 && (
                      <>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Business Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Kola Stores Ltd"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Corporate Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="partners@kolastores.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                              aria-label="Toggle password visibility"
                            >
                              {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {bizStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            CAC RC Registration Number
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="RC 1234567"
                            value={cacNumber}
                            onChange={(e) => setCacNumber(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-[#e15b3e]"
                          />
                        </div>

                        {/* File Upload Zone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Upload CAC Certificate
                          </label>
                          
                          <div className="border-2 border-dashed border-slate-200 hover:border-[#e15b3e]/60 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative overflow-hidden bg-slate-50">
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg"
                              onChange={handleFileUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {isUploading ? (
                              <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
                                <span className="text-[10px] font-bold text-[#e15b3e] uppercase">Uploading... {uploadProgress}%</span>
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-[#e15b3e] h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                              </div>
                            ) : uploadedCacFile ? (
                              <div className="flex flex-col items-center gap-1">
                                <IconShieldCheck className="w-8 h-8 text-green-600" />
                                <span className="text-[11px] font-bold text-slate-700">{uploadedCacFile}</span>
                                <span className="text-[9px] text-slate-400">Click to upload another document</span>
                              </div>
                            ) : (
                              <>
                                <IconCloudUpload className="w-8 h-8 text-slate-400" />
                                <span className="text-[11px] font-bold text-slate-700">Drag file here or click to browse</span>
                                <span className="text-[9px] text-slate-400">Supports PDF, PNG, JPG up to 5MB</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="p-3 bg-[#fcece9] border border-[#e15b3e]/20 rounded-2xl text-[10px] text-slate-600 leading-relaxed">
                          📌 Verification guarantees a 0% fraud ecosystem. CAC certificate lookup checks will run against corporate registration registers.
                        </div>
                      </div>
                    )}

                    {bizStep === 3 && (
                      <div className="space-y-4">
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Choose Subscription Plan
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { id: "starter", name: "Starter", price: "₦15K", limits: "2 Campaigns / 50 Affiliates" },
                            { id: "growth", name: "Growth", price: "₦45K", limits: "10 Campaigns / 500 Affiliates" },
                            { id: "pro", name: "Pro", price: "₦120K", limits: "Unlimited / 5,000 Affiliates" }
                          ].map((plan) => (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedPlan(plan.id as any)}
                              className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[120px] transition-all active:scale-98 ${
                                selectedPlan === plan.id
                                  ? "border-[#e15b3e] bg-[#fcece9]/40 ring-1 ring-[#e15b3e]"
                                  : "border-slate-200 bg-white hover:border-slate-350"
                              }`}
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{plan.name}</h4>
                                <p className="text-[9px] text-slate-400 font-medium">{plan.limits}</p>
                              </div>
                              <span className="text-sm font-extrabold text-[#e15b3e] mt-4">{plan.price}<span className="text-[9px] text-slate-500 font-light">/mo</span></span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions button */}
                    <div className="flex justify-between items-center mt-4">
                      {bizStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setBizStep(bizStep - 1)}
                          className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider"
                        >
                          <IconChevronLeft className="w-4 h-4" />
                          Back
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all shadow-md shadow-[#e15b3e]/10 flex items-center gap-1 ml-auto"
                      >
                        Continue
                        <IconChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Billing Activation Mockup Card Input (Step 4) */
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                        <span className="text-[11px] text-slate-500 font-bold uppercase">Activation Cost:</span>
                        <span className="text-sm font-extrabold text-slate-800">
                          {planPricing[selectedPlan]} <span className="text-[9px] font-light text-slate-500">/mo</span>
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        To activate your <strong>{planNames[selectedPlan]}</strong>, complete your Paystack integration by validating your billing credit/debit card.
                      </p>
                    </div>

                    {!paymentDone ? (
                      <form onSubmit={handlePaystackPayment} className="space-y-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Cardholder Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Kola Alao"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Card Number</label>
                          <div className="relative">
                            <IconCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              required
                              placeholder="5399 2300 0000 0000"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Expiry</label>
                            <input
                              type="text"
                              required
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-center"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">CVV</label>
                            <input
                              type="password"
                              maxLength={3}
                              required
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-center"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full mt-3 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                        >
                          {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <>Authorize Activation Card</>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* Payment Done checkmark */
                      <div className="py-8 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <IconCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-800">Card Authorized Successfully!</h4>
                        <p className="text-[10px] text-slate-405 text-center max-w-[240px]">
                          Billing validated. Redirecting you to your Business Admin workspace...
                        </p>
                      </div>
                    )}

                    {/* Paystack verification OTP modal simulation */}
                    {showPaystackOtpModal && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 rounded-[2.5rem]">
                        <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-slate-200 shadow-2xl flex flex-col gap-4 text-center">
                          <div className="space-y-1">
                            <h4 className="text-sm font-extrabold text-slate-900">Authorize Transaction</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                              Enter the verification code sent by your card issuer to authorize card validation.
                            </p>
                          </div>
                          
                          <input
                            type="text"
                            placeholder="Enter Code (e.g. 1234)"
                            value={paystackOtp}
                            onChange={(e) => setPaystackOtp(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-center focus:outline-none focus:border-[#e15b3e]"
                          />

                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowPaystackOtpModal(false)}
                              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-[11px] font-bold text-slate-600 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleConfirmPaystackOtp}
                              disabled={isLoading}
                              className="flex-1 py-2 bg-[#e15b3e] hover:bg-[#d04e32] rounded-full text-[11px] font-bold text-white transition-all shadow-md shadow-[#e15b3e]/10 flex items-center justify-center"
                            >
                              {isLoading ? (
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              ) : (
                                "Confirm Pay"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}

          {/* ======================================================== */}
          {/* FORGOT PASSWORD FLOW (Screen #5)                        */}
          {/* ======================================================== */}
          {authMode === "forgot_password" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Password Recovery
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Enter your verification email or registered phone number
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-2 pb-2 border-b border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                  <span>Step {forgotStep} of 4</span>
                  <span>
                    {forgotStep === 1 && "Submit Destination"}
                    {forgotStep === 2 && "Enter Verification Code"}
                    {forgotStep === 3 && "Set New Password"}
                    {forgotStep === 4 && "Recovery Complete"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#e15b3e] h-full transition-all duration-300 ease-out" 
                    style={{ width: `${(forgotStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {forgotStep === 1 && (
                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Recovery Destination
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="name@example.com or +234..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-[#e15b3e]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Send Recovery Code
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
                  <div className="p-3 bg-[#fcece9] border border-[#e15b3e]/20 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2">
                    <IconInfoCircle className="w-4 h-4 text-[#e15b3e] shrink-0" />
                    <span>Mock reset link sent. Enter token code <strong>1234</strong> (expires in 15 mins).</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Enter Reset Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      placeholder="0 0 0 0"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="text-center tracking-[1em] font-extrabold text-lg py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#e15b3e]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    Verify Code
                  </button>
                </form>
              )}

              {forgotStep === 3 && (
                <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-[#e15b3e]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        aria-label="Toggle password visibility"
                      >
                        {showNewPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    Reset Password
                  </button>
                </form>
              )}

              {forgotStep === 4 && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <IconCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Password Reset Successful!</h4>
                  <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                    Your password has been changed. You can now use your new credentials to sign in.
                  </p>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setForgotStep(1);
                      setErrorMsg("");
                    }}
                    className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-md"
                  >
                    Back to Log In
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* DEMO FLOW: SESSION EXPIRED SCREEN (Screen #75)          */}
          {/* ======================================================== */}
          {authMode === "session_expired" && (
            <div className="space-y-6 max-w-sm mx-auto text-center">
              <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto text-red-500 animate-pulse">
                <IconLock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h1 className="text-xl font-extrabold text-slate-900">Session Expired</h1>
                <p className="text-xs text-[#e15b3e] leading-relaxed">
                  For your wallet & BVN safety, security sessions expire after 15 minutes of inactivity. Re-verify your credentials.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Active Account</span>
                  <div className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-500 font-semibold select-none">
                    dwayne@rippl.io
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter password"
                      className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-[#e15b3e]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#e15b3e]/20"
                >
                  Confirm Re-login
                </button>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* DEMO FLOW: ACCOUNT SUSPENDED (Screen #76)               */}
          {/* ======================================================== */}
          {authMode === "suspended" && (
            <div className="space-y-6 max-w-md mx-auto">
              <div className="p-4 bg-red-50 border border-red-200 rounded-3xl flex items-start gap-3">
                <IconAlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-red-900 uppercase tracking-wide">Account Suspended</h4>
                  <p className="text-[10px] text-red-700 leading-relaxed font-medium">
                    This account was suspended by a Super Admin audit investigator. Referral tracking and withdrawal tools are disabled.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-3xl text-xs space-y-2.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">Case Reference:</span>
                  <span className="font-mono text-slate-700 font-extrabold">#AML-902</span>
                </div>
                <div className="flex justify-between items-baseline text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">Reason Code:</span>
                  <span className="text-slate-700 font-semibold text-right max-w-[200px]">Multiple Device Fingerprint Match on payout request</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">Filing Date:</span>
                  <span className="text-slate-700 font-semibold">Today (Audit Log)</span>
                </div>
              </div>

              {!appealSubmitted ? (
                <form onSubmit={handleAppealSubmit} className="space-y-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Submit Appeal Request
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain details resolving fingerprint duplicates or request manual BVN selfie matching review..."
                      value={appealText}
                      onChange={(e) => setAppealText(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-[#e15b3e] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    Submit Appeal
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-3xl text-center space-y-1.5">
                  <IconCheck className="w-6 h-6 text-green-600 mx-auto" />
                  <h5 className="text-xs font-bold text-green-900">Appeal Lodged Successfully!</h5>
                  <p className="text-[9px] text-green-700 leading-relaxed">
                    Appeal case filed to compliance queues. Operations SLA response window is 48 hours. Reference check code: <strong>#REQ-902</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
