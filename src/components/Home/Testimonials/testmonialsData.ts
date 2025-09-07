import { Testimonial } from "@/types/testimonial";

const testimonials = [
  {
    text: "UniGuide đã giúp tôi tìm được ngành học phù hợp với sở thích và năng lực. Thông tin về các trường đại học rất chi tiết và chính xác.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150&h=150&fit=crop&crop=face",
    name: "Nguyễn Minh Anh",
    role: "Sinh viên ĐH Bách Khoa",
  },
  {
    text: "Tính năng tra cứu điểm chuẩn rất hữu ích, giúp tôi so sánh và đưa ra quyết định đúng đắn cho tương lai của mình.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Trần Hoàng Nam",
    role: "Học sinh lớp 12",
  },
  {
    text: "Bài test trắc nghiệm tính cách giúp tôi hiểu rõ hơn về bản thân và định hướng nghề nghiệp phù hợp.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Lê Thị Hương",
    role: "Sinh viên ĐH Kinh tế",
  },
  {
    text: "Giao diện thân thiện, dễ sử dụng. Thông tin cập nhật liên tục giúp tôi nắm bắt xu hướng tuyển sinh mới nhất.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Phạm Đức Minh",
    role: "Phụ huynh học sinh",
  },
  {
    text: "UniGuide là người bạn đồng hành tuyệt vời trong hành trình chọn trường, chọn ngành của con tôi.",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    name: "Hoàng Thị Lan",
    role: "Giáo viên THPT",
  },
  {
    text: "Tư vấn chuyên nghiệp từ các chuyên gia giáo dục giúp tôi có cái nhìn rõ ràng hơn về con đường học tập.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Vũ Quang Huy",
    role: "Học sinh lớp 11",
  },
  {
    text: "Thông tin về học phí, học bổng rất đầy đủ, giúp gia đình tôi lập kế hoạch tài chính hợp lý.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Đặng Thị Mai",
    role: "Phụ huynh",
  },
  {
    text: "Cảm ơn UniGuide đã đồng hành cùng tôi trong việc chọn ngành Công nghệ thông tin - đúng với đam mê của mình.",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    name: "Ngô Văn Đức",
    role: "Sinh viên IT",
  },
  {
    text: "Ứng dụng rất tiện lợi, có thể tra cứu mọi lúc mọi nơi. Đặc biệt hữu ích trong mùa tuyển sinh.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Bùi Thị Thảo",
    role: "Học sinh lớp 12",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// For backward compatibility with old testimonial structure
const testimonialData: Testimonial[][] = [
  [
    {
      id: 1,
      name: firstColumn[0].name,
      role: firstColumn[0].role,
      text: firstColumn[0].text,
      image: firstColumn[0].image,
    },
    {
      id: 2,
      name: firstColumn[1].name,
      role: firstColumn[1].role,
      text: firstColumn[1].text,
      image: firstColumn[1].image,
    },
  ],
  [
    {
      id: 1,
      name: secondColumn[0].name,
      role: secondColumn[0].role,
      text: secondColumn[0].text,
      image: secondColumn[0].image,
    },
    {
      id: 2,
      name: secondColumn[1].name,
      role: secondColumn[1].role,
      text: secondColumn[1].text,
      image: secondColumn[1].image,
    },
  ],
  [
    {
      id: 1,
      name: thirdColumn[0].name,
      role: thirdColumn[0].role,
      text: thirdColumn[0].text,
      image: thirdColumn[0].image,
    },
    {
      id: 2,
      name: thirdColumn[1].name,
      role: thirdColumn[1].role,
      text: thirdColumn[1].text,
      image: thirdColumn[1].image,
    },
  ],
];

export { testimonials, firstColumn, secondColumn, thirdColumn };
export default testimonialData;
