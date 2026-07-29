"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";

interface NavbarProps {
  userRole?: string | null;
  activeSection?: string;
}

export default function Navbar({ userRole, activeSection = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string, section?: string) => {
    if (pathname === path) return true;
    if (pathname === "/" && section && activeSection === section) return true;
    return false;
  };

  const isGroupActive = (paths: string[], sections: string[]) => {
    if (paths.includes(pathname)) return true;
    if (pathname === "/" && sections.includes(activeSection)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-6 py-4 flex items-center justify-between z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/logo-primary-horizontal.svg" alt="Rippl Logo" className="h-8 w-auto" loading="eager" fetchPriority="high" />
        </Link>
      </div>

      {/* Center: Desktop links */}
      <nav className="hidden md:flex items-center justify-center gap-6 text-xs font-semibold">
        <Link 
          href="/how-it-works" 
          className={`transition-colors duration-200 ${isLinkActive("/how-it-works", "how-it-works") ? "text-[#e15b3e] font-bold" : "text-slate-500 hover:text-[#e15b3e]"}`}
        >
          How it works
        </Link>

        {/* Solutions Dropdown Menu */}
        <div className="relative group">
          <button className={`flex items-center gap-1 transition-colors py-2 ${isGroupActive(["/solutions/business", "/solutions/affiliate", "/solutions/enterprise"], ["solutions-business", "solutions-affiliate", "solutions-enterprise"]) ? "text-[#e15b3e] font-bold" : "text-slate-500 hover:text-[#e15b3e]"}`}>
            <span>Solutions</span>
            <IconChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 min-w-[200px] z-50 animate-in fade-in zoom-in-95 duration-150">
            <Link href="/solutions/business" className={`px-3.5 py-2.5 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/solutions/business" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Business Merchants
            </Link>
            <Link href="/solutions/affiliate" className={`px-3.5 py-2.5 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/solutions/affiliate" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Creator Ambassadors
            </Link>
            <Link href="/solutions/enterprise" className={`px-3.5 py-2.5 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/solutions/enterprise" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Enterprise & Banks
            </Link>
          </div>
        </div>

        <Link 
          href="/features" 
          className={`transition-colors duration-200 ${isLinkActive("/features", "features") ? "text-[#e15b3e] font-bold" : "text-slate-500 hover:text-[#e15b3e]"}`}
        >
          Features
        </Link>
        <Link 
          href="/pricing" 
          className={`transition-colors duration-200 ${isLinkActive("/pricing", "pricing") ? "text-[#e15b3e] font-bold" : "text-slate-500 hover:text-[#e15b3e]"}`}
        >
          Pricing
        </Link>

        {/* Resources Dropdown Menu */}
        <div className="relative group">
          <button className={`flex items-center gap-1 transition-colors py-2 ${isGroupActive(["/blog", "/faq", "/help", "/about", "/contact"], ["blog", "faq", "help", "about", "contact"]) ? "text-[#e15b3e] font-bold" : "text-slate-500 hover:text-[#e15b3e]"}`}>
            <span>Resources</span>
            <IconChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
          </button>
          <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 min-w-[200px] z-50 animate-in fade-in zoom-in-95 duration-150">
            <Link href="/blog" className={`px-3.5 py-2 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/blog" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Blog & Guides
            </Link>
            <Link href="/faq" className={`px-3.5 py-2 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/faq" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              FAQs
            </Link>
            <Link href="/help" className={`px-3.5 py-2 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/help" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Help Center
            </Link>
            <Link href="/about" className={`px-3.5 py-2 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/about" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              About Rippl
            </Link>
            <Link href="/contact" className={`px-3.5 py-2 rounded-xl hover:bg-slate-50 font-semibold text-xs transition-colors ${pathname === "/contact" ? "bg-[#fcece9] text-[#e15b3e]" : "text-slate-700 hover:text-[#e15b3e]"}`}>
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Right: Auth CTAs & Mobile Hamburger Menu Button */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3">
          {userRole ? (
            <Link
              href={
                userRole === "affiliate"
                  ? "/affiliate"
                  : userRole === "business_admin"
                  ? "/business-admin"
                  : "/super-admin"
              }
              className="px-5 py-2.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all shadow-md shadow-[#e15b3e]/10 active:scale-95 flex items-center gap-1.5"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth"
                className="px-4 py-2 text-xs font-semibold text-slate-650 hover:text-[#e15b3e] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth"
                className="px-5 py-2.5 rounded-full bg-[#e15b3e] hover:bg-[#d04e32] text-white text-xs font-semibold transition-all shadow-md shadow-[#e15b3e]/10 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-[#e15b3e] transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-2xl z-40 max-w-xl mx-auto p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2 text-sm font-semibold">
            <Link 
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3.5 rounded-xl transition-colors ${pathname === "/how-it-works" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
            >
              How it works
            </Link>
            
            <div className="py-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3.5">Solutions</span>
              <div className="flex flex-col gap-1 mt-1">
                <Link 
                  href="/solutions/business"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/solutions/business" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Business Merchants
                </Link>
                <Link 
                  href="/solutions/affiliate"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/solutions/affiliate" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Creator Ambassadors
                </Link>
                <Link 
                  href="/solutions/enterprise"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/solutions/enterprise" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Enterprise & Banks
                </Link>
              </div>
            </div>

            <Link 
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3.5 rounded-xl transition-colors ${pathname === "/features" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
            >
              Features
            </Link>
            <Link 
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-3.5 rounded-xl transition-colors ${pathname === "/pricing" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
            >
              Pricing
            </Link>

            <div className="py-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3.5">Resources & Support</span>
              <div className="flex flex-col gap-1 mt-1">
                <Link 
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/blog" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Blog & Guides
                </Link>
                <Link 
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/faq" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  FAQs
                </Link>
                <Link 
                  href="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/help" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Help Center
                </Link>
                <Link 
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/about" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  About Rippl
                </Link>
                <Link 
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-xs transition-colors ${pathname === "/contact" ? "bg-[#e15b3e]/10 text-[#e15b3e]" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-4 mt-1 border-t border-slate-200/60 flex flex-col gap-2.5">
              {userRole ? (
                <Link
                  href={
                    userRole === "affiliate"
                      ? "/affiliate"
                      : userRole === "business_admin"
                      ? "/business-admin"
                      : "/super-admin"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold shadow-md shadow-[#e15b3e]/10"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full bg-[#e15b3e] text-white text-xs font-semibold shadow-md shadow-[#e15b3e]/10"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
