import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, LearningProgress, QuizResult } from "../types/courseContent";

interface UseProgressTrackerOptions {
  courseId: string;
  topicId: string;
  initialProgress?: LearningProgress;
}

interface UseProgressTrackerResult {
  progress: LearningProgress;
  updateTimeSpent: (seconds: number) => void;
  updateLastPosition: (seconds: number) => void;
  toggleCompletion: (isCompleted: boolean) => void;
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void;
  recordQuizResult: (result: QuizResult) => void;
  incrementNotes: () => void;
  reset: () => void;
}

const progressCache = new Map<string, LearningProgress>();

const createDefaultProgress = (courseId: string, topicId: string): LearningProgress => ({
  courseId,
  topicId,
  timeSpent: 0,
  lastPosition: 0,
  completionPercentage: 0,
  notesCount: 0,
  bookmarks: [],
  quizScores: [],
  streakCount: 0,
  achievements: [],
});

export const useProgressTracker = ({
  courseId,
  topicId,
  initialProgress,
}: UseProgressTrackerOptions): UseProgressTrackerResult => {
  const cacheKey = `${courseId}-${topicId}`;
  const [progress, setProgress] = useState<LearningProgress>(() => {
    if (progressCache.has(cacheKey)) {
      return progressCache.get(cacheKey)!;
    }
    if (initialProgress) {
      progressCache.set(cacheKey, initialProgress);
      return initialProgress;
    }
    const defaultProgress = createDefaultProgress(courseId, topicId);
    progressCache.set(cacheKey, defaultProgress);
    return defaultProgress;
  });
  const updateTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (initialProgress && initialProgress.topicId === topicId) {
      progressCache.set(cacheKey, initialProgress);
      setProgress(initialProgress);
    }
  }, [cacheKey, initialProgress, topicId]);

  useEffect(() => {
    progressCache.set(cacheKey, progress);
  }, [cacheKey, progress]);

  const throttledUpdate = useCallback(
    (updater: (previous: LearningProgress) => LearningProgress) => {
      setProgress((previous) => {
        const updated = updater(previous);
        if (updateTimerRef.current) {
          clearTimeout(updateTimerRef.current);
        }
        updateTimerRef.current = setTimeout(() => {
          progressCache.set(cacheKey, updated);
        }, 300);
        return updated;
      });
    },
    [cacheKey]
  );

  const updateTimeSpent = useCallback(
    (seconds: number) => {
      throttledUpdate((previous) => ({
        ...previous,
        timeSpent: previous.timeSpent + seconds,
      }));
    },
    [throttledUpdate]
  );

  const updateLastPosition = useCallback(
    (seconds: number) => {
      throttledUpdate((previous) => ({
        ...previous,
        lastPosition: seconds,
      }));
    },
    [throttledUpdate]
  );

  const toggleCompletion = useCallback(
    (isCompleted: boolean) => {
      throttledUpdate((previous) => ({
        ...previous,
        completionPercentage: isCompleted ? 100 : previous.completionPercentage,
        streakCount: isCompleted ? (previous.streakCount ?? 0) + 1 : previous.streakCount,
        achievements: isCompleted
          ? Array.from(new Set([...(previous.achievements ?? []), "Topic Mastery"]))
          : previous.achievements,
      }));
    },
    [throttledUpdate]
  );

  const addBookmark = useCallback(
    ({ label, note, timestamp }: Omit<Bookmark, "id" | "createdAt">) => {
      const bookmark: Bookmark = {
        id: `${cacheKey}-bookmark-${Date.now()}`,
        createdAt: new Date().toISOString(),
        label,
        note,
        timestamp,
      };
      throttledUpdate((previous) => ({
        ...previous,
        bookmarks: [...previous.bookmarks, bookmark],
      }));
    },
    [cacheKey, throttledUpdate]
  );

  const recordQuizResult = useCallback(
    (result: QuizResult) => {
      throttledUpdate((previous) => ({
        ...previous,
        quizScores: [...previous.quizScores.filter((quiz) => quiz.quizId !== result.quizId), result],
      }));
    },
    [throttledUpdate]
  );

  const incrementNotes = useCallback(() => {
    throttledUpdate((previous) => ({
      ...previous,
      notesCount: previous.notesCount + 1,
    }));
  }, [throttledUpdate]);

  const reset = useCallback(() => {
    const defaultProgress = createDefaultProgress(courseId, topicId);
    progressCache.set(cacheKey, defaultProgress);
    setProgress(defaultProgress);
  }, [cacheKey, courseId, topicId]);

  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      progress,
      updateTimeSpent,
      updateLastPosition,
      toggleCompletion,
      addBookmark,
      recordQuizResult,
      incrementNotes,
      reset,
    }),
    [progress, updateTimeSpent, updateLastPosition, toggleCompletion, addBookmark, recordQuizResult, incrementNotes, reset]
  );

  return value;
};
