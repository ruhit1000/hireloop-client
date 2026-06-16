import React from "react";
import { getCompanies } from "@/lib/api/company";
import { HelpCircle } from "lucide-react";
import CompanyPagination from "@/components/Company/CompanyPagination";
import SearchAndFilterBar from "@/components/Company/SearchAndFilterBar";
import CompanyCard from "@/components/Company/CompanyCard";


const AllCompaniesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;

  const dataEnvelope =
    (await getCompanies(currentPage, 9, "all", params?.search || "")) || {};
  const companiesList = dataEnvelope?.companies || [];
  const paginationMeta = dataEnvelope?.pagination || null;

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6 pt-26">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Browse Companies
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Discover the world's leading technology and creative organizations.
            Filter by industry, size, and values to find your next professional
            home.
          </p>
        </div>

        <div className="mt-6">
            <SearchAndFilterBar />
        </div>

        {companiesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {companiesList.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-2xl max-w-xl mx-auto flex flex-col items-center justify-center p-6 mt-10">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
              <HelpCircle size={20} />
            </div>
            <h3 className="text-white text-base font-semibold mb-1">
              No matching profiles
            </h3>
            <p className="text-neutral-500 text-xs max-w-xs">
              We couldn't find any enterprise records that match your exact
              query terms. Try altering your filters.
            </p>
          </div>
        )}

        {paginationMeta && (
          <CompanyPagination totalPages={paginationMeta.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AllCompaniesPage;
