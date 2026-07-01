import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await getProject(id);

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
          <ProjectForm initialData={project} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Error</h1>
        <p>Failed to load project. Please try again.</p>
      </div>
    );
  }
}
