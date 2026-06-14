"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@heroui/react";

export default function MaintenanceAlert({ pageName = "This section" }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop blur layer */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setIsOpen(false)} 
      />

      {/* Main Dialog Modal Container */}
      <div className="relative w-full max-w-md bg-[#161719] border border-[#1f2125] rounded-2xl p-6 shadow-2xl space-y-6 z-10 transform transition-all animate-scale-up">
        

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              System Maintenance
            </h2>
            <p className="text-[11px] text-amber-500 font-medium tracking-wider uppercase mt-0.5">
              Limited Availability
            </p>
          </div>
        </div>

        {/* Modal Body Info Context */}
        <div className="space-y-2">
          <p className="text-sm text-neutral-300 leading-relaxed">
            The <span className="text-white font-semibold">{pageName}</span> options are currently undergoing essential scheduled optimization maintenance.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            All features may not perform accurately or be fully available at this moment. We appreciate your patience while we complete updates.
          </p>
        </div>

        {/* Modal Footer Controls */}
        <div className="pt-2 border-t border-neutral-900/60 flex justify-end">
          <Button
            onPress={() => setIsOpen(false)}
            size="md"
            className="bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-6 h-9 transition-transform active:scale-95 cursor-pointer"
          >
            Understood
          </Button>
        </div>

      </div>
    </div>
  );
}