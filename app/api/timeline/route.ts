import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const timelineItems = await prisma.timelineItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(timelineItems);
  } catch (error) {
    console.error("GET TIMELINE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, role, location, description, type } = body;

    if (!date || !role || !location || !description || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const timelineItem = await prisma.timelineItem.create({
      data: {
        date,
        role,
        location,
        description,
        type: type || 'work',
        isActive: true,
      },
    });

    return NextResponse.json(timelineItem);
  } catch (error) {
    console.error("POST TIMELINE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create timeline item" },
      { status: 500 }
    );
  }
}
