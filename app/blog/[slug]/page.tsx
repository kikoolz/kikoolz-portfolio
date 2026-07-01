import { notFound } from "next/navigation";
import Head from "next/head";
import Image from "../../../components/Image";
import FormattedDate from "../../../components/FormattedDate";
import { buildBaseMetadata } from "../../../components/BaseHead";
import { SITE_TITLE } from "../../../consts";
import { Header } from "./header";
import { ReportView } from "./view";
import { BlogAnalyticsTracker } from "./analytics";
import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/prisma";
import { MarkdownRenderer } from "../../../components/blog/MarkdownRenderer";

export const dynamic = "force-dynamic";

type Params = Promise<{
  slug: string;
}>;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Legacy fields for Header component compatibility (exact match with header.tsx)
  description: string;
  date: string;
  published: boolean;
  heroImage?: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post || post.status !== "PUBLISHED") {
      return null;
    }

    // Transform database post to match BlogPost interface
    const transformedPost: BlogPost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImage: post.coverImage,
      status: post.status,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      // Legacy fields for Header component compatibility
      description: post.excerpt || "",
      date: post.createdAt.toISOString(),
      published: post.status === "PUBLISHED",
      heroImage: post.coverImage || undefined, // Map coverImage to heroImage for Header component
    };

    return transformedPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const posts: { slug: string }[] = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });

    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;

  return buildBaseMetadata({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage || undefined,
    url,
    siteTitle: SITE_TITLE,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const redis = Redis.fromEnv();
  const views =
    (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.css"
        />
      </Head>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-0 mb-40">
        <Header blog={post} views={views} />
        <ReportView slug={post.slug} />
        <BlogAnalyticsTracker slug={post.slug} title={post.title} />

        <article>
          {post.coverImage && (
            <div className="mb-10">
              <Image
                imgUrl={post.coverImage}
                alt={post.title}
                className="object-cover w-full rounded-lg"
              />
            </div>
          )}
          <header className="flex flex-col gap-y-4 mb-6">
            <h1 className="text-balance text-3xl sm:text-4xl">{post.title}</h1>
            <div className="order-first text-sm font-mono inline-flex mx-auto text-stone-400">
              <FormattedDate date={post.createdAt} />
            </div>
          </header>
          <div
            className="
    prose 
    dark:prose-invert 
    prose-neutral
    max-w-none

    prose-headings:font-semibold
    prose-headings:tracking-tight

    prose-h1:text-4xl
    prose-h2:text-2xl
    prose-h3:text-xl

    prose-p:text-zinc-700 dark:prose-p:text-zinc-300
    prose-p:leading-relaxed

    prose-a:text-blue-600 dark:prose-a:text-blue-400
    prose-a:no-underline hover:prose-a:underline

    prose-strong:text-zinc-900 dark:prose-strong:text-white

    prose-blockquote:border-l-4
    prose-blockquote:border-zinc-300
    dark:prose-blockquote:border-zinc-700
    prose-blockquote:pl-4
    prose-blockquote:text-zinc-600
    dark:prose-blockquote:text-zinc-400

    prose-code:text-sm
    prose-code:bg-zinc-100
    dark:prose-code:bg-zinc-800
    prose-code:px-1 prose-code:py-0.5
    prose-code:rounded

    prose-pre:bg-zinc-950
    prose-pre:border
    prose-pre:border-zinc-800
    prose-pre:shadow-lg
  "
          >
            <div className="animate-in fade-in duration-500">
              <MarkdownRenderer content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
