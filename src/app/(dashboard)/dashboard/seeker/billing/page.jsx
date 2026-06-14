import React from "react";
import Link from "next/link";
import { jobSeekerPlans } from "@/Data/data";
import { getUserSession } from "@/lib/core/session";
import { CheckCircle2 } from "lucide-react";

const SeekerBillingPage = async () => {
  const user = await getUserSession();
  const plan = user?.plan || "seeker_free";
  const planDetails = jobSeekerPlans.find((p) => p.id === plan);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="border-b border-neutral-900 pb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Subscription & Billing
          </h1>
          <p className="text-sm text-neutral-400">
            Manage your tier features, recurring payments, and account status.
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-8 max-w-2xl">
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-neutral-800 rounded-md border border-neutral-700/50 inline-block">
                Current Plan
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {planDetails.name} Tier
              </h2>
              <p className="text-sm text-neutral-400">
                {planDetails.description}
              </p>
            </div>

            {/* Plan Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {planDetails.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-sm text-neutral-300"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 shrink-0"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Trigger Button */}
            <div className="pt-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-6 h-10 transition-all duration-200 active:scale-95 shadow-md"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="text-left md:text-right shrink-0">
            <p className="text-3xl font-black text-white">
              ${planDetails.price}
              <span className="text-sm font-normal text-neutral-500 lowercase">
                {planDetails.period}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerBillingPage;
