export type QuizTest = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
  questions: number;
  color: string;
  bgColor: string;
  borderColor: string;
  image: string;
};

export const quizData: QuizTest[] = [
  {
    id: 1,
    title: "MBTI",
    subtitle: "Phân loại tính cách Myers-Briggs",
    description:
      "Xác định loại tính cách của bạn dựa trên 4 thang đo: Hướng ngoại/Hướng nội, Giác quan/Trực giác, Lý trí/Cảm xúc, Nguyên tắc/Linh hoạt. Giúp hiểu rõ cách bạn nhận thức thế giới và đưa ra quyết định.",
    features: [
      "16 loại tính cách khác nhau",
      "Phân tích điểm mạnh và điểm yếu",
      "Gợi ý nghề nghiệp phù hợp",
      "Cách làm việc nhóm hiệu quả",
    ],
    duration: "15-20 phút",
    questions: 60,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    image: "/images/quiz/mbti-placeholder.jpg",
  },
  {
    id: 2,
    title: "DISC",
    subtitle: "Đánh giá hành vi và giao tiếp",
    description:
      "Đánh giá phong cách hành vi và giao tiếp của bạn qua 4 nhóm: Dominant (Quyết đoán), Influential (Ảnh hưởng), Steady (Ổn định), Conscientious (Thận trọng). Tìm hiểu cách bạn tương tác với người khác.",
    features: [
      "Phân tích phong cách làm việc",
      "Cải thiện kỹ năng giao tiếp",
      "Hiểu rõ động lực bản thân",
      "Xây dựng mối quan hệ tốt hơn",
    ],
    duration: "10-15 phút",
    questions: 40,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    image: "/images/quiz/disc-placeholder.jpg",
  },
  {
    id: 3,
    title: "Holland Code",
    subtitle: "Phân loại sở thích nghề nghiệp",
    description:
      "Xác định sở thích nghề nghiệp của bạn theo 6 nhóm: Realistic, Investigative, Artistic, Social, Enterprising, Conventional. Tìm ra môi trường làm việc và ngành nghề phù hợp nhất.",
    features: [
      "6 nhóm nghề nghiệp chính",
      "Phân tích sở thích cá nhân",
      "Danh sách nghề nghiệp cụ thể",
      "Môi trường làm việc lý tưởng",
    ],
    duration: "10-12 phút",
    questions: 36,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    image: "/images/quiz/holland-placeholder.jpg",
  },
  {
    id: 4,
    title: "Big Five",
    subtitle: "5 yếu tố tính cách cốt lõi",
    description:
      "Đo lường 5 yếu tố tính cách cơ bản: Cởi mở, Tận tâm, Hướng ngoại, Dễ chịu, Bất ổn cảm xúc. Cung cấp cái nhìn tổng quan và chi tiết về tính cách của bạn.",
    features: [
      "Đánh giá toàn diện tính cách",
      "So sánh với người khác",
      "Dự đoán hành vi tương lai",
      "Phát triển bản thân hiệu quả",
    ],
    duration: "12-15 phút",
    questions: 50,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    image: "/images/quiz/bigfive-placeholder.jpg",
  },
];
