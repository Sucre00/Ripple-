"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconBuildingBank,
  IconClock,
  IconLock,
  IconSun,
  IconMoodAngry,
  IconMoodSad,
  IconMoodNeutral,
  IconMoodSmile,
  IconMoodCrazyHappy,
  IconUsers,
  IconReportAnalytics,
  IconAdjustmentsHorizontal,
  IconMaximize,
  IconDotsVertical,
  IconChevronDown,
  IconCheck,
  IconShare
} from "@tabler/icons-react";

export default function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="min-h-screen bg-[#edf1f5] p-6 md:p-8 font-sans antialiased selection:bg-[#e15b3e]/20 selection:text-[#e15b3e] flex flex-col gap-6 relative overflow-hidden">
      
      {/* Top Header Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full hover:bg-slate-200/60 flex flex-col justify-center items-center gap-1.5 transition-colors">
            <span className="w-5 h-0.5 bg-slate-900"></span>
            <span className="w-5 h-0.5 bg-slate-900"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-8 w-auto" />
            </Link>
          </div>
        </div>

        {/* Center Actions (Plus, User Info) */}
        <div className="flex items-center gap-3 md:ml-auto">
          {/* Plus Button */}
          <button className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200/50 shadow-sm transition-all active:scale-95 text-slate-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-3 bg-white pl-2 pr-4 h-12 rounded-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e15b3e] text-white flex items-center justify-center font-bold text-sm">
              DT
            </div>
            <div className="text-left">
              <h4 className="text-xs font-semibold text-slate-800 leading-tight">Dwayne Tatum</h4>
              <p className="text-[10px] text-slate-400 font-light leading-tight">CEO Assistant</p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-64 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Start searching here ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e] shadow-sm transition-all text-slate-700 placeholder-slate-400"
          />
        </div>
      </header>

      {/* Second Row: Calendar, Show tasks, Assistant prompt */}
      <section className="flex flex-col lg:flex-row items-stretch gap-6">
        {/* Horizontal Controls Group */}
        <div className="flex flex-row items-center gap-4 flex-wrap">
          {/* Calendar Indicator */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center shadow-sm border border-slate-200/50">
              <span className="text-base font-semibold text-slate-900 leading-none">19</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Tue,</p>
              <h3 className="text-xs font-semibold text-slate-800">December</h3>
            </div>
          </div>

          {/* Show tasks Action Button */}
          <button className="px-5 h-12 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white flex items-center justify-between gap-6 font-medium text-xs transition-all active:scale-[0.98] shadow-lg shadow-[#e15b3e]/20 group">
            <span>Show my Tasks</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          {/* Schedule/Notification Icon */}
          <button className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200/50 shadow-sm relative active:scale-95 transition-all text-slate-700">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#e15b3e]--font"></span>
          </button>
        </div>

        {/* Conversational Assistant Card */}
        <div className="flex-1 bg-white/40 backdrop-blur-sm border border-white/60 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              Hey, Need help? <IconMoodSmile className="w-5 h-5 text-slate-600 animate-bounce" />
            </h2>
            <p className="text-base text-slate-400 font-light">Just ask me anything!</p>
          </div>
          
          <button className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center border border-slate-200/50 shadow-md transition-all active:scale-95 text-slate-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Dashboard Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (4 Columns): Sidebar Capsule + Visa Card + Annual Profits */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Row 1: Sidebar Capsule next to Visa Card */}
          <div className="flex gap-4 items-stretch">
            {/* Left-most Sidebar Navigation Capsule */}
            <div className="w-16 bg-white rounded-[2rem] py-6 border border-slate-100 shadow-sm flex flex-col items-center justify-between min-h-[260px] hover:shadow-md transition-shadow">
              <button className="w-10 h-10 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-all active:scale-90 text-sm font-semibold">
                +
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                <IconShare className="w-4 h-4" />
              </button>
            </div>

            {/* Visa Card Widget */}
            <div className="flex-1 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-800 tracking-wider text-sm">VISA</span>
                <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-600 transition-colors">
                  Direct Debits
                  <IconChevronDown className="w-3 h-3" />
                </button>
              </div>

              <div className="my-5">
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Linked to main account</p>
                <p className="text-xl font-semibold text-slate-900 tracking-widest mt-1">•••• 2719</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-all active:scale-[0.97]">
                  Receive
                </button>
                <button className="flex-1 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all active:scale-[0.97] border border-slate-200/40">
                  Send
                </button>
              </div>

              <div className="border-t border-slate-100 mt-5 pt-3.5 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Monthly regular fee</p>
                  <p className="text-xs font-semibold text-[#e15b3e] mt-0.5">$ 25.00</p>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-semibold text-[#e15b3e] hover:underline">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit cards limitation
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Annual Profits Widget */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[340px] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-sm text-slate-800">Annual profits</h3>
              <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-600 transition-colors">
                2023
                <IconChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Concentric Circle Bubble Chart */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="relative w-52 h-52 flex items-end justify-center pb-2">
                {/* Outer circle: $ 14K */}
                <div className="absolute w-52 h-52 rounded-full bg-[#fcece9] flex items-start justify-center pt-4 text-xs font-semibold text-[#e15b3e] shadow-sm">
                  $ 14K
                </div>
                {/* Circle 9.3K */}
                <div className="absolute w-40 h-40 rounded-full bg-[#fbdcd4] flex items-start justify-center pt-3.5 text-xs font-semibold text-[#e15b3e] shadow-sm">
                  $ 9.3K
                </div>
                {/* Circle 6.8K */}
                <div className="absolute w-28 h-28 rounded-full bg-[#f7bbb0] flex items-start justify-center pt-3.5 text-xs font-semibold text-[#e15b3e] shadow-sm">
                  $ 6.8K
                </div>
                {/* Innermost circle: $ 4K */}
                <div className="absolute w-16 h-16 rounded-full bg-[#e15b3e] flex items-center justify-center text-xs font-semibold text-white shadow-md">
                  $ 4K
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Column (5 Columns): Income/Paid summary + Activity Manager */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Income & Expenses summary */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
            
            {/* Row 1: Total Income */}
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200/50 shadow-sm text-slate-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Total income</p>
                  <p className="text-base font-semibold text-slate-800 mt-0.5">
                    <span className="text-[#e15b3e] mr-0.5">$</span>23,194.80
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200/50 text-[10px] font-semibold text-slate-600 transition-colors">
                Weekly
                <IconChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Row 2: Total Paid */}
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200/50 shadow-sm text-slate-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Total paid</p>
                  <p className="text-base font-semibold text-slate-800 mt-0.5">
                    <span className="text-[#e15b3e] mr-0.5">$</span>8,145.20
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200/50 text-[10px] font-semibold text-slate-600 transition-colors">
                  Weekly
                  <IconChevronDown className="w-3 h-3" />
                </button>
                <button className="text-[9px] font-semibold text-[#e15b3e] hover:underline flex items-center gap-0.5">
                  View on chart mode
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Activity Manager Widget */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm text-slate-800">Activity manager</h3>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-200/40 text-slate-600 transition-colors">
                  <IconDotsVertical className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center border border-slate-200/40 text-slate-600 transition-colors">
                  <IconMaximize className="w-3.5 h-3.5" />
                </button>
                <button className="px-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/40 text-[10px] font-semibold text-slate-600 flex items-center gap-1 transition-colors">
                  <IconAdjustmentsHorizontal className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>
            </div>

            {/* Mini Search Inside Activity */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search in activities ..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/60 rounded-full focus:outline-none focus:border-[#e15b3e] focus:ring-1 focus:ring-[#e15b3e] transition-all text-slate-700"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors flex items-center gap-1.5">
                Team <span className="w-1.5 h-1.5 rounded-full bg-[#e15b3e]"></span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors flex items-center gap-1">
                Insights
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors flex items-center gap-1">
                Today
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>

            {/* Inner Three-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Micro Chart Card */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between min-h-[145px] shadow-sm">
                <div>
                  <p className="text-lg font-semibold text-slate-900 leading-none">
                    <span className="text-[#e15b3e] mr-0.5">$</span>43.20
                    <span className="text-[10px] font-semibold text-slate-400 ml-1">USD</span>
                  </p>
                </div>
                {/* Micro Bar Chart */}
                <div className="flex items-end justify-between h-8 mt-4 px-1">
                  <span className="w-1 h-3 rounded-full bg-slate-200"></span>
                  <span className="w-1 h-5 rounded-full bg-[#e15b3e]"></span>
                  <span className="w-1 h-4 rounded-full bg-[#e15b3e]"></span>
                  <span className="w-1 h-7 rounded-full bg-slate-200"></span>
                  <span className="w-1 h-6 rounded-full bg-[#e15b3e]"></span>
                  <span className="w-1 h-8 rounded-full bg-[#e15b3e]"></span>
                  <span className="w-1 h-5 rounded-full bg-slate-200"></span>
                </div>
                {/* Slideline progress indicators */}
                <div className="flex justify-center gap-1 mt-2.5">
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="w-1 h-1 rounded-full bg-[#e15b3e]"></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                </div>
              </div>

              {/* Card 2: Dropdown Items List */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between min-h-[145px] shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-semibold text-slate-800">Business plans</p>
                  <button className="text-slate-400 hover:text-slate-600">
                    <IconDotsVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex items-center justify-between text-[11px] py-0.5 text-slate-800 hover:text-slate-900 cursor-pointer">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5.5 h-5.5 rounded-full bg-[#fcece9] text-[#e15b3e] flex items-center justify-center"><IconBuildingBank className="w-3 h-3" /></span>
                      <span className="font-medium">Bank loans</span>
                    </div>
                    <IconChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] py-0.5 text-slate-500 hover:text-slate-800 cursor-pointer border-t border-slate-200/40 pt-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5.5 h-5.5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center"><IconReportAnalytics className="w-3 h-3" /></span>
                      <span>Accounting</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] py-0.5 text-slate-500 hover:text-slate-800 cursor-pointer border-t border-slate-200/40 pt-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5.5 h-5.5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center"><IconUsers className="w-3 h-3" /></span>
                      <span>HR management</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Wallet Verification Alert */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between min-h-[145px] shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6.5 h-6.5 rounded-lg bg-[#fcece9] text-[#e15b3e] flex items-center justify-center shrink-0">
                    <IconSun className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-slate-800">Wallet Verification</p>
                    <p className="text-[9px] text-slate-400 font-medium leading-tight mt-0.5">
                      Enable 2-step verification.
                    </p>
                  </div>
                </div>
                <button className="w-full mt-3 py-1.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-[10px] font-semibold transition-all active:scale-95 shadow-sm">
                  Enable
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (3 Columns): System lock, Growth rate, 13 days status, Stocks, Review rating */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Grid of Lock & Growth Rate */}
          <div className="grid grid-cols-2 gap-4">
            {/* Lock card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between items-center text-center hover:shadow-md transition-shadow min-h-[130px]">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <IconLock className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-medium text-slate-600 mt-2">System Lock</p>
            </div>

            {/* Growth Rate card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between items-center hover:shadow-md transition-shadow min-h-[130px]">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 -rotate-90">
                  <circle cx="32" cy="32" r="26" className="stroke-slate-100 fill-none" strokeWidth="6" />
                  <circle cx="32" cy="32" r="26" className="stroke-black fill-none" strokeWidth="6" strokeDasharray="163" strokeDashoffset="104" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-semibold text-slate-900 leading-none">36%</span>
                </div>
              </div>
              <p className="text-[9px] font-medium text-slate-500 text-center leading-tight">Growth rate</p>
            </div>
          </div>

          {/* Grid of 13 Days & Years Comparison Chart */}
          <div className="grid grid-cols-2 gap-4">
            {/* 13 Days Status Widget */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[150px]">
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase">
                    <IconClock className="w-3.5 h-3.5" />
                    <span>13 Days</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">109 hours, 23m</p>
              </div>

              {/* 3x10 Dot Matrix Grid (Matches exactly 13 orange dots: 8 in row 1, 5 in row 2, 0 in row 3) */}
              <div className="grid grid-cols-10 gap-1.5 my-3">
                {Array.from({ length: 30 }).map((_, index) => {
                  let isOrange = false;
                  if (index < 8) isOrange = true;
                  else if (index >= 10 && index < 15) isOrange = true;

                  return (
                    <span
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        isOrange ? "bg-[#e15b3e]" : "bg-slate-100"
                      }`}
                    ></span>
                  );
                })}
              </div>
            </div>

            {/* Stocks comparison graph Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[150px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Comparison</span>
                <span className="text-[9px] font-semibold bg-[#fcece9] text-[#e15b3e] px-2 py-0.5 rounded-full">2023</span>
              </div>
              
              <div className="relative h-20 w-full mt-2">
                {/* SVG bar chart */}
                <svg className="w-full h-full" viewBox="0 0 100 80">
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  {/* Bars group 1 */}
                  <rect x="15" y="45" width="6" height="35" rx="1.5" fill="#e2e8f0" />
                  <rect x="23" y="30" width="6" height="50" rx="1.5" fill="#e15b3e" />
                  {/* Bars group 2 */}
                  <rect x="45" y="55" width="6" height="25" rx="1.5" fill="#e2e8f0" />
                  <rect x="53" y="40" width="6" height="40" rx="1.5" fill="#e15b3e" />
                  {/* Bars group 3 */}
                  <rect x="75" y="35" width="6" height="45" rx="1.5" fill="#e2e8f0" />
                  <rect x="83" y="15" width="6" height="65" rx="1.5" fill="#e15b3e" />
                  {/* Trend line overlay */}
                  <path d="M26 30 L56 40 L86 15" fill="none" stroke="#e15b3e" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="26" cy="30" r="2" fill="#e15b3e" />
                  <circle cx="56" cy="40" r="2" fill="#e15b3e" />
                  <circle cx="86" cy="15" r="2" fill="#e15b3e" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Stocks Line Chart Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-xs text-slate-800">Main Stocks</h4>
                <p className="text-[9px] text-slate-400 font-medium mt-0.5">Extended & Limited</p>
              </div>
              <span className="text-[10px] font-semibold text-[#e15b3e] bg-[#fcece9] px-2.5 py-0.5 rounded-full">
                + 9.3%
              </span>
            </div>

            <div>
              <p className="text-lg font-semibold text-slate-900">
                <span className="text-[#e15b3e] mr-0.5">$</span>16,073.49
              </p>
            </div>

            {/* Sparkline Stock SVG Wave */}
            <div className="w-full h-12 mt-1">
              <svg className="w-full h-full" viewBox="0 0 200 50">
                <defs>
                  <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e15b3e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#e15b3e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,35 Q20,15 40,30 T80,10 T120,40 T160,20 T200,5"
                  fill="none"
                  stroke="#e15b3e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,35 Q20,15 40,30 T80,10 T120,40 T160,20 T200,5 L200,50 L0,50 Z"
                  fill="url(#stockGrad)"
                />
              </svg>
            </div>
          </div>

          {/* Review Rating widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="my-3 text-left">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Review rating</p>
              <h4 className="text-xs font-semibold text-slate-800 leading-snug mt-1">
                How is your business management going?
              </h4>
            </div>

            {/* Action Smiley Buttons */}
            <div className="flex justify-between items-center gap-1 mt-2">
              {[
                { Icon: IconMoodAngry, color: "hover:text-red-500 hover:bg-red-50" },
                { Icon: IconMoodSad, color: "hover:text-orange-500 hover:bg-orange-50" },
                { Icon: IconMoodNeutral, color: "hover:text-yellow-500 hover:bg-yellow-50" },
                { Icon: IconMoodSmile, color: "hover:text-green-500 hover:bg-green-50" },
                { Icon: IconMoodCrazyHappy, color: "hover:text-emerald-500 hover:bg-emerald-50" }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`flex-1 py-1.5 rounded-xl border border-slate-100 bg-white flex items-center justify-center text-slate-500 transition-all active:scale-90 ${item.color}`}
                >
                  <item.Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
