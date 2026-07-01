import Link from "next/link";
import React from "react";
import { Card } from "../../components/articles/ArticleCard";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";


export const dynamic = "force-dynamic";



interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  heroImage?: string;
  excerpt?: string;
  coverImage?: string;
  createdAt?: string;
}


async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Define a minimal type that matches the fields you select
    type DbPost = {
      title: string;
      slug: string;
      excerpt: string | null;
      coverImage?: string | null;
      createdAt: Date;
      status: string;
    };

    const posts: DbPost[] = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        createdAt: true,
        status: true,
      },
    });

    return posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.excerpt || '',
      excerpt: post.excerpt || '',
      date: post.createdAt.toISOString(),
      published: post.status === 'PUBLISHED',
      heroImage: post.coverImage || '',
      coverImage: post.coverImage || undefined,
      createdAt: post.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}


export default async function BlogsPage() {
  const allBlogs = await getAllBlogPosts();

  // If no published posts, show a message
  if (allBlogs.length === 0) {
    return (
      <div className="relative pb-16">
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="mx-auto max-w-[90rem] lg:max-w-4xl px-4 lg:px-6">
            <header className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                Blogs
              </h1>
            </header>
          </div>

          <div className="w-full h-px bg-zinc-300 dark:bg-zinc-800" />

          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              No Published Posts Yet
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Check back soon for new blog posts, or contact me if you'd like to
              see specific content.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const redis = Redis.fromEnv();

  let views: Record<string, number> = {};

  if (allBlogs.length > 0) {
    const viewKeys = allBlogs.map((p: BlogPost) =>
      ["pageviews", "blogs", p.slug].join(":"),
    );
    const viewValues = await redis.mget<number[]>(...viewKeys);
    views = viewValues.reduce(
      (acc, v, i) => {
        acc[allBlogs[i].slug] = v ?? 0;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  // Get top 3 posts by views for featured section
  const topPostsByViews = allBlogs
    .filter((blog: BlogPost) => blog.published)
    .sort(
      (a: BlogPost, b: BlogPost) => (views[b.slug] ?? 0) - (views[a.slug] ?? 0),
    )
    .slice(0, 3);

  const [mainFeatured, secondFeatured, thirdFeatured] = topPostsByViews;

  const featuredSlugs = topPostsByViews.map((post: BlogPost) => post.slug);

  const sorted = allBlogs
    .filter((p: BlogPost) => p.published)
    .filter((blog: BlogPost) => !featuredSlugs.includes(blog.slug))
    .sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="pb-4">
      <div className="mx-auto max-w-[90rem] lg:max-w-4xl mb-8 px-4 lg:px-6">
        <header className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-0">
            Blogs
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Explore my thoughts on design, development, and technology
          </p>
        </header>
      </div>

      <div className="pt-10 mx-auto space-y-8 max-w-[1440px] lg:px-2 md:space-y-16 md:pt-18 lg:pt-4">
        {/* Featured Posts Grid - 50% left, 25% top right, 25% bottom right */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Main Featured Post - 50% width on left */}
          {mainFeatured ? (
            <Card className="lg:col-span-1">
              <Link href={`/blog/${mainFeatured.slug}`}>
                <article className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="text-xs text-zinc-900 dark:text-zinc-100">
                      {mainFeatured.date ? (
                        <time
                          dateTime={new Date(mainFeatured.date).toISOString()}
                        >
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(mainFeatured.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(views[mainFeatured.slug] ?? 0)}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h2
                      id="featured-post"
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white font-display line-clamp-3 leading-tight"
                    >
                      {mainFeatured.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 line-clamp-4">
                      {mainFeatured.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-300 dark:border-zinc-700/30">
                    <p className="text-sm text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          ) : (
            <Card className="lg:col-span-1">
              <div className="relative w-full h-full p-6 md:p-8">
                <h2 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                  Featured Post Coming Soon
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-700 dark:text-zinc-400">
                  Check back later for our featured blog post.
                </p>
              </div>
            </Card>
          )}

          {/* Right Column - Two posts stacked (25% each) */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Second Featured Post - Top Right */}
            {secondFeatured && (
              <Card className="flex-1">
                <Article
                  blog={secondFeatured}
                  views={views[secondFeatured.slug] ?? 0}
                />
              </Card>
            )}

            {/* Third Featured Post - Bottom Right */}
            {thirdFeatured && (
              <Card className="flex-1">
                <Article
                  blog={thirdFeatured}
                  views={views[thirdFeatured.slug] ?? 0}
                />
              </Card>
            )}

            {/* Fallback if fewer than 3 posts */}
            {!secondFeatured && !thirdFeatured && (
              <Card className="flex-1">
                <div className="relative w-full h-full p-6 md:p-8">
                  <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    More Posts Coming Soon
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-700 dark:text-zinc-400">
                    Check back later for more featured content.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
        <div className="hidden max-w-2xl mx-auto h-px md:block bg-zinc-300 dark:bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_: BlogPost, i: number) => i % 3 === 0)
              .map((blog: BlogPost) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_: BlogPost, i: number) => i % 3 === 1)
              .map((blog: BlogPost) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_: BlogPost, i: number) => i % 3 === 2)
              .map((blog: BlogPost) => (
                <Card key={blog.slug}>
                  <Article blog={blog} views={views[blog.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
