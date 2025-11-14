import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  person_profiles: "identified_only",
  // Add these cookie configuration options:
  persistence: "localStorage+cookie", // Use localStorage as fallback
  cross_subdomain_cookie: false,
  secure_cookie: false, // Set to false for localhost
});
