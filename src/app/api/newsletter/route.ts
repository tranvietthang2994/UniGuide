import { NextResponse } from "next/server";
import supabase from "../../../../services/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingEmail, error: checkError } = await supabase
      .from("email_contact")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Email check error:", checkError);
      return NextResponse.json(
        { error: "Lỗi kiểm tra email" },
        { status: 500 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký trước đó" },
        { status: 409 }
      );
    }

    // Insert new email
    const { data: newContact, error: insertError } = await supabase
      .from("email_contact")
      .insert([{ email }])
      .select()
      .single();

    if (insertError) {
      console.error("Email insert error:", insertError);
      return NextResponse.json({ error: "Lỗi lưu email" }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm nhất có thể.",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
