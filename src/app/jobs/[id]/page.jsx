import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, Button, Chip, Separator } from "@heroui/react";

import { getJobById } from "@/lib/api/jobs";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Job not found
      </div>
    );
  }

  const deadline = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(job.deadline));

  return (
    <section className="min-h-screen bg-black py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            {/* HERO CARD */}
            <Card className="border border-white/10 bg-[#0d0d14]">
              <Card.Content className="p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white">
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white sm:text-4xl">
                      {job.title}
                    </h1>

                    <p className="mt-2 text-lg text-slate-300">
                      {job.companyName}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Chip variant="flat" color="primary">
                        {job.category}
                      </Chip>

                      <Chip variant="flat" color="secondary">
                        {job.jobType}
                      </Chip>

                      <Chip
                        variant="flat"
                        color={job.isRemote ? "success" : "default"}
                      >
                        {job.isRemote ? "Remote" : "On-site"}
                      </Chip>

                      <Chip
                        variant="flat"
                        color={job.status === "active" ? "success" : "danger"}
                      >
                        {job.status}
                      </Chip>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* RESPONSIBILITIES */}
            <Card className="border border-white/10 bg-[#0d0d14]">
              <Card.Header className="px-6 pt-6">
                <Card.Title className="text-xl font-semibold text-white">
                  Responsibilities
                </Card.Title>
              </Card.Header>

              <Card.Content className="px-6 pb-6">
                <p className="leading-8 text-slate-300">
                  {job.responsibilities}
                </p>
              </Card.Content>
            </Card>

            {/* REQUIREMENTS */}
            <Card className="border border-white/10 bg-[#0d0d14]">
              <Card.Header className="px-6 pt-6">
                <Card.Title className="text-xl font-semibold text-white">
                  Requirements
                </Card.Title>
              </Card.Header>

              <Card.Content className="px-6 pb-6">
                <p className="leading-8 text-slate-300">{job.requirements}</p>
              </Card.Content>
            </Card>

            {/* BENEFITS */}
            <Card className="border border-white/10 bg-[#0d0d14]">
              <Card.Header className="px-6 pt-6">
                <Card.Title className="text-xl font-semibold text-white">
                  Benefits
                </Card.Title>
              </Card.Header>

              <Card.Content className="px-6 pb-6">
                <p className="leading-8 text-slate-300">{job.benefits}</p>
              </Card.Content>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <Card className="sticky top-6 border border-white/10 bg-[#0d0d14]">
              <Card.Content className="p-6">
                <Button
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                >
                  Apply Now
                </Button>

                <Separator className="my-6 bg-white/10" />

                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-slate-500">Salary Range</p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {job.currency} {job.salaryMin} - {job.salaryMax}
                    </h3>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Application Deadline
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {deadline}
                    </h3>
                  </div>

                  {job.location && (
                    <>
                      <Separator className="bg-white/10" />

                      <div>
                        <p className="text-sm text-slate-500">Location</p>

                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {job.location}
                        </h3>
                      </div>
                    </>
                  )}

                  <Separator className="bg-white/10" />

                  <div>
                    <p className="text-sm text-slate-500">Work Mode</p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {job.isRemote ? "Remote" : "On-site"}
                    </h3>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <p className="text-sm text-slate-500">Company</p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {job.companyName}
                    </h3>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsPage;
