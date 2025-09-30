"use client";

import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const validateEmail = (email: string) => {
    if (!email) {
      setFieldError("Email là bắt buộc");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("Email không hợp lệ");
      return false;
    }
    setFieldError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Đã xảy ra lỗi, vui lòng thử lại");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại");
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            Email đã được gửi!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn. Vui lòng
            kiểm tra hộp thư và làm theo hướng dẫn.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Không nhận được email? Kiểm tra thư mục spam hoặc
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Gửi lại email
          </button>
        </div>

        <button
          onClick={onBackToLogin}
          className="mt-6 flex items-center justify-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Quay lại đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Quên mật khẩu?
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Nhập email của bạn để nhận link đặt lại mật khẩu
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="forgot-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
              fieldError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600 dark:focus:border-primary"
            }`}
            placeholder="your@email.com"
            required
            disabled={isLoading}
            autoComplete="email"
          />
          {fieldError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !!fieldError}
          className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Đang gửi...</span>
            </div>
          ) : (
            "Gửi link đặt lại mật khẩu"
          )}
        </button>
      </form>

      {/* Back to Login */}
      <button
        onClick={onBackToLogin}
        disabled={isLoading}
        className="mt-6 flex items-center justify-center w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Quay lại đăng nhập
      </button>
    </div>
  );
};

export default ForgotPasswordForm;

