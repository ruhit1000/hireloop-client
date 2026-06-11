"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Run on mount to safely transition client state
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      onSuccess: () => {
        setIsMenuOpen(false);
        router.refresh();
      },
    });
  };

  // Base items that match on both server and client initially
  const menuItems = [
    { name: "Browse Jobs", pathname: "/jobs" },
    { name: "Company", pathname: "/company" },
    { name: "Pricing", pathname: "/pricing" },
  ];

  const dashboardPath = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  // Only append dynamic items after mounting on the client side
  if (mounted && user?.email) {
    menuItems.push({
      name: "Dashboard",
      pathname: dashboardPath[user?.role || "seeker"],
    });
  }

  return (
    <nav className="fixed top-4 inset-x-0 mx-auto max-w-6xl rounded-2xl bg-[#1A1A1A]/80 backdrop-blur-md border border-neutral-800 shadow-xl z-50 flex flex-col px-6 py-3">
      <div className="flex items-center justify-between w-full">
        {/* Brand */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Hireloop Logo"
            width={120}
            height={32}
            priority
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center flex-1 justify-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.pathname}
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <div className="h-6 border-l border-neutral-700 mx-2"></div>
          {/* Prevent action block flash during hydration */}
          {mounted && user ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-6 font-medium border-none"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-[#818cf8] text-sm hover:text-indigo-300 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <Button className="bg-[#6366f1] text-white px-6 font-medium border-none">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col md:hidden pt-6 pb-2 gap-4 border-t border-neutral-800 mt-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.pathname}
                className="block text-neutral-200 text-lg py-2 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <div className="flex flex-col gap-3 mt-2 border-t border-neutral-800 pt-4">
            {mounted && user ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-center w-full py-2 rounded-md text-[#818cf8] bg-indigo-500/10 hover:bg-indigo-500/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#6366f1] text-white border-none">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </ul>
      )}
    </nav>
  );
}
