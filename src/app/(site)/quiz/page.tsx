import Quiz from "@/components/Quiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Trắc nghiệm nghề nghiệp - UniGuide`,
  description: `Khám phá bản thân và định hướng nghề nghiệp với các bài trắc nghiệm khoa học: MBTI, DISC, Holland, Big Five. Tìm hiểu tính cách, sở thích và khả năng của bạn để chọn ngành học phù hợp.`,
  openGraph: {
    type: "website",
    title: `Trắc nghiệm nghề nghiệp - UniGuide`,
    description: `Khám phá bản thân và định hướng nghề nghiệp với các bài trắc nghiệm khoa học: MBTI, DISC, Holland, Big Five. Tìm hiểu tính cách, sở thích và khả năng của bạn để chọn ngành học phù hợp.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: `Trắc nghiệm nghề nghiệp - UniGuide`,
    description: `Khám phá bản thân và định hướng nghề nghiệp với các bài trắc nghiệm khoa học: MBTI, DISC, Holland, Big Five. Tìm hiểu tính cách, sở thích và khả năng của bạn để chọn ngành học phù hợp.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
};

export default function QuizPage() {
  return (
    <main>
      <Quiz />
    </main>
  );
}
