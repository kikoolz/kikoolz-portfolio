"use client";

import { useEffect } from "react";
import { useAnalytics } from "../../../hooks/useAnalytics";

interface BlogAnalyticsTrackerProps {
  slug: string;
  title: string;
}

export const BlogAnalyticsTracker: React.FC<BlogAnalyticsTrackerProps> = ({
  slug,
  title,
}) => {
  const { trackBlogView } = useAnalytics();

  useEffect(() => {
    // Track blog view when component mounts
    trackBlogView(slug, title);
  }, [slug, title, trackBlogView]);

  return null;
};
