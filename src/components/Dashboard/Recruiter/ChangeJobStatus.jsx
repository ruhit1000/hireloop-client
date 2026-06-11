"use client";

import React, { useState } from "react";
import { ListBox, Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import { updateJobStatus } from "@/lib/actions/jobs";

export function ChangeJobStatus({ jobId, currentStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const statuses = [
    { id: "active", name: "Active" },
    { id: "draft", name: "Draft" },
    { id: "closed", name: "Closed" },
  ];

  const handleStatusChange = async (newStatus) => {
    if (!newStatus || newStatus === status) return;

    try {
      setIsLoading(true);
      setStatus(newStatus); // Optimistic UI update

      await updateJobStatus(jobId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(status); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      className="w-37.5"
      placeholder="Select status"
      value={status}
      onChange={(value) => handleStatusChange(value)}
      isDisabled={isLoading}
      aria-label="Change job status"
    >
      <Select.Trigger className="bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-lg text-sm font-medium border border-neutral-800 transition-colors h-10 px-4 flex items-center justify-between cursor-pointer">
        <Select.Value className="capitalize" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-[#161616] border border-neutral-800 rounded-xl p-1 shadow-2xl">
        <ListBox>
          {statuses.map((item) => (
            <ListBox.Item
              key={item.id}
              id={item.id}
              textValue={item.name}
              className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                status === item.id
                  ? "bg-white text-black font-semibold"
                  : "text-neutral-400 hover:bg-[#222222] hover:text-white"
              }`}
            >
              {item.name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
