import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, subject, content, scheduledFor, isActive } = await request.json();

    const campaign = await prisma.newsletterCampaign.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(subject && { subject }),
        ...(content && { content }),
        ...(scheduledFor !== undefined && { scheduledFor: scheduledFor ? new Date(scheduledFor) : null }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("PUT NEWSLETTER CAMPAIGN ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update newsletter campaign" },
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

    await prisma.newsletterCampaign.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE NEWSLETTER CAMPAIGN ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter campaign" },
      { status: 500 }
    );
  }
}
