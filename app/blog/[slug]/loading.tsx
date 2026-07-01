

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-pulse">
      {/* Hero Image Skeleton */}
      <div className="w-3/4 mx-auto h-[220px] sm:h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800" />
      </div>

      {/* Date */}
      <div className="mt-12 flex justify-center">
        <div className="h-5 w-36 rounded bg-zinc-800" />
      </div>

      {/* Title */}
      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        <div className="h-12 w-11/12 rounded bg-zinc-800" />
        <div className="h-12 w-10/12 rounded bg-zinc-800" />
      </div>

      {/* Intro Paragraph */}
      <div className="mt-12 max-w-3xl mx-auto space-y-5">
        <div className="h-5 w-full rounded bg-zinc-900" />
        <div className="h-5 w-[97%] rounded bg-zinc-900" />
        <div className="h-5 w-[93%] rounded bg-zinc-900" />
      </div>

      {/* Content Skeleton */}
      <div className="mt-14 max-w-3xl mx-auto space-y-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-8 w-1/3 rounded bg-zinc-800" />

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-zinc-900" />
              <div className="h-4 w-[98%] rounded bg-zinc-900" />
              <div className="h-4 w-[92%] rounded bg-zinc-900" />
              <div className="h-4 w-[85%] rounded bg-zinc-900" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}