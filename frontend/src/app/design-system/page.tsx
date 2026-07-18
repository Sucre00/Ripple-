"use client";

import React from "react";
import Link from "next/link";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#edf1f5] py-12 px-6 font-sans antialiased text-slate-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Reeple Design System</h1>
            <p className="text-sm text-slate-500 mt-1">Design tokens, core components, and style guides replicated from reference rippl.webp</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            &larr; Back to Dashboard
          </Link>
        </header>

        {/* Color Palette Section */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">1. Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {/* Coral/Orange */}
            <div className="space-y-2">
              <div className="h-16 rounded-2xl bg-[#e15b3e] shadow-sm"></div>
              <div>
                <p className="text-xs font-bold text-slate-800">Brand Coral</p>
                <p className="text-[10px] text-slate-400 font-semibold">#e15b3e</p>
              </div>
            </div>
            {/* Peach Light */}
            <div className="space-y-2">
              <div className="h-16 rounded-2xl bg-[#fcece9] border border-slate-200/20"></div>
              <div>
                <p className="text-xs font-bold text-slate-800">Peach Light</p>
                <p className="text-[10px] text-slate-400 font-semibold">#fcece9</p>
              </div>
            </div>
            {/* Deep Dark */}
            <div className="space-y-2">
              <div className="h-16 rounded-2xl bg-black"></div>
              <div>
                <p className="text-xs font-bold text-slate-800">Deep Black</p>
                <p className="text-[10px] text-slate-400 font-semibold">#000000</p>
              </div>
            </div>
            {/* Neutral Gray Background */}
            <div className="space-y-2">
              <div className="h-16 rounded-2xl bg-[#edf1f5] border border-slate-200"></div>
              <div>
                <p className="text-xs font-bold text-slate-800">App Background</p>
                <p className="text-[10px] text-slate-400 font-semibold">#edf1f5</p>
              </div>
            </div>
            {/* Slate White */}
            <div className="space-y-2">
              <div className="h-16 rounded-2xl bg-white border border-slate-200"></div>
              <div>
                <p className="text-xs font-bold text-slate-800">Card Base</p>
                <p className="text-[10px] text-slate-400 font-semibold">#ffffff</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">2. Typography (Geist Sans)</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dashboard Titles</span>
              <span className="md:col-span-2 text-2xl font-extrabold tracking-tight text-slate-900">Financial Dashboard</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Main Values</span>
              <span className="md:col-span-2 text-xl font-extrabold text-slate-800">$23,194.80</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 py-2 border-b border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Labels</span>
              <span className="md:col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Linked to main account</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 py-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Body Subtext</span>
              <span className="md:col-span-2 text-xs text-slate-500 font-medium">Enable 2-step verification to secure your wallet.</span>
            </div>
          </div>
        </section>

        {/* Buttons & Interactive Elements */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">3. Buttons & Controls</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Primary Pill Button */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary CTA</p>
              <button className="px-6 h-16 rounded-full bg-[#e15b3e] text-white font-semibold text-xs transition-colors hover:bg-[#d04e32]">
                Show my Tasks
              </button>
            </div>

            {/* Black Pill Button */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accent Button</p>
              <button className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs hover:bg-slate-800 transition-colors">
                Receive
              </button>
            </div>

            {/* Ghost Light Pill */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secondary Pill</p>
              <button className="px-6 py-2.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors">
                Send
              </button>
            </div>

            {/* Dropdown Button */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dropdown Badge</p>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200/40">
                Direct Debits
                <span>▼</span>
              </button>
            </div>

            {/* Icon Button */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Icon Button (Notify)</p>
              <button className="w-16 h-16 rounded-full bg-white border border-slate-200/50 flex items-center justify-center relative shadow-sm hover:bg-slate-50 transition-colors">
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#e15b3e] border-2 border-white"></span>
              </button>
            </div>

            {/* Smiley Selection */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Ratings</p>
              <div className="flex gap-1">
                {["😡", "😐", "😍"].map((smiley, index) => (
                  <button key={index} className="px-3 py-1.5 rounded-xl border border-slate-150 text-sm hover:bg-slate-50">
                    {smiley}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Charts & Visual Components */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4. Charts & Visual Elements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Concentric Nesting Bubbles */}
            <div className="space-y-4 border border-slate-100 p-6 rounded-2xl bg-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nesting Bubble Circle Chart</p>
              <div className="relative w-48 h-48 mx-auto flex items-end justify-center pb-2">
                <div className="absolute w-48 h-48 rounded-full bg-[#fcece9] flex items-start justify-center pt-4 text-xs font-bold text-[#e15b3e]">
                  $ 14K
                </div>
                <div className="absolute w-36 h-36 rounded-full bg-[#fbdcd4] flex items-start justify-center pt-3.5 text-xs font-bold text-[#e15b3e]">
                  $ 9.3K
                </div>
                <div className="absolute w-24 h-24 rounded-full bg-[#f7bbb0] flex items-start justify-center pt-3.5 text-xs font-bold text-[#e15b3e]">
                  $ 6.8K
                </div>
                <div className="absolute w-14 h-14 rounded-full bg-[#e15b3e] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  $ 4K
                </div>
              </div>
            </div>

            {/* Sparkline Stock Graph */}
            <div className="space-y-4 border border-slate-100 p-6 rounded-2xl bg-slate-50 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sparkline Trend Path</p>
              </div>
              <div className="w-full h-16 bg-white border border-slate-100 p-2 rounded-xl">
                <svg className="w-full h-full" viewBox="0 0 200 50">
                  <path d="M0,35 Q20,15 40,30 T80,10 T120,40 T160,20 T200,5" fill="none" stroke="#e15b3e" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Dot Matrix Indicators */}
            <div className="space-y-4 border border-slate-100 p-6 rounded-2xl bg-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Dot Matrix Grid</p>
              <div className="grid grid-cols-10 gap-2 max-w-xs">
                {Array.from({ length: 30 }).map((_, index) => (
                  <span
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full ${
                      index < 13 ? "bg-[#e15b3e]" : "bg-slate-200"
                    }`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Radial Clock Circle */}
            <div className="space-y-4 border border-slate-100 p-6 rounded-2xl bg-slate-50 flex flex-col items-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider self-start">Radial Progress</p>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 -rotate-90">
                  <circle cx="32" cy="32" r="26" className="stroke-slate-200 fill-none" strokeWidth="5" />
                  <circle cx="32" cy="32" r="26" className="stroke-black fill-none" strokeWidth="5" strokeDasharray="163" strokeDashoffset="104" strokeLinecap="round" />
                </svg>
                <div className="absolute">
                  <span className="text-xs font-extrabold text-slate-900">36%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
