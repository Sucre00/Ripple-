"use client";

import React from "react";
import Link from "next/link";
import { IconBuildingBank, IconCheck, IconArrowRight, IconShieldCheck, IconFileCode } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EnterpriseSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="solutions-enterprise" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-slate-900 text-white px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Enterprise & Bank Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Infrastructure For Banks, Telcos, & Major Retailers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Custom domain white-labeling, REST Webhook APIs, SLA uptime guarantees, and dedicated enterprise account management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <IconBuildingBank className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Custom Domain White-Labeling</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Host your affiliate program on your custom domain (e.g. `affiliates.yourbrand.com`) with custom portal branding.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <IconFileCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">REST Webhook API Engine</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Programmatic attribution callbacks, custom conversion event triggers, and automated ERP reconciliation endpoints.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <IconShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Dedicated SLA & Account Manager</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              99.99% uptime guarantee, priority technical support, FIRS/NDPR tax export tools, and tailored fraud policies.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Discuss Your Enterprise Infrastructure Requirements</h2>
          <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
            Schedule a session with our enterprise engineering team in Victoria Island, Lagos.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="px-6 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-md inline-flex items-center gap-1.5">
              Contact Enterprise Team <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
