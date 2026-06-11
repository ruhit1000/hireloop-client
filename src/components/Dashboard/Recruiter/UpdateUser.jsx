"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UpdateUser({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ type: "error", text: "Profile name cannot be blank." });
      return;
    }

    try {
      setIsPending(true);
      setMessage({ type: "", text: "" });

      // Run profile state transformation
      await authClient.updateUser({ name: name.trim() });

      setMessage({
        type: "success",
        text: "Identity profile updated successfully.",
      });
      router.refresh(); // Synchronize new state tracking across headers/navbars
    } catch (error) {
      console.error("Failed processing profile update:", error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-[#111214] border border-[#1f2125] rounded-2xl p-6 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Personal Identity
        </h3>
        <p className="text-xs text-neutral-400">
          This identification information is attached to your job postings and
          communications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Field 1: Read-Only Login Email Reference Block */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail size={12} />
            Account Email (Locked)
          </label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full h-11 bg-[#161719]/50 border border-[#23262a] rounded-xl px-4 text-sm text-neutral-500 cursor-not-allowed outline-none select-none"
          />
        </div>

        {/* Field 2: Editable Interactive Name Selection Input */}
        <div className="space-y-2">
          <label
            htmlFor="profile-name"
            className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5"
          >
            <User size={12} />
            Full Name
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-11 bg-[#161719] border border-[#23262a] focus:border-indigo-500 rounded-xl px-4 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-150"
            disabled={isPending}
          />
        </div>

        {/* Action Validation Message Center Banner */}
        {message.text && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium border ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Execution Action Trigger Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            className="bg-[#6366f1] hover:bg-indigo-500 text-white font-medium px-6 h-11 rounded-xl border-none transition-colors duration-150"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
