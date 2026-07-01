"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { funky } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface MarkdownRendererProps {
  content: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="absolute top-0.5 right-3 opacity-0 group-hover:opacity-100 transition">
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="cursor-pointer bg-zinc-800 text-white p-1.5 rounded hover:bg-zinc-700 transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (!document.documentElement) return;

      const html = document.documentElement;
      const hasDark = html.classList.contains("dark");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const shouldBeDark = hasDark || prefersDark;

      setIsDarkMode(shouldBeDark);
    };

    // Initial check with delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkTheme();
    }, 100);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    // Listen for manual theme changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", checkTheme);
      observer.disconnect();
    };
  }, []);

  const getSyntaxTheme = () => {
    return funky;
  };

  const getContainerClasses = () => {
    return isDarkMode
      ? "bg-zinc-950 rounded-xl overflow-x-auto border border-zinc-800"
      : "bg-white rounded-xl overflow-x-auto border border-zinc-200";
  };

  const getHeaderClasses = () => {
    return isDarkMode
      ? "flex items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800"
      : "flex items-center px-4 py-2 bg-zinc-100 border-b border-zinc-200";
  };

  const getTextClasses = () => {
    return isDarkMode
      ? "text-xs text-zinc-400 font-mono"
      : "text-xs text-zinc-600 font-mono";
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children, ...props }: any) => (
          <h1
            className="mt-12 mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-4"
            {...props}
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }: any) => (
          <h2
            className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }: any) => (
          <h3
            className="mt-8 mb-3 text-xl font-medium text-zinc-900 dark:text-white flex items-center gap-2"
            {...props}
          >
            {children}
          </h3>
        ),
        h4: ({ children, ...props }: any) => (
          <h4
            className="mt-6 mb-2 text-lg font-medium text-zinc-900 dark:text-white flex items-center gap-2"
            {...props}
          >
            {children}
          </h4>
        ),
        h5: ({ children, ...props }: any) => (
          <h5
            className="mt-4 mb-2 text-base font-medium text-zinc-900 dark:text-white flex items-center gap-2"
            {...props}
          >
            {children}
          </h5>
        ),
        h6: ({ children, ...props }: any) => (
          <h6
            className="mt-4 mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2 uppercase tracking-wider"
            {...props}
          >
            {children}
          </h6>
        ),
        p: ({ children, ...props }: any) => (
          <p
            className="my-5 leading-7 text-zinc-700 dark:text-zinc-300"
            {...props}
          >
            {children}
          </p>
        ),
        ul: ({ children, ...props }: any) => (
          <ul
            className="my-6 list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }: any) => (
          <ol
            className="my-6 list-decimal pl-6 space-y-2 text-zinc-700 dark:text-zinc-300"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }: any) => (
          <li className="leading-7" {...props}>
            {children}
          </li>
        ),
        blockquote({ children, ...props }: any) {
          return (
            <blockquote
              className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 text-zinc-600 dark:text-zinc-400 my-6 italic"
              {...props}
            >
              {children}
            </blockquote>
          );
        },
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          return !inline && match ? (
            <div className="relative my-8 group">
              <CopyButton text={String(children).replace(/\n$/, "")} />
              <div className={getContainerClasses()}>
                <div className={getHeaderClasses()}>
                  <span className={getTextClasses()}>{language}</span>
                </div>
                <SyntaxHighlighter
                  language={language}
                  style={getSyntaxTheme()}
                  PreTag="div"
                  className="p-10"
                  showLineNumbers={false}
                  customStyle={{
                    margin: 0,
                    padding: 10,
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <code
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono border border-zinc-200 dark:border-zinc-700"
              {...props}
            >
              {children}
            </code>
          );
        },
        a: ({ children, href, ...props }: any) => (
          <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
          </a>
        ),
        strong: ({ children, ...props }: any) => (
          <strong
            className="font-semibold text-zinc-900 dark:text-white"
            {...props}
          >
            {children}
          </strong>
        ),
        em: ({ children, ...props }: any) => (
          <em className="italic" {...props}>
            {children}
          </em>
        ),
        hr: ({ ...props }: any) => (
          <hr
            className="my-8 border-zinc-200 dark:border-zinc-700"
            {...props}
          />
        ),
        table: ({ children, ...props }: any) => (
          <div className="my-6 overflow-x-auto">
            <table
              className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }: any) => (
          <thead className="bg-zinc-50 dark:bg-zinc-800" {...props}>
            {children}
          </thead>
        ),
        tbody: ({ children, ...props }: any) => (
          <tbody
            className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700"
            {...props}
          >
            {children}
          </tbody>
        ),
        tr: ({ children, ...props }: any) => (
          <tr
            className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            {...props}
          >
            {children}
          </tr>
        ),
        th: ({ children, ...props }: any) => (
          <th
            className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }: any) => (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-300"
            {...props}
          >
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
