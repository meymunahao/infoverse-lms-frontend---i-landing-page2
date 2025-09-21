"use client";

import { useMemo, useState } from "react";
import {
  DiscussionThread,
  Resource,
  Topic,
} from "../../types/courseContent";
import { formatDuration } from "../../utils/learningAnalytics";

interface ContentSectionProps {
  topic?: Topic;
  resources: Resource[];
  discussion?: DiscussionThread;
  onLaunchInteractive?: (interactiveId: string) => void;
  onOpenResource?: (resourceId: string) => void;
  onStartQuiz?: (quizId: string) => void;
  onCreateNote?: (note: string) => void;
}

export const ContentSection = ({
  topic,
  resources,
  discussion,
  onLaunchInteractive,
  onOpenResource,
  onStartQuiz,
  onCreateNote,
}: ContentSectionProps) => {
  const [noteValue, setNoteValue] = useState("");
  const [showObjectives, setShowObjectives] = useState(true);
  const [activeTab, setActiveTab] = useState<"resources" | "interactive" | "discussion">("resources");

  const interactiveItems = useMemo(() => topic?.interactiveContent ?? [], [topic?.interactiveContent]);

  const handleAddNote = () => {
    if (!noteValue.trim()) {
      return;
    }
    onCreateNote?.(noteValue);
    setNoteValue("");
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Topic Overview</h3>
          <p className="text-sm text-slate-600">
            {topic?.description ?? "Review the lesson notes, interactive labs, and discussion threads to reinforce your understanding."}
          </p>
        </div>
        {topic && (
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-600 shadow-sm">
            Estimated {formatDuration(topic.estimatedDuration)}
          </div>
        )}
      </header>

      {topic?.learningObjectives && topic.learningObjectives.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setShowObjectives((previous) => !previous)}
            className="flex w-full items-center justify-between text-left"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Learning objectives</h4>
            <span className="text-xs font-semibold text-sky-600">
              {showObjectives ? "Hide" : "Show"}
            </span>
          </button>
          {showObjectives && (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {topic.learningObjectives.map((objective) => (
                <li key={objective} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
        <nav className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500">
          {[
            { id: "resources", label: "Resources" },
            { id: "interactive", label: "Interactive" },
            { id: "discussion", label: "Discussion" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-full px-4 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
                activeTab === tab.id
                  ? "bg-sky-500 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="space-y-4 p-4 text-sm text-slate-700">
          {activeTab === "resources" && (
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource) => (
                <article
                  key={resource.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{resource.title}</h4>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{resource.type}</p>
                    </div>
                    {resource.size && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {resource.size.toFixed(1)} MB
                      </span>
                    )}
                  </div>
                  {resource.description && <p className="mt-2 text-slate-600">{resource.description}</p>}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                    <button
                      type="button"
                      onClick={() => onOpenResource?.(resource.id)}
                      className="rounded-full bg-sky-500 px-4 py-1.5 text-white shadow transition hover:bg-sky-600"
                    >
                      View
                    </button>
                    {resource.downloadable && (
                      <a
                        href={resource.url}
                        download
                        className="rounded-full border border-sky-200 px-4 py-1.5 text-sky-600 transition hover:bg-sky-50"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </article>
              ))}
              {resources.length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-500">
                  Resources will unlock once the introductory video is completed.
                </p>
              )}
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="space-y-4">
              {interactiveItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        item.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
                    <button
                      type="button"
                      onClick={() => (item.type === "quiz" ? onStartQuiz?.(item.id) : onLaunchInteractive?.(item.id))}
                      className="rounded-full bg-sky-500 px-4 py-1.5 text-white shadow transition hover:bg-sky-600"
                    >
                      {item.type === "quiz" ? "Start quiz" : "Launch"}
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-4 py-1.5 text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
                    >
                      Add to study plan
                    </button>
                  </div>
                </article>
              ))}
              {interactiveItems.length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-500">
                  Interactive labs unlock when you finish the prerequisite topics.
                </p>
              )}
            </div>
          )}

          {activeTab === "discussion" && discussion && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <h4 className="text-base font-semibold text-slate-900">{discussion.title}</h4>
                <p className="text-sm text-slate-600">Collaborate with peers and instructors in real time.</p>
              </div>
              {discussion.replies.map((reply) => (
                <article key={reply.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <header className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{reply.author}</p>
                    <span className="text-xs uppercase tracking-wide text-slate-500">{reply.role}</span>
                  </header>
                  <p className="mt-2 text-sm text-slate-700">{reply.content}</p>
                  <footer className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <time dateTime={reply.createdAt}>{new Date(reply.createdAt).toLocaleString()}</time>
                    {typeof reply.upvotes === "number" && <span>{reply.upvotes} upvotes</span>}
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Personal notes</h4>
        <p className="text-xs text-slate-500">Your notes sync across devices and support markdown formatting.</p>
        <textarea
          value={noteValue}
          onChange={(event) => setNoteValue(event.target.value)}
          rows={4}
          className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
          placeholder="Capture reflections, questions, or action items"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
          <button
            type="button"
            onClick={handleAddNote}
            className="rounded-full bg-sky-500 px-4 py-2 text-white shadow transition hover:bg-sky-600"
          >
            Save note
          </button>
          <button
            type="button"
            onClick={() => setNoteValue("")}
            className="rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
