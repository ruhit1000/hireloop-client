"use client";

import React, { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { jobSeekerPlans, recruiterPlans } from "@/Data/data";

export default function Pricing() {
  const [isRecruiter, setIsRecruiter] = useState(false);

  const currentPlans = isRecruiter ? recruiterPlans : jobSeekerPlans;

  return (
    <section
      id="pricing"
      className="bg-[#0B0B0C] py-24 px-6 border-b border-neutral-900"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></div>
          <span className="text-neutral-400 text-xs font-semibold tracking-[0.2em] uppercase">
            Pricing
          </span>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-sm"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 tracking-tight leading-tight">
          Pay for the leverage, <br /> not the listings
        </h2>

        {/* Toggle Switch */}
        <div className="flex items-center bg-[#1A1A1A] border border-neutral-800 p-1.5 rounded-full mb-16">
          <button
            onClick={() => setIsRecruiter(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              !isRecruiter
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            For Job Seekers
          </button>
          <button
            onClick={() => setIsRecruiter(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              isRecruiter
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            For Recruiters
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {currentPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`flex flex-col p-8 rounded-3xl border transition-colors ${
                  plan.isHighlighted
                    ? "bg-[#161616] border-neutral-700 shadow-2xl"
                    : "bg-[#0B0B0C] border-neutral-800"
                }`}
              >
                {/* Plan Name & Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-md bg-[#1A1A1A] border border-neutral-800 flex items-center justify-center">
                    <Icon className={`w-4 h-4 ${plan.iconColor}`} />
                  </div>
                  <h3 className="text-xl text-white font-medium">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-8 border-b border-neutral-800/50 pb-8">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-neutral-500 text-sm">
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <p className="text-neutral-300 text-sm font-medium mb-6">
                    {plan.description}
                  </p>
                  <ul className="flex flex-col gap-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded-sm bg-[#1A1A1A] border border-neutral-700 flex items-center justify-center shrink-0">
                          <Plus className="w-3 h-3 text-neutral-400" />
                        </div>
                        <span className="text-sm text-neutral-400 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <section>
                    <button
                      type="submit"
                      role="link"
                      className={`mt-10 w-full py-4 rounded-xl flex items-center justify-between px-6 text-sm font-medium transition-colors ${
                        plan.isHighlighted
                          ? "bg-white text-black hover:bg-neutral-200"
                          : "bg-[#262626] text-white hover:bg-[#333333]"
                      }`}
                    >
                      Choose This Plan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </section>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
