import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/services/supabase-admin";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    // Get user from JWT token
    const tokenUser = getUserFromRequest(request as any);

    if (!tokenUser) {
      return NextResponse.json(
        { error: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 401 }
      );
    }

    // Get fresh user data from database
    const { data: user, error: findError } = await supabase
      .from("user")
      .select(
        "id, email, fullname, grade, city, school_name, phone, created_at, updated_at"
      )
      .eq("id", tokenUser.userId)
      .single();

    if (!user) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

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
      updatedAt: user.updated_at,
    };

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
