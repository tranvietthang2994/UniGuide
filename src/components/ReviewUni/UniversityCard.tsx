"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPinIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { University } from "./universityDataReview";

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Công lập":
        return "bg-green-100 text-green-800";
      case "Tư thục":
        return "bg-blue-100 text-blue-800";
      case "Quốc tế":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const averageRating =
    university.reviews.length > 0
      ? university.reviews.reduce((sum, review) => sum + review.rating, 0) /
        university.reviews.length
      : 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Link href={`/university-review/${university.id}`}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
      >
        {/* Banner Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              {/* Logo placeholder */}
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors">
                  {university.abbreviation}
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(university.type)}`}
                >
                  {university.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {university.name}
          </h4>

          <div className="space-y-3 mb-4">
            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600">
              <MapPinIcon className="h-4 w-4 mt-1 text-red-500 flex-shrink-0" />
              <span className="text-sm line-clamp-2">{university.address}</span>
            </div>

            {/* Founded Year */}
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                Thành lập {university.foundedYear}
              </span>
            </div>

            {/* Tuition Fee */}
            <div className="flex items-center gap-2 text-gray-600">
              <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">
                {university.training.tuitionFee}
              </span>
            </div>

            {/* Employment Rate */}
            <div className="flex items-center gap-2 text-gray-600">
              <ChartBarIcon className="h-4 w-4 text-orange-500" />
              <span className="text-sm">
                Tỷ lệ có việc: {university.ranking.employmentRate}
              </span>
            </div>
          </div>

          {/* Rating */}
          {university.reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({university.reviews.length} đánh
                giá)
              </span>
            </div>
          )}

          {/* Majors count */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
              <span className="text-blue-600 font-semibold text-lg">
                {university.training.majors.length}
              </span>
              <span className="text-gray-600 text-sm ml-1">ngành học</span>
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
      </motion.div>
    </Link>
  );
};

export default UniversityCard;
