"use client";

import { useState, useMemo } from "react";
import { universitiesData } from "./universitiesData";

const ScoreLookUp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 30]);
  const itemsPerPage = 15;

  const regions = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam"];
  const years = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  // Create flattened data structure for table display
  const flattenedData = useMemo(() => {
    const result: Array<{
      universityId: number;
      universityName: string;
      region: string;
      priority: number;
      majorId: number;
      majorName: string;
      quota: number;
      scores: Record<string, number>;
    }> = [];

    universitiesData.forEach((university) => {
      university.majors.forEach((major) => {
        result.push({
          universityId: university.id,
          universityName: university.name,
          region: university.region,
          priority: university.priority,
          majorId: major.id,
          majorName: major.name,
          quota: major.quota,
          scores: major.scores,
        });
      });
    });

    // Sort by priority (higher priority first), then by university name, then by major name
    result.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // Higher priority first
      }
      if (a.universityName !== b.universityName) {
        return a.universityName.localeCompare(b.universityName, "vi");
      }
      return a.majorName.localeCompare(b.majorName, "vi");
    });

    return result;
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = flattenedData;

    // Filter by region
    if (selectedRegion !== "Tất cả") {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.universityName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.majorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by score range
    filtered = filtered.filter((item) => {
      const score = item.scores[selectedYear];
      if (!score) return false;
      return score >= scoreRange[0] && score <= scoreRange[1];
    });

    return filtered;
  }, [searchTerm, selectedRegion, selectedYear, scoreRange, flattenedData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRegion("Tất cả");
    setScoreRange([0, 30]);
    setCurrentPage(1);
  };

  return (
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-5 text-heading-2 font-bold text-black dark:text-white sm:text-heading-1">
            Tra cứu điểm thi đại học
          </h1>
          <p className="mx-auto max-w-[714px] text-body">
            Tra cứu điểm chuẩn các trường đại học qua các năm một cách dễ dàng
            và chính xác. Hỗ trợ tìm kiếm theo trường, ngành học, điểm chuẩn và
            khu vực.
          </p>
        </div>

        {/* Search Section */}
        <div className="mt-15 rounded-xl bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-darkdropdown">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Tìm kiếm trường/ngành
              </label>
              <input
                type="text"
                placeholder="Nhập tên trường hoặc ngành học..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none transition placeholder:text-body focus:border-primary dark:border-stroke-dark dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-darkdropdown">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Region Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Khu vực
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none transition focus:border-primary dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:focus:border-primary"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Năm xem điểm
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-black outline-none transition focus:border-primary dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:focus:border-primary"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Score Range Filter */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Điểm chuẩn
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-body">0</span>
                <div className="flex-1 relative">
                  {/* Track */}
                  <div className="relative h-2 bg-gray-2 rounded-lg dark:bg-gray-7">
                    {/* Active range */}
                    <div
                      className="absolute h-2 bg-primary rounded-lg"
                      style={{
                        left: `${(scoreRange[0] / 30) * 100}%`,
                        right: `${100 - (scoreRange[1] / 30) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Min range input */}
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.25"
                    value={scoreRange[0]}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      if (newMin <= scoreRange[1]) {
                        setScoreRange([newMin, scoreRange[1]]);
                        setCurrentPage(1);
                      }
                    }}
                    className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer dual-range-slider"
                  />

                  {/* Max range input */}
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.25"
                    value={scoreRange[1]}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      if (newMax >= scoreRange[0]) {
                        setScoreRange([scoreRange[0], newMax]);
                        setCurrentPage(1);
                      }
                    }}
                    className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer dual-range-slider"
                  />
                </div>
                <span className="text-sm text-body">30</span>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-primary-dark"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-body">
            Tìm thấy{" "}
            <span className="font-bold text-primary">
              {filteredData.length}
            </span>{" "}
            kết quả
            {selectedRegion !== "Tất cả" && <span> tại {selectedRegion}</span>}
            {searchTerm && <span> với từ khóa "{searchTerm}"</span>}
          </div>
        </div>

        {/* Results Table */}
        <div className="mt-6">
          {currentData.length > 0 ? (
            <div className="overflow-x-auto rounded-xl bg-white shadow-1 dark:bg-gray-dark dark:shadow-darkdropdown">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[35%]" />
                  <col className="w-[12%]" />
                  <col className="w-[35%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-stroke dark:border-stroke-dark">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
                      Tên trường
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
                      Khu vực
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
                      Ngành học
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      Điểm chuẩn ({selectedYear})
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-black dark:text-white">
                      Chỉ tiêu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr
                      key={`${item.universityId}-${item.majorId}`}
                      className={`border-b border-stroke dark:border-stroke-dark ${
                        index % 2 === 0
                          ? "bg-gray-1 dark:bg-gray-dark"
                          : "bg-white dark:bg-gray-dark"
                      } hover:bg-primary/5 dark:hover:bg-white/5 transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div
                          className="font-medium text-black dark:text-white truncate"
                          title={item.universityName}
                        >
                          {item.universityName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-white/10 whitespace-nowrap">
                          {item.region}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-black dark:text-white truncate"
                          title={item.majorName}
                        >
                          {item.majorName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-primary">
                          {item.scores[selectedYear] || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-black dark:text-white">
                          {item.quota}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl bg-white p-15 text-center shadow-1 dark:bg-gray-dark dark:shadow-darkdropdown">
              <p className="text-body">
                Không tìm thấy kết quả nào phù hợp với tiêu chí tìm kiếm.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-15 flex justify-center">
            <nav className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-stroke px-4 py-2 text-body transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-stroke-dark dark:text-white dark:hover:border-primary"
              >
                Trước
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-4 py-2 transition ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-stroke text-body hover:border-primary hover:text-primary dark:border-stroke-dark dark:text-white dark:hover:border-primary"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-stroke px-4 py-2 text-body transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-stroke-dark dark:text-white dark:hover:border-primary"
              >
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScoreLookUp;
