import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.newsletterCampaign.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("GET NEWSLETTER CAMPAIGNS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, subject, content, scheduledFor, isActive } = await request.json();

    if (!title || !subject || !content) {
      return NextResponse.json(
        { error: "Title, subject, and content are required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.newsletterCampaign.create({
      data: {
        title,
        subject,
        content,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("POST NEWSLETTER CAMPAIGN ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create newsletter campaign" },
      { status: 500 }
    );
  }
}
