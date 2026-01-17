"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

// Countdown component with flip animation
function CountdownButton() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date("2026-02-06T18:00:00-08:00").getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl text-white font-semibold text-sm font-[family-name:var(--font-instrument)]">
        Early Access
      </div>
    );
  }

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isLaunched) {
    return (
      <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-5 py-2 rounded-xl text-white font-bold text-sm font-[family-name:var(--font-instrument)] animate-pulse shadow-lg shadow-emerald-500/30">
        🚀 Live Now!
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-[#1a1a1a] px-3 py-1.5 rounded-xl font-[family-name:var(--font-instrument)]">
      <TimeUnit value={timeLeft.days} label="d" />
      <span className="text-white/40 text-xs">:</span>
      <TimeUnit value={timeLeft.hours} label="h" />
      <span className="text-white/40 text-xs">:</span>
      <TimeUnit value={timeLeft.minutes} label="m" />
      <span className="text-white/40 text-xs">:</span>
      <TimeUnit value={timeLeft.seconds} label="s" isSeconds />
    </div>
  );
}

function TimeUnit({ value, label, isSeconds = false }: { value: number; label: string; isSeconds?: boolean }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <div className={`relative overflow-hidden ${isSeconds ? 'min-w-[24px]' : 'min-w-[20px]'}`}>
        <span 
          key={value}
          className={`text-white font-bold text-sm tabular-nums inline-block ${isSeconds ? 'animate-flip-in' : ''}`}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-white/50 text-[10px] font-medium">{label}</span>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Scrolling title effect
  useEffect(() => {
    const title = "Fontaine Founders — Join the waitlist ✦ ";
    let index = 0;
    
    const scrollTitle = () => {
      document.title = title.slice(index) + title.slice(0, index);
      index = (index + 1) % title.length;
    };
    
    const interval = setInterval(scrollTitle, 200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setIsSubmitted(true);
      
      // 🎉 Confetti celebration!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#1a1a1a', '#F5F0E8', '#d4a574', '#8b7355'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#1a1a1a', '#F5F0E8', '#d4a574', '#8b7355'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
        
        {/* Navbar */}
        <nav className="shrink-0 px-6 py-3">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl px-5 py-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Image 
                  src="/logoFF.png" 
                  alt="ff logo" 
                  width={36} 
                  height={36}
                  className="rounded-lg"
                />
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <a href="#" className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors text-sm font-medium font-[family-name:var(--font-instrument)]">
                  About
                </a>
                <a href="#" className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors text-sm font-medium font-[family-name:var(--font-instrument)]">
                  Contact
                </a>
              </div>

              <CountdownButton />
            </div>
          </div>
        </nav>

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
              className="w-full max-w-md animate-fade-in-up opacity-0"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/70 border border-black/10 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:border-[#1a1a1a]/30 focus:bg-white transition-all font-[family-name:var(--font-instrument)] text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#1a1a1a] hover:bg-[#333] px-8 py-4 rounded-xl text-white font-bold text-sm whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.02] font-[family-name:var(--font-instrument)]"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-white/70 backdrop-blur-sm border border-black/5 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-1 font-[family-name:var(--font-instrument)]">You&apos;re on the list!</h3>
                  <p className="text-[#1a1a1a]/60 text-sm font-[family-name:var(--font-instrument)]">We&apos;ll notify you when we launch.</p>
                </div>
              )}

              {error && (
                <p className="text-red-500 text-xs mt-2 font-[family-name:var(--font-instrument)]">
                  {error}
                </p>
              )}

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

            {/* Upcoming Event Section */}
            <div 
              className="mt-16 w-full max-w-2xl animate-fade-in-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-medium text-[#1a1a1a]">Next Gathering</h2>
                <div className="h-px flex-1 mx-4 bg-black/10" />
              </div>
              
              <div 
                className="relative bg-white/40 backdrop-blur-md border border-black/5 rounded-2xl p-6 text-left overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#e8943a]/5 rounded-full blur-2xl transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#e8943a]/10 text-[#e8943a] text-[10px] font-bold tracking-wider uppercase font-[family-name:var(--font-instrument)]">
                        Welcome Drink
                      </span>
                      <span className="text-[#1a1a1a]/30 text-xs font-[family-name:var(--font-instrument)]">•</span>
                      <span className="text-[#1a1a1a]/60 text-xs font-[family-name:var(--font-instrument)]">San Francisco, CA</span>
                    </div>
                    
                    <h3 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-semibold text-[#1a1a1a] mb-2 leading-tight">
                      FF Hacker House Welcome Drink
                    </h3>
                    
                    <p className="text-sm text-[#1a1a1a]/60 font-[family-name:var(--font-instrument)] leading-relaxed max-w-md">
                      An informal drink to open the house, meet the founders, and discover the community being built around ambition and shared values.
                    </p>
                  </div>
                  
                  <div className="shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-1 border-t md:border-t-0 border-black/5 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="hidden md:block text-xs text-[#1a1a1a]/40 font-[family-name:var(--font-instrument)] uppercase tracking-widest mb-1">Friday</p>
                      <p className="text-base md:text-lg font-bold text-[#1a1a1a] font-[family-name:var(--font-instrument)]">Feb 6, 2026</p>
                      <p className="text-xs text-[#1a1a1a]/40 font-[family-name:var(--font-instrument)]">18:00 - 21:30</p>
                    </div>
                    <div className="mt-0 md:mt-2">
                      <a 
                        href="https://luma.com/n8ui3x4t" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative overflow-hidden group px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-white font-bold text-xs md:text-sm whitespace-nowrap transition-all hover:scale-[1.02] font-[family-name:var(--font-instrument)] inline-flex items-center gap-2 shadow-sm shadow-black/10"
                      >
                        {/* Background gradient image */}
                        <div 
                          className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: "url('/gradient.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        {/* Overlay for text readability */}
                        <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/0 transition-colors" />
                        
                        <span className="relative z-20 flex items-center gap-2">
                          RSVP
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
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
