"use client";

import { Fragment } from "react";
import { Topic } from "../../types/courseContent";
import { formatDuration } from "../../utils/learningAnalytics";

interface CourseOutlineProps {
  topics: Topic[];
  currentTopicId?: string;
  onSelectTopic?: (topicId: string) => void;
  progressPercentage: number;
}

export const CourseOutline = ({ topics, currentTopicId, onSelectTopic, progressPercentage }: CourseOutlineProps) => {
  return (
    <aside className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Course Outline</h2>
          <span className="inline-flex items-center gap-2 text-sm text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            {progressPercentage}% complete
          </span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-slate-200">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-sky-500 transition-all"
            style={{ width: `${progressPercentage}%` }}
            aria-hidden
          />
          <span className="sr-only">{progressPercentage}% of topics completed</span>
        </div>
      </header>

      <ul className="flex-1 space-y-3 overflow-y-auto pr-1" aria-label="Course topic navigation">
        {topics.map((topic) => {
          const isCurrent = topic.id === currentTopicId;
          return (
            <Fragment key={topic.id}>
              <li>
                <button
                  type="button"
                  onClick={() => !topic.isLocked && onSelectTopic?.(topic.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
                    topic.isLocked
                      ? "cursor-not-allowed border-dashed border-slate-300 bg-slate-100 text-slate-400"
                      : isCurrent
                      ? "border-sky-500 bg-sky-50/80 text-slate-900 shadow-sm"
                      : topic.isCompleted
                      ? "border-emerald-400 bg-emerald-50/60 text-slate-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50/60"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-disabled={topic.isLocked}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">{topic.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {topic.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100">
                        {formatDuration(topic.estimatedDuration)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          topic.isLocked
                            ? "bg-slate-200 text-slate-500"
                            : topic.isCompleted
                            ? "bg-emerald-100 text-emerald-700"
                            : isCurrent
                            ? "bg-sky-100 text-sky-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {topic.isLocked ? "Locked" : topic.isCompleted ? "Completed" : isCurrent ? "In progress" : "Pending"}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </aside>
  );
};

export default CourseOutline;
