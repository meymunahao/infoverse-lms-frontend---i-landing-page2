"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LearningProgress, TranscriptSegment, VideoContent } from "../../types/courseContent";
import { formatTimeFromSeconds } from "../../utils/learningAnalytics";

interface MediaPlayerProps {
  video?: VideoContent;
  progress: LearningProgress;
  onTimeIncrement?: (seconds: number) => void;
  onPositionChange?: (seconds: number) => void;
  onCompletion?: () => void;
  onBookmark?: (bookmark: { label: string; note: string; timestamp: number }) => void;
  defaultPlaybackRate?: number;
}

const playbackOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const MediaPlayer = ({
  video,
  progress,
  onTimeIncrement,
  onPositionChange,
  onCompletion,
  onBookmark,
  defaultPlaybackRate = 1,
}: MediaPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTimestampRef = useRef<number>(progress.lastPosition || 0);
  const [playbackRate, setPlaybackRate] = useState(defaultPlaybackRate);
  const [selectedQuality, setSelectedQuality] = useState(video?.quality[1]?.id ?? video?.quality[0]?.id ?? "");
  const [selectedChapterId, setSelectedChapterId] = useState<string>();
  const [transcriptQuery, setTranscriptQuery] = useState("");
  const [activeTranscriptLanguage, setActiveTranscriptLanguage] = useState(video?.transcripts[0]?.id ?? "");
  const [autoPauseNotes, setAutoPauseNotes] = useState(true);
  const [bookmarkLabel, setBookmarkLabel] = useState("");
  const [bookmarkNote, setBookmarkNote] = useState("");
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const hasResumePoint = (video?.resumePosition ?? 0) > 0 || progress.lastPosition > 0;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (video && videoRef.current) {
      const resumePosition = progress.lastPosition || video.resumePosition || 0;
      if (resumePosition > 0) {
        videoRef.current.currentTime = resumePosition;
        lastTimestampRef.current = resumePosition;
      }
    }
  }, [video, progress.lastPosition]);

  useEffect(() => {
    setActiveTranscriptLanguage(video?.transcripts[0]?.id ?? "");
    setSelectedQuality(video?.quality[1]?.id ?? video?.quality[0]?.id ?? "");
    setSelectedChapterId(video?.chapters[0]?.id);
  }, [video?.id, video?.transcripts, video?.quality, video?.chapters]);

  const activeTranscript = useMemo(() => {
    return video?.transcripts.find((item) => item.id === activeTranscriptLanguage);
  }, [video?.transcripts, activeTranscriptLanguage]);

  const filteredSegments = useMemo(() => {
    if (!activeTranscript) {
      return [];
    }
    if (!transcriptQuery) {
      return activeTranscript.segments;
    }
    return activeTranscript.segments
      .filter((segment) => segment.text.toLowerCase().includes(transcriptQuery.toLowerCase()))
      .map((segment) => ({
        ...segment,
        highlighted: true,
      }));
  }, [activeTranscript, transcriptQuery]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) {
      return;
    }
    const currentTime = videoRef.current.currentTime;
    const elapsed = Math.max(0, currentTime - lastTimestampRef.current);
    if (elapsed > 0.5) {
      onTimeIncrement?.(elapsed);
      lastTimestampRef.current = currentTime;
    }
    onPositionChange?.(currentTime);
  };

  const handleChapterSelect = (chapterId: string, startTime: number) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.currentTime = startTime;
    setSelectedChapterId(chapterId);
  };

  const handleBookmark = () => {
    if (!videoRef.current || !onBookmark) {
      return;
    }
    const timestamp = videoRef.current.currentTime;
    if (!bookmarkLabel.trim()) {
      return;
    }
    onBookmark({ label: bookmarkLabel, note: bookmarkNote, timestamp });
    setBookmarkLabel("");
    setBookmarkNote("");
  };

  const handleSegmentClick = (segment: TranscriptSegment) => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.currentTime = segment.startTime;
  };

  const handleTakeNote = () => {
    if (autoPauseNotes && videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (!video) {
    return (
      <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-slate-500">
        Video content will appear here once unlocked.
      </div>
    );
  }

  const selectedQualityLabel = video.quality.find((quality) => quality.id === selectedQuality)?.label ?? "Auto";

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{video.title}</h3>
          <p className="text-sm text-slate-600">Immersive learning experience with transcripts, bookmarks, and adaptive playback.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span className="text-xs uppercase tracking-wide text-slate-500">Speed</span>
            <select
              value={playbackRate}
              onChange={(event) => setPlaybackRate(Number(event.target.value))}
              className="bg-transparent text-sm font-medium focus:outline-none"
              aria-label="Playback speed"
            >
              {playbackOptions.map((speed) => (
                <option key={speed} value={speed}>
                  {speed.toFixed(2)}x
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span className="text-xs uppercase tracking-wide text-slate-500">Quality</span>
            <select
              value={selectedQuality}
              onChange={(event) => setSelectedQuality(event.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
              aria-label="Video quality"
            >
              {video.quality.map((quality) => (
                <option key={quality.id} value={quality.id}>
                  {quality.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setIsTranscriptVisible((previous) => !previous)}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
          >
            {isTranscriptVisible ? "Hide" : "Show"} transcript
          </button>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <input
              type="checkbox"
              checked={autoPauseNotes}
              onChange={(event) => setAutoPauseNotes(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
            />
            <span className="text-xs font-medium text-slate-600">Auto-pause for notes</span>
          </label>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 shadow-lg">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          onTimeUpdate={handleTimeUpdate}
          onEnded={onCompletion}
          aria-label={`${video.title} video player`}
        >
          {video.quality.map((quality) => (
            <source key={quality.id} src={quality.url} data-quality={quality.label} />
          ))}
          Your browser does not support the video tag.
        </video>
        {hasResumePoint && (
          <div className="flex items-center justify-between gap-4 bg-black/70 px-4 py-3 text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Resuming at {formatTimeFromSeconds(progress.lastPosition || video.resumePosition || 0)}
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80">
              {selectedQualityLabel}
            </span>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Chapters</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {video.chapters.map((chapter) => {
              const isActive = selectedChapterId === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => handleChapterSelect(chapter.id, chapter.startTime)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
                    isActive ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 bg-white hover:border-sky-300"
                  }`}
                >
                  <p className="font-semibold">{chapter.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatTimeFromSeconds(chapter.startTime)} - {formatTimeFromSeconds(chapter.endTime)}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{chapter.summary}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bookmarks</h4>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={bookmarkLabel}
                onChange={(event) => setBookmarkLabel(event.target.value)}
                placeholder="Bookmark label"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
              />
              <button
                type="button"
                onClick={handleBookmark}
                className="shrink-0 rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-600"
              >
                Save
              </button>
            </div>
            <textarea
              value={bookmarkNote}
              onChange={(event) => setBookmarkNote(event.target.value)}
              placeholder="Notes or reminders"
              rows={3}
              onFocus={handleTakeNote}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
            />
            <p className="text-xs text-slate-500">Bookmarks sync automatically across devices.</p>
          </div>
        </div>
      </div>

      {isTranscriptVisible && (
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {video.transcripts.map((transcript) => (
                <button
                  key={transcript.id}
                  type="button"
                  onClick={() => setActiveTranscriptLanguage(transcript.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                    activeTranscriptLanguage === transcript.id
                      ? "bg-sky-500 text-white shadow"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {transcript.language}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Search transcript"
                value={transcriptQuery}
                onChange={(event) => setTranscriptQuery(event.target.value)}
                className="w-48 rounded-lg border border-slate-200 px-3 py-1.5 text-sm shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300"
              />
              <button
                type="button"
                onClick={() => setTranscriptQuery("")}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-sm hover:border-sky-300"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-4 max-h-60 space-y-3 overflow-y-auto pr-2 text-sm text-slate-700">
            {filteredSegments.map((segment) => (
              <button
                key={segment.id}
                type="button"
                onClick={() => handleSegmentClick(segment)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${
                  segment.highlighted ? "border-sky-400 bg-sky-50" : "border-transparent hover:border-slate-200 hover:bg-slate-100/60"
                }`}
              >
                <p className="text-xs font-semibold text-slate-500">
                  {formatTimeFromSeconds(segment.startTime)} – {formatTimeFromSeconds(segment.endTime)}
                </p>
                <p>{segment.text}</p>
              </button>
            ))}
            {filteredSegments.length === 0 && (
              <p className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
                No transcript segments match your search.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaPlayer;
