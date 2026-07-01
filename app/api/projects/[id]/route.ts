import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET (single project)
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...body,
        year: body.year ? body.year.toString() : null,
        ...(body.createdAt && { createdAt: new Date(body.createdAt) }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// PATCH (partial update)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...body,
        year: body.year || null, // Already a string, no conversion needed
        ...(body.createdAt && { createdAt: new Date(body.createdAt) }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("PATCH PROJECT ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
