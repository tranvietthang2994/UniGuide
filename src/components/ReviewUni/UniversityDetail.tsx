"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  CalendarIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  TrophyIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useUniversityDetail } from "@/hooks/useUniversityDetail";
import { useReviews } from "@/hooks/useReviews";
import TrainingChart from "@/components/ReviewUni/TrainingChart";
import ReviewSection from "./ReviewSection";
import Map from "./Map";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/Auth/AuthModal";

interface UniversityDetailProps {
  universityId: number;
}

const UniversityDetail: React.FC<UniversityDetailProps> = ({
  universityId,
}) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savingInterest, setSavingInterest] = useState(false);
  const [interested, setInterested] = useState(false);
  const { university, loading, error, refetch } =
    useUniversityDetail(universityId);
  const {
    reviews,
    averageRating,
    totalReviews,
    fetchReviews,
    createReview,
    creating,
  } = useReviews(universityId);

  // Fetch reviews when component mounts
  useEffect(() => {
    if (universityId) {
      fetchReviews();
    }
  }, [universityId, fetchReviews]);

  // Check interested status when auth/university changes
  useEffect(() => {
    const checkInterested = async () => {
      try {
        const resp = await fetch(
          `/api/consult-info?universityId=${universityId}`
        );
        if (resp.status === 401) {
          setInterested(false);
          return;
        }
        const data = await resp.json();
        setInterested(!!data?.interested);
      } catch {
        setInterested(false);
      }
    };
    checkInterested();
  }, [universityId, isAuthenticated]);

  const handleInterest = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (interested || savingInterest) return;
    setSavingInterest(true);
    try {
      const resp = await fetch(`/api/consult-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universityId }),
      });
      const data = await resp.json();
      if (resp.ok && (data.success || data.already)) {
        setInterested(true);
      }
    } finally {
      setSavingInterest(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-[512px] bg-gray-300 animate-pulse"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !university) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Không tìm thấy thông tin trường đại học"}
          </h1>
          <div className="space-x-4">
            <Link
              href="/university-review"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Quay lại danh sách
            </Link>
            {error && (
              <button
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Công lập":
        return "bg-green-500";
      case "Tư thục":
        return "bg-blue-500";
      case "Quốc tế":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  // Use averageRating from reviews hook, fallback to university data
  const displayAverageRating = averageRating || university.averageRating || 0;
  const displayTotalReviews = totalReviews || university.reviews?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      {/* <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/university-review"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Quay lại danh sách trường
          </Link>
        </div>
      </div> */}

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[512px] overflow-hidden"
      >
        <img
          src={university.banner}
          alt={`Banner ${university.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0"
              >
                <BuildingOfficeIcon className="h-12 w-12 text-blue-600" />
              </motion.div>

              {/* Title Info */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {university.name}
                  </h1>
                  <span
                    className={`px-3 py-1 ${getTypeColor(university.type)} text-white rounded-full text-sm font-medium`}
                  >
                    {university.type}
                  </span>
                </div>
                <p className="text-xl text-blue-100 mb-2">
                  {university.abbreviation}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Thành lập {university.foundedYear}</span>
                  </div>
                  {displayTotalReviews > 0 && (
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-5 w-5 text-yellow-300 fill-current" />
                      <span>
                        {displayAverageRating.toFixed(1)} ({displayTotalReviews}{" "}
                        đánh giá)
                      </span>
                    </div>
                  )}
                  {/* Interest Button */}
                  <button
                    onClick={handleInterest}
                    disabled={savingInterest || interested}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      interested
                        ? "bg-green-600 text-white cursor-default"
                        : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                  >
                    {interested
                      ? "Đã quan tâm"
                      : savingInterest
                        ? "Đang lưu..."
                        : "Quan tâm"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <InformationCircleIcon className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Thông tin cơ bản
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Địa chỉ</p>
                    <p className="text-gray-600">{university.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Hotline</p>
                    <p className="text-gray-600">{university.hotline}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Website</p>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {university.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Năm thành lập</p>
                    <p className="text-gray-600">{university.foundedYear}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <InformationCircleIcon className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Tổng quan</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {university.overview}
              </p>
            </motion.div>

            {/* Training Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <AcademicCapIcon className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Đào tạo</h2>
              </div>

              {/* Training Levels */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Bậc đào tạo
                </h3>
                <div className="flex flex-wrap gap-2">
                  {university.training.levels.map((level) => (
                    <span
                      key={level}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              {/* Majors */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Ngành học nổi bật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {university.training.majors.map((major, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{major.name}</p>
                      <p className="text-sm text-gray-600">{major.faculty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tuition Fee */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Học phí
                </h3>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium text-lg">
                    {university.training.tuitionFee}
                  </p>
                </div>
              </div>

              {/* Admission Scores Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Điểm chuẩn theo năm
                </h3>
                <TrainingChart
                  admissionScores={university.training.admissionScores}
                />
              </div>
            </motion.div>

            {/* Ranking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Xếp hạng</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Trong nước
                  </h4>
                  <p className="text-2xl font-bold text-yellow-600">
                    #{university.ranking.domestic}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Quốc tế</h4>
                  <p className="text-sm text-blue-600 font-medium">
                    {university.ranking.international}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Tỷ lệ có việc làm
                  </h4>
                  <p className="text-2xl font-bold text-green-600">
                    {university.ranking.employmentRate}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ReviewSection
                reviews={
                  reviews.length > 0 ? reviews : university.reviews || []
                }
                averageRating={displayAverageRating}
                totalReviews={displayTotalReviews}
                universityId={universityId}
                onCreateReview={createReview}
                creating={creating}
              />
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <BuildingLibraryIcon className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Cơ sở vật chất
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    🏠 Ký túc xá
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {university.facilities.dormitory}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    📚 Thư viện
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {university.facilities.library}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    🔬 Phòng lab
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {university.facilities.labs}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    👥 Câu lạc bộ
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {university.facilities.clubs?.map((club, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Partnerships */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <UserGroupIcon className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Đối tác</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      🏢 Doanh nghiệp
                    </h4>
                    <div className="space-y-1">
                      {university.partnerships.companies.map(
                        (company, index) => (
                          <p key={index} className="text-gray-600 text-sm">
                            • {company}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      🌍 Chương trình trao đổi
                    </h4>
                    <div className="space-y-1">
                      {university.partnerships.internshipPrograms.map(
                        (program, index) => (
                          <p key={index} className="text-gray-600 text-sm">
                            • {program}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📍 Vị trí
                </h3>
                <Map
                  latitude={university.location.latitude}
                  longitude={university.location.longitude}
                  universityName={university.name}
                  address={university.address}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Auth Modal for login prompt */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView="login"
      />
    </div>
  );
};

export default UniversityDetail;
