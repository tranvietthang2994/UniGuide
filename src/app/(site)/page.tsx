import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `UniGuide - Vẽ nên tương lai cùng bạn`,
  description: `UniGuide là một nền tảng giúp bạn dễ dàng tra cứu thông tin tuyển sinh của các trường đại học.`,
  openGraph: {
    type: "website",
    title: `UniGuide - Vẽ nên tương lai cùng bạn`,
    description: `UniGuide là một nền tảng giúp bạn dễ dàng tra cứu thông tin tuyển sinh của các trường đại học.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: `UniGuide - Vẽ nên tương lai cùng bạn`,
    description: `UniGuide là một nền tảng giúp bạn dễ dàng tra cứu thông tin tuyển sinh của các trường đại học.`,
    images:
      "https://ucarecdn.com/4b0ffd0e-90b0-4a59-b63c-f5ecee0ae575/saasbold.jpg",
  },
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
