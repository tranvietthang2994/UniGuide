"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    grade: "",
    city: "",
    schoolName: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string;
    level: string;
  }>({
    score: 0,
    feedback: "",
    level: "Rất yếu",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { register } = useAuth();

  const vietnamCities = [
    "An Giang",
    "Bà Rịa-Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "Cần Thơ",
    "Đà Nẵng",
    "Hải Phòng",
    "Hà Nội",
    "TP Hồ Chí Minh",
  ];

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push("ít nhất 8 ký tự");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("chữ thường");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("chữ hoa");

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("chữ số");

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push("ký tự đặc biệt");

    const strengthLevels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
    const strengthLevel = strengthLevels[score] || "Rất yếu";

    return {
      score,
      feedback:
        feedback.length > 0
          ? `Cần thêm: ${feedback.join(", ")}`
          : "Mật khẩu mạnh!",
      level: strengthLevel,
    };
  };

  // Field validation
  const validateField = (name: string, value: string) => {
    const errors = { ...fieldErrors };

    switch (name) {
      case "email":
        if (!value) {
          errors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Email không hợp lệ";
        } else {
          delete errors.email;
        }
        break;
      case "fullname":
        if (!value) {
          errors.fullname = "Họ và tên là bắt buộc";
        } else if (value.length < 2) {
          errors.fullname = "Tên phải có ít nhất 2 ký tự";
        } else if (value.length > 50) {
          errors.fullname = "Tên không được quá 50 ký tự";
        } else {
          delete errors.fullname;
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
        // Update password strength
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
        } else if (value !== formData.password) {
          errors.confirmPassword = "Mật khẩu xác nhận không khớp";
        } else {
          delete errors.confirmPassword;
        }
        break;
      case "phone":
        if (value && !/^[0-9]{10,11}$/.test(value.replace(/\s+/g, ""))) {
          errors.phone = "Số điện thoại không hợp lệ (10-11 chữ số)";
        } else {
          delete errors.phone;
        }
        break;
    }

    setFieldErrors(errors);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation for specific fields
    if (["email", "fullname", "password", "phone"].includes(name) && value) {
      validateField(name, value);
    }

    // Validate confirm password when password changes
    if (name === "password" && formData.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }

    // Validate confirm password in real-time
    if (name === "confirmPassword") {
      validateField("confirmPassword", value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Comprehensive validation
    const errors: { [key: string]: string } = {};

    // Required fields validation
    if (!formData.email) errors.email = "Email là bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Email không hợp lệ";

    if (!formData.fullname) errors.fullname = "Họ và tên là bắt buộc";
    else if (formData.fullname.length < 2)
      errors.fullname = "Tên phải có ít nhất 2 ký tự";

    if (!formData.password) errors.password = "Mật khẩu là bắt buộc";
    else if (formData.password.length < 6)
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    if (!formData.confirmPassword)
      errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";

    if (!formData.grade) errors.grade = "Vui lòng chọn lớp";
    if (!formData.city) errors.city = "Vui lòng chọn tỉnh/thành";

    // Optional fields validation
    if (
      formData.phone &&
      !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    // Terms acceptance
    if (!acceptTerms) {
      setError("Vui lòng đồng ý với Điều khoản sử dụng");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Vui lòng kiểm tra và sửa các lỗi trên form");
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        email: formData.email.trim(),
        password: formData.password,
        fullname: formData.fullname.trim(),
        grade: parseInt(formData.grade),
        city: formData.city,
        schoolName: formData.schoolName?.trim() || undefined,
        phone: formData.phone?.replace(/\s+/g, "") || undefined,
      };

      const result = await register(registerData);

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Đăng ký
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Tạo tài khoản để sử dụng UniGuide
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-96 overflow-y-auto"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
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

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
              fieldErrors.fullname
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
            }`}
            placeholder="Nguyễn Văn A"
            required
            disabled={isLoading}
            autoComplete="name"
          />
          {fieldErrors.fullname && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.fullname}
            </p>
          )}
        </div>

        {/* Grade and City - Side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Lớp <span className="text-red-500">*</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
                fieldErrors.grade
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
              }`}
              required
              disabled={isLoading}
            >
              <option value="">Chọn lớp</option>
              <option value="10">Lớp 10</option>
              <option value="11">Lớp 11</option>
              <option value="12">Lớp 12</option>
            </select>
            {fieldErrors.grade && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.grade}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tỉnh/Thành <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
                fieldErrors.city
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
              }`}
              required
              disabled={isLoading}
            >
              <option value="">Chọn tỉnh/thành</option>
              {vietnamCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {fieldErrors.city && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.city}
              </p>
            )}
          </div>
        </div>

        {/* School Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tên trường (tùy chọn)
          </label>
          <input
            type="text"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="THPT ABC"
            disabled={isLoading}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Số điện thoại (tùy chọn)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
              fieldErrors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
            }`}
            placeholder="0123456789"
            disabled={isLoading}
            autoComplete="tel"
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
              }`}
              placeholder="Ít nhất 6 ký tự"
              required
              disabled={isLoading}
              autoComplete="new-password"
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

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score <= 1
                        ? "bg-red-500"
                        : passwordStrength.score <= 2
                          ? "bg-yellow-500"
                          : passwordStrength.score <= 3
                            ? "bg-blue-500"
                            : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <span
                  className={`text-xs font-medium ${
                    passwordStrength.score <= 1
                      ? "text-red-500"
                      : passwordStrength.score <= 2
                        ? "text-yellow-500"
                        : passwordStrength.score <= 3
                          ? "text-blue-500"
                          : "text-green-500"
                  }`}
                >
                  {passwordStrength.level}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {passwordStrength.feedback}
              </p>
            </div>
          )}

          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-3 py-2 pr-10 text-black outline-none transition focus:ring-1 dark:bg-gray-800 dark:text-white ${
                fieldErrors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 bg-white focus:border-primary focus:ring-primary dark:border-gray-600"
              }`}
              placeholder="Nhập lại mật khẩu"
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
            disabled={isLoading}
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Tôi đồng ý với{" "}
            <button
              type="button"
              className="text-primary hover:text-primary-dark underline"
            >
              Điều khoản sử dụng
            </button>{" "}
            và{" "}
            <button
              type="button"
              className="text-primary hover:text-primary-dark underline"
            >
              Chính sách bảo mật
            </button>{" "}
            của UniGuide <span className="text-red-500">*</span>
          </label>
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
              <span className="ml-2">Đang đăng ký...</span>
            </div>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{" "}
        </span>
        <button
          onClick={onSwitchToLogin}
          className="font-medium text-primary hover:text-primary-dark"
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
