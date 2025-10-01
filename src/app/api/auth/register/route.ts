import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/services/supabase-admin";
import {
  hashPassword,
  generateToken,
  validateEmail,
  validatePassword,
  validateFullname,
  validateGrade,
  validatePhone,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { email, password, fullname, grade, city, schoolName, phone } = body;

    // Validate required fields
    if (!email || !password || !fullname || !grade || !city) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc" },
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

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(", ") },
        { status: 400 }
      );
    }

    // Validate fullname
    if (!validateFullname(fullname)) {
      return NextResponse.json(
        { error: "Tên phải có từ 2-50 ký tự" },
        { status: 400 }
      );
    }

    // Validate grade
    if (!validateGrade(grade)) {
      return NextResponse.json(
        { error: "Lớp phải là 10, 11 hoặc 12" },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const { data: user, error: createError } = await supabase
      .from("user")
      .insert({
        email,
        password_hash: hashedPassword,
        fullname,
        grade: parseInt(grade),
        city,
        school_name: schoolName || null,
        phone: phone || null,
      })
      .select(
        "id, email, fullname, grade, city, school_name, phone, created_at"
      )
      .single();

    if (createError) {
      console.error("User creation error:", createError);
      return NextResponse.json(
        { error: "Không thể tạo tài khoản. Vui lòng thử lại." },
        { status: 500 }
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
        message: "Đăng ký thành công",
        user: userData,
        token,
      },
      { status: 201 }
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
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
