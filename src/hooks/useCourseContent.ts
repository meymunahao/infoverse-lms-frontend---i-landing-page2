import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CourseContent,
  DiscussionThread,
  LearningProgress,
  Resource,
  Topic,
  TopicRecommendation,
  VideoContent,
} from "../types/courseContent";
import { calculateTopicProgress, getRecommendedTopics } from "../utils/learningAnalytics";

interface UseCourseContentResult {
  course?: CourseContent;
  topics: Topic[];
  currentTopic?: Topic;
  videoContent?: VideoContent;
  resources: Resource[];
  discussion?: DiscussionThread;
  recommendations: TopicRecommendation[];
  progressSnapshot?: LearningProgress;
  loading: boolean;
  error?: string;
  refresh: () => void;
}

type CourseCacheEntry = {
  course: CourseContent;
  topics: Topic[];
  videoByTopic: Record<string, VideoContent>;
  resourcesByTopic: Record<string, Resource[]>;
  discussionByTopic: Record<string, DiscussionThread>;
  progressByTopic: Record<string, LearningProgress>;
};

const courseCache = new Map<string, CourseCacheEntry>();

const createMockCourse = (courseId: string): CourseCacheEntry => {
  const baseCourse: CourseContent = {
    id: courseId,
    title: "Advanced Biology: Cellular Systems",
    instructor: "Dr. Maya Chen",
    description:
      "Explore the foundations of cellular biology through immersive content, interactive labs, and adaptive assessments.",
    totalTopics: 12,
    estimatedDuration: 18,
    difficulty: "intermediate",
    category: "Science",
    tags: ["biology", "cellular systems", "interactive labs"],
  };

  const topics: Topic[] = Array.from({ length: 12 }).map((_, index) => ({
    id: `topic-${index + 1}`,
    title: `Topic ${index + 1}`,
    description: `Detailed exploration of concept ${index + 1} with real-world applications and adaptive assessments to reinforce learning outcomes.`,
    order: index + 1,
    estimatedDuration: 35 + index * 5,
    contentType: index === 0 ? "mixed" : index % 3 === 0 ? "interactive" : "video",
    isCompleted: index === 0,
    isLocked: index > 2,
    resources: [
      {
        id: `resource-${index + 1}-notes`,
        title: `Topic ${index + 1} Lecture Notes`,
        type: "pdf",
        url: "https://example.com/resource.pdf",
        downloadable: true,
        size: 4.2,
      },
      {
        id: `resource-${index + 1}-lab`,
        title: `Virtual Lab ${index + 1}`,
        type: "interactive",
        url: "https://example.com/lab",
        downloadable: false,
      },
    ],
    learningObjectives: [
      "Explain the core principles",
      "Apply knowledge to real scenarios",
      "Evaluate understanding through assessments",
    ],
    relatedTopics:
      index < 11
        ? [`topic-${Math.min(11, index + 2)}`, `topic-${Math.max(1, index)}`]
        : ["topic-2", "topic-5"],
    interactiveContent: [
      {
        id: `quiz-${index + 1}`,
        title: `Adaptive Quiz ${index + 1}`,
        type: "quiz",
        status: index === 0 ? "completed" : "pending",
      },
      {
        id: `discussion-${index + 1}`,
        title: `Discussion Circle ${index + 1}`,
        type: "discussion",
        status: "pending",
      },
    ],
  }));

  const createVideo = (topic: Topic): VideoContent => ({
    id: `video-${topic.id}`,
    title: `${topic.title}: Masterclass`,
    url: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    duration: 1200,
    thumbnail: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
    resumePosition: topic.order === 1 ? 320 : 0,
    chapters: [
      {
        id: `${topic.id}-chapter-1`,
        title: "Concept Overview",
        startTime: 0,
        endTime: 300,
        summary: "High-level overview with visual aids",
      },
      {
        id: `${topic.id}-chapter-2`,
        title: "Deep Dive",
        startTime: 300,
        endTime: 900,
        summary: "Detailed explanation with animations",
      },
      {
        id: `${topic.id}-chapter-3`,
        title: "Interactive Exercise",
        startTime: 900,
        endTime: 1200,
        summary: "Interactive lab walkthrough and assessment",
      },
    ],
    transcripts: [
      {
        id: `${topic.id}-transcript-en`,
        language: "English",
        segments: Array.from({ length: 10 }).map((__, idx) => ({
          id: `${topic.id}-segment-${idx}`,
          startTime: idx * 120,
          endTime: idx * 120 + 110,
          text: `Transcript snippet ${idx + 1} covering learning highlight ${idx + 1}.`,
        })),
      },
      {
        id: `${topic.id}-transcript-es`,
        language: "Spanish",
        segments: Array.from({ length: 8 }).map((__, idx) => ({
          id: `${topic.id}-segment-es-${idx}`,
          startTime: idx * 140,
          endTime: idx * 140 + 120,
          text: `Resumen en español del segmento ${idx + 1}.`,
        })),
      },
    ],
    quality: [
      { id: "low", label: "480p", resolution: "854x480", bitrate: 800, url: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" },
      { id: "medium", label: "720p", resolution: "1280x720", bitrate: 1500, url: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" },
      { id: "high", label: "1080p", resolution: "1920x1080", bitrate: 3000, url: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" },
    ],
  });

  const videoByTopic = topics.reduce<Record<string, VideoContent>>((acc, topic) => {
    if (topic.contentType === "video" || topic.contentType === "mixed" || topic.contentType === "interactive") {
      acc[topic.id] = createVideo(topic);
    }
    return acc;
  }, {});

  const resourcesByTopic = topics.reduce<Record<string, Resource[]>>((acc, topic) => {
    acc[topic.id] = topic.resources;
    return acc;
  }, {});

  const discussionByTopic = topics.reduce<Record<string, DiscussionThread>>((acc, topic) => {
    acc[topic.id] = {
      id: `discussion-${topic.id}`,
      topicId: topic.id,
      title: `${topic.title} Collaborative Discussion`,
      replies: [
        {
          id: `reply-${topic.id}-1`,
          author: "Avery J.",
          role: "student",
          content: "I found the interactive lab particularly helpful for visualizing the cell cycle.",
          createdAt: new Date().toISOString(),
          upvotes: 4,
        },
        {
          id: `reply-${topic.id}-2`,
          author: "Dr. Maya Chen",
          role: "instructor",
          content: "Remember to pause at the chapter markers to reflect on the key mechanisms discussed.",
          createdAt: new Date().toISOString(),
          upvotes: 12,
        },
      ],
    };
    return acc;
  }, {});

  const progressByTopic = topics.reduce<Record<string, LearningProgress>>((acc, topic) => {
    acc[topic.id] = {
      courseId: courseId,
      topicId: topic.id,
      timeSpent: topic.order === 1 ? 2600 : 0,
      lastPosition: topic.order === 1 ? 320 : 0,
      completionPercentage: topic.isCompleted ? 100 : topic.order === 2 ? 45 : 0,
      notesCount: topic.order === 1 ? 6 : 0,
      bookmarks:
        topic.order === 1
          ? [
              {
                id: `bookmark-${topic.id}-1`,
                label: "Cell Cycle Checkpoint",
                note: "Review before quiz",
                timestamp: 315,
                createdAt: new Date().toISOString(),
              },
            ]
          : [],
      quizScores:
        topic.order === 1
          ? [
              {
                quizId: `quiz-${topic.id}`,
                score: 92,
                totalQuestions: 10,
                completedAt: new Date().toISOString(),
              },
            ]
          : [],
      streakCount: topic.order === 1 ? 5 : 1,
      achievements: topic.order === 1 ? ["Consistency Star", "Interactive Explorer"] : [],
    };
    return acc;
  }, {});

  return {
    course: baseCourse,
    topics,
    videoByTopic,
    resourcesByTopic,
    discussionByTopic,
    progressByTopic,
  };
};

export const useCourseContent = (courseId: string, topicId: string): UseCourseContentResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [courseEntry, setCourseEntry] = useState<CourseCacheEntry>();

  const loadCourse = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);

      if (!courseCache.has(courseId)) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        courseCache.set(courseId, createMockCourse(courseId));
      }

      setCourseEntry(courseCache.get(courseId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load course content");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadCourse();
  }, [loadCourse]);

  const currentTopic = useMemo(() => {
    return courseEntry?.topics.find((topic) => topic.id === topicId);
  }, [courseEntry, topicId]);

  const recommendations = useMemo(() => {
    if (!courseEntry?.topics || !currentTopic) {
      return [];
    }
    return getRecommendedTopics(courseEntry.topics, currentTopic.id);
  }, [courseEntry, currentTopic]);

  const progressSnapshot = useMemo(() => {
    if (!courseEntry || !currentTopic) {
      return undefined;
    }
    return courseEntry.progressByTopic[currentTopic.id];
  }, [courseEntry, currentTopic]);

  const resources = useMemo(() => {
    if (!courseEntry || !currentTopic) {
      return [];
    }
    return courseEntry.resourcesByTopic[currentTopic.id] ?? [];
  }, [courseEntry, currentTopic]);

  const videoContent = useMemo(() => {
    if (!courseEntry || !currentTopic) {
      return undefined;
    }
    return courseEntry.videoByTopic[currentTopic.id];
  }, [courseEntry, currentTopic]);

  const discussion = useMemo(() => {
    if (!courseEntry || !currentTopic) {
      return undefined;
    }
    return courseEntry.discussionByTopic[currentTopic.id];
  }, [courseEntry, currentTopic]);

  const progressPercentage = useMemo(() => {
    return courseEntry?.topics ? calculateTopicProgress(courseEntry.topics) : 0;
  }, [courseEntry]);

  const currentProgress = useMemo(() => {
    if (!progressSnapshot) {
      return undefined;
    }
    return {
      ...progressSnapshot,
      completionPercentage: progressSnapshot.completionPercentage || progressPercentage,
    };
  }, [progressSnapshot, progressPercentage]);

  return {
    course: courseEntry?.course,
    topics: courseEntry?.topics ?? [],
    currentTopic,
    videoContent,
    resources,
    discussion,
    recommendations,
    progressSnapshot: currentProgress,
    loading,
    error,
    refresh: loadCourse,
  };
};
