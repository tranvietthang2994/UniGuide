# MBTI Quiz Component

Một component trắc nghiệm MBTI hiện đại, đẹp mắt và tương tác cao được xây dựng bằng React, NextJS, TypeScript, TailwindCSS và Framer Motion.

## 🌟 Tính năng chính

- ✨ **Giao diện hiện đại**: Thiết kế card đẹp mắt với gradient và shadow
- 🎯 **Tương tác mượt mà**: Animations với Framer Motion cho mọi transition
- 📱 **Responsive**: Tối ưu cho cả desktop và mobile
- 🎮 **Gamified**: Progress bar, visual feedback và scoring system
- 🧠 **Logic MBTI đầy đủ**: Tính toán chính xác 16 loại tính cách
- ⚡ **Auto-advance**: Tự động chuyển câu hỏi sau khi chọn đáp án
- 🎨 **Dark mode**: Hỗ trợ theme dark/light
- 🔄 **Tái sử dụng**: Code có thể dùng cho DISC, BigFive, Holland

## 📁 Cấu trúc file

```
QuizDo/
├── index.tsx              # Entry point, exports chính
├── MbtiQuiz.tsx           # Component chính điều phối toàn bộ quiz
├── QuizCard.tsx           # Component hiển thị câu hỏi và đáp án
├── ProgressBar.tsx        # Thanh tiến độ với animation
├── ResultScreen.tsx       # Màn hình kết quả MBTI chi tiết
├── types.ts               # Định nghĩa types và dữ liệu MBTI
├── mbti.ts                # 60 câu hỏi MBTI (sử dụng 30 câu đầu)
├── calculateMbti.ts       # Logic tính điểm và xác định type
└── README.md              # Tài liệu này
```

## 🚀 Cách sử dụng

### Import và sử dụng cơ bản

```tsx
import MbtiQuiz from "@/components/Quiz/QuizDo";

export default function QuizPage() {
  const handleComplete = (result) => {
    console.log("MBTI Result:", result);
  };

  const handleExit = () => {
    // Xử lý khi user thoát quiz
    router.push("/");
  };

  return (
    <MbtiQuiz
      onComplete={handleComplete}
      onExit={handleExit}
      className="custom-class"
    />
  );
}
```

### Props của MbtiQuiz

```tsx
interface MbtiQuizProps {
  onComplete?: (result: MbtiResult) => void; // Callback khi hoàn thành
  onExit?: () => void; // Callback khi thoát
  className?: string; // CSS classes tùy chỉnh
}
```

### Sử dụng components riêng lẻ

```tsx
import {
  QuizCard,
  ProgressBar,
  ResultScreen,
  calculateMbtiResult
} from "@/components/Quiz/QuizDo";

// Tái sử dụng cho quiz khác
<ProgressBar current={5} total={50} />
<QuizCard
  question={question}
  onAnswer={handleAnswer}
  onNext={handleNext}
/>
```

## 🎨 Customization

### Thay đổi số câu hỏi

Mặc định sử dụng 30 câu đầu tiên. Để thay đổi, chỉnh sửa trong `MbtiQuiz.tsx`:

```tsx
// Sử dụng tất cả 60 câu
const questionsToUse = mbtiQuestions;

// Hoặc tùy chỉnh số lượng
const questionsToUse = mbtiQuestions.slice(0, 20); // 20 câu đầu
```

### Thay đổi màu sắc theme

Các màu chính được định nghĩa trong TailwindCSS classes:

```tsx
// Trong QuizCard.tsx - thay đổi màu dimension
const dimensionMap = {
  "E/I": { color: "text-blue-600", bg: "bg-blue-100" },
  "S/N": { color: "text-green-600", bg: "bg-green-100" },
  // ...
};
```

### Thêm animation mới

Sử dụng Framer Motion để thêm effects:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🔧 Tái sử dụng cho quiz khác

Component được thiết kế để dễ dàng tái sử dụng cho DISC, BigFive, Holland:

1. **Tạo dữ liệu câu hỏi mới** (theo format giống `mbti.ts`)
2. **Tạo logic tính điểm mới** (theo format giống `calculateMbti.ts`)
3. **Cập nhật types** cho quiz mới
4. **Tái sử dụng components UI** (QuizCard, ProgressBar, ResultScreen)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - Stack vertical, touch-friendly
- **Tablet**: 640px - 1024px - Grid 2 columns
- **Desktop**: > 1024px - Full grid layout, hover effects

## 🎯 Performance

- **Lazy loading**: Components chỉ render khi cần
- **Memoization**: Sử dụng useCallback để tránh re-render
- **Optimized animations**: Sử dụng transform thay vì layout properties
- **Small bundle**: Import chỉ những gì cần thiết từ Framer Motion

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Framer Motion not working**: Đảm bảo đã cài đặt `framer-motion`
2. **Dark mode issues**: Kiểm tra next-themes configuration
3. **Type errors**: Đảm bảo TypeScript version >= 4.5
4. **Animations laggy**: Kiểm tra performance tab, có thể do quá nhiều animation đồng thời

## 🔮 Tương lai

- [ ] Thêm sound effects
- [ ] Save/load progress từ localStorage
- [ ] Share results lên social media
- [ ] Multilingual support
- [ ] A/B testing cho UI variations
- [ ] Analytics integration

