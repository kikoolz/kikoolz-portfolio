import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//////////////////////
// GET ALL PROJECTS
//////////////////////

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

//////////////////////
// CREATE PROJECT
//////////////////////

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      link,
      domain,
      image,
      year,
      isNew,
      isV2,
      isWIP,
      createdAt,
    } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        link,
        domain,
        image,
        year: year || null, // Keep as string for database
        isNew,
        isV2,
        isWIP,
        slug: title.toLowerCase().replace(/\s+/g, '-'), // Auto-generate slug
        createdAt: createdAt ? new Date(createdAt) : new Date(),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
