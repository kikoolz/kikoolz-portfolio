// Updated loading skeleton that is appropriate for both light and dark mode.
// Skeleton UI for the blog page. It mimics the header, the featured posts
// grid (with one large card and two stacked smaller cards), and the three‑column
// list used in your main blog page. Each placeholder uses Tailwind’s
// `animate-pulse` class to show a loading shimmer.

export default function Loading() {
  return (
    <div className="pb-4">
      {/* Header skeleton */}
      <div className="mx-auto max-w-[90rem] lg:max-w-4xl mb-8 px-4 lg:px-6">
        <header className="max-w-2xl space-y-2">
          <div className="h-10 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
          <div className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
        </header>
      </div>

      <div className="pt-10 mx-auto space-y-8 max-w-[1440px] lg:px-2 md:space-y-16 md:pt-18 lg:pt-4">
        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Main Featured Post skeleton */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/100 p-6 md:p-8 bg-zinc-100/50 dark:bg-zinc-900/20 space-y-6 animate-pulse">
            {/* Header row: date and views */}
            <div className="flex justify-between items-center">
              {/* Date placeholder */}
              <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
              {/* Views placeholder (icon + number) */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                <div className="h-4 w-8 bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
            </div>
            {/* Title placeholder (three lines) */}
            <div className="space-y-2">
              <div className="h-8 w-11/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-8 w-10/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-8 w-8/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
            </div>
            {/* Description placeholder (three short lines) */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-11/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-4 w-9/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
            </div>
            {/* Divider line */}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />
            {/* “Read more” placeholder */}
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
          </div>
          {/* Right column for second and third featured posts */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Second featured post skeleton */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/100 p-6 md:p-8 bg-zinc-100/50 dark:bg-zinc-900/20 space-y-6 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                  <div className="h-4 w-8 bg-zinc-300 dark:bg-zinc-700 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-8 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-4/6 bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
            </div>
            {/* Third featured post skeleton */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/100 p-6 md:p-8 bg-zinc-100/50 dark:bg-zinc-900/20 space-y-6 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                  <div className="h-4 w-8 bg-zinc-300 dark:bg-zinc-700 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-8 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-4/6 bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
            </div>
          </div>
        </div>
        {/* Divider line */}
        <div className="hidden max-w-2xl mx-auto h-px md:block bg-zinc-200 dark:bg-zinc-800" />
        {/* Additional posts grid (three columns) */}
        <div className="pb-4">
          {/* Blog grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto lg:mx-0">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-700/100 p-6 md:p-8 bg-zinc-100/50 dark:bg-zinc-900/20 space-y-6 animate-pulse"
              >
                {/* Date and views row */}
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <div className="h-4 w-8 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  </div>
                </div>
                {/* Title placeholder lines */}
                <div className="space-y-2">
                  <div className="h-8 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                  <div className="h-8 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                </div>
                {/* Description placeholder lines */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-zinc-300 dark:bg-zinc-700 rounded" />
                  <div className="h-4 w-10/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  <div className="h-4 w-8/12 bg-zinc-300 dark:bg-zinc-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}