"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Switch,
  Button,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import {
  Briefcase,
  CreditCard,
  Pin,
  Calendar,
  FileText,
  CircleCheckFill,
  Clock,
  CircleExclamationFill,
  Factory,
} from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";
import { Hourglass } from "lucide-react";

export default function PostJobForm({ company }) {
  const [isRemote, setIsRemote] = useState(false);

  // --- 🚫 EARLY RETURN: If Company is NOT approved ---
  if (company?.status?.toLowerCase() !== "approved") {
    return (
      <div className="min-h-screen bg-[#000000] text-[#ededed] flex items-center justify-center p-2 sm:p-4 antialiased">
        <div className="w-full max-w-[88%] lg:max-w-lg bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden p-8 text-center">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-full mb-5 border border-amber-500/20">
            <Hourglass className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Awaiting Approval
          </h2>
          <p className="text-[#a1a1a1] text-sm max-w-sm mx-auto leading-relaxed">
            Your company profile is currently under review by the HireLoop admin
            team. Please wait until your company is{" "}
            <span className="text-emerald-400 font-medium">approved</span>{" "}
            before you can post jobs.
          </p>
          <div className="mt-6 h-px bg-[#2d2d2d] w-full" />
          <p className="mt-6 text-xs text-[#a1a1a1]">
            Status:{" "}
            <span className="text-amber-400 font-medium capitalize">
              {company?.status || "Pending"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // --- Helper for Verification Badge ---
  const renderVerificationBadge = () => {
    const status = company?.status?.toLowerCase() || "unverified";

    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CircleCheckFill className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <CircleExclamationFill className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
            <CircleExclamationFill className="w-3.5 h-3.5" />
            Unverified
          </span>
        );
    }
  };

  const jobCategories = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design & Creative" },
    { value: "marketing", label: "Marketing & Sales" },
    { value: "finance", label: "Finance & Accounting" },
  ];

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "BDT", label: "BDT (৳)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalPayload = {
      ...data,
      isRemote: isRemote,
      status: "active",
      companyId: company._id,
      companyName: company.name,
      companyLogo: company.logo,
      isPubliclyVisible: true,
    };

    console.log("Submitting Job Payload:", finalPayload);

    const res = await createJob(finalPayload);
    if (res.insertedId) {
      toast.success("Job Posted Successfully");
      e.target.reset();
      setIsRemote(false);
      redirect("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className="bg-[#000000] text-[#ededed] flex items-center justify-center p-2 sm:p-4 antialiased">
      <div className="w-full max-w-[88%] lg:max-w-4xl bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden my-4">
        {/* Header */}
        <div className="p-6 border-b border-[#2d2d2d]">
          <h1 className="text-xl font-semibold text-white">Post a New Job</h1>
          <p className="text-sm text-[#a1a1a1] mt-1">
            Fill out the details below to publish a position on HireLoop.
          </p>
        </div>

        {/* --- ✅ FIXED: Renders the form because we passed the early return --- */}
        <Form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8">
          {/* COMPANY INFO SECTION */}
          <section className="space-y-4 w-full">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#a1a1a1] flex items-center gap-2">
              <Factory className="w-4 h-4 text-white" /> Company Information
            </h2>
            <div className="h-px bg-[#2d2d2d] w-full mb-4" />

            <div className="bg-[#242424] border border-[#333333] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left: Company Name */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm border border-white/10 select-none">
                  {company?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="text-white font-medium text-base">
                    {company?.name || "Unknown Company"}
                  </p>
                  <p className="text-zinc-500 text-xs">
                    Posting on behalf of this organization
                  </p>
                </div>
              </div>

              {/* Right: Verification Status Badge */}
              <div className="flex items-center gap-2 bg-[#1c1c1c] border border-[#333333] rounded-full px-3 py-1.5 shrink-0">
                {renderVerificationBadge()}
              </div>
            </div>
          </section>

          {/* SECTION 1: JOB INFO */}
          <section className="space-y-4 w-full">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#a1a1a1] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-white" /> Job Information
            </h2>
            <div className="h-px bg-[#2d2d2d] w-full mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Job Title
                </Label>
                <Input
                  required
                  name="title"
                  placeholder="e.g. Senior Frontend Engineer"
                  className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white h-10 px-3 rounded-medium text-sm text-white transition-colors outline-none"
                />
              </TextField>

              {/* Job Category Select */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Job Category
                </Label>
                <div className="relative w-full block group">
                  <select
                    name="category"
                    required
                    className="w-full h-10 pl-3 pr-10 rounded-medium bg-[#242424] border border-[#333333] hover:border-[#444444] text-sm text-white transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1c1c1c] text-[#a1a1a1]">
                      Select category
                    </option>
                    {jobCategories.map((cat) => (
                      <option
                        key={cat.value}
                        value={cat.value}
                        className="bg-[#1c1c1c] text-white py-2"
                      >
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#a1a1a1] group-hover:text-white transition-colors">
                    <svg
                      className="fill-current h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Type Select */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Job Type
                </Label>
                <div className="relative w-full block group">
                  <select
                    name="jobType"
                    required
                    className="w-full h-10 pl-3 pr-10 rounded-medium bg-[#242424] border border-[#333333] hover:border-[#444444] text-sm text-white transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1c1c1c] text-[#a1a1a1]">
                      Select job type
                    </option>
                    {jobTypes.map((type) => (
                      <option
                        key={type.value}
                        value={type.value}
                        className="bg-[#1c1c1c] text-white py-2"
                      >
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#a1a1a1] group-hover:text-white transition-colors">
                    <svg
                      className="fill-current h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Application Deadline
                </Label>
                <div className="relative flex items-center w-full">
                  <Input
                    required
                    type="date"
                    name="deadline"
                    className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white h-10 pl-3 pr-10 rounded-medium text-sm text-white transition-colors w-full outline-none"
                  />
                  <Calendar className="absolute right-3 text-[#a1a1a1] w-4 h-4 pointer-events-none" />
                </div>
              </TextField>
            </div>

            {/* Compensation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Min Salary */}
              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Min Salary
                </Label>
                <div className="relative flex items-center w-full">
                  <CreditCard className="absolute left-3 text-[#a1a1a1] w-4 h-4 pointer-events-none" />
                  <Input
                    required
                    type="number"
                    name="salaryMin"
                    placeholder="0"
                    className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white h-10 pl-10 pr-3 rounded-medium text-sm text-white transition-colors w-full outline-none"
                  />
                </div>
              </TextField>

              {/* Max Salary */}
              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Max Salary
                </Label>
                <div className="relative flex items-center w-full">
                  <CreditCard className="absolute left-3 text-[#a1a1a1] w-4 h-4 pointer-events-none" />
                  <Input
                    required
                    type="number"
                    name="salaryMax"
                    placeholder="0"
                    className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white h-10 pl-10 pr-3 rounded-medium text-sm text-white transition-colors w-full outline-none"
                  />
                </div>
              </TextField>

              {/* Currency Select */}
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Currency
                </Label>
                <div className="relative w-full block group">
                  <select
                    name="currency"
                    defaultValue="USD"
                    className="w-full h-10 pl-3 pr-10 rounded-medium bg-[#242424] border border-[#333333] hover:border-[#444444] text-sm text-white transition-all focus:outline-none focus:border-white focus:ring-1 focus:ring-white/20 appearance-none cursor-pointer"
                  >
                    {currencies.map((curr) => (
                      <option
                        key={curr.value}
                        value={curr.value}
                        className="bg-[#1c1c1c] text-white py-2"
                      >
                        {curr.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#a1a1a1] group-hover:text-white transition-colors">
                    <svg
                      className="fill-current h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Location block */}
            <div className="p-4 bg-[#242424] border border-[#333333] rounded-lg space-y-4">
              <div className="flex items-center justify-between gap-4 w-full">
                <Switch
                  isSelected={isRemote}
                  onChange={setIsRemote}
                  className="flex flex-row-reverse items-center justify-between w-full"
                >
                  <Switch.Control className="border border-[#444444]">
                    <Switch.Thumb className="transform" />
                  </Switch.Control>

                  <Switch.Content className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">
                      Remote Position
                    </span>
                    <span className="text-xs text-[#a1a1a1] font-normal">
                      This job can be performed from anywhere
                    </span>
                  </Switch.Content>
                </Switch>
              </div>

              {!isRemote && (
                <TextField isRequired className="flex flex-col gap-1 w-full">
                  <Label className="text-[#ededed] text-sm font-medium">
                    Location
                  </Label>
                  <div className="relative flex items-center w-full">
                    <Pin className="absolute left-3 text-[#a1a1a1] w-4 h-4 pointer-events-none" />
                    <Input
                      required
                      name="location"
                      placeholder="e.g. San Francisco, CA"
                      className="bg-[#1c1c1c] border border-[#333333] hover:border-[#444444] focus:border-white h-10 pl-10 pr-3 rounded-medium text-sm text-white transition-colors w-full outline-none"
                    />
                  </div>
                </TextField>
              )}
            </div>
          </section>

          {/* SECTION 2: JOB DESCRIPTION */}
          <section className="space-y-4 w-full">
            <h2 className="text-sm font-medium uppercase tracking-wider text-[#a1a1a1] flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" /> Role Descriptions &
              Guidelines
            </h2>
            <div className="h-px bg-[#2d2d2d] w-full mb-2" />

            <div className="flex flex-col gap-6 w-full">
              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Core Responsibilities
                </Label>
                <TextArea
                  required
                  name="responsibilities"
                  placeholder="Outline day-to-day duties..."
                  rows={4}
                  className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white p-3 rounded-medium text-sm text-white transition-colors w-full outline-none resize-y"
                />
              </TextField>

              <TextField isRequired className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Requirements & Qualifications
                </Label>
                <TextArea
                  required
                  name="requirements"
                  placeholder="List required technical stacks..."
                  rows={4}
                  className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white p-3 rounded-medium text-sm text-white transition-colors w-full outline-none resize-y"
                />
              </TextField>

              <TextField className="flex flex-col gap-1 w-full">
                <Label className="text-[#ededed] text-sm font-medium">
                  Benefits & Perks (Optional)
                </Label>
                <TextArea
                  name="benefits"
                  placeholder="Health insurance, equity..."
                  rows={3}
                  className="bg-[#242424] border border-[#333333] hover:border-[#444444] focus:border-white p-3 rounded-medium text-sm text-white transition-colors w-full outline-none resize-y"
                />
              </TextField>
            </div>
          </section>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2d2d2d] w-full">
            <Button
              type="button"
              variant="light"
              className="text-[#a1a1a1] hover:text-white hover:bg-[#242424]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-black font-semibold hover:bg-[#ededed] px-6 transition-colors duration-200"
            >
              Publish Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
