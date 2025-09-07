export interface HollandQuestion {
  id: number;
  text: string;
  category: "R" | "I" | "A" | "S" | "E" | "C";
  options: { text: string; score: number }[];
}

// The first 18 questions (ids 1-3, 7-9, 13-15, 19-21, 25-27, 31-33) can be used for the short version (3 per RIASEC category).
// The full 36 questions provide a more comprehensive assessment.

export const hollandQuestions: HollandQuestion[] = [
  // Realistic (R) - Thực tế: Làm việc với tay, công cụ, máy móc, thiên nhiên
  {
    id: 1,
    text: "Bạn thích sửa chữa máy móc hoặc thiết bị điện tử.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 2,
    text: "Bạn thích làm việc ngoài trời, như làm vườn hoặc xây dựng.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 3,
    text: "Bạn thích vận hành hoặc bảo trì các loại máy móc lớn.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 4,
    text: "Bạn thích làm việc với gỗ, như chế tác đồ nội thất.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 5,
    text: "Bạn thích chăm sóc động vật hoặc cây trồng.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 6,
    text: "Bạn thích thực hiện các công việc thủ công như hàn hoặc lắp ráp.",
    category: "R",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },

  // Investigative (I) - Nghiên cứu: Phân tích, điều tra, giải quyết vấn đề
  {
    id: 7,
    text: "Bạn thích nghiên cứu các vấn đề khoa học hoặc công nghệ mới.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 8,
    text: "Bạn thích phân tích dữ liệu để tìm ra xu hướng hoặc mẫu số.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 9,
    text: "Bạn thích thực hiện các thí nghiệm trong phòng nghiên cứu.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 10,
    text: "Bạn thích giải các bài toán phức tạp hoặc câu đố logic.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 11,
    text: "Bạn thích đọc các tài liệu khoa học hoặc kỹ thuật.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 12,
    text: "Bạn thích khám phá các lý thuyết hoặc khái niệm mới.",
    category: "I",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },

  // Artistic (A) - Nghệ thuật: Sáng tạo, tự do thể hiện
  {
    id: 13,
    text: "Bạn thích vẽ tranh hoặc thiết kế đồ họa.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 14,
    text: "Bạn thích viết truyện, thơ hoặc sáng tác nội dung sáng tạo.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 15,
    text: "Bạn thích chơi nhạc cụ hoặc sáng tác âm nhạc.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 16,
    text: "Bạn thích tham gia diễn xuất hoặc biểu diễn sân khấu.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 17,
    text: "Bạn thích thiết kế thời trang hoặc trang trí nội thất.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 18,
    text: "Bạn thích chụp ảnh hoặc quay phim để thể hiện sáng tạo.",
    category: "A",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },

  // Social (S) - Xã hội: Giúp đỡ, hỗ trợ người khác
  {
    id: 19,
    text: "Bạn thích dạy học hoặc hướng dẫn người khác.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 20,
    text: "Bạn thích làm việc trong các tổ chức từ thiện hoặc cộng đồng.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 21,
    text: "Bạn thích chăm sóc hoặc hỗ trợ người khác khi họ cần.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 22,
    text: "Bạn thích tư vấn hoặc giúp người khác giải quyết vấn đề cá nhân.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 23,
    text: "Bạn thích làm việc nhóm để hỗ trợ cộng đồng.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 24,
    text: "Bạn thích tổ chức các hoạt động xã hội để gắn kết mọi người.",
    category: "S",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },

  // Enterprising (E) - Kinh doanh: Lãnh đạo, thuyết phục, kinh doanh
  {
    id: 25,
    text: "Bạn thích dẫn dắt một nhóm để đạt được mục tiêu chung.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 26,
    text: "Bạn thích thuyết phục người khác đồng ý với ý kiến của mình.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 27,
    text: "Bạn thích quản lý hoặc điều hành một dự án kinh doanh.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 28,
    text: "Bạn thích bán hàng hoặc tiếp thị sản phẩm/dịch vụ.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 29,
    text: "Bạn thích thương lượng hoặc đàm phán trong kinh doanh.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 30,
    text: "Bạn thích khởi nghiệp hoặc phát triển ý tưởng kinh doanh mới.",
    category: "E",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },

  // Conventional (C) - Quy ước: Tổ chức, quản lý dữ liệu, quy trình
  {
    id: 31,
    text: "Bạn thích sắp xếp và tổ chức tài liệu hoặc dữ liệu.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 32,
    text: "Bạn thích làm việc với các bảng tính hoặc cơ sở dữ liệu.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 33,
    text: "Bạn thích làm việc theo các quy trình hoặc quy tắc rõ ràng.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 34,
    text: "Bạn thích lập kế hoạch hoặc quản lý lịch trình công việc.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 35,
    text: "Bạn thích kiểm tra hoặc chỉnh sửa tài liệu để đảm bảo tính chính xác.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
  {
    id: 36,
    text: "Bạn thích làm việc trong môi trường có cấu trúc và quy định rõ ràng.",
    category: "C",
    options: [
      { text: "Rất không thích", score: -2 },
      { text: "Không thích", score: -1 },
      { text: "Trung lập", score: 0 },
      { text: "Thích", score: 1 },
      { text: "Rất thích", score: 2 },
    ],
  },
];
