"use client";

import { Topic } from "../../types/courseContent";
import { formatDuration } from "../../utils/learningAnalytics";

interface TopicNavigatorProps {
  courseTitle: string;
  currentTopicTitle?: string;
  previousTopic?: Topic;
  nextTopic?: Topic;
  onNavigate?: (topicId: string) => void;
}

export const TopicNavigator = ({
  courseTitle,
  currentTopicTitle,
  previousTopic,
  nextTopic,
  onNavigate,
}: TopicNavigatorProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
      <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="text-slate-600">Dashboard</span>
        <span aria-hidden>/</span>
        <span className="text-slate-600">Courses</span>
        <span aria-hidden>/</span>
        <span className="text-slate-900">{courseTitle}</span>
        {currentTopicTitle && (
          <>
            <span aria-hidden>/</span>
            <span className="text-sky-600">{currentTopicTitle}</span>
          </>
        )}
      </nav>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => previousTopic && onNavigate?.(previousTopic.id)}
          disabled={!previousTopic}
          className={`rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
            previousTopic
              ? "border-slate-200 bg-white hover:border-sky-300 hover:text-sky-600"
              : "cursor-not-allowed border-dashed border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          <p className="text-xs uppercase tracking-wide text-slate-500">Previous topic</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{previousTopic?.title ?? "Locked until completion"}</p>
          {previousTopic && (
            <p className="mt-1 text-xs text-slate-500">{formatDuration(previousTopic.estimatedDuration)}</p>
          )}
        </button>

        <button
          type="button"
          onClick={() => nextTopic && onNavigate?.(nextTopic.id)}
          disabled={!nextTopic}
          className={`rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
            nextTopic
              ? "border-sky-400 bg-sky-50 text-sky-700 hover:border-sky-500"
              : "cursor-not-allowed border-dashed border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          <p className="text-xs uppercase tracking-wide text-slate-500">Next topic</p>
          <p className="mt-1 text-sm font-semibold">{nextTopic?.title ?? "Complete current lessons to unlock"}</p>
          {nextTopic && (
            <p className="mt-1 text-xs text-slate-500">{formatDuration(nextTopic.estimatedDuration)}</p>
          )}
        </button>
      </div>
    </section>
  );
};

export default TopicNavigator;
