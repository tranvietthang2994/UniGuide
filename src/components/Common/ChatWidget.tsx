"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

type Msg = { role: "user" | "assistant"; content: string };

const ChatWidget: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Chào bạn! Mình là trợ lý tư vấn tuyển sinh UniGuide. Bạn đang quan tâm ngành hoặc trường nào?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const studentProfile = useMemo(
    () => ({ grade: user?.grade, city: user?.city }),
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
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="open chat"
        className="fixed bottom-6 right-6 z-[9998] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark"
      >
        {open ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[9999] w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-stroke bg-white shadow-2xl dark:border-stroke-dark dark:bg-gray-800">
          <div className="flex items-center justify-between border-b border-stroke px-4 py-3 dark:border-stroke-dark">
            <div className="text-sm font-semibold text-black dark:text-white">
              Trợ lý tuyển sinh
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div
            ref={listRef}
            className="max-h-[55vh] overflow-y-auto p-3 space-y-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={`inline-block rounded-2xl px-3 py-2 text-xs ${
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
                <div className="inline-block rounded-2xl bg-gray-100 px-3 py-2 text-xs text-black dark:bg-gray-700 dark:text-white">
                  Đang soạn câu trả lời...
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-stroke p-2 dark:border-stroke-dark">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Hỏi về ngành/trường, điểm, học phí..."
              className="flex-1 rounded-lg border border-stroke px-3 py-2 text-xs text-black outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={send}
              disabled={loading}
              className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-dark disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

