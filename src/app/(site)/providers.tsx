"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

function ProvidersInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const track = async () => {
      try {
        // Determine path via window when available
        const path =
          (typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : pathname +
              (searchParams?.toString() ? `?${searchParams}` : "")) || pathname;

        const referrer =
          typeof document !== "undefined" && document.referrer
            ? document.referrer
            : undefined;

        // Send a single visit; server will enrich geo via IP
        // Try to include client IP (no geo) to improve server resolution in some hosts
        // Try to include client IP and geo for local/dev fallback
        let clientIp: string | undefined = undefined;
        let geo: { country?: string; region?: string; city?: string } = {};
        try {
          const ipResp = await fetch("https://api.ipify.org?format=json");
          const ipJson = await ipResp.json();
          if (ipJson?.ip) clientIp = ipJson.ip;
        } catch {}
        try {
          const res = await fetch(
            "https://ipwho.is/?fields=ip,country,region,city"
          );
          const j = await res.json();
          if (j && j.success !== false) {
            geo = { country: j.country, region: j.region, city: j.city };
            if (!clientIp && j.ip) clientIp = j.ip;
          }
        } catch {}

        fetch("/api/analytics/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, referrer, ip: clientIp, ...geo }),
        }).catch(() => {});
      } catch {}
    };
    track();
  }, [pathname, searchParams]);

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProvidersInner>{children}</ProvidersInner>
    </Suspense>
  );
}
