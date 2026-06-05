import React from "react";
import Link from "next/link";
import { Store } from "lucide-react";
import CompanyFormModal from "./CompanyFormModal";

export default function NoCompanyState({ userId }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      {/* Graphic Representation */}
      <div className="relative mb-10">
        <div className="w-48 h-48 bg-[#161616] border border-neutral-800 rounded-3xl flex flex-col p-6 items-start justify-center opacity-60">
          <div className="w-10 h-10 bg-neutral-800 rounded-lg mb-4"></div>
          <div className="w-full h-2 bg-neutral-800 rounded-full mb-3"></div>
          <div className="w-3/4 h-2 bg-neutral-800 rounded-full"></div>
        </div>
        {/* Floating Badge */}
        <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
          <Store className="text-black w-6 h-6" />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
        Company not registered yet
      </h2>
      <p className="text-neutral-400 text-sm max-w-md mb-8 leading-relaxed">
        Set up your business profile to start posting high-performance job
        listings and manage your talent loop.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <CompanyFormModal userId={userId} />
        <Link
          href="/faq"
          className="bg-transparent border border-neutral-800 hover:bg-[#1A1A1A] text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          View FAQ
        </Link>
      </div>

      {/* Footer Support Text */}
      <p className="text-xs text-neutral-600">
        Need specialized assistance? Contact our enterprise support team.
      </p>
    </div>
  );
}