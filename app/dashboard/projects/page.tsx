"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

async function getProjects() {
  const res = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });
  return res.json();
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsResponse = await getProjects();
        const projects = Array.isArray(projectsResponse) ? projectsResponse : [];
        setProjects(projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const deleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        // Refresh projects list
        const projectsResponse = await getProjects();
        const projects = Array.isArray(projectsResponse) ? projectsResponse : [];
        setProjects(projects);
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-lg">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          New Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-gray-500 mb-4">No projects yet</div>
            <Link
              href="/dashboard/projects/new"
              className="inline-block bg-black text-white px-4 py-2 rounded-lg"
            >
              Create Your First Project
            </Link>
          </div>
        ) : (
          projects.map((project: any) => (
            <div
              key={project.id}
              className="border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl hover:shadow-md transition flex justify-between items-center"
            >
              <div className="flex gap-4">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-lg">{project.title}</h2>
                  <p className="text-sm text-gray-500">{project.slug}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Live →
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/projects/edit/${project.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
