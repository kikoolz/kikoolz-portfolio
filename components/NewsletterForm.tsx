"use client";

import { useState, useEffect } from "react";

interface NewsletterContent {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [newsletterContent, setNewsletterContent] =
    useState<NewsletterContent | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const fetchNewsletterContent = async () => {
      try {
        const response = await fetch("/api/newsletter/content");
        if (response.ok) {
          const data = await response.json();
          // Get the first active newsletter content
          const activeContent = Array.isArray(data)
            ? data.find((item: NewsletterContent) => item.isActive)
            : null;
          setNewsletterContent(activeContent);
        }
      } catch (err) {
        console.error("Failed to fetch newsletter content:", err);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchNewsletterContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Newsletter API Error:", {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });
        throw new Error(
          data.error || `Failed to subscribe (${response.status})`,
        );
      }

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setError(error instanceof Error ? error.message : "Failed to subscribe");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (subscribed) {
    return (
      <div className="ring-1 ring-zinc-300/50 px-8 py-6 rounded-lg shadow bg-white/80 backdrop-blur-md dark:bg-zinc-800/80 dark:ring-zinc-700/10 dark:text-zinc-200 text-center">
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-teal-600 dark:text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Successfully Subscribed!
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            Thanks for subscribing to the Techletter. You'll receive the next
            issue soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ring-1 ring-zinc-300/50 px-8 py-6 rounded-lg shadow bg-white/80 backdrop-blur-md dark:bg-zinc-800/80 dark:ring-zinc-700/10 dark:text-zinc-200 md:flex md:space-x-8 md:items-center space-y-6 md:space-y-0">
        <div className="flex-1">
          <h2 className="flex items-center space-x-2">
            <span className="font-semibold">
              {newsletterContent
                ? newsletterContent.title
                : "Subscribe to the Techletter"}
            </span>
          </h2>

          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex-1">
              {newsletterContent && !loadingContent && (
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: newsletterContent.content,
                    }}
                  />
                </div>
              )}

              {loadingContent && (
                <div className="animate-pulse">
                  <div className="h-4 w-3/4 bg-zinc-300 dark:bg-zinc-600 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-zinc-300 dark:bg-zinc-600 rounded mb-4"></div>
                  <div className="h-4 w-2/3 bg-zinc-300 dark:bg-zinc-600 rounded mb-4"></div>
                </div>
              )}

              {!newsletterContent && (
                <p className="leading-7 text-zinc-700 dark:text-zinc-300 text-sm">
                  Short. Smart. Spam-free. Sent when it matters.
                </p>
              )}
            </div>

            {newsletterContent && (
              <div className="flex-1">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-2">
                    {error && (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex items-center space-x-1">
                      <input
                        type="email"
                        placeholder="k-@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="w-full appearance-none rounded-md bg-white px-3 py-2 shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-primary-500/10 focus:outline-primary-500 sm:text-sm dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-primary-400/10 dark:focus:outline-primary-400 disabled:opacity-50"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-primary-500 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
