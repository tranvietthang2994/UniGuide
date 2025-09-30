import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    // Validate required fields
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token và mật khẩu là bắt buộc" },
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

    // TODO: Uncomment after running prisma migration
    // Find user with valid reset token
    // const user = await prisma.user.findFirst({
    //   where: {
    //     resetToken: token,
    //     resetTokenExpiry: {
    //       gt: new Date(), // Token must not be expired
    //     },
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     fullname: true,
    //   },
    // });

    // Temporary: Return error since reset token fields are not migrated yet
    return NextResponse.json(
      {
        error:
          "Tính năng reset password chưa được kích hoạt. Vui lòng liên hệ admin.",
      },
      { status: 400 }
    );

    // if (!user) {
    //   return NextResponse.json(
    //     { error: "Token không hợp lệ hoặc đã hết hạn" },
    //     { status: 400 }
    //   );
    // }

    // // Hash new password
    // const hashedPassword = await hashPassword(password);

    // // Update user password and clear reset token
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     passwordHash: hashedPassword,
    //     resetToken: null,
    //     resetTokenExpiry: null,
    //     updatedAt: new Date(),
    //   },
    // });

    return NextResponse.json(
      {
        message:
          "Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập với mật khẩu mới.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
