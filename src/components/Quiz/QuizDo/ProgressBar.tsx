"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  className = "",
}: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Info */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Câu hỏi {current} / {total}
        </span>
        <span className="font-medium text-blue-600 dark:text-blue-400">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </div>

      {/* Progress Steps */}
      <div className="mt-2 flex justify-between">
        {Array.from({ length: Math.min(total, 10) }, (_, index) => {
          const stepNumber = Math.floor((index * total) / 9) + 1;
          const isActive = current >= stepNumber;
          const isCurrent = current === stepNumber;

          return (
            <motion.div
              key={index}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {isCurrent ? (
                <motion.div
                  className="h-2 w-2 rounded-full bg-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              ) : (
                stepNumber
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
