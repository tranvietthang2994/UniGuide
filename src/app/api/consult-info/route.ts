import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../services/supabase";
import { getUserFromRequest } from "@/lib/auth";

// GET: check if current user is interested in a university (query: universityId)
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const universityId = parseInt(searchParams.get("universityId") || "0");
    if (!universityId) {
      return NextResponse.json(
        { error: "universityId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("consult_info")
      .select("id")
      .eq("university_id", universityId)
      .eq("user_id", user.userId)
      .maybeSingle();

    if (error) {
      console.error("consult_info GET error:", error);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }

    return NextResponse.json({ interested: !!data });
  } catch (e) {
    console.error("consult_info GET exception:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: add interest (body: { universityId:number })
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const universityId = parseInt(body?.universityId);
    if (!universityId) {
      return NextResponse.json(
        { error: "universityId is required" },
        { status: 400 }
      );
    }

    // Check existing
    const { data: existing, error: existsError } = await supabase
      .from("consult_info")
      .select("id")
      .eq("university_id", universityId)
      .eq("user_id", user.userId)
      .maybeSingle();

    if (existsError) {
      console.error("consult_info exists error:", existsError);
      return NextResponse.json(
        { error: "Failed to check existing" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json({ success: true, already: true });
    }

    const { error: insertError } = await supabase.from("consult_info").insert([
      {
        university_id: universityId,
        user_id: user.userId,
      },
    ]);

    if (insertError) {
      console.error("consult_info insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save interest" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("consult_info POST exception:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

