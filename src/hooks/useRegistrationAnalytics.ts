import { useCallback } from "react";
import { RegistrationAnalyticsEvent } from "../types/registration";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const useRegistrationAnalytics = () => {
  const trackEvent = useCallback((event: RegistrationAnalyticsEvent) => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: `registration_${event.name}`,
      status: event.status,
      ...event.metadata,
    });

    if (process.env.NODE_ENV !== "production") {
      console.info("Registration analytics event", event);
    }
  }, []);

  return { trackEvent };
};
