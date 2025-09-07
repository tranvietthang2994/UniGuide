"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { universities } from "./universityDataReview";
import UniversityCard from "@/components/ReviewUni/UniversityCard";

const UniversityList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const matchesSearch =
        university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.abbreviation
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "all" || university.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType]);

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
              Tìm thấy{" "}
              <span className="font-semibold text-blue-600">
                {filteredUniversities.length}
              </span>{" "}
              trường đại học
            </p>
          </div>
        </motion.div>
      </div>

      {/* University Cards Grid */}
      <div className="container mx-auto px-4 py-12">
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

        {filteredUniversities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UniversityList;
