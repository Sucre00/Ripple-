"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconAlertTriangle, IconHome, IconArrowLeft } from "@tabler/icons-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans antialiased text-white p-4 relative overflow-hidden">
      {/* Background neon flares */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#e15b3e]/10 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-md text-center space-y-8 relative">
        {/* Rippl Icon Header */}
        <div className="flex justify-center">
          <img src="/icon-coral.svg" alt="Rippl logo" className="h-12 w-auto animate-pulse" />
        </div>

        {/* Big Alert Banner */}
        <div className="space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#e15b3e]/10 border border-[#e15b3e]/20 flex items-center justify-center text-[#e15b3e]">
            <IconAlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">404</h1>
            <h2 className="text-base font-bold text-slate-200">Lost in the Ripple?</h2>
            <p className="text-xs text-slate-400 font-light max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find the page you are looking for. It might have been moved, deleted, or the link may have expired.
            </p>
          </div>
        </div>

        {/* Retention navigation triggers */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full py-3 bg-[#e15b3e] hover:bg-[#d04e32] text-white rounded-full text-xs font-semibold shadow-lg shadow-[#e15b3e]/15 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <IconHome className="w-4 h-4" />
            Back to Homepage
          </Link>

          <button
            onClick={() => router.back()}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700/85 text-slate-200 border border-slate-700/60 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <IconArrowLeft className="w-4 h-4" />
            Go Back Previous
          </button>
        </div>

        {/* Small brand footer */}
        <p className="text-[10px] text-slate-600 font-light tracking-wide pt-2">
          Rippl Growth Infrastructure • Nigeria
        </p>
      </div>
    </div>
  );
}
