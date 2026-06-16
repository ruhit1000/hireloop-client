"use client";

import React from "react";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompanyPagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pt-4 flex justify-center w-full">
      <Pagination className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
              className="bg-[#161719] border border-[#1f2125] text-neutral-400 hover:text-white rounded-xl h-9 px-3 data-[disabled=true]:opacity-40"
            >
              <Pagination.PreviousIcon />
              <span className="text-xs font-semibold">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => handlePageChange(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  p === currentPage
                    ? "bg-white text-black font-bold"
                    : "bg-[#161719] border border-[#1f2125] text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
              className="bg-[#161719] border border-[#1f2125] text-neutral-400 hover:text-white rounded-xl h-9 px-3 data-[disabled=true]:opacity-40"
            >
              <span className="text-xs font-semibold">Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}
