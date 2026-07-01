"use client";
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "../../../components/Image";
import React, { useRef } from "react";

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  heroImage?: string;
}

type Props = {
  blog: BlogPost;
  views: number;
};

export const Header: React.FC<Props> = ({ blog, views }) => {
  // We no longer track intersection state because we want the arrow to be functional at all times.
  // The ref is kept only if needed for further enhancements.
  const ref = useRef<HTMLElement>(null);

  return (
    <header
      ref={ref}
      className="relative isolate overflow-hidden bg-linear-to-tl from-black via-zinc-900 to-black"
    >
      {/* Fixed navigation bar with a consistent background and border.
          Removing conditional classes ensures the arrow remains clickable at all times. */}
      <div className="fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b bg-white/10 border-zinc-200 lg:bg-transparent lg:border-transparent">
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            {/* View counter with hover effect and pointer cursor */}
            <span
              title="View counter for this page"
              className="duration-200 hover:font-medium flex items-center gap-1 text-zinc-400 hover:text-primary-400 cursor-pointer"
            >
              <Eye className="w-5 h-5" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views,
              )}
            </span>
          </div>

          {/* Arrow left always navigates back to /blog and shows a hover effect */}
          <Link
            href="/blog"
            className="duration-200 hover:font-medium text-zinc-400 hover:text-primary-400 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {blog.heroImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            imgUrl={blog.heroImage}
            alt={blog.title}
            className="w-full h-full object-cover opacity-20"
            width={1200}
            height={630}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>
      )}
    </header>
  );
};
