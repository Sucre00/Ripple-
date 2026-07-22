"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { IconLoader2, IconAlertCircle } from "@tabler/icons-react";

export default function ReferralRedirectClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = params?.code as string;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setError("Invalid referral code link.");
      return;
    }

    const trackAndRedirect = async () => {
      try {
        const utmSource = searchParams.get("utm_source") || "direct";
        const utmMedium = searchParams.get("utm_medium") || "none";

        const res = await fetch("http://localhost:8080/api/referral/click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            utm_source: utmSource,
            utm_medium: utmMedium,
            ip: "127.0.0.1", // standard server-side client IP resolver fallback
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "The referral link is invalid or has expired.");
        }

        // Drop cookie for conversion pixel tracking window mapping
        document.cookie = `rippl_referral_code=${code}; path=/; max-age=2592000; SameSite=Lax`; // 30 days window

        // Forward to merchant website
        window.location.replace(data.target_url);
      } catch (err: any) {
        setError(err.message || "Unable to resolve redirection.");
      }
    };

    trackAndRedirect();
  }, [code, searchParams]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans antialiased text-white p-4 relative overflow-hidden">
      {/* Visual background flares */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#e15b3e]/10 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md text-center space-y-6">
        <div className="flex justify-center">
          <img src="/icon.svg" alt="Rippl" className="h-10 w-auto opacity-90" />
        </div>

        {error ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <IconAlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-slate-100">Redirection Failed</h2>
              <p className="text-xs text-slate-400 font-medium px-4">{error}</p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-xs font-bold transition-all"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative mx-auto w-12 h-12 flex items-center justify-center">
              <IconLoader2 className="w-8 h-8 text-[#e15b3e] animate-spin" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-slate-100">Connecting to Partner...</h2>
              <p className="text-xs text-slate-400 font-medium animate-pulse">
                Applying referral discounts and routing to merchant page
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
