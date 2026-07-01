import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export const runtime = "edge";

interface ViewIncrementRequest {
  slug: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate request body
    let body: ViewIncrementRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 }
      );
    }

    const { slug } = body;
    
    // Validate slug
    if (!slug || typeof slug !== "string" || !/^[a-zA-Z0-9-_]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Invalid slug" },
        { status: 400 }
      );
    }

    // Increment the view count for every request
    const viewKey = `pageviews:blogs:${slug}`;
    await redis.incr(viewKey);
    
    // Set expiry to prevent unlimited growth (optional)
    await redis.expire(viewKey, 365 * 24 * 60 * 60); // 1 year

    // Get updated count
    const newCount = await redis.get(viewKey);

    return NextResponse.json(
      { 
        message: "View counted successfully",
        slug,
        views: newCount
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in view increment API:", error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}