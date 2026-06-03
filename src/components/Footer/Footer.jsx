import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0C] border-t border-neutral-900 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left Section: Brand & Info */}
        <div className="w-full md:max-w-sm">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Hireloop Logo"
              width={120}
              height={32}
            />
          </Link>
          <p className="text-neutral-500 text-sm mt-6 leading-relaxed">
            The AI-native career platform. Built for people who take their work
            seriously.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-8">
            <Link
              href="#"
              className="p-2 bg-[#1A1A1A] rounded-md text-neutral-400 hover:text-white transition-colors"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 bg-[#6366f1] rounded-md text-white hover:bg-indigo-600 transition-colors"
            >
              <FaPinterest size={18} />
            </Link>
            <Link
              href="#"
              className="p-2 bg-[#1A1A1A] rounded-md text-neutral-400 hover:text-white transition-colors"
            >
              <FaLinkedinIn size={18} />
            </Link>
          </div>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="w-full md:w-auto flex flex-wrap gap-12 md:gap-24">
          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#6366f1] font-medium text-sm">Product</h4>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Job discovery
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Worker AI
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Companies
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Salary data
            </Link>
          </div>

          {/* Navigations Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#6366f1] font-medium text-sm">Navigations</h4>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Help center
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Career library
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#6366f1] font-medium text-sm">Resources</h4>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Brand Guideline
            </Link>
            <Link
              href="#"
              className="text-neutral-400 text-sm hover:text-white transition-colors"
            >
              Newsroom
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <p>Copyright {new Date().getFullYear()} — All rights reserved</p>
        <p>Terms & Policy - Privacy Guideline</p>
      </div>
    </footer>
  );
}
