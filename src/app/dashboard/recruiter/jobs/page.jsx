import React from "react";
import { getCompanyJobs } from "@/lib/api/jobs";
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const RecruiterJobs = async () => {
  const companyId = "auto-filled-recruiter-company-id";
  const jobs = (await getCompanyJobs(companyId)) || [];

  return (
    <div className="min-h-screen bg-[#000000] text-[#ededed] p-4 sm:p-6 antialiased mt-7">
      <div className="w-full max-w-[88%] mx-auto space-y-6">
        {/* Upper Title Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#2d2d2d] pb-5">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Manage Posted Jobs
            </h1>
            <p className="text-sm text-[#a1a1a1] mt-1">
              Review metrics, edit guidelines, or modify the visibility states
              of your active vacancies.
            </p>
          </div>
        </div>

        {/* 1. MOBILE RESPONSIVE CARDS (Shows only on mobile viewports) */}
        <div className="block md:hidden space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center p-8 bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl text-[#a1a1a1]">
              No jobs posted yet by your company.
            </div>
          ) : (
            jobs.map((job) => {
              const jobId = job._id?.$oid || job._id;
              const formattedSalaryMin = Number(job.salaryMin).toLocaleString();
              const formattedSalaryMax = Number(job.salaryMax).toLocaleString();

              return (
                <div
                  key={jobId}
                  className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl p-4 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-base">
                        {job.title}
                      </span>
                      <span className="text-xs text-[#a1a1a1] mt-0.5 capitalize">
                        {job.category} • {job.jobType}
                      </span>
                    </div>
                    <Chip
                      size="sm"
                      variant="flat"
                      className={`capitalize ${
                        job.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {job.status || "Inactive"}
                    </Chip>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-[#2d2d2d]/60 text-xs">
                    <div>
                      <span className="text-[#a1a1a1] block">Salary Range</span>
                      <span className="text-white font-mono mt-0.5 block">
                        {formattedSalaryMin} - {formattedSalaryMax}{" "}
                        {job.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#a1a1a1] block">Deadline</span>
                      <span className="text-[#ededed] font-mono mt-0.5 block">
                        {job.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#a1a1a1]">
                      {job.isRemote
                        ? "• Remote Position"
                        : "• On-site / Hybrid"}
                    </span>

                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[#a1a1a1] hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[#a1a1a1] hover:text-white"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[#a1a1a1] hover:text-rose-400"
                      >
                        <TrashBin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 2. DESKTOP GRID LAYOUT (Warning-free custom panel wrapper syntax) */}
        <div className="hidden md:block bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl shadow-2xl overflow-hidden">
          {/* Removed removeWrapper completely to fix the DOM warning */}
          <Table aria-label="Company jobs list table">
            <Table.ResizableContainer>
              <Table.Content
                aria-label="Table with resizable columns"
                className="w-full"
              >
                <Table.Header>
                  <Table.Column
                    isRowHeader
                    defaultWidth="2fr"
                    id="title"
                    minWidth={180}
                  >
                    Job Title
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1.5fr" id="type" minWidth={140}>
                    Category / Type
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.5fr"
                    id="compensation"
                    minWidth={150}
                  >
                    Salary Range
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column
                    defaultWidth="1.2fr"
                    id="deadline"
                    minWidth={120}
                  >
                    Deadline
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                    Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body
                  emptyContent={"No jobs posted yet by your company."}
                >
                  {jobs.map((job) => {
                    const jobId = job._id?.$oid || job._id;
                    const formattedSalaryMin = Number(
                      job.salaryMin,
                    ).toLocaleString();
                    const formattedSalaryMax = Number(
                      job.salaryMax,
                    ).toLocaleString();

                    return (
                      <Table.Row
                        key={jobId}
                        className="border-b border-[#2d2d2d]/50 hover:bg-[#242424]/40 transition-colors"
                      >
                        <Table.Cell>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-white text-sm">
                              {job.title}
                            </span>
                            {job.isRemote && (
                              <span className="text-[11px] text-[#a1a1a1] flex items-center gap-1 font-normal">
                                • Remote Position
                              </span>
                            )}
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-white text-sm capitalize">
                              {job.category}
                            </span>
                            <span className="text-xs text-[#a1a1a1] capitalize">
                              {job.jobType}
                            </span>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-white text-sm font-mono">
                            {formattedSalaryMin} - {formattedSalaryMax}{" "}
                            <span className="text-xs text-[#a1a1a1] ml-0.5 font-sans">
                              {job.currency}
                            </span>
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-sm text-[#ededed] font-mono">
                            {job.deadline}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <Chip
                            size="sm"
                            variant="flat"
                            className={`capitalize ${
                              job.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-rose-500/10 text-rose-400"
                            }`}
                          >
                            {job.status || "Inactive"}
                          </Chip>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex items-center gap-1.5">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-[#a1a1a1] hover:text-white hover:bg-[#242424]"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-[#a1a1a1] hover:text-white hover:bg-[#242424]"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              className="text-[#a1a1a1] hover:text-rose-400 hover:bg-rose-500/10"
                            >
                              <TrashBin className="w-4 h-4" />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
