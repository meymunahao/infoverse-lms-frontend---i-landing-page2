"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { LandingPageCourse } from "@/types/landing";
import { calculateDiscountedPrice, formatCurrency, getSavingsPercentage } from "@/utils/pricing";

interface CourseCardProps {
  course: LandingPageCourse;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    className={`h-4 w-4 ${filled ? "text-amber-400" : "text-amber-200"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={filled ? 0 : 1.5}
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.036a1 1 0 00-1.176 0l-2.8 2.036c-.786.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    />
  </svg>
);

export const CourseCard = ({ course }: CourseCardProps) => {
  const { trackEvent } = useAnalytics();

  const discountedPrice = useMemo(
    () => calculateDiscountedPrice(course.price.amount, course.price.discount),
    [course.price.amount, course.price.discount],
  );

  const savings = useMemo(
    () => getSavingsPercentage(course.price.originalPrice, discountedPrice),
    [course.price.originalPrice, discountedPrice],
  );

  const handleEnrollClick = () => {
    trackEvent("course_enroll_click", {
      courseId: course.id,
      courseTitle: course.title,
      level: course.level,
      price: discountedPrice,
    });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="relative h-56">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {course.successRate ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand shadow">
            {course.successRate}% achieve target grade
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-brand">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-brand-dark">{course.level}</span>
          <span className="rounded-full bg-brand/5 px-3 py-1 text-brand">{course.duration}</span>
          {course.examBoards.slice(0, 2).map((board) => (
            <span key={board} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              {board}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-slate-900">{course.title}</h3>
          <p className="text-sm text-slate-600">{course.shortDescription}</p>
          <p className="text-sm text-slate-500">{course.description}</p>
        </div>

        <ul className="space-y-2 text-sm text-slate-600">
          {course.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-brand">
                {formatCurrency(discountedPrice, course.price.currency)}
              </span>
              {course.price.originalPrice ? (
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(course.price.originalPrice, course.price.currency)}
                </span>
              ) : null}
            </div>
            {savings ? <p className="text-xs font-medium text-brand">Save {savings}% with subscription</p> : null}
            {course.price.discount ? (
              <p className="text-xs text-slate-500">Introductory {course.price.discount}% launch discount</p>
            ) : null}
          </div>

          <div className="text-right text-xs text-slate-500">
            <p>
              <span className="font-semibold text-slate-900">{course.studentCount.toLocaleString()}</span> learners
            </p>
            <p className="mt-1 flex items-center justify-end gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <StarIcon key={value} filled={course.rating >= value} />
              ))}
              <span className="ml-1 text-slate-600">{course.rating.toFixed(1)}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{course.instructor.name}</p>
            <p>{course.instructor.credentials}</p>
          </div>
          <button
            onClick={handleEnrollClick}
            className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Enroll now
          </button>
        </div>
      </div>
    </article>
  );
};
