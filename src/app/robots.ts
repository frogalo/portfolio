import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://jakuburbanski.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/protected/", "/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
