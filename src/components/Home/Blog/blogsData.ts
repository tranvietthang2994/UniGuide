export interface Blog {
  _id: number;
  title: string;
  metadata: string;
  mainImage: string;
  author: string;
  publishedAt: string;
}

export const posts: Blog[] = [
  // Review trường đại học
  {
    _id: 1,
    title: "Đại học FPT: Môi trường học tập năng động và hiện đại",
    metadata:
      "Đại học FPT nổi bật với cơ sở vật chất tiên tiến và chương trình học thực tiễn.",
    mainImage: "/images/blog/blog-1.png",
    author: "Nguyễn Văn An",
    publishedAt: "2025-09-03",
  },
  {
    _id: 2,
    title: "Đánh giá Đại học Bách Khoa TP.HCM: Cái nôi kỹ thuật hàng đầu",
    metadata:
      "Bách Khoa TP.HCM cung cấp chương trình đào tạo kỹ thuật chất lượng cao và môi trường học thuật nghiêm túc.",
    mainImage: "/images/blog/blog-1.png",
    author: "Trần Thị Bình",
    publishedAt: "2025-08-22",
  },
  {
    _id: 3,
    title: "Đại học Y Dược Huế: Hành trình trở thành bác sĩ",
    metadata:
      "ĐH Y Dược Huế đào tạo y khoa chuyên sâu với đội ngũ giảng viên giàu kinh nghiệm.",
    mainImage: "/images/blog/blog-1.png",
    author: "Lê Minh Châu",
    publishedAt: "2025-09-01",
  },
  {
    _id: 4,
    title: "Đại học Kinh tế Quốc dân: Lựa chọn lý tưởng cho ngành kinh tế",
    metadata:
      "ĐH Kinh tế Quốc dân nổi tiếng với chương trình kinh tế và quản trị chất lượng cao.",
    mainImage: "/images/blog/blog-1.png",
    author: "Phạm Văn Đức",
    publishedAt: "2025-08-31",
  },
  // Mẹo học tập
  {
    _id: 5,
    title: "5 mẹo quản lý thời gian hiệu quả cho sinh viên",
    metadata:
      "Học cách sắp xếp thời gian để cân bằng giữa học tập và cuộc sống cá nhân.",
    mainImage: "/images/blog/blog-1.png",
    author: "Hoàng Thị Mai",
    publishedAt: "2025-09-03",
  },
  {
    _id: 6,
    title: "Cách ghi chú bài giảng để học tốt hơn",
    metadata:
      "Áp dụng kỹ thuật ghi chú Cornell để tối ưu hóa việc học trên lớp.",
    mainImage: "/images/blog/blog-1.png",
    author: "Nguyễn Minh Tuấn",
    publishedAt: "2025-09-02",
  },
  {
    _id: 7,
    title: "Bí quyết ôn thi đạt điểm cao trong kỳ thi đại học",
    metadata:
      "Lập kế hoạch ôn tập khoa học và duy trì sức khỏe để đạt kết quả tốt nhất.",
    mainImage: "/images/blog/blog-1.png",
    author: "Vũ Thị Lan",
    publishedAt: "2025-09-01",
  },
  {
    _id: 8,
    title: "Tăng cường tập trung khi học với kỹ thuật Pomodoro",
    metadata:
      "Sử dụng kỹ thuật Pomodoro để học tập hiệu quả và giảm căng thẳng.",
    mainImage: "/images/blog/blog-1.png",
    author: "Trần Văn Hùng",
    publishedAt: "2025-08-31",
  },
  // Cách sử dụng AI hiệu quả
  {
    _id: 9,
    title: "Sử dụng AI để hỗ trợ nghiên cứu học thuật",
    metadata:
      "AI giúp tìm kiếm tài liệu và phân tích dữ liệu nhanh chóng, tiết kiệm thời gian.",
    mainImage: "/images/blog/blog-1.png",
    author: "Lê Thị Hồng",
    publishedAt: "2025-09-03",
  },
  {
    _id: 10,
    title: "Cách dùng ChatGPT để luyện kỹ năng viết luận",
    metadata:
      "ChatGPT hỗ trợ xây dựng dàn ý và chỉnh sửa bài luận một cách hiệu quả.",
    mainImage: "/images/blog/blog-1.png",
    author: "Nguyễn Quốc Huy",
    publishedAt: "2025-09-03",
  },
  {
    _id: 11,
    title: "Tối ưu hóa học ngoại ngữ với công cụ AI",
    metadata:
      "Sử dụng AI như Duolingo hoặc Grammarly để cải thiện kỹ năng ngoại ngữ nhanh chóng.",
    mainImage: "/images/blog/blog-1.png",
    author: "Phạm Thị Ngọc",
    publishedAt: "2025-09-01",
  },
  {
    _id: 12,
    title: "AI và tương lai của giáo dục: Cơ hội và thách thức",
    metadata:
      "AI mang lại nhiều cơ hội cá nhân hóa học tập nhưng cũng đặt ra thách thức về đạo đức.",
    mainImage: "/images/blog/blog-1.png",
    author: "Đỗ Văn Long",
    publishedAt: "2025-08-31",
  },
];
