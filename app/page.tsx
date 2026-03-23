"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  // Scrolling title effect
  useEffect(() => {
    const title = "Fontaine Founders — Apply to Batch #2 ✦ ";
    let index = 0;
    
    const scrollTitle = () => {
      document.title = title.slice(index) + title.slice(0, index);
      index = (index + 1) % title.length;
    };
    
    const interval = setInterval(scrollTitle, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Beige background */}
      <div className="fixed inset-0 z-0 bg-[#F5F0E8]" />
      
      {/* Grain texture overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <Navbar />

        {/* Hero Section - Centered */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

            {/* H1 - Playfair Display Italic (old style font) */}
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-[1] tracking-tight mb-1 animate-fade-in-up opacity-0 font-[family-name:var(--font-cormorant)] italic font-medium"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              Fontaine Founders
            </h1>

            {/* Subtext - Instrument Sans */}
            <p 
              className="text-base md:text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto mb-5 leading-relaxed animate-fade-in-up opacity-0 font-[family-name:var(--font-instrument)]"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
Join a community of entrepreneurs building in San Francisco.
Be among the first to experience a hacker house where ideas ship fast and people come together around work, dinners, and curated events.
            </p>

            {/* Hero Image */}
            <div 
              className="w-full max-w-xl mb-5 animate-fade-in-up opacity-0"
              style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-black/5">
                <Image 
                  src="/hero.jpg" 
                  alt="Fontaine Founders building" 
                  width={600}
                  height={340}
                  className="w-full h-auto max-h-[28vh] object-cover"
                  priority
                />
              </div>
            </div>

            {/* CTA Section - Centered */}
            <div 
              className="w-full max-w-sm animate-fade-in-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdyv1uqC-AnFXZ0Dy3Q9GAU6V1jGNcs0pDBLA1d-8ccGozPXg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full rounded-2xl bg-[#1a1a1a] px-5 py-4 text-center text-white shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#2b2b2b] hover:shadow-2xl"
              >
                <p className="font-[family-name:var(--font-instrument)] text-[11px] uppercase tracking-[0.14em] text-white/70">
                  Fontaine Founders Batch #2
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-instrument)] text-lg font-bold md:text-xl">
                  Apply for the Next Batch
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-instrument)] text-xs text-white/80">
                  May 1 - July 13 in San Francisco
                </p>
              </a>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex -space-x-2">
                  {[
                    "https://i.pravatar.cc/80?img=1",
                    "https://i.pravatar.cc/80?img=3",
                    "https://i.pravatar.cc/80?img=5",
                    "https://i.pravatar.cc/80?img=6",
                    "https://i.pravatar.cc/80?img=7",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#F5F0E8] overflow-hidden"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[#1a1a1a]/60 text-xs font-[family-name:var(--font-instrument)]">
                  Join <span className="font-[family-name:var(--font-cormorant)] italic font-bold text-sm text-[#1a1a1a]">50+ builders</span> already
                </p>
              </div>
            </div>

            {/* Upcoming Events - Luma embed */}
            <div 
              className="mt-16 w-full max-w-2xl animate-fade-in-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-medium text-[#1a1a1a]">Upcoming events</h2>
                <div className="h-px flex-1 mx-4 bg-black/10" />
              </div>
              <div className="relative bg-white/40 backdrop-blur-md border border-black/5 rounded-2xl overflow-hidden">
                <iframe
                  src="https://luma.com/embed/calendar/cal-XXuTw5tHZg1evbP/events?lt=light"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  className="min-h-[450px] w-full"
                  style={{ border: "1px solid rgba(191, 203, 218, 0.53)", borderRadius: "4px" }}
                  allowFullScreen
                  aria-hidden={false}
                  tabIndex={0}
                  title="Fontaine Founders events on Luma"
                />
              </div>
              <div className="flex items-center justify-between mb-6 py-4">
                <h2 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-medium text-[#1a1a1a]">Pitch Contest</h2>
                <div className="h-px flex-1 mx-4 bg-black/10" />
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
              <iframe src="https://orange-hunter-0e5.notion.site/ebd//329966cfefc480078a2be56766903a8f" width="100%" height="600" frameBorder="0" allowFullScreen />
              
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[#1a1a1a]/40 text-xs font-[family-name:var(--font-instrument)]">
              <div className="flex items-center gap-2">
                <Image 
                  src="/logoFF.png" 
                  alt="ff logo" 
                  width={16} 
                  height={16}
                  className="rounded opacity-60"
                />
                <span>© 2026 fontaine founders. All rights reserved.</span>
              </div>
              
              <div className="flex items-center gap-5">
                <a href="#" className="hover:text-[#1a1a1a]/70 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-[#1a1a1a]/70 transition-colors">
                  Terms
                </a>
                <a href="https://www.linkedin.com/company/fontaine-founders/" className="hover:text-[#1a1a1a]/70 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
