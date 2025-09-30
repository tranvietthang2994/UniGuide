"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div className="flex items-start justify-between py-2">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="ml-4 text-sm font-medium text-black dark:text-white">
      {value ?? "—"}
    </span>
  </div>
);

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-dark"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Thông tin cá nhân
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Xem nhanh thông tin tài khoản của bạn
              </p>
            </div>

            <div className="divide-y divide-stroke dark:divide-stroke-dark">
              <Row label="Họ và tên" value={user?.fullname} />
              <Row label="Email" value={user?.email} />
              <Row label="Lớp" value={user?.grade} />
              <Row label="Tỉnh/Thành" value={user?.city} />
              <Row label="Trường" value={user?.schoolName} />
              <Row label="Số điện thoại" value={user?.phone} />
              <Row label="Ngày tạo" value={user?.createdAt} />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;

