"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function getPosts() {
  const res = await fetch("/api/posts", {
    cache: "no-store",
  });
  return res.json();
}

async function getProjects() {
  const res = await fetch("/api/projects", {
    cache: "no-store",
  });
  return res.json();
}

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "posts" | "projects" | "timeline" | "newsletter"
  >("posts");

  const togglePostStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Refresh posts list
        const postsResponse = await getPosts();
        const posts = Array.isArray(postsResponse) ? postsResponse : [];
        setPosts(posts);
      } else {
        alert("Failed to update post status");
      }
    } catch (error) {
      alert("Failed to update post status");
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh posts list
        const postsResponse = await getPosts();
        const posts = Array.isArray(postsResponse) ? postsResponse : [];
        setPosts(posts);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh projects list
        const projectsResponse = await getProjects();
        const projects = Array.isArray(projectsResponse)
          ? projectsResponse
          : [];
        setProjects(projects);
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    // Check authentication on client side
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        // Load posts and projects
        const [postsResponse, projectsResponse] = await Promise.all([
          getPosts(),
          getProjects(),
        ]);

        const posts = Array.isArray(postsResponse) ? postsResponse : [];
        const projects = Array.isArray(projectsResponse)
          ? projectsResponse
          : [];

        setPosts(posts);
        setProjects(projects);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="p-10 max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-lg text-zinc-900 dark:text-zinc-100">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-zinc-200 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "posts"
              ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "projects"
              ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "timeline"
              ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab("newsletter")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "newsletter"
              ? "border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
              : "border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Newsletter
        </button>
      </div>

      {activeTab === "posts" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Posts
            </h1>
            <Link
              href="/dashboard/new"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              New Post
            </Link>
          </div>

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
                <div className="text-zinc-500 dark:text-zinc-400 mb-4">
                  No posts yet
                </div>
                <Link
                  href="/dashboard/new"
                  className="inline-block bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Create Your First Post
                </Link>
              </div>
            ) : (
              posts.map((post: any) => (
                <div
                  key={post.id}
                  className="border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl hover:shadow-md transition flex justify-between items-center"
                >
                  <div className="flex gap-4">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                        {post.title}
                      </h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {post.slug}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          post.status === "PUBLISHED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePostStatus(post.id, post.status)}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        post.status === "PUBLISHED"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                          : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                      }`}
                    >
                      {post.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                    </button>
                    <Link
                      href={`/dashboard/edit/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : activeTab === "projects" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Projects
            </h1>
            <Link
              href="/dashboard/projects/new"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              New Project
            </Link>
          </div>

          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
                <div className="text-zinc-500 dark:text-zinc-400 mb-4">
                  No projects yet
                </div>
                <Link
                  href="/dashboard/projects/new"
                  className="inline-block bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
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
                      <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {project.slug}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
                        >
                          View Live →
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/projects/edit/${project.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : activeTab === "timeline" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Timeline
            </h1>
            <Link
              href="/dashboard/timeline"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Manage Timeline
            </Link>
          </div>

          <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
            <div className="text-zinc-500 dark:text-zinc-400 mb-4">
              Timeline Management
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Manage your career timeline items
            </p>
            <Link
              href="/dashboard/timeline"
              className="inline-block bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Go to Timeline Management
            </Link>
          </div>
        </>
      ) : activeTab === "newsletter" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Newsletter
            </h1>
            <Link
              href="/dashboard/newsletter"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Manage Newsletter
            </Link>
          </div>

          <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
            <div className="text-zinc-500 dark:text-zinc-400 mb-4">
              Newsletter Management
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Manage newsletter subscribers and campaigns
            </p>
            <Link
              href="/dashboard/newsletter"
              className="inline-block bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Go to Newsletter Management
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
