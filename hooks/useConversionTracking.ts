"use client";

import { useCallback } from "react";
import { useAnalytics } from "./useAnalytics";

export const useConversionTracking = () => {
  const { trackConversion, trackEvent } = useAnalytics();

  const handlePrimaryCta = useCallback(
    (ctaId: string, extra?: Record<string, unknown>) => {
      trackConversion("primary_cta", { ctaId, ...extra });
    },
    [trackConversion],
  );

  const handlePlanSelection = useCallback(
    (planId: string, billing: "monthly" | "yearly") => {
      trackConversion("plan_selection", { planId, billing });
    },
    [trackConversion],
  );

  const handleLeadCapture = useCallback(
    (context: string) => {
      trackEvent("lead_capture", { context });
    },
    [trackEvent],
  );

  return {
    handlePrimaryCta,
    handlePlanSelection,
    handleLeadCapture,
  };
};
