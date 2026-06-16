"use client";

import { useState } from "react";
import CompanyCard from "./CompanyCard";
import { Button } from "@heroui/react";

export default function CompaniesGrid({ companies }) {
  const INITIAL = 6;

  const [visible, setVisible] = useState(INITIAL);

  const displayed = companies.slice(0, visible);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {displayed.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>

      {visible < companies.length && (
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            color="secondary"
            variant="flat"
            onPress={() => setVisible((prev) => prev + 6)}
          >
            Load More Companies
          </Button>
        </div>
      )}
    </>
  );
}
