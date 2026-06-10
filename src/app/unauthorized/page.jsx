"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, Home, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const UnauthorizedPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Automatically log the user out when they hit this page
    const forceLogout = async () => {
      try {
        await authClient.signOut({
          onSuccess: () => {
            router.refresh();
          },
        });
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    };

    forceLogout();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#161616] border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl">
        {/* Icon & Badge */}
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-400" />
        </div>

        <div className="inline-block bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          ERROR 401
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>

        {/* State Message */}
        <p className="text-neutral-400 mb-8 leading-relaxed text-sm">
          You attempted to access a restricted page. For your security,{" "}
          <strong className="text-white">
            you have been automatically logged out
          </strong>
          . Please sign in with an authorized account to continue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-sky-500 to-orange-500 hover:from-sky-400 hover:to-orange-400 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-[#222222] border border-neutral-700 text-white hover:bg-[#333333] font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
