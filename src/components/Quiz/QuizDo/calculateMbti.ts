import { QuizAnswer, MbtiResult, DimensionScore, MBTI_TYPES } from "./types";

export function calculateMbtiResult(answers: QuizAnswer[]): MbtiResult {
  // Initialize dimension scores
  const dimensionScores: Record<string, number> = {
    "E/I": 0,
    "S/N": 0,
    "T/F": 0,
    "J/P": 0,
  };

  // Calculate scores for each dimension
  answers.forEach((answer) => {
    const { dimension, direction, selectedScore } = answer;

    // Adjust score based on direction
    // For positive direction: higher score = more towards first letter (E, S, T, J)
    // For negative direction: higher score = more towards second letter (I, N, F, P)
    const adjustedScore =
      direction === "positive" ? selectedScore : -selectedScore;

    dimensionScores[dimension] += adjustedScore;
  });

  // Determine MBTI type
  let mbtiType = "";
  const dimensions: DimensionScore[] = [];

  // E/I (Extraversion/Introversion)
  const eiScore = dimensionScores["E/I"];
  const eiType = eiScore > 0 ? "E" : "I";
  mbtiType += eiType;
  dimensions.push({
    dimension: "E/I",
    score: eiScore,
    type: eiType,
  });

  // S/N (Sensing/Intuition)
  const snScore = dimensionScores["S/N"];
  const snType = snScore > 0 ? "N" : "S"; // Note: Positive score = Intuition (N)
  mbtiType += snType;
  dimensions.push({
    dimension: "S/N",
    score: snScore,
    type: snType,
  });

  // T/F (Thinking/Feeling)
  const tfScore = dimensionScores["T/F"];
  const tfType = tfScore > 0 ? "T" : "F";
  mbtiType += tfType;
  dimensions.push({
    dimension: "T/F",
    score: tfScore,
    type: tfType,
  });

  // J/P (Judging/Perceiving)
  const jpScore = dimensionScores["J/P"];
  const jpType = jpScore > 0 ? "J" : "P";
  mbtiType += jpType;
  dimensions.push({
    dimension: "J/P",
    score: jpScore,
    type: jpType,
  });

  // Get type information
  const typeInfo = MBTI_TYPES[mbtiType] || {
    name: "Không xác định",
    description: "Kết quả không rõ ràng. Hãy thử làm lại bài test.",
    strengths: ["Cần làm lại bài test"],
    careers: ["Cần làm lại bài test"],
    famous: ["Cần làm lại bài test"],
  };

  return {
    type: mbtiType,
    dimensions,
    description: typeInfo.name,
    strengths: typeInfo.strengths,
    careers: typeInfo.careers,
    famous: typeInfo.famous,
  };
}

export function getDimensionName(dimension: string): string {
  const names: Record<string, string> = {
    "E/I": "Hướng ngoại - Hướng nội",
    "S/N": "Giác quan - Trực giác",
    "T/F": "Lý trí - Cảm xúc",
    "J/P": "Nguyên tắc - Linh hoạt",
  };
  return names[dimension] || dimension;
}

export function getDimensionDescription(
  dimension: string,
  type: string
): string {
  const descriptions: Record<string, Record<string, string>> = {
    "E/I": {
      E: "Bạn hướng ngoại, thích tương tác với người khác và nạp năng lượng từ hoạt động xã hội.",
      I: "Bạn hướng nội, thích suy nghĩ sâu và nạp năng lượng từ thời gian riêng tư.",
    },
    "S/N": {
      S: "Bạn thiên về giác quan, tập trung vào thực tế và chi tiết cụ thể.",
      N: "Bạn thiên về trực giác, thích khám phá khả năng và ý tưởng mới.",
    },
    "T/F": {
      T: "Bạn thiên về lý trí, đưa ra quyết định dựa trên logic và phân tích.",
      F: "Bạn thiên về cảm xúc, đưa ra quyết định dựa trên giá trị và cảm xúc.",
    },
    "J/P": {
      J: "Bạn thích cấu trúc và tổ chức, ưa hoạch định trước.",
      P: "Bạn thích sự linh hoạt và tự phát, thích để ngỏ các lựa chọn.",
    },
  };
  return descriptions[dimension]?.[type] || `Bạn có xu hướng ${type}`;
}

export function getOverallDescription(mbtiType: string): string {
  const groupDescriptions: Record<string, string> = {
    // Analysts (NT)
    NT: "Bạn thuộc nhóm Nhà phân tích - người có tư duy logic, thích khám phá lý thuyết và giải quyết vấn đề phức tạp.",

    // Diplomats (NF)
    NF: "Bạn thuộc nhóm Nhà ngoại giao - người có trực giác mạnh, quan tâm đến con người và mong muốn tạo ra tác động tích cực.",

    // Sentinels (SJ)
    SJ: "Bạn thuộc nhóm Người bảo vệ - người đáng tin cậy, thích trật tự và có trách nhiệm cao với cộng đồng.",

    // Explorers (SP)
    SP: "Bạn thuộc nhóm Người khám phá - người linh hoạt, thực tế và thích trải nghiệm những điều mới mẻ.",
  };

  // Determine group
  let group = "";
  if (mbtiType.includes("N") && mbtiType.includes("T")) group = "NT";
  else if (mbtiType.includes("N") && mbtiType.includes("F")) group = "NF";
  else if (mbtiType.includes("S") && mbtiType.includes("J")) group = "SJ";
  else if (mbtiType.includes("S") && mbtiType.includes("P")) group = "SP";

  return groupDescriptions[group] || "Bạn có tính cách độc đáo và thú vị.";
}

// Helper function to validate answers completeness
export function validateAnswers(
  answers: QuizAnswer[],
  totalQuestions: number
): boolean {
  return answers.length === totalQuestions;
}

// Helper function to get completion percentage
export function getCompletionPercentage(
  answers: QuizAnswer[],
  totalQuestions: number
): number {
  return Math.round((answers.length / totalQuestions) * 100);
}

