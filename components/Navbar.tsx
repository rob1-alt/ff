"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return (
    <div className="bg-[#1a1a1a] px-4 py-2 rounded-xl text-white font-semibold text-sm font-[family-name:var(--font-instrument)]">
      Early Access
    </div>
  );

  const isLaunched = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isLaunched) return (
    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-5 py-2 rounded-xl text-white font-bold text-sm font-[family-name:var(--font-instrument)] animate-pulse shadow-lg shadow-emerald-500/30">
      🚀 Live Now!
    </button>
  );

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 shrink-0 px-6 py-3 transition-all">
      <div className="max-w-3xl mx-auto relative">
        <div className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-2xl px-5 py-2 flex items-center justify-between shadow-sm relative z-50">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logoFF.png" 
              alt="ff logo" 
              width={36} 
              height={36}
              className="rounded-lg"
            />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`${pathname === link.href ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/60'} hover:text-[#1a1a1a] transition-colors text-sm font-medium font-[family-name:var(--font-instrument)]`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <CountdownButton />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle Menu"
            >
              <div className={`w-5 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-[#1a1a1a] transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`absolute top-full left-0 right-0 mt-2 p-2 transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-black/5 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-[family-name:var(--font-cormorant)] italic font-medium ${pathname === link.href ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40'} hover:text-[#1a1a1a] transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-6 border-t border-black/5 flex justify-center">
              <CountdownButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
