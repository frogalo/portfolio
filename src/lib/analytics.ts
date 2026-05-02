"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function postAnalyticsEvent(url: string, payload: Record<string, string>) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon(url, blob);

    if (queued) {
      return;
    }
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    cache: "no-store",
  }).catch(() => {
    // Silently fail; analytics should never break the user experience.
  });
}

export function usePageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    postAnalyticsEvent("/api/analytics/pageview", { path: pathname });
  }, [pathname]);
}

export function trackContentClick(
  contentType: "project" | "experience" | "education",
  contentId: string,
  contentName: string
) {
  postAnalyticsEvent("/api/analytics/click", {
    contentType,
    contentId,
    contentName,
  });
}
