import React from "react";
import Image from "next/image";
import { FiSearch, FiMapPin, FiBriefcase } from "react-icons/fi";
import Stats from "./Stats";
import HeroHeaders from "./HeroHeaders";

export default function Banner() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center pt-40 overflow-hidden bg-[#0B0B0C]">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/globe.png"
          alt="Globe Background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0B0B0C] via-transparent to-[#0B0B0C]"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-[#1A1A1A]">
          <FiBriefcase className="text-orange-500" size={14} />
          <span className="text-xs font-semibold text-neutral-400 tracking-widest uppercase">
            <strong className="text-white">50,000+</strong> New Jobs This Month
          </span>
        </div>

        {/* Hero Headers */}
        <HeroHeaders />

        {/* Search Input Box */}
        <div className="mt-10 flex flex-col md:flex-row items-center w-full max-w-4xl bg-[#161616] border border-neutral-800 rounded-3xl md:rounded-full p-2 gap-2 shadow-lg">
          <div className="flex items-center flex-1 w-full px-4 py-2 gap-3">
            <FiSearch className="text-neutral-400 text-xl" />
            <input 
              type="text" 
              placeholder="Job title, skill or company" 
              className="w-full bg-transparent text-white outline-none placeholder-neutral-500 text-sm" 
            />
          </div>
          <div className="hidden md:block w-px h-6 bg-neutral-700"></div>
          <div className="flex items-center flex-1 w-full px-4 py-2 gap-3">
            <FiMapPin className="text-neutral-400 text-xl" />
            <input 
              type="text" 
              placeholder="Location or Remote" 
              className="w-full bg-transparent text-white outline-none placeholder-neutral-500 text-sm" 
            />
          </div>
          <button className="bg-[#6366f1] text-white p-3 md:px-6 rounded-full hover:bg-indigo-500 transition-colors w-full md:w-auto flex justify-center items-center h-full">
            <FiSearch className="text-xl md:hidden" />
            <span className="hidden md:block font-medium">Search</span>
          </button>
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm">
          <span className="text-neutral-400 mr-2">Trending Position</span>
          {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(tag => (
            <span 
              key={tag} 
              className="px-4 py-1.5 rounded-full border border-neutral-800 text-neutral-300 bg-[#1A1A1A] hover:bg-neutral-800 cursor-pointer transition-colors text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Floating Text */}
        <div className="mt-40 mb-32 text-center w-full">
          <h2 className="text-3xl md:text-4xl text-neutral-300 font-medium leading-snug">
            Assisting over <span className="text-white font-semibold">15,000</span> job seekers <br />
            find their dream positions.
          </h2>
        </div>
      </div>

      <Stats />
    </section>
  );
}