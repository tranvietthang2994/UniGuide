"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MbtiQuestion } from "./mbti";

interface QuizCardProps {
  question: MbtiQuestion;
  onAnswer: (questionId: number, score: number) => void;
  onNext: () => void;
  isAnswered: boolean;
  selectedScore?: number;
}

export default function QuizCard({
  question,
  onAnswer,
  onNext,
  isAnswered,
  selectedScore,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(
    selectedScore ?? null
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (score: number) => {
    if (isAnswered) return;

    setSelectedOption(score);
    onAnswer(question.id, score);
    setShowFeedback(true);

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(false);
      onNext();
    }, 1500);
  };

  const getOptionColor = (score: number) => {
    if (selectedOption === score) {
      if (showFeedback) {
        return "bg-gradient-to-r from-green-500 to-green-600 text-white transform scale-105";
      }
      return "bg-gradient-to-r from-blue-500 to-blue-600 text-white transform scale-105";
    }
    return "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:scale-102 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700";
  };

  const getDimensionInfo = (dimension: string) => {
    const dimensionMap = {
      "E/I": {
        name: "Hướng ngoại - Hướng nội",
        icon: "👥",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900",
      },
      "S/N": {
        name: "Giác quan - Trực giác",
        icon: "🧠",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900",
      },
      "T/F": {
        name: "Lý trí - Cảm xúc",
        icon: "⚖️",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900",
      },
      "J/P": {
        name: "Nguyên tắc - Linh hoạt",
        icon: "📋",
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900",
      },
    };
    return dimensionMap[dimension as keyof typeof dimensionMap];
  };

  const dimensionInfo = getDimensionInfo(question.dimension);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Question Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 mb-4">
        {/* Dimension Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${dimensionInfo.bg} ${dimensionInfo.color}`}
        >
          <span className="text-lg">{dimensionInfo.icon}</span>
          {dimensionInfo.name}
        </motion.div>

        {/* Question Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-2"
        >
          Câu hỏi {question.id} / 60
        </motion.div>

        {/* Question Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed"
        >
          {question.text}
        </motion.h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(option.score)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-left font-medium transition-all duration-300 ${getOptionColor(
                option.score
              )} ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{option.text}</span>
                <AnimatePresence>
                  {selectedOption === option.score && showFeedback && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20"
                    >
                      <span className="text-xl">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Score indicator */}
              <div className="flex items-center mt-1.5 gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < Math.abs(option.score) + 2
                        ? selectedOption === option.score
                          ? "bg-white/60"
                          : "bg-blue-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
                <span className="text-xs ml-2 opacity-60">
                  {option.score === -2 && "Rất không đồng ý"}
                  {option.score === -1 && "Không đồng ý"}
                  {option.score === 0 && "Trung lập"}
                  {option.score === 1 && "Đồng ý"}
                  {option.score === 2 && "Rất đồng ý"}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🎉</span>
                <span className="font-medium">
                  Đã ghi nhận câu trả lời của bạn!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual Next Button (hidden when auto-advancing) */}
      {isAnswered && !showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Câu tiếp theo →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
