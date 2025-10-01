import { NextResponse } from "next/server";
import supabase from "../../../../../services/supabase";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const path: string | undefined = body?.path;
    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    // Derive IP and UA - check multiple common headers, then fallback to body.ip
    const headers = request.headers;
    const hxff = headers.get("x-forwarded-for") || "";
    const candidates = [
      headers.get("x-client-ip"),
      headers.get("cf-connecting-ip"),
      hxff ? hxff.split(",")[0]?.trim() : undefined,
      headers.get("x-real-ip"),
      headers.get("fly-client-ip"),
      body?.ip,
    ].filter(Boolean) as string[];
    const ip = candidates.length > 0 ? candidates[0] : undefined;
    const userAgent = request.headers.get("user-agent") || undefined;

    // Prefer client-provided geo (useful in local/dev), else try server-side lookup
    let country: string | null = body?.country ?? null;
    let region: string | null = body?.region ?? null;
    let city: string | null = body?.city ?? null;
    if (!country && !region && !city) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1200);
        const qs = ip
          ? `?ip=${encodeURIComponent(ip)}&fields=ip,country,region,city`
          : `?fields=ip,country,region,city`;
        const geoResp = await fetch(`https://ipwho.is/${qs}`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (geoResp.ok) {
          const j: any = await geoResp.json();
          if (j && j.success !== false) {
            country = j.country || null;
            region = j.region || null;
            city = j.city || null;
          }
        }
      } catch {}
    }

    const { error } = await supabase.from("analytics_visit").insert([
      {
        user_id: null,
        ip: ip || null,
        user_agent: userAgent || null,
        path,
        referrer: body?.referrer || null,
        country,
        region,
        city,
      },
    ]);

    if (error) {
      console.error("analytics_visit insert error:", error);
      return NextResponse.json(
        { error: "Failed to record visit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("/api/analytics/visit error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
