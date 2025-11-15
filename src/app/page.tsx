"use client";

import Link from "next/link";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden m-0">
      {/* Mobile image - full coverage */}
      <img
        src="/AltaRasa_BG_Image_mobile.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      />
      
      {/* Desktop image - constrained to 1024x1440 aspect ratio */}
      <div className="hidden md:flex absolute inset-0 w-full h-full items-center justify-center">
        <div 
          className="w-full h-full"
          style={{ 
            aspectRatio: '1024/1440',
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: 'auto',
            height: 'auto'
          }}
        >
          <img
            src="/AltaRasa_BG_Image_Desktop.png"
            alt=""
            className="w-[1440px] h-[1024px] object-contain"
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      <section className="hero-section min-h-screen flex flex-col items-center text-center px-6 md:px-10 py-12 relative z-10">
      <div className="hero-logo pt-12 md:pt-20">
  {/* Desktop / md+: show beige */}
  <img
    src="/logos/AR_Wordmark_Ivory White.png"
    alt="AltaRasa"
    className="desktop-logo w-[12.75rem] h-[2.4375rem] mt-[6rem] object-contain"
  />
  {/* Mobile / <md: show terracotta */}
  <img
    src="/logos/AR_Wordmark_Terracotta.png"
    alt="AltaRasa"
    className="mobile-logo w-[6.312rem] h-[1.1875rem] mt-[5.375rem] object-contain"
  />
</div>

        <div className="hero-content flex-1 flex flex-col items-center justify-center max-w-[43rem] mx-auto">
          <h2 className="hero-headline font-light tracking-[-2px
          ] mb-8 md:mb-12 text-[#F2EEE6] text-center">
            An elevated essence of South Asian design.
          </h2>

          <p className="hero-subhead mb-10 md:mb-12 mt-[12px] text-[32px] text-white/90">Coming soon</p>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="waitlist-button-hero px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium tracking-wider transition-colors duration-200"
            aria-label="Join the waitlist"
          >
            JOIN THE WAITLIST
          </button>
        </div>

          {/* Footer at bottom */}
          <div className="hero-footer flex flex-col items-center gap-6">
            {/* Instagram logo */}
            
              <Link href="https://instagram.com/altarasa" target="_blank" rel="noopener noreferrer" aria-label="AltaRasa on Instagram">
                <img src="/instagram.svg" alt="Instagram" width={24} height={24} className="brightness-0 invert" />
              </Link>
            

            {/* Copyright text */}
            <p className="text-sm text-white">© AltaRasa 2025. All rights reserved.</p>
          </div>
        </section>

      <SignUpForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </main>
  );
}