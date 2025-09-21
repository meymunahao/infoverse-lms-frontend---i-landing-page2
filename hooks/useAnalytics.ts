"use client";

import { useCallback, useEffect } from "react";

type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const pushToDataLayer = (event: string, payload?: AnalyticsPayload) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    timestamp: Date.now(),
    ...payload,
  });
};

export const useAnalytics = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
  }, []);

  const trackEvent = useCallback((eventName: string, payload?: AnalyticsPayload) => {
    if (typeof window === "undefined") return;
    pushToDataLayer(eventName, payload);

    if (window.gtag) {
      window.gtag("event", eventName, payload ?? {});
    }

    if (window.fbq) {
      window.fbq("trackCustom", eventName, payload ?? {});
    }
  }, []);

  const trackConversion = useCallback(
    (conversionType: string, payload?: AnalyticsPayload) => {
      trackEvent(`conversion_${conversionType}`, payload);
    },
    [trackEvent],
  );

  const trackPageView = useCallback(() => {
    trackEvent("page_view", { path: typeof window !== "undefined" ? window.location.pathname : "server" });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    trackPageView,
  };
};
