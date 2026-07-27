"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_SCREENS, ScreenItem } from "@/components/ProgressTracker";
import {
  IconListCheck,
  IconCheck,
  IconSearch,
  IconExternalLink,
  IconArrowRight,
  IconChevronRight,
  IconFilter,
  IconSparkles,
  IconShieldCheck,
  IconDeviceDesktop,
  IconBuildingStore,
  IconUsers,
  IconWallet
} from "@tabler/icons-react";

export default function ProgressTrackerPage() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScreens = ALL_SCREENS.filter((screen) => {
    const matchesModule = selectedModule === "all" || screen.moduleNum === selectedModule;
    const matchesSearch =
      screen.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.moduleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screen.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const totalCount = ALL_SCREENS.length;
  const completedCount = ALL_SCREENS.filter(s => s.status === "completed").length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  // Group by module for structured rendering
  const modulesMap = [
    { num: 1, name: "Public Website & Marketing", count: 15 },
    { num: 2, name: "Authentication & Security", count: 15 },
    { num: 3, name: "Business Onboarding", count: 13 },
    { num: 4, name: "Business Dashboard", count: 7 },
    { num: 5, name: "Campaign Management", count: 10 },
    { num: 6, name: "Products (Online & Offline QR)", count: 10 },
    { num: 7, name: "Affiliate Management", count: 9 },
    { num: 8, name: "Referral Management", count: 6 },
    { num: 9, name: "Orders & Sales (Online + Offline)", count: 9 },
    { num: 10, name: "Wallet & Payments", count: 9 },
    { num: 11, name: "Reports & Analytics", count: 7 },
    { num: 12, name: "Notifications Engine", count: 5 },
    { num: 13, name: "Business Settings", count: 9 },
    { num: 14, name: "Affiliate Dashboard", count: 18 },
    { num: 15, name: "Super Admin Command Center", count: 26 },
    { num: 16, name: "Support & Help Desk", count: 5 },
    { num: 17, name: "Shared Components & Modals", count: 17 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8 pb-24">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <IconSparkles className="w-4 h-4" />
                <span>Rippl v3.0 Specification Master Checklist</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Platform Progress Tracker
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Comprehensive screen iteration engine covering all <strong className="text-emerald-400">17 Structural Modules</strong> and <strong className="text-emerald-400">186 Screens/Components</strong> as detailed in <code className="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono">rippl_platform_specification.md</code>.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/30 p-5 rounded-2xl flex flex-col items-center justify-center min-w-[220px] shadow-inner">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Implementation Coverage</span>
              <div className="text-4xl font-black text-emerald-400 font-mono my-1">
                {progressPct}%
              </div>
              <span className="text-xs text-emerald-300 font-medium bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                {completedCount} / {totalCount} Screens Built
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 h-full rounded-full w-full transition-all duration-700 shadow-sm shadow-emerald-500/50" />
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search screen ID, name, or detail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Module Selector */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <IconFilter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="bg-slate-950 text-slate-200 text-xs border border-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="all">All 17 Modules (186 Screens)</option>
              {modulesMap.map((m) => (
                <option key={m.num} value={m.num}>
                  Module {m.num}: {m.name} ({m.count} screens)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Screens Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScreens.map((screen) => (
            <div
              key={screen.id}
              onClick={() => router.push(screen.route)}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                    {screen.id}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <IconCheck className="w-3 h-3" /> Built & Integrated
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Module {screen.moduleNum}: {screen.moduleName}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors mt-0.5">
                    {screen.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {screen.details}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="truncate max-w-[200px] text-[11px] text-slate-500">{screen.route}</span>
                <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                  Launch View <IconChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
