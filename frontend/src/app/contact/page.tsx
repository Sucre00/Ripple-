"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconMapPin, IconMail, IconBrandWhatsapp, IconSend, IconCheck } from "@tabler/icons-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] text-slate-800 flex flex-col font-sans">
      <Navbar activeSection="contact" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] bg-[#fcece9] text-[#e15b3e] px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Screen 1.10 — Contact Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Get In Touch With The Rippl Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
            Have questions about campaign setup, enterprise white-labeling, or affiliate payouts? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-900">Office & Direct Contact</h3>
            
            <div className="space-y-4 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#fcece9] text-[#e15b3e] flex items-center justify-center shrink-0">
                  <IconMapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">Headquarters</p>
                  <p className="text-slate-500 font-light mt-0.5">Victoria Island, Lagos State, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <IconMail className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">Support Email</p>
                  <p className="text-slate-500 font-light mt-0.5">support@rippl.africa</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <IconBrandWhatsapp className="w-4 h-4" />
                </span>
                <div>
                  <p className="font-bold text-slate-900">WhatsApp Support Line</p>
                  <a href="https://wa.me/2348000000000" className="text-[#e15b3e] font-bold hover:underline mt-0.5 block">
                    Chat on WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <IconCheck className="w-6 h-6" />
                </span>
                <h3 className="font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500 font-light max-w-xs mx-auto">
                  Thank you for reaching out. A team member will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Send Us A Message</h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input required type="text" placeholder="e.g. Chisom Okafor" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#e15b3e]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input required type="email" placeholder="e.g. chisom@example.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#e15b3e]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Message</label>
                  <textarea required rows={4} placeholder="How can we help your business?" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#e15b3e]"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold hover:bg-[#d04a2d] transition-all shadow-md shadow-[#e15b3e]/20 flex items-center justify-center gap-1.5">
                  Send Message <IconSend className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
