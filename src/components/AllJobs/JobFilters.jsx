"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, Label, ListBox, TextField, InputGroup } from "@heroui/react";
import { Search } from "lucide-react";

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-[#161616] border border-neutral-800 rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4 items-end">
      {/* 1. Search Bar */}
      <div className="flex-1 w-full">
        <TextField>
          <Label className="text-neutral-400 text-sm mb-1 block">
            Search Jobs
          </Label>
          <InputGroup className="bg-[#222222] border border-neutral-700 rounded-lg overflow-hidden flex items-center">
            <InputGroup.Prefix className="pl-3">
              <Search size={18} className="text-neutral-500" />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search by title..."
              className="w-full bg-transparent text-white px-3 py-2.5 outline-none text-sm"
              defaultValue={searchParams.get("query")?.toString()}
              onChange={(e) => handleFilterChange("query", e.target.value)}
            />
          </InputGroup>
        </TextField>
      </div>

      {/* 2. Category Filter */}
      <div className="w-full md:w-48">
        <Select
          value={searchParams.get("category") || "all"}
          onChange={(key) => handleFilterChange("category", key)}
        >
          <Label className="text-neutral-400 text-sm mb-1 block">
            Category
          </Label>
          <Select.Trigger className="w-full bg-[#222222] border border-neutral-700 text-white rounded-lg px-4 py-2.5 text-sm flex justify-between items-center outline-none">
            <Select.Value placeholder="All Categories" />
          </Select.Trigger>
          <Select.Popover className="bg-[#222222] border border-neutral-700 rounded-lg mt-1 p-1">
            <ListBox className="text-white text-sm">
              <ListBox.Item id="all" textValue="All Categories">
                <Label>All Categories</Label>
              </ListBox.Item>
              <ListBox.Item
                id="Software Development"
                textValue="Software Development"
              >
                <Label>Software Development</Label>
              </ListBox.Item>
              <ListBox.Item id="Design" textValue="Design">
                <Label>Design</Label>
              </ListBox.Item>
              <ListBox.Item id="Marketing" textValue="Marketing">
                <Label>Marketing</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 3. Job Type Filter */}
      <div className="w-full md:w-40">
        <Select
          value={searchParams.get("type") || "all"}
          onChange={(key) => handleFilterChange("type", key)}
        >
          <Label className="text-neutral-400 text-sm mb-1 block">
            Job Type
          </Label>
          <Select.Trigger className="w-full bg-[#222222] border border-neutral-700 text-white rounded-lg px-4 py-2.5 text-sm flex justify-between items-center outline-none">
            <Select.Value placeholder="All Types" />
          </Select.Trigger>
          <Select.Popover className="bg-[#222222] border border-neutral-700 rounded-lg mt-1 p-1">
            <ListBox className="text-white text-sm">
              <ListBox.Item id="all" textValue="All Types">
                <Label>All Types</Label>
              </ListBox.Item>
              <ListBox.Item id="Full-time" textValue="Full-time">
                <Label>Full-time</Label>
              </ListBox.Item>
              <ListBox.Item id="Part-time" textValue="Part-time">
                <Label>Part-time</Label>
              </ListBox.Item>
              <ListBox.Item id="Contract" textValue="Contract">
                <Label>Contract</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 4. Location (Remote vs On-site) */}
      <div className="w-full md:w-40">
        <Select
          value={searchParams.get("location") || "all"}
          onChange={(key) => handleFilterChange("location", key)}
        >
          <Label className="text-neutral-400 text-sm mb-1 block">
            Location
          </Label>
          <Select.Trigger className="w-full bg-[#222222] border border-neutral-700 text-white rounded-lg px-4 py-2.5 text-sm flex justify-between items-center outline-none">
            <Select.Value placeholder="Any Location" />
          </Select.Trigger>
          <Select.Popover className="bg-[#222222] border border-neutral-700 rounded-lg mt-1 p-1">
            <ListBox className="text-white text-sm">
              <ListBox.Item id="all" textValue="Any Location">
                <Label>Any Location</Label>
              </ListBox.Item>
              <ListBox.Item id="remote" textValue="Remote">
                <Label>Remote</Label>
              </ListBox.Item>
              <ListBox.Item id="onsite" textValue="On-site">
                <Label>On-site</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
