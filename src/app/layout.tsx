import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import ChatWidget from "@/components/Common/ChatWidget";
const inter = Inter({ subsets: ["latin"] });

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} flex min-h-screen flex-col dark:bg-[#151F34]`}
      >
        <AuthProvider>
          {children}
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
};

export default layout;
