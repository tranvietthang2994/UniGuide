import { NextResponse } from "next/server";
import supabase from "../../../../../services/supabase";

export async function GET(request: Request, context: any) {
  try {
    const { id } = context.params as { id: string };

    if (!id) {
      return NextResponse.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    // Get university with all related data
    const { data: university, error } = await supabase
      .from("university")
      .select(
        `
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
        created_at,
        university_training_level(training_level),
        partner_company(company_name),
        internship_program(program_name),
        major(
          id,
          name,
          faculty,
          admission_score(
            id,
            admission_block,
            year,
            score,
            quota
          )
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "University not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch university" },
        { status: 500 }
      );
    }

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 }
      );
    }

    // Get reviews separately for better performance
    const { data: reviews, error: reviewsError } = await supabase
      .from("review")
      .select(
        `
        id,
        rating,
        comment,
        created_at,
        user(fullname)
      `
      )
      .eq("university_id", id)
      .order("created_at", { ascending: false });

    if (reviewsError) {
      console.error("Reviews error:", reviewsError);
    }

    // Transform data to match frontend interface
    const transformedData = {
      id: university.id,
      name: university.name,
      abbreviation:
        university.short_name ||
        university.name
          .split(" ")
          .map((w: string) => w[0])
          .join(""),
      logo: university.logo_url || "/images/logo/default-university.png",
      banner: university.banner_url || "/images/banner/default-university.jpg",
      type: getTypeText(university.university_type),
      foundedYear: university.founded_year,
      address: university.address,
      website: university.website,
      hotline: university.hotline,
      overview: university.overview,
      location: {
        latitude: university.location_latitude,
        longitude: university.location_longitude,
      },
      training: {
        levels:
          university.university_training_level?.map((tl: any) =>
            getTrainingLevelText(tl.training_level)
          ) || [],
        majors:
          university.major?.map((m: any) => ({
            id: m.id,
            name: m.name,
            faculty: m.faculty || "N/A",
            admissionScores:
              m.admission_score?.map((as: any) => ({
                year: as.year,
                major: m.name,
                score: as.score,
                block: as.admission_block,
                quota: as.quota,
              })) || [],
          })) || [],
        tuitionFee: university.tuition_fee || "N/A",
        // Flatten admission scores for chart
        admissionScores:
          university.major?.flatMap(
            (m: any) =>
              m.admission_score?.map((as: any) => ({
                year: as.year,
                major: m.name,
                score: as.score,
                block: as.admission_block,
                quota: as.quota,
              })) || []
          ) || [],
      },
      ranking: {
        domestic: university.domestic_ranking || "N/A",
        international: university.international_ranking || "N/A",
        employmentRate: university.employment_rate || "N/A",
      },
      facilities: {
        dormitory: university.dormitory_info || "N/A",
        library: university.library_info || "N/A",
        labs: university.lab_info || "N/A",
        clubs: [], // This would need to be added to database schema if needed
      },
      partnerships: {
        companies:
          university.partner_company?.map((pc: any) => pc.company_name) || [],
        internshipPrograms:
          university.internship_program?.map((ip: any) => ip.program_name) ||
          [],
      },
      reviews:
        reviews?.map((r: any) => ({
          id: r.id,
          user: r.user?.fullname || "Anonymous",
          rating: r.rating,
          comment: r.comment,
          createdAt: r.created_at,
        })) || [],
      averageRating: (() => {
        const safeReviews = reviews || [];
        return safeReviews.length > 0
          ? safeReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
              safeReviews.length
          : 0;
      })(),
      totalReviews: reviews?.length || 0,
    };

    return NextResponse.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("University detail API error:", error);
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
