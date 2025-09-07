export interface QuizAnswer {
  questionId: number;
  selectedScore: number;
  dimension: "E/I" | "S/N" | "T/F" | "J/P";
  direction: "positive" | "negative";
}

export interface DimensionScore {
  dimension: "E/I" | "S/N" | "T/F" | "J/P";
  score: number;
  type: string; // E or I, S or N, T or F, J or P
}

export interface MbtiResult {
  type: string; // 4 letter MBTI type like "ENFP"
  dimensions: DimensionScore[];
  description: string;
  strengths: string[];
  careers: string[];
  famous: string[];
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  result?: MbtiResult;
}

export const MBTI_TYPES: Record<
  string,
  {
    name: string;
    description: string;
    strengths: string[];
    careers: string[];
    famous: string[];
  }
> = {
  ENFP: {
    name: "Người truyền cảm hứng",
    description:
      "Nhiệt tình, sáng tạo và tự do. Có khả năng tìm ra những khả năng mới và truyền cảm hứng cho người khác.",
    strengths: [
      "Sáng tạo và đổi mới",
      "Khả năng giao tiếp xuất sắc",
      "Linh hoạt và thích nghi",
      "Quan tâm đến con người",
    ],
    careers: [
      "Nhà tâm lý học",
      "Nhà báo",
      "Diễn viên",
      "Giáo viên",
      "Nhà tư vấn",
      "Nhà marketing",
    ],
    famous: ["Robin Williams", "Ellen DeGeneres", "Will Smith"],
  },
  ENFJ: {
    name: "Người lãnh đạo tự nhiên",
    description:
      "Lãnh đạo có tầm nhìn, có khả năng truyền cảm hứng và tổ chức mọi người để đạt được mục tiêu chung.",
    strengths: [
      "Lãnh đạo tự nhiên",
      "Đồng cảm cao",
      "Khả năng tổ chức tốt",
      "Truyền cảm hứng",
    ],
    careers: [
      "Giáo viên",
      "Nhà tham vấn",
      "Quản lý nhân sự",
      "Chính trị gia",
      "Nhà tôn giáo",
      "Công tác xã hội",
    ],
    famous: ["Barack Obama", "Oprah Winfrey", "Martin Luther King Jr."],
  },
  ENTP: {
    name: "Người tranh biện",
    description:
      "Thông minh, tò mò và có khả năng tư duy nhanh. Thích thách thức và khám phá những ý tưởng mới.",
    strengths: [
      "Tư duy logic mạnh mẽ",
      "Sáng tạo và đổi mới",
      "Khả năng tranh luận",
      "Thích thử thách",
    ],
    careers: [
      "Doanh nhân",
      "Luật sư",
      "Nhà báo",
      "Kỹ sư",
      "Nhà khoa học",
      "Tư vấn",
    ],
    famous: ["Steve Jobs", "Leonardo da Vinci", "Thomas Edison"],
  },
  ENTJ: {
    name: "Người chỉ huy",
    description:
      "Lãnh đạo mạnh mẽ, quyết đoán và có tầm nhìn. Giỏi trong việc tổ chức và điều hành.",
    strengths: [
      "Lãnh đạo mạnh mẽ",
      "Tư duy chiến lược",
      "Quyết đoán",
      "Định hướng mục tiêu",
    ],
    careers: [
      "CEO/Giám đốc",
      "Quản lý dự án",
      "Luật sư",
      "Chính trị gia",
      "Tư vấn quản lý",
      "Doanh nhân",
    ],
    famous: ["Steve Jobs", "Margaret Thatcher", "Gordon Ramsay"],
  },
  INFP: {
    name: "Người trung gian",
    description:
      "Lý tưởng hóa, trung thành với giá trị của mình. Tò mò về khả năng phát triển con người.",
    strengths: [
      "Giá trị cá nhân mạnh mẽ",
      "Sáng tạo",
      "Đồng cảm cao",
      "Linh hoạt",
    ],
    careers: [
      "Nhà văn",
      "Tâm lý học",
      "Tư vấn",
      "Nghệ sĩ",
      "Nhà báo",
      "Công tác xã hội",
    ],
    famous: ["William Shakespeare", "Johnny Depp", "J.K. Rowling"],
  },
  INFJ: {
    name: "Người bảo vệ",
    description:
      "Tìm kiếm ý nghĩa và kết nối. Mong muốn hiểu con người và giúp đỡ họ đạt được tiềm năng.",
    strengths: [
      "Trực giác mạnh",
      "Lý tưởng hóa",
      "Quyết tâm",
      "Quan tâm đến người khác",
    ],
    careers: [
      "Tâm lý học",
      "Tư vấn",
      "Nhà văn",
      "Giáo viên",
      "Nghệ sĩ",
      "Nhà tôn giáo",
    ],
    famous: ["Mother Teresa", "Nelson Mandela", "Plato"],
  },
  INTP: {
    name: "Người tư duy",
    description:
      "Tìm kiếm logic trong mọi thứ. Lý thuyết và trừu tượng hơn là tương tác xã hội.",
    strengths: ["Tư duy logic", "Độc lập", "Sáng tạo", "Phân tích sâu"],
    careers: [
      "Nhà khoa học",
      "Triết gia",
      "Kỹ sư",
      "Lập trình viên",
      "Nhà toán học",
      "Nhà nghiên cứu",
    ],
    famous: ["Albert Einstein", "Bill Gates", "Isaac Newton"],
  },
  INTJ: {
    name: "Người kiến trúc sư",
    description:
      "Có tầm nhìn, độc lập và quyết đoán. Có thể nhìn thấy cách thực hiện ý tưởng của mình.",
    strengths: ["Tư duy chiến lược", "Độc lập", "Quyết tâm", "Tầm nhìn xa"],
    careers: [
      "Kỹ sư",
      "Nhà khoa học",
      "Quản lý",
      "Luật sư",
      "Tư vấn",
      "Kiến trúc sư",
    ],
    famous: ["Elon Musk", "Mark Zuckerberg", "Stephen Hawking"],
  },
  ESFP: {
    name: "Người giải trí",
    description:
      "Tự phát, nhiệt tình và thân thiện. Yêu thích con người và những trải nghiệm mới.",
    strengths: [
      "Nhiệt tình",
      "Linh hoạt",
      "Quan tâm người khác",
      "Kỹ năng giao tiếp",
    ],
    careers: [
      "Giáo viên",
      "Công tác xã hội",
      "Diễn viên",
      "Tư vấn",
      "Y tá",
      "Nhà thiết kế",
    ],
    famous: ["Marilyn Monroe", "Elvis Presley", "Bill Clinton"],
  },
  ESFJ: {
    name: "Người quan tâm",
    description:
      "Ấm áp, có trách nhiệm và hợp tác. Muốn hòa hợp trong môi trường và làm việc chăm chỉ để đạt được điều đó.",
    strengths: [
      "Quan tâm người khác",
      "Có trách nhiệm",
      "Hợp tác tốt",
      "Tổ chức",
    ],
    careers: [
      "Y tá",
      "Giáo viên",
      "Công tác xã hội",
      "Quản lý nhân sự",
      "Tư vấn",
      "Bán hàng",
    ],
    famous: ["Taylor Swift", "Hugh Jackman", "Anne Hathaway"],
  },
  ESTP: {
    name: "Người thực dụng",
    description:
      "Linh hoạt và khoan dung. Thích hành động ngay lập tức để giải quyết vấn đề.",
    strengths: ["Thực dụng", "Linh hoạt", "Thích hành động", "Kỹ năng xã hội"],
    careers: [
      "Bán hàng",
      "Marketing",
      "Doanh nhân",
      "Vận động viên",
      "Cảnh sát",
      "Paramedic",
    ],
    famous: ["Donald Trump", "Madonna", "Ernest Hemingway"],
  },
  ESTJ: {
    name: "Người điều hành",
    description:
      "Thực tế, có sự thật và đáng tin cậy. Quyết định logic dựa trên kinh nghiệm.",
    strengths: ["Lãnh đạo", "Tổ chức", "Quyết đoán", "Truyền thống"],
    careers: [
      "Quản lý",
      "Luật sư",
      "Giám đốc",
      "Kế toán",
      "Cảnh sát",
      "Quân đội",
    ],
    famous: ["Hillary Clinton", "Judge Judy", "Lyndon B. Johnson"],
  },
  ISFP: {
    name: "Người nghệ sĩ",
    description:
      "Yên tĩnh, thân thiện, nhạy cảm và tốt bụng. Thích có không gian riêng và làm việc theo nhịp độ của mình.",
    strengths: ["Nghệ thuật", "Nhạy cảm", "Linh hoạt", "Quan tâm người khác"],
    careers: [
      "Nghệ sĩ",
      "Nhà thiết kế",
      "Nhạc sĩ",
      "Tư vấn",
      "Y tá",
      "Giáo viên",
    ],
    famous: ["Michael Jackson", "Britney Spears", "Lana Del Rey"],
  },
  ISFJ: {
    name: "Người bảo vệ",
    description:
      "Yên tĩnh, thân thiện, có trách nhiệm và tận tâm. Cam kết và kiên định trong việc đáp ứng nghĩa vụ của mình.",
    strengths: [
      "Đáng tin cậy",
      "Có trách nhiệm",
      "Quan tâm chi tiết",
      "Hỗ trợ người khác",
    ],
    careers: [
      "Y tá",
      "Giáo viên",
      "Công tác xã hội",
      "Thư ký",
      "Kế toán",
      "Quản lý nhân sự",
    ],
    famous: ["Mother Teresa", "Kate Middleton", "Jimmy Carter"],
  },
  ISTP: {
    name: "Người thợ thủ công",
    description:
      "Khoan dung và linh hoạt. Quan sát yên tĩnh cho đến khi vấn đề xuất hiện, sau đó hành động nhanh chóng để tìm ra giải pháp khả thi.",
    strengths: ["Thực tế", "Linh hoạt", "Quan sát", "Kỹ thuật tốt"],
    careers: [
      "Kỹ sư",
      "Cơ khí",
      "Lập trình viên",
      "Phi công",
      "Cảnh sát",
      "Thể thao",
    ],
    famous: ["Clint Eastwood", "Tom Cruise", "Daniel Craig"],
  },
  ISTJ: {
    name: "Người hậu cần",
    description:
      "Yên tĩnh, nghiêm túc, thành công bằng cách tập trung và đáng tin cậy. Thực tế, có trách nhiệm.",
    strengths: ["Đáng tin cậy", "Có trách nhiệm", "Tổ chức tốt", "Thực tế"],
    careers: ["Kế toán", "Quản lý", "Luật sư", "Bác sĩ", "Kỹ sư", "Giáo viên"],
    famous: ["George Washington", "Queen Elizabeth II", "Warren Buffett"],
  },
};

