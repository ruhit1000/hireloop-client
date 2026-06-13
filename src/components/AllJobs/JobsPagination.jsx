"use client";

import React from "react";
import { Pagination } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function JobsPagination({ meta }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!meta || meta.totalPages <= 1) return null;

  const totalItems = Number(meta.totalItems);
  const totalPages = Number(meta.totalPages);
  const currentPage = Number(meta.currentPage) || 1;
  const itemsPerPage = Number(meta.itemsPerPage) || 15;

  const handlePageChange = (targetPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) pages.push("ellipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Pagination
      page={currentPage}
      total={totalPages}
      className="w-full mt-8 border-t border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <Pagination.Summary className="text-sm text-neutral-400">
        Showing{" "}
        <span className="text-white font-medium">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="text-white font-medium">{totalItems}</span>{" "}
        available jobs
      </Pagination.Summary>

      <Pagination.Content className="flex items-center gap-1 bg-[#161616] border border-neutral-800/80 p-1.5 rounded-xl">
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40"
          >
            <Pagination.PreviousIcon size={14} />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis className="text-neutral-600 px-2" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => handlePageChange(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  p === currentPage
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:bg-[#222] hover:text-white"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-40"
          >
            <span>Next</span>
            <Pagination.NextIcon size={14} />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
