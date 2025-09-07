"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { mbtiQuestions } from "./mbti";
import { QuizState, QuizAnswer } from "./types";
import { calculateMbtiResult } from "./calculateMbti";
import ProgressBar from "./ProgressBar";
import QuizCard from "./QuizCard";
import ResultScreen from "./ResultScreen";

interface MbtiQuizProps {
  onComplete?: (result: any) => void;
  onExit?: () => void;
  className?: string;
}

export default function MbtiQuiz({
  onComplete,
  onExit,
  className = "",
}: MbtiQuizProps) {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
  });

  const [isStarted, setIsStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [questionCount, setQuestionCount] = useState<30 | 60>(30);

  // Use selected number of questions
  const questionsToUse = mbtiQuestions.slice(0, questionCount);

  const handleAnswer = useCallback(
    (questionId: number, score: number) => {
      const currentQuestion = questionsToUse[quizState.currentQuestion];

      const newAnswer: QuizAnswer = {
        questionId,
        selectedScore: score,
        dimension: currentQuestion.dimension,
        direction: currentQuestion.direction,
      };

      setQuizState((prev) => ({
        ...prev,
        answers: [
          ...prev.answers.filter((a) => a.questionId !== questionId),
          newAnswer,
        ],
      }));
    },
    [quizState.currentQuestion, questionsToUse]
  );

  const handleNext = useCallback(() => {
    const nextQuestion = quizState.currentQuestion + 1;

    if (nextQuestion >= questionsToUse.length) {
      // Quiz completed
      const result = calculateMbtiResult(quizState.answers);
      setQuizState((prev) => ({
        ...prev,
        isCompleted: true,
        result,
      }));
      onComplete?.(result);
    } else {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: nextQuestion,
      }));
    }
  }, [
    quizState.currentQuestion,
    quizState.answers,
    questionsToUse.length,
    onComplete,
  ]);

  const handleRestart = useCallback(() => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isCompleted: false,
    });
    setIsStarted(true);
    setShowInstructions(false);
  }, []);

  const handleGoBack = useCallback(() => {
    // Sử dụng onExit prop nếu có, nếu không thì navigate về /quiz
    if (onExit) {
      onExit();
    } else {
      router.push("/quiz");
    }
  }, [onExit, router]);

  const startQuiz = (count: 30 | 60) => {
    setQuestionCount(count);
    setIsStarted(true);
    setShowInstructions(false);
  };

  const currentQuestion = questionsToUse[quizState.currentQuestion];
  const isAnswered = quizState.answers.some(
    (a) => a.questionId === currentQuestion?.id
  );
  const selectedScore = quizState.answers.find(
    (a) => a.questionId === currentQuestion?.id
  )?.selectedScore;

  if (showInstructions) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-4 px-4 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4"
            >
              <span className="text-4xl">🧠</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
            >
              Trắc nghiệm MBTI
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Khám phá tính cách của bạn qua 16 loại tính cách Myers-Briggs
            </motion.p>
          </div>

          {/* Instructions Card */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Hướng dẫn làm bài
            </h2>

            {/* Question Count Selection */}
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Chọn độ dài bài test:
              </h3>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startQuiz(30)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">30 câu hỏi</div>
                    <div className="text-sm opacity-90">10-12 phút</div>
                    <div className="text-xs opacity-75">Nhanh & Chính xác</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startQuiz(60)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">60 câu hỏi</div>
                    <div className="text-sm opacity-90">15-20 phút</div>
                    <div className="text-xs opacity-75">
                      Chi tiết & Toàn diện
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <span className="text-lg">⏱️</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Thời gian linh hoạt
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chọn 30 câu (nhanh) hoặc 60 câu (chi tiết)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Trả lời trung thực
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chọn đáp án phản ánh đúng nhất về bạn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Tự động chuyển câu
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tự động chuyển sau khi chọn đáp án
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Kết quả chi tiết
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Phân tích tính cách và gợi ý nghề nghiệp
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="text-lg">🔍</span>4 thang đo tính cách MBTI:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 font-medium text-sm">
                    👥 E/I:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Hướng ngoại - Hướng nội
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-medium text-sm">
                    🧠 S/N:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Giác quan - Trực giác
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-purple-600 font-medium text-sm">
                    ⚖️ T/F:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Lý trí - Cảm xúc
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-orange-600 font-medium text-sm">
                    📋 J/P:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Nguyên tắc - Linh hoạt
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (quizState.isCompleted && quizState.result) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-4 px-4 ${className}`}
      >
        <ResultScreen
          result={quizState.result}
          onRestart={handleRestart}
          onGoBack={handleGoBack}
        />
      </div>
    );
  }

  if (!isStarted || !currentQuestion) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 flex items-center justify-center ${className}`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-4 px-4 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <ProgressBar
            current={quizState.currentQuestion + 1}
            total={questionsToUse.length}
            className="mb-3"
          />

          {/* Quiz Info */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Trắc nghiệm MBTI</span>
            <span>
              {Math.round(
                ((quizState.currentQuestion + 1) / questionsToUse.length) * 100
              )}
              % hoàn thành
            </span>
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuizCard
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isAnswered={isAnswered}
            selectedScore={selectedScore}
          />
        </AnimatePresence>

        {/* Exit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <button
            onClick={handleGoBack}
            className="px-6 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            ← Thoát bài test
          </button>
        </motion.div>
      </div>
    </div>
  );
}
