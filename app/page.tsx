// Implementation of HomePage with GSAP animation for word transitions
"use client";

import Image from "../components/Image";
import Projects from "../components/Projects";
import NewsletterForm from "../components/NewsletterForm";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HomepageContentItem {
  id: string;
  section: string;
  content: any;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const [content, setContent] = useState<HomepageContentItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // We no longer need an `isDropping` state because GSAP handles the animation.
  const [imageTimestamp] = useState(Date.now());
  // Words that cycle through in the hero line
  const changingWords = ["experiences", "solutions", "products"];
  const wordColors = {
    experiences: "text-yellow-500",
    solutions: "text-red-500",
    products: "text-purple-500",
  };
  // A ref pointing at the span containing the changing word. GSAP will animate this element directly.
  const textRef = useRef<HTMLSpanElement>(null);

  const getHeroContent = () => {
    const heroItem = content?.find(
      (item: HomepageContentItem) =>
        item.section === "hero" || item.section === "Hero Image",
    );
    const heroContent = heroItem?.content || {};

    // Don't add cache-busting to image URLs as it breaks Next.js Image component
    // Instead, we'll rely on the component's key prop for re-rendering

    return heroContent;
  };

  // Set up hardcoded content since homepage API was removed
  useEffect(() => {
    const hardcodedContent = [
      {
        id: "1",
        section: "hero",
        content: {},
        type: "text",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        section: "Hero Image",
        content: {
          imageUrl: "/ken.png",
          alt: "Kenneth Kikoole portrait",
        },
        type: "image",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setContent(hardcodedContent);
    setLoading(false);

    // Define a function that performs the word-change animation using GSAP.
    const animateWordChange = () => {
      // Ensure the ref is attached before animating
      if (textRef.current) {
        const tl = gsap.timeline();
        // Slide current word downward and fade out
        tl.to(textRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
          // Immediately after the first tween completes, update the word index and position element above the view
          .add(() => {
            setCurrentWordIndex(
              (prevIndex) => (prevIndex + 1) % changingWords.length,
            );
            if (textRef.current) {
              gsap.set(textRef.current, { y: "-100%", opacity: 0 });
            }
          })
          // Slide the new word down into view and fade it in
          .to(textRef.current, {
            y: "0%",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
      }
    };

    // Kick off the interval to change the word every two seconds
    const interval = setInterval(animateWordChange, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [changingWords.length]);

  if (loading) {
    return (
      <>
        {/* Hero Section Skeleton */}
        <div className="mx-auto mt-40 mb-20 px-4 lg:max-w-4xl">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:space-x-16">
            <div className="mt-10 lg:mt-0 text-center lg:text-left flex-1">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-12 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                <div className="h-12 w-24 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
                <div className="h-12 w-36 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse"></div>
              </div>

              {/* Description Skeleton */}
              <div className="mt-6 space-y-3 max-w-xl">
                <div className="h-4 w-full bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Profile Image Skeleton */}
            <div className="shrink-0 mb-8 lg:mb-0 text-center">
              <div className="rounded-full size-32 sm:size-40 lg:size-[350px] bg-zinc-300 dark:bg-zinc-700 animate-pulse ring-1 ring-zinc-400/30"></div>
            </div>
          </div>
        </div>

        {/* Projects Section Skeleton */}
        <div className="my-16 sm:my-30">
          <div className="mx-auto lg:max-w-4xl">
            <div className="h-16 w-48 bg-zinc-300 dark:bg-zinc-700 rounded-lg animate-pulse mb-10 sm:mb-20"></div>
          </div>

          {/* Project Cards Skeleton */}
          <div className="mx-auto lg:max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer py-12 px-12 rounded-[20px] flex flex-col items-center gap-4 bg-zinc-100 dark:bg-zinc-900 overflow-hidden animate-pulse"
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
          </div>
        </div>

        {/* Newsletter Section Skeleton */}
        <div className="mx-auto lg:max-w-4xl my-16 sm:my-30">
          <div className="ring-1 ring-zinc-300/50 px-8 py-6 rounded-lg shadow bg-white/80 backdrop-blur-md dark:bg-zinc-800/80 dark:ring-zinc-700/10 animate-pulse">
            <div className="md:flex md:space-x-8 md:items-center space-y-6 md:space-y-0">
              <div className="flex-1 space-y-2">
                <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-10 w-full bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p className="text-zinc-900 dark:text-zinc-100">Error: {error}</p>
          <button className="mt-4 px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white rounded hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto mt-45 mb-20 px-4 lg:max-w-4xl">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:space-x-16">
          <div className="mt-10 lg:mt-0 text-center lg:text-left">
            <h2 className="text-4xl sm:text-7xl tracking-tight text-balance">
              <span className="block">Building</span>
              <span className="block text-teal-600">digital</span>
              {/* The changing word is now controlled via GSAP with a ref */}
              <span className="relative block h-[1.2em] overflow-hidden">
                <span
                  ref={textRef}
                  className={`absolute left-0 w-full will-change-transform ${wordColors[changingWords[currentWordIndex] as keyof typeof wordColors]}`}
                >
                  {changingWords[currentWordIndex]}
                </span>
              </span>
            </h2>

            <div className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
              <p>
                I&apos;m{" "}
                <span className="group/korok inline-flex lg:cursor-[pointer] font-striper-article lg:font-medium">
                  <span className="sr-only"> Kenneth Kikoole </span>
                  <span
                    className="group-hover/korok:text-red-400 transition duration-75 group-hover/korok:-translate-y-px delay-[50ms]"
                    aria-hidden="true"
                  >
                    K
                  </span>
                  <span
                    className="group-hover/korok:text-orange-400 transition duration-75 group-hover/korok:-translate-y-px delay-[75ms]"
                    aria-hidden="true"
                  >
                    e
                  </span>
                  <span
                    className="group-hover/korok:text-yellow-400 transition duration-75 group-hover/korok:-translate-y-px delay-[100ms]"
                    aria-hidden="true"
                  >
                    n
                  </span>
                  <span
                    className="group-hover/korok:text-lime-400 transition duration-75 group-hover/korok:-translate-y-px delay-[125ms]"
                    aria-hidden="true"
                  >
                    n
                  </span>
                  <span
                    className="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[150ms]"
                    aria-hidden="true"
                  >
                    e
                  </span>
                  <span
                    className="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[200ms]"
                    aria-hidden="true"
                  >
                    t
                  </span>
                  <span
                    className="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[250ms]"
                    aria-hidden="true"
                  >
                    h
                  </span>
                  <span className="inline-block w-1" aria-hidden="true"></span>
                  <span
                    className="group-hover/korok:text-violet-400 transition duration-75 group-hover/korok:-translate-y-px delay-[350ms]"
                    aria-hidden="true"
                  >
                    K
                  </span>
                  <span
                    className="group-hover/korok:text-red-400 transition duration-75 group-hover/korok:-translate-y-px delay-[450ms]"
                    aria-hidden="true"
                  >
                    i
                  </span>
                  <span
                    className="group-hover/korok:text-orange-400 transition duration-75 group-hover/korok:-translate-y-px delay-[500ms]"
                    aria-hidden="true"
                  >
                    k
                  </span>
                  <span
                    className="group-hover/korok:text-yellow-400 transition duration-75 group-hover/korok:-translate-y-px delay-[550ms]"
                    aria-hidden="true"
                  >
                    o
                  </span>
                  <span
                    className="group-hover/korok:text-lime-400 transition duration-75 group-hover/korok:-translate-y-px delay-[600ms]"
                    aria-hidden="true"
                  >
                    o
                  </span>
                  <span
                    className="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[650ms]"
                    aria-hidden="true"
                  >
                    l
                  </span>
                  <span
                    className="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[700ms]"
                    aria-hidden="true"
                  >
                    e
                  </span>
                </span>{" "}
                , a curious, driven software engineer who turns messy problems
                into clean &amp; efficient code. I build solutions that ship,
                scale, and sometimes make you 😂.
              </p>
              <p className="mt-4">
                Whether I&apos;m diving deep into full-stack development or
                leading technical direction in a startup, I bring passion,
                precision, and just the right amount of dark mode 🌚.
              </p>
            </div>
          </div>

          <div className="shrink-0 mb-8 lg:mb-0 text-center flex justify-center lg:justify-start">
            <Image
              key={`hero-image-${imageTimestamp}`}
              imgUrl={getHeroContent()?.imageUrl || "/ken.png"}
              alt={getHeroContent()?.alt || "Kenneth Kikoole portrait"}
              className="rounded-full size-32 sm:size-40 lg:size-[350px] object-cover ring-1 ring-zinc-400/30 shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-3xl"
            />
          </div>
        </div>
      </div>

      <div className="my-16 sm:my-30">
        <div className="mx-auto lg:max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10 sm:mb-20">
            Projects
          </h2>
        </div>

        <div className="mx-auto lg:max-w-4xl">
          <Projects />
        </div>
      </div>

      <div className="mx-auto lg:max-w-4xl my-16 sm:my-30">
        <NewsletterForm />
      </div>
    </>
  );
}
