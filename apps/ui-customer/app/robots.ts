import type { MetadataRoute } from "next";
import { getSiteUrl } from "./_lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/catalog", "/products", "/blog", "/about", "/faq", "/contact"],
        disallow: [
          "/account",
          "/cart",
          "/checkout",
          "/orders",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/api/",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
