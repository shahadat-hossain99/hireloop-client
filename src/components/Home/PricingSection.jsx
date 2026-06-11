"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, BarChart2, Zap, Plus, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "starter",
    icon: <Crown size={18} className="text-violet-400" />,
    iconBg: "bg-violet-500/10",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company Insight dashboards",
      "1-click apply, unlimited",
    ],
    cta: "Choose This Plan",
    highlighted: false,
  },
  {
    id: "growth",
    icon: <BarChart2 size={18} className="text-violet-400" />,
    iconBg: "bg-violet-500/10",
    name: "Growth",
    monthly: 17,
    yearly: 13,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company Insight dashboards",
      "1-click apply, unlimited",
    ],
    cta: "Choose This Plan",
    highlighted: true,
  },
  {
    id: "premium",
    icon: <Zap size={18} className="text-amber-400" />,
    iconBg: "bg-amber-500/10",
    name: "Premium",
    monthly: 99,
    yearly: 79,
    subtitle: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    cta: "Choose This Plan",
    highlighted: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 lg:px-10 text-white min-h-screen">
      <div className="mx-auto max-w-4/5">
        {/* ── Label ── */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-[6px] w-[6px] rounded-sm bg-violet-500" />
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Pricing
          </span>
          <span className="h-[6px] w-[6px] rounded-sm bg-violet-500" />
        </div>

        {/* ── Heading ── */}
        <h2 className="text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl mb-10">
          Pay for the leverage,
          <br />
          not the listings
        </h2>

        {/* ── Toggle ── */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-[#0f0f17] p-1">
            {/* Monthly */}
            <button
              onClick={() => setYearly(false)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  !yearly
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              Monthly
            </button>

            {/* Yearly */}
            <button
              onClick={() => setYearly(true)}
              className={`
                flex items-center gap-2
                px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  yearly
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              Yearly
              <span className="inline-flex items-center rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-12">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col
                  rounded-2xl p-6
                  transition-all duration-300
                  ${
                    plan.highlighted
                      ? "bg-[#13131f] border border-violet-500/30 shadow-[0_0_40px_rgba(109,40,217,0.12)]"
                      : "bg-[#0d0d14] border border-white/[0.07]"
                  }
                `}
              >
                {/* Plan name + price row */}
                <div className="flex items-center justify-between mb-5">
                  {/* Icon + name */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg ${plan.iconBg}`}
                    >
                      {plan.icon}
                    </div>
                    <span className="text-base font-semibold text-white">
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-end gap-0.5">
                      <span className="text-2xl font-bold text-white">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500 mb-1">
                        /month
                      </span>
                    </div>
                    {yearly && price > 0 && (
                      <span className="text-[10px] text-violet-400 font-medium">
                        ${price * 12}/year total
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] mb-5" />

                {/* Subtitle */}
                <p className="text-xs text-slate-400 mb-4">{plan.subtitle}</p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Plus
                        size={13}
                        className="shrink-0 text-slate-500 mt-0.5"
                      />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/auth/signup"
                  className={`
                    mt-auto flex items-center justify-between
                    w-full px-5 py-3.5
                    rounded-xl
                    text-sm font-medium
                    transition-all duration-200
                    group
                    ${
                      plan.highlighted
                        ? "bg-white text-gray-900 hover:bg-slate-100"
                        : "bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.1]"
                    }
                  `}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
