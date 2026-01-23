"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function About() {
  // Scrolling title effect (reused from home page for consistency)
  useEffect(() => {
    const title = "Fontaine Founders — About Us ✦ ";
    let index = 0;
    
    const scrollTitle = () => {
      document.title = title.slice(index) + title.slice(0, index);
      index = (index + 1) % title.length;
    };
    
    const interval = setInterval(scrollTitle, 200);
    return () => clearInterval(interval);
  }, []);

  const teamMembers = [
    {
      name: "Mathieu Metral",
      role: "Co-Founder & CEO",
      linkedin: "https://www.linkedin.com/in/mathieu-metral-39238617b/",
      description: "What defines me is action: I’ve generated over €2M in revenue across three ventures. I studied Information Systems and Management and trained in data science and AI, which gives me a solid tech understanding. But what I love most is building go-to-market strategies, selling, and staying close to users. I've worked in two startups and an incubator. ",
      image: "/mathieu.jpg"
    },
    {
      name: "Louis Pires",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/louis-pires-pm",
      description: "Engineering graduate in Data & Management. Product Manager obsessed with iteration and automation. In my previous scale-up, I built a tool that generated €1.2M in revenue in 5 months. Former e-commerce founder. Currently building in Healthtech & Longevity and training for a Full Ironman.",
      image: "/louis.jpeg"
    },
    {
      name: "Achille Dehaine",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/achille-dehaine/",
      description: "Bioengineer building a longevity startup focused on preventive health and helping HR teams better manage employee health and performance. Ambitious, determined, and resilient.",
      image: "/Achille.jpeg"
    },
    {
      name: "Dany Delacour",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/dany-delacour-aa6916309/",
      description: "Griding",
      image: "/dany.jpg"
    },
    {
      name: "Thomas Chimbault",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/thomaschimbault/",
      description: "Neuroscience & CS engineer. Built a Minecraft server generating €120k at 16. Former AI engineer at a top-tier VC-backed startup. Now building hardware × AI.",
      image: "/thomas.jpeg"
    },
    {
      name: "Robin Pautigny",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/robin-pautigny",
      description: "Tech profile graduate from an Engineering school. Launch 2 startup, build now the future of marketing on AI searches",
      image: "/robin.jpg"
    },
    {
      name: "Rodrigo Gaona",
      role: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/rgaonag/",
      description: "Early employee at 3 fintech startups, 4 years of experience in software engineering. Winner of the biggest blockchain hackathon, and won a space startup competition which put my name on a satellite. Currently exploring the crossroad of hardware + ai",
      image: "/rodrigo.png"
    }
  ];

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

        {/* Main Content */}
        <main className="flex-1 px-6 py-12 md:py-20">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-16 md:mb-24">
              <h1 
                className="text-5xl md:text-7xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-6 animate-fade-in-up opacity-0 font-[family-name:var(--font-cormorant)] italic font-medium"
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                The Fontaine Founders Spirit
              </h1>
              <p 
                className="text-lg md:text-xl text-[#1a1a1a]/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 font-[family-name:var(--font-instrument)]"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                More than just a house, a community of entrepreneurs sharing the same ambition: building the future from San Francisco.
              </p>
            </div>

            {/* Story/Vision Section */}
            <div 
              className="grid md:grid-cols-2 gap-12 mb-24 animate-fade-in-up opacity-0 max-w-4xl mx-auto"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-semibold text-[#1a1a1a] mb-4">Our Mission</h2>
                <p className="text-[#1a1a1a]/70 font-[family-name:var(--font-instrument)] leading-relaxed text-sm">
                  Providing an exceptional living and working environment for the brightest founders. We believe that physical proximity and informal exchanges are the catalysts for the greatest innovations.
                </p>
              </div>
              <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-[family-name:var(--font-cormorant)] italic font-semibold text-[#1a1a1a] mb-4">Our Vision</h2>
                <p className="text-[#1a1a1a]/70 font-[family-name:var(--font-instrument)] leading-relaxed text-sm">
                  To become the essential hub of the entrepreneurial ecosystem in San Francisco, creating bridges between ideas, talent, and resources.
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div 
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-[family-name:var(--font-cormorant)] italic font-medium text-[#1a1a1a]">The Team</h2>
                <div className="h-px flex-1 mx-6 bg-black/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="group bg-white/40 backdrop-blur-md border border-black/5 rounded-3xl p-5 transition-all hover:bg-white/60 shadow-sm flex flex-col">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 mb-5">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover scale-[1.01] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-[family-name:var(--font-cormorant)] italic font-semibold text-[#1a1a1a]">
                          {member.name}
                        </h3>
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1a1a1a]/40 hover:text-[#0077b5] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-[#e8943a] text-[10px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-instrument)] mb-3">
                        {member.role}
                      </p>
                      <p className="text-[#1a1a1a]/60 text-xs leading-relaxed font-[family-name:var(--font-instrument)] line-clamp-3">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 px-6 py-3 mt-12">
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
                <Link href="#" className="hover:text-[#1a1a1a]/70 transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-[#1a1a1a]/70 transition-colors">
                  Terms
                </Link>
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
