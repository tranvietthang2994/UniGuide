"use client";

import React, { useMemo, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

type Msg = { role: "user" | "assistant"; content: string };

export default function AdmissionAssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Chào bạn! Mình là trợ lý tư vấn tuyển sinh UniGuide. Bạn hãy chia sẻ lớp hiện tại, sở thích, thế mạnh và mức điểm dự kiến để mình gợi ý ngành và trường phù hợp nhé.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const studentProfile = useMemo(
    () => ({
      grade: user?.grade,
      city: user?.city,
      strengths: undefined,
      interests: undefined,
      score: undefined,
    }),
    [user]
  );

  const send = async () => {
    const content = input.trim();
    if (!content || loading) return;
    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentProfile,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content },
          ],
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Xin lỗi, hiện không thể xử lý yêu cầu.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Kết nối gặp sự cố. Vui lòng thử lại." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(
        () => listRef.current?.scrollTo({ top: 999999, behavior: "smooth" }),
        50
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-dark">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Trợ lý tư vấn tuyển sinh
        </h1>
        <div className="rounded-xl border border-stroke bg-white dark:border-stroke-dark dark:bg-gray-800">
          <div
            ref={listRef}
            className="max-h-[60vh] overflow-y-auto p-4 space-y-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={`inline-block rounded-2xl px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block rounded-2xl bg-gray-100 px-4 py-2 text-sm text-black dark:bg-gray-700 dark:text-white">
                  Đang soạn câu trả lời...
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-stroke p-3 dark:border-stroke-dark">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Nhập câu hỏi (sở thích, điểm mạnh, mức điểm dự kiến...)"
              className="flex-1 rounded-lg border border-stroke px-3 py-2 text-black outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={send}
              disabled={loading}
              className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-4 w-4" /> Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

