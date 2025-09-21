"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { Testimonial } from "@/types/landing";

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialSection = ({ testimonials }: TestimonialSectionProps) => {
  const { trackEvent } = useAnalytics();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const stats = useMemo(
    () => [
      { label: "Average grade improvement", value: "+1.8", helper: "within 90 days" },
      { label: "University offers", value: "92%", helper: "secured by alumni" },
      { label: "Learner satisfaction", value: "4.9/5", helper: "verified reviews" },
    ],
    [],
  );

  const handleChange = (index: number) => {
    setActiveIndex(index);
    trackEvent("testimonial_change", { index, testimonialId: testimonials[index].id });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-center">
      <div className="space-y-6">
        <span className="badge bg-brand/10 text-brand">Trusted by ambitious students</span>
        <h2 className="section-title">Student success stories</h2>
        <p className="section-subtitle">
          See how Infoverse learners secured top grades, scholarships, and offers from leading universities across the UK, US,
          and Europe.
        </p>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <dt className="text-xs font-semibold uppercase tracking-wide text-brand">{stat.label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</dd>
              <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {activeTestimonial.avatar ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={activeTestimonial.avatar}
                alt={activeTestimonial.studentName}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ) : null}
          <div>
            <p className="text-lg font-semibold text-slate-900">{activeTestimonial.studentName}</p>
            <p className="text-sm text-slate-600">
              {activeTestimonial.course} · {activeTestimonial.examBoard}
            </p>
            <p className="text-xs uppercase tracking-wide text-brand">
              Verified grade: {activeTestimonial.grade}
            </p>
            {activeTestimonial.destinationUniversity ? (
              <p className="mt-1 text-xs text-slate-500">
                Offer received: {activeTestimonial.destinationUniversity}
              </p>
            ) : null}
          </div>
        </div>

        <blockquote className="mt-6 text-lg text-slate-700">“{activeTestimonial.quote}”</blockquote>
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-brand">{activeTestimonial.verificationStatus === "verified" ? "Verified Student" : "Unverified"}</span>
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => handleChange(index)}
                aria-label={`View testimonial from ${testimonial.studentName}`}
                className={`h-2.5 w-6 rounded-full transition ${index === activeIndex ? "bg-brand" : "bg-slate-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
