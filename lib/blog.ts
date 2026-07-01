import { prisma } from "./prisma";

export async function getAllPosts() {
  try {
    // Define the minimal shape we need from Prisma
    type DbPost = {
      id: string;
      title: string;
      slug: string;
      excerpt: string | null;
      coverImage: string | null;
      createdAt: Date;
      updatedAt: Date;
    };

    // Select only the fields defined in DbPost
    const posts: DbPost[] = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Type-safe mapping: post is inferred as DbPost
    return posts.map((post) => ({
      ...post,
      description: post.excerpt || "",
      date: post.createdAt.toISOString(),
      published: true,
      heroImage: post.coverImage || undefined,
      updatedAt: post.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}