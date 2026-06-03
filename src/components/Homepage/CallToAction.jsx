import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative w-full py-32 bg-[#0B0B0C] flex flex-col items-center justify-center overflow-hidden border-b border-neutral-900">
      
      {/* CIRCLE Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 md:w-150 md:h-150 bg-[#3b82f6] opacity-35 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/cta-bg.png"
          alt="CTA Grid Background"
          fill
          className="object-cover object-top opacity-80"
        />
        {/* Fading gradient to blend the bottom edge */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0B0B0C]/60 to-[#0B0B0C]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Your next role is <br className="hidden sm:block" /> already looking for you
        </h2>
        
        <p className="text-neutral-400 text-base md:text-lg mb-10 max-w-xl">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href="/signup" 
            className="bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            Create a free account
          </Link>
          <Link 
            href="/pricing" 
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors w-full sm:w-auto"
          >
            View pricing
          </Link>
        </div>
      </div>
      
    </section>
  );
}