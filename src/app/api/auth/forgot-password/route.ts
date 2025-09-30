import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateEmail } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email là bắt buộc" }, { status: 400 });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullname: true,
      },
    });

    // Always return success to prevent email enumeration
    // But only send email if user actually exists
    if (user) {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Save reset token to database
      // TODO: Uncomment after running prisma migration
      // await prisma.user.update({
      //   where: { id: user.id },
      //   data: {
      //     resetToken,
      //     resetTokenExpiry,
      //   },
      // });

      // In a real application, you would send an email here
      // For now, we'll just log it (remove in production)
      console.log(`Reset token for ${email}: ${resetToken}`);
      console.log(
        `Reset link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
      );

      // TODO: Implement email sending
      // await sendPasswordResetEmail(user.email, user.fullname, resetToken);
    }

    return NextResponse.json(
      {
        message:
          "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra email của bạn.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
