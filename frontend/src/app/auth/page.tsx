"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconMoodSmile,
  IconBuildingBank,
  IconArrowRight,
  IconLock,
  IconMail,
  IconUsers,
  IconBriefcase,
  IconFingerprint
} from "@tabler/icons-react";

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"affiliate" | "merchant" | "admin">("affiliate");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsLoading(false);
      if (role === "affiliate") {
        router.push("/dashboard");
      } else if (role === "merchant") {
        router.push("/admin");
      } else {
        router.push("/super-admin");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] py-12 px-4 flex items-center justify-center font-sans antialiased selection:bg-[#e15b3e]/20 selection:text-[#e15b3e]">
      
      {/* Background radial blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#e15b3e]/5 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-slate-400/10 blur-3xl -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200/50 shadow-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
        
        {/* Brand logo */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center">
            <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-8 w-auto" />
          </Link>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            Referral & rewards infrastructure
          </p>
        </div>

        {/* Tab Selection (Login vs Signup) */}
        <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200/40">
          <button
            onClick={() => { setAuthMode("login"); setErrorMsg(""); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              authMode === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setAuthMode("signup"); setErrorMsg(""); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
              authMode === "signup"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Segment selection */}
        <div className="space-y-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
            Select your portal
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setRole("affiliate")}
              className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                role === "affiliate"
                  ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              <IconUsers className="w-4 h-4" />
              <span className="text-[9px] font-bold">Affiliate</span>
            </button>
            <button
              onClick={() => setRole("merchant")}
              className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                role === "merchant"
                  ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              <IconBriefcase className="w-4 h-4" />
              <span className="text-[9px] font-bold">Merchant</span>
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                role === "admin"
                  ? "border-[#e15b3e] bg-[#fcece9] text-[#e15b3e]"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              <IconFingerprint className="w-4 h-4" />
              <span className="text-[9px] font-bold">Super Admin</span>
            </button>
          </div>
        </div>

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {authMode === "signup" && (
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
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
              />
            </div>
          )}

          {authMode === "signup" && role === "merchant" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Business Name
              </label>
              <input
                type="text"
                required
                placeholder="Rippl Corp"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
              />
            </div>
          )}

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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Password
              </label>
              {authMode === "login" && (
                <button
                  type="button"
                  className="text-[9px] font-semibold text-[#e15b3e] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e]"
              />
            </div>
          </div>

          {authMode === "signup" && (
            <div className="flex items-start gap-2 mt-1">
              <input
                type="checkbox"
                required
                id="terms"
                className="w-3.5 h-3.5 mt-0.5 border border-slate-200 rounded text-[#e15b3e] focus:ring-[#e15b3e]"
              />
              <label htmlFor="terms" className="text-[10px] text-slate-500 font-medium leading-relaxed">
                I accept the{" "}
                <button type="button" className="text-[#e15b3e] hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-[#e15b3e] hover:underline">
                  Privacy Policy
                </button>
                .
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all active:scale-[0.98] shadow-lg shadow-[#e15b3e]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                {authMode === "login" ? "Sign In" : "Register"}
                <IconArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer help link */}
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-medium">
          <span>BVN identity lazy KYC safeguards apply</span>
          <Link href="/" className="text-[#e15b3e] hover:underline flex items-center gap-0.5">
            Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
