"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  Globe,
  Person,
  Factory,
  StarFill,
} from "@gravity-ui/icons";

import { Card, Chip, Button } from "@heroui/react";

export default function CompanyCard({ company }) {
  return (
    <Card
      className="
      h-full
      border border-white/5
      bg-[#111111]
      hover:border-violet-500/30
      hover:bg-[#151515]
      transition-all duration-300
      group
    "
    >
      <Card.Content className="p-5 flex flex-col h-full">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="relative size-14 rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={company.logo}
              alt={company.name}
              fill
              className="object-contain p-2"
            />
          </div>

          <Chip size="sm" color="success" variant="flat">
            <StarFill size={8} />
            Verified
          </Chip>
        </div>

        {/* Company */}
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-white line-clamp-1">
            {company.name}
          </h3>

          <p className="mt-3 text-sm text-zinc-400 line-clamp-3">
            {company.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip size="sm" variant="bordered">
            {company.industry}
          </Chip>

          <Chip size="sm" variant="bordered">
            {company.location}
          </Chip>
        </div>

        {/* Stats */}
        <div className="mt-5 border-t border-white/5 pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Person size={16} />
            <span>{company.employeeCount} Employees</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Factory size={16} />
            <span>{company.industry}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Globe size={16} />
            <span className="truncate">
              {company.websiteUrl.replace("https://", "")}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <Button
            as={Link}
            href={`/companies/${company._id}`}
            variant="light"
            color="secondary"
            className="w-full px-4"
          >
            <div className="flex flex-row items-center  w-full font-medium gap-3">
              View Company
              <ArrowRight size={16} />
            </div>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
