"use client";

import { useState } from "react";
import Graphics from "./Graphics";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        setError(data.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden bg-[linear-gradient(90deg,#F7E8F3_0%,#E0E0FC_100%)] py-17.5 dark:bg-gradient-to-t dark:from-gray-dark dark:to-gray-dark lg:py-[100px]">
      <div className="container mx-auto w-full max-w-[1170px]">
        <div className="mx-auto w-full max-w-[590px]">
          <div className="text-center">
            <h2 className="mb-5 font-satoshi text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-heading-2">
              Đăng kí liên hệ với chuyên gia hướng nghiệp
            </h2>
            <p className="mb-10 text-base text-body dark:text-gray-4">
              Để lại email để chúng tôi liên hệ bạn sớm nhất có thể.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative mx-auto flex w-full max-w-[490px] flex-wrap justify-end"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              disabled={isLoading}
              className="h-12 w-full rounded-full bg-white px-7.5 shadow-[0px_5px_15px_0px_rgba(7,10,46,0.04)] outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-primary/20 dark:bg-white/5 dark:focus:ring-dark/20 lsm:h-16 lsm:pr-[150px] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="right-2 mt-4 inline-flex h-12 min-w-[125px] items-center justify-center rounded-full bg-primary px-7 font-satoshi text-base font-medium text-white duration-300 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed lsm:absolute lsm:top-1/2 lsm:mt-0 lsm:-translate-y-1/2"
            >
              {isLoading ? "Đang gửi..." : "Đăng kí"}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-center">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Đăng ký thành công!
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
              </p>
            </div>
          </div>
        </div>
      )}

      <Graphics />
    </section>
  );
}
