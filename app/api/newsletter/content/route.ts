import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const content = await prisma.newsletterContent.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET NEWSLETTER CONTENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, isActive } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newsletterContent = await prisma.newsletterContent.create({
      data: {
        title,
        content,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(newsletterContent);
  } catch (error) {
    console.error("POST NEWSLETTER CONTENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create newsletter content" },
      { status: 500 }
    );
  }
}
