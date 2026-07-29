"use client";

import React from "react";
import Link from "next/link";
import { IconMessage } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/40 pt-16 pb-8 px-6 md:px-12 flex flex-col gap-10 text-xs text-slate-500 font-medium z-30">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Column 1: Brand Info (Double width on desktop) */}
        <div className="col-span-2 space-y-4 text-left">
          <Link href="/" className="flex items-center">
            <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-8 w-auto" />
          </Link>
          <p className="text-[11px] text-slate-400 font-light max-w-xs leading-relaxed">
            Nigeria & emerging market's first growth and rewards infrastructure. Empowering brands to launch automated, fraud-aware referral channels.
          </p>
          <div className="flex gap-2.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-wider">NDPR</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-wider">CBN Guideline</span>
            <span className="px-2 py-0.5 rounded-full bg-[#fcece9] text-[8px] font-bold text-[#e15b3e] uppercase tracking-wider">Paystack Partner</span>
          </div>
        </div>

        {/* Column 2: Products */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Products</h4>
          <Link href="/solutions/business" className="hover:text-slate-900 transition-colors">For Merchants</Link>
          <Link href="/solutions/affiliate" className="hover:text-slate-900 transition-colors">For Ambassadors</Link>
          <Link href="/solutions/enterprise" className="hover:text-slate-900 transition-colors">Enterprise Solutions</Link>
          <Link href="/#roi-simulator" className="hover:text-slate-900 transition-colors">ROI Simulator</Link>
        </div>

        {/* Column 3: Company */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Company</h4>
          <Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog & Guides</Link>
          <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</Link>
        </div>

        {/* Column 4: Help & Legal */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trust & Legal</h4>
          <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          <Link href="/faq" className="hover:text-slate-900 transition-colors">FAQs</Link>
          <Link href="/help" className="hover:text-slate-900 transition-colors">Help Center</Link>
        </div>

      </div>

      {/* Bottom Partnership Bar */}
      <div className="max-w-5xl mx-auto w-full border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] text-slate-400 leading-relaxed font-medium">
        <p className="max-w-md">
          Payment processing services are securely provided by Paystack and Flutterwave, licensed by the Central Bank of Nigeria (CBN). Rippl is NDPR compliant and operates under strict anti-money laundering frameworks.
        </p>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span>&copy; 2026 Rippl Inc. All rights reserved.</span>
          <a href="https://wa.me/2348000000000" className="text-[#e15b3e] font-bold hover:underline flex items-center gap-1 text-[9px] uppercase tracking-wider">
            <IconMessage className="w-3.5 h-3.5" /> WhatsApp Support
          </a>
        </div>
      </div>
    </footer>
  );
}
