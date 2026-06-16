"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@heroui/react";

export default function SearchAndFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/companies?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="w-full bg-[#161719] border border-[#1f2125] rounded-2xl h-16 pl-4 pr-2 flex items-center gap-3 focus-within:border-neutral-700 transition-all shadow-xl px-6"
    >
      <div className="flex items-center gap-3 flex-1">
        <Search size={18} className="text-neutral-500 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, industry, or location..."
          className="w-full bg-transparent text-white text-sm outline-none placeholder-neutral-500"
        />
      </div>

      <Button
        type="submit"
        size="md"
        className="bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-xl px-5 h-11 transition-all"
      >
        Find Companies
      </Button>
    </form>
  );
}
