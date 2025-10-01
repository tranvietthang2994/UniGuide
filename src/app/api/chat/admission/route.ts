import { NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const messages = (body?.messages || []) as ChatMessage[];
    const studentProfile = body?.studentProfile as
      | {
          grade?: number;
          city?: string;
          strengths?: string[];
          interests?: string[];
          score?: number;
        }
      | undefined;

    // Use Gemini (Google Generative AI)
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    if (!GOOGLE_API_KEY) {
      return NextResponse.json(
        {
          error:
            "GOOGLE_API_KEY is missing. Please add it to .env.local and restart the server.",
        },
        { status: 500 }
      );
    }

    // Build system prompt
    const systemPrompt = `Bạn là cố vấn tuyển sinh đại học cho học sinh THPT Việt Nam.
Bạn tư vấn ngành, trường, phương thức xét tuyển, học phí, cơ hội việc làm dựa trên sở thích, điểm mạnh và điểm dự kiến.
Quy tắc:
- Trả lời bằng tiếng Việt, rõ ràng, súc tích, có gạch đầu dòng.
- Nếu thiếu dữ liệu, hỏi lại tối đa 3 câu làm rõ.
- Khi đề xuất trường/ngành, nêu lý do ngắn gọn + mức điểm tham khảo (nếu biết).
- Không bịa số liệu. Nếu không chắc, ghi rõ "ước lượng" hoặc gợi ý cách tra cứu thêm trong UniGuide.
Quy tắc:
- Trả lời bằng tiếng Việt, rõ ràng, súc tích (2-3 câu).
- Không sử dụng Markdown, không dùng dấu *, không in đậm/in nghiêng.
- Khi cần liệt kê, chỉ dùng dấu "-" hoặc số.
- Khi cần hỏi nhiều câu, mỗi câu xuống dòng mới.
- Không viết liền nhiều câu trong một dòng.
`;

    const profileContext = studentProfile
      ? `Hồ sơ học sinh: lớp ${studentProfile.grade ?? "?"}, tỉnh ${
          studentProfile.city ?? "?"
        }.
Sở thích: ${(studentProfile.interests || []).join(", ") || "?"}.
Thế mạnh: ${(studentProfile.strengths || []).join(", ") || "?"}.
Điểm/điểm dự kiến: ${studentProfile.score ?? "?"}.`
      : undefined;

    // Convert chat history to a single prompt for Gemini
    const historyText = messages
      .map((m: ChatMessage) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const prompt = [systemPrompt, profileContext, historyText]
      .filter(Boolean)
      .join("\n\n");

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(GOOGLE_API_KEY),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: { temperature: 0.3 },
        }),
      }
    );

    if (!resp.ok) {
      const err = await resp.text();
      return NextResponse.json(
        { error: `Gemini error: ${err}` },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text)
        .join("\n") ||
      "";

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Chat admission error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
