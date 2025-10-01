import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/services/supabase-admin";
import { verifyPassword, generateToken, validateEmail } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Find user by email
    const { data: user, error: findError } = await supabase
      .from("user")
      .select(
        "id, email, password_hash, fullname, grade, city, school_name, phone, created_at"
      )
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không chính xác" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không chính xác" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
    });

    // Transform user data to match frontend interface
    const userData = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      grade: user.grade,
      city: user.city,
      schoolName: user.school_name,
      phone: user.phone,
      createdAt: user.created_at,
    };

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Đăng nhập thành công",
        user: userData,
        token,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
