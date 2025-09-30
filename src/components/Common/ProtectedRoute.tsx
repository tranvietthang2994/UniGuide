"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  showLoginPrompt?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/",
  showLoginPrompt = true,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (showLoginPrompt) {
        setShowPrompt(true);
      } else {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, showLoginPrompt]);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Show login prompt
  if (!isAuthenticated && showPrompt) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-dark">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Yêu cầu đăng nhập
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Bạn cần đăng nhập để truy cập trang này
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="rounded-lg border border-stroke px-4 py-2 text-black transition hover:bg-gray-1 dark:border-stroke-dark dark:text-white dark:hover:bg-gray-700"
              >
                Về trang chủ
              </button>
              <button
                onClick={() => router.push("/#login")}
                className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primary-dark"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
