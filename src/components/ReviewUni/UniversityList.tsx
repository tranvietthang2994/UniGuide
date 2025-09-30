"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useUniversities } from "@/hooks/useUniversities";
import UniversityCard from "@/components/ReviewUni/UniversityCard";
import { UniversityListParams } from "@/lib/api/universities";

const UniversityList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Reasonable number per page

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterType]);

  // Build API parameters
  const apiParams: UniversityListParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch,
    type: filterType === "all" ? undefined : getTypeValue(filterType),
    sortBy: "name",
    sortOrder: "asc",
  };

  const {
    universities: filteredUniversities,
    loading,
    error,
    pagination,
    refetch,
    setParams,
  } = useUniversities();

  // Update params when they change
  useEffect(() => {
    console.log("Component: Updating params with:", apiParams);
    setParams(apiParams);
  }, [setParams, currentPage, itemsPerPage, debouncedSearch, filterType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tìm Kiếm Trường
              <span className="text-yellow-300"> Đại Học</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Khám phá và đánh giá các trường đại học hàng đầu Việt Nam
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên trường hoặc viết tắt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg bg-white min-w-[200px]"
              >
                <option value="all">Tất cả loại hình</option>
                <option value="Công lập">Công lập</option>
                <option value="Tư thục">Tư thục</option>
                <option value="Quốc tế">Quốc tế</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-600">
              {loading ? (
                "Đang tải..."
              ) : error ? (
                <span className="text-red-600">Có lỗi xảy ra: {error}</span>
              ) : (
                <>
                  Tìm thấy{" "}
                  <span className="font-semibold text-blue-600">
                    {pagination?.total || filteredUniversities.length}
                  </span>{" "}
                  trường đại học
                  {pagination && pagination.totalPages > 1 && (
                    <span className="text-gray-500 ml-2">
                      (Trang {currentPage}/{pagination.totalPages})
                    </span>
                  )}
                </>
              )}
            </p>
            {error && (
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* University Cards Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredUniversities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </motion.div>

            {filteredUniversities.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Không tìm thấy kết quả
                </h3>
                <p className="text-gray-500">
                  Hãy thử tìm kiếm với từ khóa khác
                </p>
              </motion.div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center mt-12 space-x-2"
              >
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Trước
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: Math.min(pagination.totalPages, 5) },
                  (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                {/* Show dots if there are more pages */}
                {pagination.totalPages > 5 &&
                  currentPage < pagination.totalPages - 2 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => setCurrentPage(pagination.totalPages)}
                        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination.totalPages)
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Tiếp →
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to convert filter type to API value
function getTypeValue(type: string): string | undefined {
  switch (type) {
    case "Công lập":
      return "1";
    case "Tư thục":
      return "2";
    case "Quốc tế":
      return "3";
    default:
      return undefined;
  }
}

export default UniversityList;
