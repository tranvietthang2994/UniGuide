"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MbtiResult } from "./types";

interface ResultScreenProps {
  result: MbtiResult;
  onRestart: () => void;
  onGoBack: () => void;
}

export default function ResultScreen({
  result,
  onRestart,
  onGoBack,
}: ResultScreenProps) {
  const router = useRouter();

  const handleGoBack = () => {
    // Sử dụng onGoBack prop nếu có, nếu không thì navigate về trang chủ
    if (onGoBack) {
      onGoBack();
    } else {
      router.push("/");
    }
  };

  const getDimensionIcon = (dimension: string) => {
    const iconMap = {
      "E/I": "👥",
      "S/N": "🧠",
      "T/F": "⚖️",
      "J/P": "📋",
    };
    return iconMap[dimension as keyof typeof iconMap] || "🔮";
  };

  const getDimensionColor = (dimension: string, index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
    ];
    return colors[index] || colors[0];
  };

  const getTypeColor = (type: string) => {
    const typeColors = {
      // Analysts (NT)
      INTJ: "from-purple-500 to-indigo-600",
      INTP: "from-purple-500 to-blue-600",
      ENTJ: "from-red-500 to-purple-600",
      ENTP: "from-blue-500 to-purple-600",

      // Diplomats (NF)
      INFJ: "from-green-500 to-teal-600",
      INFP: "from-green-500 to-blue-600",
      ENFJ: "from-yellow-500 to-green-600",
      ENFP: "from-pink-500 to-orange-600",

      // Sentinels (SJ)
      ISTJ: "from-gray-500 to-blue-600",
      ISFJ: "from-teal-500 to-green-600",
      ESTJ: "from-red-500 to-orange-600",
      ESFJ: "from-pink-500 to-red-600",

      // Explorers (SP)
      ISTP: "from-gray-500 to-green-600",
      ISFP: "from-pink-500 to-purple-600",
      ESTP: "from-orange-500 to-red-600",
      ESFP: "from-yellow-500 to-pink-600",
    };
    return (
      typeColors[type as keyof typeof typeColors] ||
      "from-blue-500 to-purple-600"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Kết quả trắc nghiệm MBTI của bạn
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Hãy khám phá tính cách độc đáo của bạn!
        </p>
      </motion.div>

      {/* Main Result Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 mb-6"
      >
        {/* MBTI Type */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
            className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${getTypeColor(result.type)} text-white mb-3`}
          >
            <span className="text-5xl font-black">{result.type}</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {result.description}
          </motion.h2>
        </div>

        {/* Dimension Breakdown */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {result.dimensions.map((dimension, index) => (
            <div
              key={dimension.dimension}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center"
            >
              <div className="text-xl mb-1">
                {getDimensionIcon(dimension.dimension)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {dimension.dimension}
              </div>
              <div
                className={`text-xl font-bold bg-gradient-to-r ${getDimensionColor(dimension.dimension, index)} bg-clip-text text-transparent`}
              >
                {dimension.type}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {dimension.score > 0 ? `+${dimension.score}` : dimension.score}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Strengths, Careers, Famous People */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Strengths */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-4"
        >
          <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <span className="text-lg">💪</span>
            Điểm mạnh
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-2 text-green-700 dark:text-green-300"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                {strength}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Career Suggestions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-4"
        >
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Nghề nghiệp phù hợp
          </h3>
          <ul className="space-y-2">
            {result.careers.slice(0, 6).map((career, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="flex items-center gap-2 text-blue-700 dark:text-blue-300"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                {career}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Famous People */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-4"
        >
          <h3 className="text-lg font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            Người nổi tiếng cùng type
          </h3>
          <ul className="space-y-2">
            {result.famous.map((person, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="flex items-center gap-2 text-purple-700 dark:text-purple-300"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                {person}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="flex items-center gap-2">🔄 Làm lại bài test</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack}
          className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="flex items-center gap-2">🏠 Trở về trang chủ</span>
        </motion.button>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="text-center pt-3 border-t border-gray-200 dark:border-gray-700"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Chia sẻ kết quả của bạn với bạn bè!
        </p>
        <div className="flex justify-center gap-3">
          <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
            📘
          </button>
          <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
            🐦
          </button>
          <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
            💬
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
