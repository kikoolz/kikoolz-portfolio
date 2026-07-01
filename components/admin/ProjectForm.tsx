"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../../uploadthing/core";

export default function ProjectForm({ initialData }: any) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [domain, setDomain] = useState(initialData?.domain || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [year, setYear] = useState(initialData?.year?.toString() || "");
  const [isNew, setIsNew] = useState(initialData?.isNew || false);
  const [isV2, setIsV2] = useState(initialData?.isV2 || false);
  const [isWIP, setIsWIP] = useState(initialData?.isWIP || false);
  const [createdAt, setCreatedAt] = useState(
    initialData?.createdAt 
      ? new Date(initialData.createdAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [showPreview, setShowPreview] = useState(false);

  const isEditing = !!initialData;

  const handleSubmit = async () => {
    const endpoint = isEditing ? `/api/projects/${initialData.id}` : "/api/projects";
    const method = isEditing ? "PATCH" : "POST";

    const requestData = {
      title,
      description,
      link,
      domain,
      image,
      year: year ? year.toString() : null, // Keep as string for database
      isNew,
      isV2,
      isWIP,
      createdAt: new Date(createdAt).toISOString(),
    };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        router.push("/dashboard/projects");
      } else {
        let error = { error: "Failed to save project" };
        try {
          const errorData = await response.json();
          error = errorData;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        console.error('Error response:', error);
        alert(error.error || "Failed to save project");
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert("Failed to save project");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <input
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Description */}
      <textarea
        placeholder="Project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-32 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors resize-none"
        rows={5}
      />

      {/* Link */}
      <input
        type="url"
        placeholder="https://example.com"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Domain */}
      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Year */}
      <input
        type="number"
        placeholder="2024"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
      />

      {/* Created Date */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">Created Date</label>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
        />
      </div>

      {/* Is New */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isNew"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isNew" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mark as New
        </label>
      </div>

      {/* Is V2 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isV2"
          checked={isV2}
          onChange={(e) => setIsV2(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isV2" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mark as V2
        </label>
      </div>

      {/* Is WIP */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isWIP"
          checked={isWIP}
          onChange={(e) => setIsWIP(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isWIP" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mark as WIP (Work in Progress)
        </label>
      </div>

      {/* Project Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Project Image</label>
        
        <UploadButton<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            if (res?.[0]?.url) setImage(res[0].url);
            else alert("Upload failed");
          }}
          onUploadError={(error: any) => {
            console.error("Upload error:", error);
            alert("Upload failed");
          }}
        />

        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="Project image preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => setImage("")}
              className="mt-2 cursor-pointer text-red-600 dark:text-red-400 text-sm hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 cursor-pointer px-6 py-3 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          {isEditing ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="bg-zinc-600 dark:bg-zinc-700 text-white px-6 cursor-pointer py-3 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>
    </div>
  );
}
