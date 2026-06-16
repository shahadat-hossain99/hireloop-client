import CompaniesGrid from "@/components/companies/CompaniesGrid";

async function getCompanies() {
  const res = await fetch("http://localhost:5000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            Browse Companies
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Discover world-class companies, explore cultures, and find
            opportunities that align with your career goals.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div
            className="
            rounded-2xl
            border border-white/10
            bg-[#111111]
            p-4
          "
          >
            <input
              placeholder="Search company, industry or location..."
              className="
                w-full
                bg-transparent
                outline-none
                text-white
                placeholder:text-zinc-500
              "
            />
          </div>
        </div>

        <CompaniesGrid companies={companies} />
      </div>
    </div>
  );
}
