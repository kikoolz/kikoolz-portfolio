import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//////////////////////
// GET ALL POSTS
//////////////////////

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

//////////////////////
// CREATE POST
//////////////////////

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      status,
      createdAt,
    } = body;

    // Get current user from session (you'd implement this properly)
    // For now, use the admin user we created
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "No admin user found" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        status: status || "DRAFT",
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        author: {
          connect: { id: adminUser.id }
        }
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create post", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
