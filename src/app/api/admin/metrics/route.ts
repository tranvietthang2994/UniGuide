import { NextResponse } from "next/server";
import supabase from "../../../../../services/supabase";

export async function GET(_request: Request) {
  try {
    // Counts
    const [uniCountRes, userCountRes, reviewCountRes, consultCountRes] =
      await Promise.all([
        supabase.from("university").select("*", { count: "exact", head: true }),
        supabase.from("user").select("*", { count: "exact", head: true }),
        supabase.from("review").select("*", { count: "exact", head: true }),
        supabase
          .from("consult_info")
          .select("*", { count: "exact", head: true }),
      ]);

    const totals = {
      universities: uniCountRes.count || 0,
      users: userCountRes.count || 0,
      reviews: reviewCountRes.count || 0,
      interests: consultCountRes.count || 0,
    };

    // Traffic: last 30 days visits (if analytics_visit exists)
    let trafficDaily: Array<{ date: string; visits: number }> = [];
    let topRegions: Array<{ region: string; visits: number }> = [];
    let topPaths: Array<{ path: string; visits: number }> = [];

    try {
      const since = new Date();
      since.setDate(since.getDate() - 29);

      console.log("📊 Fetching analytics data since:", since.toISOString());

      const { data: visits, error: visitErr } = await supabase
        .from("analytics_visit")
        .select("created_at, region, city, country, path")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: false });

      console.log("📊 Analytics query result:", {
        visitsCount: visits?.length || 0,
        error: visitErr,
        latestVisit: visits?.[0]?.created_at,
      });

      if (!visitErr && visits) {
        // Group by date
        const mapDaily = new Map<string, number>();
        for (let i = 0; i < 30; i++) {
          const d = new Date(since);
          d.setDate(since.getDate() + i);
          const key = d.toISOString().slice(0, 10);
          mapDaily.set(key, 0);
        }
        for (const v of visits) {
          const key = new Date(v.created_at).toISOString().slice(0, 10);
          mapDaily.set(key, (mapDaily.get(key) || 0) + 1);
        }
        trafficDaily = Array.from(mapDaily.entries())
          .map(([date, visits]) => ({ date, visits }))
          .sort((a, b) => a.date.localeCompare(b.date));

        console.log("📊 Traffic daily data:", trafficDaily.slice(-5)); // Show last 5 days

        // Top regions: prefer region, then city, then country
        const regionMap = new Map<string, number>();
        for (const v of visits) {
          const label =
            v.region && v.region.trim()
              ? v.region
              : v.city && v.city.trim()
                ? v.city
                : v.country && v.country.trim()
                  ? v.country
                  : "Unknown";
          regionMap.set(label, (regionMap.get(label) || 0) + 1);
        }
        topRegions = Array.from(regionMap.entries())
          .map(([region, visits]) => ({ region, visits }))
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 8);

        // Top paths
        const pathMap = new Map<string, number>();
        for (const v of visits) {
          const p = v.path || "/";
          pathMap.set(p, (pathMap.get(p) || 0) + 1);
        }
        topPaths = Array.from(pathMap.entries())
          .map(([path, visits]) => ({ path, visits }))
          .sort((a, b) => b.visits - a.visits)
          .slice(0, 10);
      }
    } catch {
      // analytics tables may not exist yet – return empty analytics gracefully
    }

    const result = {
      success: true,
      totals,
      trafficDaily,
      topRegions,
      topPaths,
    };

    console.log("📊 Metrics API response:", {
      totalsCount: Object.values(totals).reduce((a, b) => a + b, 0),
      trafficDays: trafficDaily.length,
      topRegionsCount: topRegions.length,
      topPathsCount: topPaths.length,
      latestTraffic: trafficDaily[trafficDaily.length - 1],
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("/api/admin/metrics error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
