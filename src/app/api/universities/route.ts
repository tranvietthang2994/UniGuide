import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../services/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || ""; // 1=Public, 2=Private, 3=International
    const region = searchParams.get("region") || ""; // 1=North, 2=Central, 3=South
    const sortBy = searchParams.get("sortBy") || "name"; // name, rating, founded_year
    const sortOrder = searchParams.get("sortOrder") || "asc"; // asc, desc

    // Debug logging
    console.log("API Parameters:", {
      page,
      limit,
      search,
      type,
      region,
      sortBy,
      sortOrder,
    });

    const offset = (page - 1) * limit;

    // Build the query
    let query = supabase.from("university").select(`
        id,
        name,
        short_name,
        university_type,
        logo_url,
        banner_url,
        founded_year,
        address,
        website,
        hotline,
        overview,
        priority,
        region,
        rating,
        location_latitude,
        location_longitude,
        domestic_ranking,
        international_ranking,
        employment_rate,
        tuition_fee,
        dormitory_info,
        library_info,
        lab_info,
        university_training_level(training_level),
        partner_company(company_name),
        internship_program(program_name),
        major(id, name, faculty),
        review(rating)
      `);

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,short_name.ilike.%${search}%`);
    }

    // Apply type filter
    if (type) {
      query = query.eq("university_type", parseInt(type));
    }

    // Apply region filter
    if (region) {
      query = query.eq("region", parseInt(region));
    }

    // Apply sorting
    const ascending = sortOrder === "asc";
    query = query.order(sortBy, { ascending });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: universities, error } = await query;

    console.log("Query result:", {
      universitiesCount: universities?.length,
      error: error?.message,
      firstUniversity: universities?.[0],
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch universities" },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from("university")
      .select("*", { count: "exact", head: true });

    if (search) {
      countQuery = countQuery.or(
        `name.ilike.%${search}%,short_name.ilike.%${search}%`
      );
    }

    if (type) {
      countQuery = countQuery.eq("university_type", parseInt(type));
    }

    if (region) {
      countQuery = countQuery.eq("region", parseInt(region));
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error("Count error:", countError);
      return NextResponse.json(
        { error: "Failed to get total count" },
        { status: 500 }
      );
    }

    // Transform data to match frontend interface
    const transformedData = universities?.map((uni: any) => ({
      id: uni.id,
      name: uni.name,
      abbreviation:
        uni.short_name ||
        uni.name
          .split(" ")
          .map((w: string) => w[0])
          .join(""),
      logo: uni.logo_url || "/images/logo/default-university.png",
      banner: uni.banner_url || "/images/banner/default-university.jpg",
      type: getTypeText(uni.university_type),
      foundedYear: uni.founded_year,
      address: uni.address,
      website: uni.website,
      hotline: uni.hotline,
      overview: uni.overview,
      region: uni.region,
      rating: uni.rating || 0,
      location: {
        latitude: uni.location_latitude,
        longitude: uni.location_longitude,
      },
      ranking: {
        domestic: uni.domestic_ranking || "N/A",
        international: uni.international_ranking || "N/A",
        employmentRate: uni.employment_rate || "N/A",
      },
      training: {
        levels:
          uni.university_training_level?.map((tl: any) =>
            getTrainingLevelText(tl.training_level)
          ) || [],
        majors:
          uni.major?.map((m: any) => ({
            name: m.name,
            faculty: m.faculty || "N/A",
          })) || [],
        tuitionFee: uni.tuition_fee || "N/A",
      },
      facilities: {
        dormitory: uni.dormitory_info || "N/A",
        library: uni.library_info || "N/A",
        labs: uni.lab_info || "N/A",
      },
      partnerships: {
        companies: uni.partner_company?.map((pc: any) => pc.company_name) || [],
        internshipPrograms:
          uni.internship_program?.map((ip: any) => ip.program_name) || [],
      },
      reviews: uni.review || [],
      averageRating:
        uni.review?.length > 0
          ? uni.review.reduce((sum: number, r: any) => sum + r.rating, 0) /
            uni.review.length
          : 0,
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Universities API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper functions
function getTypeText(type: number): string {
  switch (type) {
    case 1:
      return "Công lập";
    case 2:
      return "Tư thục";
    case 3:
      return "Quốc tế";
    default:
      return "N/A";
  }
}

function getTrainingLevelText(level: number): string {
  switch (level) {
    case 1:
      return "Đại học";
    case 2:
      return "Sau đại học";
    case 3:
      return "Liên kết quốc tế";
    default:
      return "N/A";
  }
}
