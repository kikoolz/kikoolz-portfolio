"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../../uploadthing/core";
import MarkdownEditor from "@/components/editor/MarkdownEditor";

export default function PostForm({ initialData }: any) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");
  const [createdAt, setCreatedAt] = useState(
    initialData?.createdAt 
      ? new Date(initialData.createdAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [showPreview, setShowPreview] = useState(false);
  const isEditing = !!initialData;

  // Autosave draft
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("draft-post", content);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [content]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("draft-post");
    if (saved && !isEditing) {
      setContent(saved);
    }
  }, []);

  // Keyboard shortcut (Cmd+S to save)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "s") {
        e.preventDefault();
        handleSubmit(); // save post
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = async () => {
    const endpoint = isEditing ? `/api/posts/${initialData.id}` : "/api/posts";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt,
          coverImage,
          status,
          createdAt: new Date(createdAt).toISOString(),
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save post");
      }
    } catch (error) {
      alert("Failed to save post");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Slug */}
      <input
        type="text"
        placeholder="post-slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Cover Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Cover Image</label>
        
        <UploadButton<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            if (res?.[0]?.url) setCoverImage(res[0].url);
            else alert("Upload failed");
          }}
          onUploadError={(error: any) => {
            console.error("Upload error:", error);
            alert("Upload failed");
          }}
        />

        {coverImage && (
          <div className="mt-4">
            <img
              src={coverImage}
              alt="Cover image preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => setCoverImage("")}
              className="mt-2 text-red-600 dark:text-red-400 text-sm hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Excerpt */}
      <input
        type="text"
        placeholder="Brief description for SEO and previews"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      {/* Created Date */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">Published Date</label>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">Content (Markdown supported)</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-zinc-900 dark:bg-zinc-100 cursor-pointer text-white dark:text-zinc-900 px-6 py-3 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {isEditing ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="bg-zinc-600 dark:bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>
    </div>
  );
}
