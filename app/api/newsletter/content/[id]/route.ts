import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, content, isActive } = await request.json();

    const updatedContent = await prisma.newsletterContent.update({
      where: { id },
      data: {
        title,
        content,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error("UPDATE NEWSLETTER CONTENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update newsletter content" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.newsletterContent.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE NEWSLETTER CONTENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter content" },
      { status: 500 }
    );
  }
}
