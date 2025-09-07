import ScoreLookUp from "@/components/ScoreLookUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tra cứu điểm thi - UniGuide`,
  description: `Tra cứu điểm chuẩn đại học qua các năm một cách dễ dàng và chính xác.`,
  openGraph: {
    type: "website",
    title: `Tra cứu điểm thi - UniGuide`,
    description: `Tra cứu điểm chuẩn đại học qua các năm một cách dễ dàng và chính xác.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tra cứu điểm thi - UniGuide`,
    description: `Tra cứu điểm chuẩn đại học qua các năm một cách dễ dàng và chính xác.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
};

export default function ScoreLookUpPage() {
  return (
    <main>
      <ScoreLookUp />
    </main>
  );
}
