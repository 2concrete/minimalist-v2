import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  cross_subdomain_cookie: true,
  persistence: "localStorage+cookie",
  capture_pageview: true, // Explicitly enable
});
