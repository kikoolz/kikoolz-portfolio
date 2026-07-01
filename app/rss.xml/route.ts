import { NextResponse } from "next/server";
import { getAllPosts } from "../../lib/blog";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../consts";

// Define the shape of each post used in the RSS feed

interface RssPost {
  slug: string;
  title: string;
  description?: string | null;
  date?: string | null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const site = `${url.protocol}//${url.host}`;
  

  // Cast the result to the RssPost type so TypeScript can infer the fields

  const posts = (await getAllPosts()) as RssPost[];

  const items = posts

    .map((post) => {
      const link = `${site}/blog/${post.slug}/`;

      return `

  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${link}</link>
    <guid>${link}</guid>
    <description><![CDATA[${post.description ?? ""}]]></description>
    <pubDate>${new Date(post.date || "").toUTCString()}</pubDate>
  </item>`;
    })

    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${SITE_TITLE}]]></title>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <link>${site}</link>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
