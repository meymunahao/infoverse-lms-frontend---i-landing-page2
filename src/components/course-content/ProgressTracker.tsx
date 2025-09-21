"use client";

import { CourseContent, LearningProgress, Topic, TopicRecommendation } from "../../types/courseContent";
import { calculateTopicProgress, summarizeQuizPerformance } from "../../utils/learningAnalytics";

interface ProgressTrackerProps {
  course?: CourseContent;
  topics: Topic[];
  progress?: LearningProgress;
  recommendations: TopicRecommendation[];
}

export const ProgressTracker = ({ course, topics, progress, recommendations }: ProgressTrackerProps) => {
  const overallProgress = calculateTopicProgress(topics);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Learning Analytics</h2>
          <p className="text-sm text-slate-600">Track your mastery, streaks, and adaptive recommendations.</p>
        </div>
        {course && (
          <span className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
            {course.difficulty} • {course.estimatedDuration} hrs
          </span>
        )}
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Overall completion</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{overallProgress}%</p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-sky-500" style={{ width: `${overallProgress}%` }} aria-hidden />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Time invested</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {Math.round((progress?.timeSpent ?? 0) / 60)}<span className="text-base font-medium text-slate-500"> min</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">Across all learning modes</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Notes captured</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{progress?.notesCount ?? 0}</p>
          <p className="mt-1 text-xs text-slate-500">Synced across devices</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Learning streak</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{progress?.streakCount ?? 0} days</p>
          <p className="mt-1 text-xs text-slate-500">Keep momentum for extra rewards</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-4">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Performance insights</h3>
            <p className="mt-2 text-sm text-slate-700">
              {progress ? summarizeQuizPerformance(progress) : "Complete a quiz to unlock performance insights."}
            </p>
            {progress?.achievements && progress.achievements.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {progress.achievements.map((achievement) => (
                  <li key={achievement} className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Learning path recommendations</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              {recommendations.length === 0 && <li>No new recommendations right now. Keep up the great work!</li>}
              {recommendations.map((recommendation) => (
                <li key={recommendation.topicId} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  <div>
                    <p className="font-semibold text-slate-900">Topic {recommendation.topicId.split("-")[1]}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{recommendation.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quick actions</h3>
          <div className="mt-3 flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-slate-600">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-sky-300 hover:text-sky-600"
            >
              Resume last topic
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-sky-300 hover:text-sky-600"
            >
              Review bookmarked moments
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-sky-300 hover:text-sky-600"
            >
              Plan next study session
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProgressTracker;
