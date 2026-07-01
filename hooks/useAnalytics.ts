"use client";

import { useEffect } from "react";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  // Track custom events
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Track blog post views specifically
  const trackBlogView = (slug: string, title: string) => {
    trackEvent("blog_view", "engagement", title, 1);
  };

  // Track external link clicks
  const trackExternalLink = (url: string) => {
    trackEvent("external_link", "navigation", url);
  };

  // Track social media clicks
  const trackSocialClick = (platform: string) => {
    trackEvent("social_click", "social", platform);
  };

  // Track theme changes
  const trackThemeChange = (theme: string) => {
    trackEvent("theme_change", "ui", theme);
  };

  // Track navigation
  const trackNavigation = (path: string) => {
    trackEvent("navigation", "user_behavior", path);
  };

  return {
    trackEvent,
    trackBlogView,
    trackExternalLink,
    trackSocialClick,
    trackThemeChange,
    trackNavigation,
  };
};
