"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  domain?: string;
  isNew: boolean;
  isV2: boolean;
  isWIP: boolean;
  year?: string;
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="
              group relative cursor-pointer
              py-12 px-12 rounded-[20px]
              flex flex-col items-center gap-4
              bg-zinc-100 dark:bg-zinc-900 overflow-hidden
              animate-pulse
            "
          >
            {/* Skeleton image */}
            <div className="relative w-full max-w-[100px] mt-4 rounded-[18px]">
              <div className="w-full h-24 bg-zinc-300 dark:bg-zinc-700 rounded-[18px]"></div>
              {/* Skeleton badges */}
              <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 flex gap-1">
                <div className="w-8 h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                <div className="w-6 h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
              </div>
            </div>

            {/* Skeleton title and year */}
            <div className="flex flex-col items-center mt-1.5 w-full">
              <div className="h-8 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-lg mb-2"></div>
              <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-zinc-500 dark:text-zinc-400">No projects yet. Check back soon!</p>
      </div>
    );
  }

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project) => (
        <Link
          key={project.title}
          href={project.link ? project.link : project.domain ? `https://${project.domain}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative cursor-pointer
            py-12 px-12 rounded-[20px]
            flex flex-col items-center gap-4
            bg-zinc-100 dark:bg-zinc-900 overflow-hidden
            transition-all duration-300 ease-[cubic-bezier(0.6,0.6,0,1)]
            hover:scale-105
          `}
        >
          {/* Image container with badge */}
          <div className="relative w-full max-w-[100px] mt-4 shadow-2xl overflow-visible rounded-[18px] leading-none hover:shadow-3xl transition-all duration-300" 
             style={{
               boxShadow: '0 35px 45px -10px rgba(0, 0, 0, 0.4), 0 15px 15px -5px rgba(0, 0, 0, 0.6)',
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.boxShadow = '0 45px 55px -20px rgba(0, 0, 0, 0.6), 0 25px 25px -10px rgba(0, 0, 0, 0.8)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.boxShadow = '0 35px 45px -10px rgba(0, 0, 0, 0.4), 0 15px 15px -5px rgba(0, 0, 0, 0.6)';
             }}>
            <Image
              src={project.image || "/blog-placeholder-1.jpg"}
              alt={project.title}
              width={100}
              height={100}
              className="object-cover w-full h-auto rounded-[18px]"
            />
            {/* Badge container */}
            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 flex gap-1">
              {project.isNew && (
                <div
                  className="
                    font-bold text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full
                    inline-flex items-center uppercase text-white
                    backdrop-blur-sm
                    bg-gradient-to-r from-[#566cec] via-[#d749af] to-[#ff7c51]
                  "
                >
                  NEW
                </div>
              )}
              {project.isV2 && (
                <div
                  className="
                    font-bold text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full
                    inline-flex items-center uppercase text-white
                    backdrop-blur-sm
                    bg-[#8A2BE2]
                  "
                >
                  V2
                </div>
              )}
              {project.isWIP && (
                <div
                  className="
                    font-bold text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full
                    inline-flex items-center uppercase text-white
                    backdrop-blur-sm
                    bg-[#3CB371]
                  "
                >
                  WIP
                </div>
              )}
            </div>
          </div>

          {/* Always‑visible title and year */}
          <div
            className="flex flex-col items-center mt-1.5 transition-all duration-300 ease-[cubic-bezier(0.6,0.6,0,1)] group-hover:blur-md"
          >
            <h3 className="text-zinc-900 dark:text-white text-2xl font-bold mb-2">{project.title}</h3>
            <span className="text-zinc-600 dark:text-gray-400 text-lg">{project.year}</span>
          </div>

          {/* Hover overlay (hidden by default) */}
          <div
            className="
              absolute inset-0 bg-zinc-100/95 dark:bg-zinc-900/95 rounded-[20px]
              opacity-0 scale-[0.6] translate-y-3
              group-hover:opacity-100 group-hover:scale-100
              group-hover:translate-y-0
              transition-all duration-300 ease-[cubic-bezier(0.6,0.6,0,1)]
              z-10
            "
          >
            {/* Centered content */}
            <div className="h-full flex flex-col items-center justify-center p-4">
              <h3 className="text-zinc-900 dark:text-white text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-zinc-700 dark:text-gray-400 text-lg text-center mb-1">{project.description}</p>
              <span className="text-zinc-800 dark:text-gray-600 text-xl font-medium">{project.year}</span>
            </div>

            {/* Arrow icon (top right) */}
            <div
              className="
                absolute top-6 right-6
                bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-gray-300 h-5 w-5 rounded
                flex items-center justify-center
                transition-transform duration-300
                scale-0 translate-y-10
                group-hover:scale-100 group-hover:translate-y-0
              "
            >
              <ArrowUpRight className="w-3 h-3 text-zinc-900 dark:text-white" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
