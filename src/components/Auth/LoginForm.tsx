"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { login } = useAuth();

  // Real-time validation
  const validateField = (field: string, value: string) => {
    const errors = { ...fieldErrors };

    switch (field) {
      case "email":
        if (!value) {
          errors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Email không hợp lệ";
        } else {
          delete errors.email;
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Mật khẩu là bắt buộc";
        } else if (value.length < 6) {
          errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        } else {
          delete errors.password;
        }
        break;
    }

    setFieldErrors(errors);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateField("email", value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validateField("password", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate all fields
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!password) {
      errors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("lastEmail", email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("lastEmail");
        }
        onSuccess();
      } else {
        setError(result.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại");
    }

    setIsLoading(false);
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    const lastEmail = localStorage.getItem("lastEmail");
    if (remembered === "true" && lastEmail) {
      setEmail(lastEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Đăng nhập
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Chào mừng bạn quay trở lại!
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
            htmlFor="login-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600 dark:focus:border-primary"
            }`}
            placeholder="your@email.com"
            required
            disabled={isLoading}
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600 dark:focus:border-primary"
              }`}
              placeholder="Nhập mật khẩu"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Ghi nhớ đăng nhập
            </span>
          </label>
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-primary hover:text-primary-dark"
            disabled={isLoading}
          >
            Quên mật khẩu?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Đang đăng nhập...</span>
            </div>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{" "}
        </span>
        <button
          onClick={onSwitchToRegister}
          className="font-medium text-primary hover:text-primary-dark"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
