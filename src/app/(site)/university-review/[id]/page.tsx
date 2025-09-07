"use client";

import React from "react";
import { useParams } from "next/navigation";
import UniversityDetail from "@/components/ReviewUni/UniversityDetail";

const UniversityDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen">
      <UniversityDetail universityId={parseInt(id)} />
    </div>
  );
};

export default UniversityDetailPage;
