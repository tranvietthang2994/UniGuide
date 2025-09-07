// Main MBTI Quiz Component
export { default } from "./MbtiQuiz";
export { default as MbtiQuiz } from "./MbtiQuiz";

// Individual Components (for reuse in other quiz types)
export { default as ProgressBar } from "./ProgressBar";
export { default as QuizCard } from "./QuizCard";
export { default as ResultScreen } from "./ResultScreen";

// Types and Data
export * from "./types";
export * from "./mbti";
export * from "./calculateMbti";

// For easy integration with other quiz types (DISC, BigFive, Holland)
export type { MbtiQuestion as QuizQuestion } from "./mbti";
export type { QuizAnswer, QuizState, MbtiResult as QuizResult } from "./types";

