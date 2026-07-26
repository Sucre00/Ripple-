"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconShare, IconSparkles } from "@tabler/icons-react";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const posts = [
    { id: "1", title: "How Offline Supermarkets Are Scaling Referral Growth With QR Cards", category: "Merchant Case Study", date: "May 14, 2026", excerpt: "Learn how neighbourhood retail stores in Lagos generated ₦12M in referral revenue using physical QR code cards.", content: "Physical commerce in emerging markets accounts for over 90% of retail transactions. By placing unique QR cards in ambassador hands, supermarkets and fashion boutiques allow customers to scan and confirm referred purchases instantly at POS checkout..." },
    { id: "2", title: "5 Strategies To Maximize Your Affiliate Earnings On WhatsApp & Instagram", category: "Affiliate Guide", date: "May 10, 2026", excerpt: "Discover top strategies for creators and ambassadors to share referral links without spamming audiences.", content: "WhatsApp status and Instagram stories provide intimate engagement channels. Successful ambassadors pair product review videos with custom short links and UTM tags..." },
    { id: "3", title: "Understanding Anti-Fraud Infrastructure In Modern Affiliate Marketing", category: "Security & Tech", date: "May 2, 2026", excerpt: "How device fingerprinting, IP velocity checks, and BVN validation protect brand payout reserves.", content: "Preventing self-referrals and double-counting requires multi-layered device inspection. Rippl's engine analyzes browser fingerprints, network ASN pools, and conversion timestamps..." }
  ];

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
            Rippl Growth Insights
          </span>
          <h1 className="text-3xl font-bold text-slate-900">Articles, Case Studies, & Tips</h1>
        </div>

        {selectedPost ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-200">
            <button onClick={() => setSelectedPost(null)} className="text-xs font-bold text-[#e15b3e] hover:underline">
              ← Back to All Articles
            </button>
            <span className="text-[9px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-bold uppercase">{selectedPost.category}</span>
            <h2 className="text-2xl font-bold text-slate-900">{selectedPost.title}</h2>
            <p className="text-xs text-slate-400">{selectedPost.date} • By Rippl Engineering Team</p>
            <div className="text-xs text-slate-600 leading-relaxed space-y-4 pt-4 border-t border-slate-100">
              <p>{selectedPost.content}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPost(post)} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4 cursor-pointer hover:shadow-md transition-all">
                <div className="space-y-3">
                  <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold uppercase">{post.category}</span>
                  <h3 className="font-semibold text-sm text-slate-900 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-500 font-light line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#e15b3e] font-bold">
                  <span>Read Full Article</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
