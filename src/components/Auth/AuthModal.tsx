"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultView = "login",
}) => {
  const [currentView, setCurrentView] = useState<
    "login" | "register" | "forgot-password"
  >(defaultView);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const switchToLogin = () => setCurrentView("login");
  const switchToRegister = () => setCurrentView("register");
  const switchToForgotPassword = () => setCurrentView("forgot-password");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-dark"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Tab Navigation - Hide for forgot password */}
            {currentView !== "forgot-password" && (
              <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={switchToLogin}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    currentView === "login"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={switchToRegister}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    currentView === "register"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {currentView === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoginForm
                    onSuccess={onClose}
                    onSwitchToRegister={switchToRegister}
                    onSwitchToForgotPassword={switchToForgotPassword}
                  />
                </motion.div>
              ) : currentView === "register" ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <RegisterForm
                    onSuccess={onClose}
                    onSwitchToLogin={switchToLogin}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="forgot-password"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ForgotPasswordForm onBackToLogin={switchToLogin} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
