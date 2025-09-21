import { LearningProgress, Topic, TopicRecommendation } from "../types/courseContent";

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0 ? `${hours} hr` : `${hours} hr ${remainingMinutes} min`;
};

export const formatTimeFromSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const calculateTopicProgress = (topics: Topic[]): number => {
  if (topics.length === 0) {
    return 0;
  }
  const completed = topics.filter((topic) => topic.isCompleted).length;
  return Math.round((completed / topics.length) * 100);
};

export const getRecommendedTopics = (topics: Topic[], currentTopicId: string): TopicRecommendation[] => {
  const currentTopic = topics.find((topic) => topic.id === currentTopicId);

  const baseRecommendations: TopicRecommendation[] = topics
    .filter((topic) => topic.id !== currentTopicId && !topic.isCompleted && !topic.isLocked)
    .slice(0, 3)
    .map((topic) => ({
      topicId: topic.id,
      reason: "Reinforces foundational concepts",
      priority: "medium" as const,
    }));

  if (!currentTopic || !currentTopic.relatedTopics) {
    return baseRecommendations;
  }

  const relatedRecommendations = currentTopic.relatedTopics
    .map((topicId) => topics.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic))
    .map((topic) => ({
      topicId: topic.id,
      reason: "Suggested based on your current progress",
      priority: "high" as const,
    }));

  return [...relatedRecommendations, ...baseRecommendations].slice(0, 4);
};

export const getNextTopic = (topics: Topic[], currentTopicId: string): Topic | undefined => {
  const currentIndex = topics.findIndex((topic) => topic.id === currentTopicId);
  if (currentIndex === -1) {
    return undefined;
  }
  return topics
    .slice(currentIndex + 1)
    .find((topic) => !topic.isLocked);
};

export const getPreviousTopic = (topics: Topic[], currentTopicId: string): Topic | undefined => {
  const currentIndex = topics.findIndex((topic) => topic.id === currentTopicId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return topics
    .slice(0, currentIndex)
    .reverse()
    .find((topic) => !topic.isLocked);
};

export const aggregateProgress = (progressEntries: LearningProgress[]): LearningProgress | null => {
  if (progressEntries.length === 0) {
    return null;
  }

  return progressEntries.reduce<LearningProgress>((acc, entry) => ({
    ...acc,
    topicId: entry.topicId,
    timeSpent: acc.timeSpent + entry.timeSpent,
    lastPosition: entry.lastPosition,
    completionPercentage: Math.max(acc.completionPercentage, entry.completionPercentage),
    notesCount: acc.notesCount + entry.notesCount,
    bookmarks: [...acc.bookmarks, ...entry.bookmarks],
    quizScores: [...acc.quizScores, ...entry.quizScores],
    streakCount: entry.streakCount ?? acc.streakCount,
    achievements: entry.achievements ?? acc.achievements,
  }));
};

export const summarizeQuizPerformance = (progress: LearningProgress): string => {
  if (progress.quizScores.length === 0) {
    return "No quizzes completed yet.";
  }

  const averageScore =
    progress.quizScores.reduce((total, result) => total + result.score, 0) /
    progress.quizScores.length;

  return `Average quiz score: ${Math.round(averageScore)}%.`;
};
