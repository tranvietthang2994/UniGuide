"use client";

import React from "react";
import { useParams } from "next/navigation";
import UniversityDetail from "@/components/ReviewUni/UniversityDetail";
import Link from "next/link";

const UniversityDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const universityId = parseInt(id);

  if (isNaN(universityId)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ID trường không hợp lệ
          </h1>
          <Link
            href="/university-review"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <UniversityDetail universityId={universityId} />
    </div>
  );
};

export default UniversityDetailPage;
