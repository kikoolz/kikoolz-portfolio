import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { date, role, location, description, type, isActive } = body;

    const timelineItem = await prisma.timelineItem.update({
      where: { id },
      data: {
        ...(date && { date }),
        ...(role && { role }),
        ...(location && { location }),
        ...(description && { description }),
        ...(type && { type }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(timelineItem);
  } catch (error) {
    console.error("PUT TIMELINE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update timeline item" },
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

    await prisma.timelineItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE TIMELINE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete timeline item" },
      { status: 500 }
    );
  }
}
