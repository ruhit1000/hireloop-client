import React from "react";
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 flex flex-col items-center">
        
        {/* Graphic Icon Display Wrapper */}
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 relative">
          <FileQuestion size={28} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>

        {/* Message Group Header Text Blocks */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white">404</h1>
          <h2 className="text-xl font-bold text-neutral-200">Page position misplaced</h2>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto">
            The link you followed may be broken, or the page has been permanently archived.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-6 h-10 transition-all duration-200 shadow-md active:scale-95"
        >
          <Home size={14} />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
}