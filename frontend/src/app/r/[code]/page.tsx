import React, { Suspense } from "react";
import ReferralRedirectClient from "./ReferralRedirectClient";

export function generateStaticParams() {
  return [{ code: "default" }];
}

export default function ReferralRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-sans antialiased text-white p-4">
          <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md text-center">
            <p className="text-slate-400 text-xs font-medium animate-pulse">Loading...</p>
          </div>
        </div>
      }
    >
      <ReferralRedirectClient />
    </Suspense>
  );
}
