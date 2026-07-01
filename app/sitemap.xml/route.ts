import { NextResponse } from "next/server";
import { getAllPosts } from "../../lib/blog";

// Define the shape of each post used in the sitemap
interface SitemapPost {
  slug: string;
  updatedAt?: string | null;
  date?: string | null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const site = `${url.protocol}//${url.host}`;

  const staticPages = ["", "/about", "/blog"];

  const posts = (await getAllPosts()) as SitemapPost[];

  const urls = [
    ...staticPages.map(
      (path) => `<url><loc>${site}${path || "/"}</loc></url>`,
    ),
    ...posts.map(
      (post: SitemapPost) =>
        `<url><loc>${site}/blog/${post.slug}/</loc><lastmod>${new Date(
          post.updatedAt || post.date || '',
        ).toISOString()}</lastmod></url>`,
    ),
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

