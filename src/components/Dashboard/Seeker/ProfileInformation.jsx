"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Input } from "@heroui/react";

export default function ProfileInformation() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  });

  return (
    <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 space-y-6">
      <h2 className="text-lg font-bold text-white">Profile Information</h2>

      {/* Avatar Management Row */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700/60 shrink-0">
          <Image
            src={formData.avatar}
            alt="User avatar"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 150px"
          />
        </div>
        <div className="space-y-1">
          <button className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#262626] border border-neutral-800 hover:border-neutral-700 text-white transition-all cursor-pointer">
            Change Avatar
          </button>
          <p className="text-[10px] text-neutral-500 mt-2">JPG, GIF or PNG. Max size of 5MB.</p>
        </div>
      </div>

      {/* Input Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">Full Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full text-white text-sm rounded-xl transition-all 
             [&_div]:bg-[#0B0B0C] [&_div]:border [&_div]:border-neutral-800 
             [&_div]:hover:border-neutral-700 [&_div]:focus-within:border-neutral-600! 
             [&_input]:placeholder-neutral-600"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">Email Address</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full text-white text-sm rounded-xl transition-all 
             [&_div]:bg-[#0B0B0C] [&_div]:border [&_div]:border-neutral-800 
             [&_div]:hover:border-neutral-700 [&_div]:focus-within:border-neutral-600! 
             [&_input]:placeholder-neutral-600"
          />
        </div>
      </div>

      {/* Action Controller Line */}
      <div className="pt-2 flex items-center gap-3">
        <Button
          size="md"
          className="bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-5 h-9"
        >
          Update Profile
        </Button>
        <Button
          size="md"
          variant="bordered"
          className="border-neutral-800 text-neutral-300 hover:bg-[#222] font-semibold text-xs rounded-xl px-5 h-9"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}