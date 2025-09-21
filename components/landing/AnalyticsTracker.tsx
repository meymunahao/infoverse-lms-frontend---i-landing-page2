"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const AnalyticsTracker = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return null;
};
