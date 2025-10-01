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

        console.log("🔍 Tracking visit:", {
          path,
          referrer,
          timestamp: new Date().toISOString(),
        });

        // Simple tracking without external API dependencies
        const response = await fetch("/api/analytics/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path,
            referrer,
            // Let server handle IP and geo detection
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("❌ Analytics tracking failed:", errorData);
        } else {
          console.log("✅ Analytics tracking successful");
        }
      } catch (error) {
        console.error("❌ Analytics tracking error:", error);
      }
    };

    // Add a small delay to ensure page is fully loaded
    const timeoutId = setTimeout(track, 100);
    return () => clearTimeout(timeoutId);
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
