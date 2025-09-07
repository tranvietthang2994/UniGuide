export interface DiscQuestion {
  id: number;
  text: string;
  dimension: "D" | "I" | "S" | "C";
  options: { text: string; score: number }[];
}

// The first 20 questions (ids 1-20) can be used for a short version (5 per dimension).
// The full 40 questions provide a comprehensive DISC assessment.

export const discQuestions: DiscQuestion[] = [
  // D: Quyết đoán (Dominant) - 10 questions
  {
    id: 1,
    text: "Bạn thích đảm nhận vai trò lãnh đạo trong các dự án nhóm.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 2,
    text: "Bạn thường đưa ra quyết định nhanh chóng và dứt khoát.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 3,
    text: "Bạn cảm thấy thoải mái khi đối mặt với các thử thách lớn.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 4,
    text: "Bạn thích kiểm soát tình huống và định hướng kết quả.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 5,
    text: "Bạn thường thẳng thắn bày tỏ ý kiến của mình.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 6,
    text: "Bạn thích cạnh tranh để đạt được mục tiêu.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 7,
    text: "Bạn thường hành động ngay lập tức khi có cơ hội.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 8,
    text: "Bạn ưu tiên kết quả hơn là quá trình làm việc.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 9,
    text: "Bạn tự tin khi phải đưa ra quyết định quan trọng.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 10,
    text: "Bạn thích làm việc trong môi trường có áp lực cao.",
    dimension: "D",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },

  // I: Ảnh hưởng (Influential) - 10 questions
  {
    id: 11,
    text: "Bạn dễ dàng truyền cảm hứng và thuyết phục người khác.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 12,
    text: "Bạn thích giao tiếp và xây dựng mối quan hệ với mọi người.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 13,
    text: "Bạn cảm thấy vui vẻ khi làm việc trong môi trường năng động.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 14,
    text: "Bạn thường sử dụng sự lạc quan để thúc đẩy tinh thần nhóm.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 15,
    text: "Bạn thích chia sẻ ý tưởng sáng tạo với mọi người.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 16,
    text: "Bạn thường là người khuấy động không khí trong nhóm.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 17,
    text: "Bạn dễ dàng kết nối với người lạ trong các sự kiện xã hội.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 18,
    text: "Bạn thích làm việc trong môi trường hợp tác và cởi mở.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 19,
    text: "Bạn thường sử dụng sự hài hước để thu hút sự chú ý.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 20,
    text: "Bạn thích thuyết trình và chia sẻ ý tưởng trước đám đông.",
    dimension: "I",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },

  // S: Ổn định (Steady) - 10 questions
  {
    id: 21,
    text: "Bạn thích làm việc trong môi trường ổn định và ít thay đổi.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 22,
    text: "Bạn thường kiên nhẫn khi làm việc với người khác.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 23,
    text: "Bạn ưu tiên duy trì sự hài hòa trong nhóm.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 24,
    text: "Bạn thích làm việc đều đặn và có kế hoạch rõ ràng.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 25,
    text: "Bạn thường hỗ trợ người khác khi họ cần giúp đỡ.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 26,
    text: "Bạn thích các mối quan hệ lâu dài và ổn định.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 27,
    text: "Bạn cảm thấy thoải mái khi làm việc với tốc độ ổn định.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 28,
    text: "Bạn thường lắng nghe và thấu hiểu người khác.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 29,
    text: "Bạn thích làm việc trong môi trường thân thiện và hợp tác.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 30,
    text: "Bạn tránh xung đột để giữ hòa khí trong nhóm.",
    dimension: "S",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },

  // C: Thận trọng (Conscientious) - 10 questions
  {
    id: 31,
    text: "Bạn thường kiểm tra kỹ lưỡng trước khi hoàn thành công việc.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 32,
    text: "Bạn thích làm việc theo các quy trình và tiêu chuẩn rõ ràng.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 33,
    text: "Bạn chú trọng vào chi tiết và độ chính xác trong công việc.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 34,
    text: "Bạn thường phân tích kỹ lưỡng trước khi đưa ra quyết định.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 35,
    text: "Bạn thích làm việc một cách có tổ chức và hệ thống.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 36,
    text: "Bạn thường đặt câu hỏi để đảm bảo hiểu rõ vấn đề.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 37,
    text: "Bạn thích làm việc với dữ liệu và thông tin cụ thể.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 38,
    text: "Bạn ưu tiên chất lượng hơn là tốc độ khi làm việc.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 39,
    text: "Bạn thường kiểm tra lại công việc để tránh sai sót.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
  {
    id: 40,
    text: "Bạn thích làm việc với các nhiệm vụ đòi hỏi sự chính xác cao.",
    dimension: "C",
    options: [
      { text: "Rất không đồng ý", score: -2 },
      { text: "Không đồng ý", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Đồng ý", score: 1 },
      { text: "Rất đồng ý", score: 2 },
    ],
  },
];
