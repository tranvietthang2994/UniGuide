import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || "uniguide-jwt-secret-key";

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// JWT utilities
export interface JWTPayload {
  userId: number;
  email: string;
  fullname: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

// Get user from request
export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token =
    request.cookies.get("auth-token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) return null;

  return verifyToken(token);
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Mật khẩu phải có ít nhất 6 ký tự");
  }
  if (password.length > 50) {
    errors.push("Mật khẩu không được quá 50 ký tự");
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 chữ cái");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 chữ số");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateFullname(fullname: string): boolean {
  return fullname.length >= 2 && fullname.length <= 50;
}

export function validateGrade(grade: number): boolean {
  return grade >= 10 && grade <= 12;
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}
