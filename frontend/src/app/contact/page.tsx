"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconMail, IconPhone, IconMapPin, IconMessage } from "@tabler/icons-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-7 w-auto" />
        </Link>
        <Link href="/auth?mode=signup" className="px-4 py-2 rounded-xl bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d]">
          Get Started
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Contact Support & Sales
          </span>
          <h1 className="text-3xl font-bold text-slate-900">We'd Love To Hear From You</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-semibold text-sm text-slate-900">Direct Channels</h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <IconMail className="w-4 h-4 text-[#e15b3e]" />
                <span>support@rippl.io</span>
              </div>
              <div className="flex items-center gap-3">
                <IconPhone className="w-4 h-4 text-[#e15b3e]" />
                <span>+234 800 747 7546</span>
              </div>
              <div className="flex items-center gap-3">
                <IconMapPin className="w-4 h-4 text-[#e15b3e]" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>

            <a
              href="https://wa.me/2348007477546"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <IconMessage className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            {submitted ? (
              <div className="p-6 text-center space-y-2">
                <h4 className="font-semibold text-sm text-slate-900">Message Dispatched!</h4>
                <p className="text-xs text-slate-500 font-light">Our support team will respond within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold uppercase">Full Name</label>
                  <input required placeholder="Dwayne Tatum" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold uppercase">Email Address</label>
                  <input required type="email" placeholder="dwayne@company.com" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold uppercase">Message</label>
                  <textarea required rows={4} placeholder="How can we help?" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                </div>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
