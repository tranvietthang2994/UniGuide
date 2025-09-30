"use client";

import React, { useState } from "react";
import { useUniversities } from "@/hooks/useUniversities";

export default function TestUniversitiesPage() {
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { universities, loading, error, pagination, setParams } =
    useUniversities();

  React.useEffect(() => {
    const params = {
      page: currentPage,
      limit: 5,
      type: filterType === "all" ? undefined : filterType,
    };
    console.log("Test: Setting params", params);
    setParams(params);
  }, [filterType, currentPage, setParams]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test Universities API</h1>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Filter by Type:
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">Tất cả</option>
            <option value="1">Công lập</option>
            <option value="2">Tư thục</option>
            <option value="3">Quốc tế</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Page:</label>
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value) || 1)}
            min="1"
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p>
          <strong>Loading:</strong> {loading ? "Yes" : "No"}
        </p>
        <p>
          <strong>Error:</strong> {error || "None"}
        </p>
        <p>
          <strong>Universities Count:</strong> {universities.length}
        </p>
        <p>
          <strong>Pagination:</strong> {JSON.stringify(pagination)}
        </p>
      </div>

      {/* Universities List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Universities:</h2>
        {universities.map((uni) => (
          <div key={uni.id} className="border p-4 rounded">
            <h3 className="font-semibold">{uni.name}</h3>
            <p>
              <strong>Type:</strong> {uni.type}
            </p>
            <p>
              <strong>Founded:</strong> {uni.foundedYear}
            </p>
            <p>
              <strong>Address:</strong> {uni.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

