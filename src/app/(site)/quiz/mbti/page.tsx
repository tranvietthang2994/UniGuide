import MbtiQuiz from "@/components/Quiz/QuizDo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Trắc nghiệm MBTI - Khám phá tính cách của bạn | UniGuide`,
  description: `Làm bài trắc nghiệm MBTI để khám phá 1 trong 16 loại tính cách Myers-Briggs của bạn. Hiểu rõ điểm mạnh, nghề nghiệp phù hợp và cách phát triển bản thân.`,
  openGraph: {
    type: "website",
    title: `Trắc nghiệm MBTI - Khám phá tính cách của bạn | UniGuide`,
    description: `Làm bài trắc nghiệm MBTI để khám phá 1 trong 16 loại tính cách Myers-Briggs của bạn. Hiểu rõ điểm mạnh, nghề nghiệp phù hợp và cách phát triển bản thân.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: `Trắc nghiệm MBTI - Khám phá tính cách của bạn | UniGuide`,
    description: `Làm bài trắc nghiệm MBTI để khám phá 1 trong 16 loại tính cách Myers-Briggs của bạn. Hiểu rõ điểm mạnh, nghề nghiệp phù hợp và cách phát triển bản thân.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
};

export default function MbtiTestPage() {
  return (
    <main>
      <MbtiQuiz />
    </main>
  );
}
