"use client";

import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  location: string;
  description: string;
  type: "work" | "education" | "achievement";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineItems = async () => {
      try {
        const response = await fetch('/api/timeline');
        if (response.ok) {
          const data = await response.json();
          // Filter only active items and sort by date
          const activeItems = Array.isArray(data) 
            ? data.filter((item: TimelineItem) => item.isActive)
                .sort((a: TimelineItem, b: TimelineItem) => {
                  // Sort by date (newest first)
                  const dateA = a.date || '';
                  const dateB = b.date || '';
                  return dateB.localeCompare(dateA);
                })
            : [];
          setTimelineItems(activeItems);
        }
      } catch (error) {
        console.error('Failed to fetch timeline items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineItems();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4">
            <div className="h-6 w-24 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div className="col-span-3 space-y-3">
              <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-16 w-full bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (timelineItems.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
        No timeline items to display.
      </div>
    );
  }

	return (
		<div className="space-y-8">
			{timelineItems.map((item, index) => (
				<div key={item.id} className="grid grid-cols-1 md:grid-cols-4">
					<div className="text-zinc-400">{item.date}</div>
					<div className="col-span-3 flex flex-col gap-y-3">
						<div className="font-semibold">{item.role}</div>
						<div className="flex items-center space-x-1">
							<MapPin className="text-primary-500"/>
							<span>{item.location}</span>
						</div>
						<div className="text-zinc-700 dark:text-zinc-400">{item.description}</div>
					</div>
				</div>
			))}
		</div>
	)
}