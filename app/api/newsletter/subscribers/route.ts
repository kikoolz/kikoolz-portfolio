import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("GET NEWSLETTER SUBSCRIBERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        isActive: true,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("POST NEWSLETTER SUBSCRIBER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create newsletter subscriber" },
      { status: 500 }
    );
  }
}
