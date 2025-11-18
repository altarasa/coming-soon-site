"use client";

import Link from "next/link";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden m-0">
      {/* Mobile image - full coverage */}
      <Image
        src="/AltaRasa_BG_Image_mobile.avif"
        alt=""  
        fill
        preload={true}
        sizes="(min-width:1280px) 60vw, 100vw"
        style={{objectFit:"cover"}}
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
          <Image
            src="/AltaRasa_BG_Image_Desktop.avif"
            alt=""
            fill
            preload={true}
            sizes="(min-width:1280px) 60vw, 100vw"
            style={{objectFit:"cover"}}
          />
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      <section className="hero-section min-h-screen flex flex-col items-center justify-between text-center px-6 md:px-10 py-12 relative z-10">
        {/* Logo */}
        <div className="hero-logo pt-12 md:pt-20">
          {/* Desktop / md+: show beige */}
          <Image
            src="/logos/AR_Wordmark_Ivory White.png"
            alt="AltaRasa"
            width={204}
            height={39}
            className="desktop-logo w-[12.75rem] h-[2.4375rem] mt-[6rem] object-contain"
          />
          {/* Mobile / <md: show terracotta */}
          <Image
            src="/logos/AR_Wordmark_Terracotta.png"
            alt="AltaRasa"
            width={100}
            height={19}
            className="mobile-logo w-[6.312rem] h-[1.1875rem] mt-[5.375rem] object-contain"
          />
        </div>

        {/* Hero content: text + coming soon, then button */}
        <div className="hero-content flex flex-col items-center gap-4 max-w-[43rem] mx-auto flex-1 justify-center">
          {/* Hero text and Coming soon in one div with gap */}
          <div className="flex flex-col items-center">
            <h1 className="hero-headline font-light tracking-[-0.02em] text-[#F2EEE6] text-center">
              An elevated essence of South Asian design.
            </h1>
            <p className="hero-subhead leading-[-0.02em] text-white/90">Coming soon</p>
          </div>

          {/* Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="waitlist-button-hero text-white font-medium tracking-wider"
            aria-label="Join the waitlist"
          >
            JOIN THE WAITLIST
          </button>
        </div>

        {/* Footer */}
        <div className="hero-footer flex flex-col items-center gap-4">
          {/* Instagram logo */}
          <Link href="https://instagram.com/thealtarasa" target="_blank" rel="noopener noreferrer" aria-label="AltaRasa on Instagram">
            <img src="/instagram.svg" alt="Instagram" width={25} height={25} className="brightness-0 invert" />
          </Link>

          {/* Copyright text */}
          <p className="text-[10px] md:text-sm text-white">© AltaRasa 2025. All rights reserved.</p>
        </div>
      </section>

      <SignUpForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </main>
  );
}