import { apiClient } from './client';
import { API_ENDPOINTS } from '@/config/api.config';
import {
  mockKeyStages,
  mockSubjects,
  mockUnits,
  mockLessons,
} from './mock/data';
import type {
  KeyStage,
  Subject,
  Unit,
  Lesson,
  Year,
  SubjectFilters,
  UnitFilters,
  LessonFilters,
} from '@/types/oak-api.types';

/**
 * Check if mock data should be used
 */
const useMockData = () => {
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

/**
 * Oak National Academy API Service
 * Supports both real API and mock data based on environment variable
 */

export const oakService = {
  /**
   * Fetch all key stages (KS1-4)
   */
  async getKeyStages(): Promise<KeyStage[]> {
    if (useMockData()) {
      // Return mock data
      return Promise.resolve(mockKeyStages);
    }

    // Real API call
    const response = await apiClient.get<KeyStage[]>(API_ENDPOINTS.keyStages);
    return response.data;
  },

  /**
   * Fetch subjects, optionally filtered by key stage
   */
  async getSubjects(filters?: SubjectFilters): Promise<Subject[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.keyStageSlug) {
        return Promise.resolve(mockSubjects[filters.keyStageSlug] || []);
      }
      // Return all subjects
      return Promise.resolve(Object.values(mockSubjects).flat());
    }

    // Real API call
    const params = filters ? { keyStage: filters.keyStageSlug } : {};
    const response = await apiClient.get<Subject[]>(API_ENDPOINTS.subjects, {
      params,
    });
    return response.data;
  },

  /**
   * Fetch units, optionally filtered
   */
  async getUnits(filters?: UnitFilters): Promise<Unit[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.subjectSlug) {
        return Promise.resolve(mockUnits[filters.subjectSlug] || []);
      }
      return Promise.resolve(Object.values(mockUnits).flat());
    }

    // Real API call
    const params: Record<string, string> = {};
    if (filters?.subjectSlug) params.subject = filters.subjectSlug;
    if (filters?.yearSlug) params.year = filters.yearSlug;

    const response = await apiClient.get<Unit[]>(API_ENDPOINTS.units, {
      params,
    });
    return response.data;
  },

  /**
   * Fetch lessons, optionally filtered
   */
  async getLessons(filters?: LessonFilters): Promise<Lesson[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.unitSlug) {
        return Promise.resolve(mockLessons[filters.unitSlug] || []);
      }
      return Promise.resolve(Object.values(mockLessons).flat());
    }

    // Real API call
    const params: Record<string, string> = {};
    if (filters?.unitSlug) params.unit = filters.unitSlug;
    if (filters?.subjectSlug) params.subject = filters.subjectSlug;
    if (filters?.keyStageSlug) params.keyStage = filters.keyStageSlug;

    const response = await apiClient.get<Lesson[]>(API_ENDPOINTS.lessons, {
      params,
    });
    return response.data;
  },

  /**
   * Fetch a single lesson by slug
   */
  async getLesson(slug: string): Promise<Lesson> {
    if (useMockData()) {
      // Return mock data - find lesson by slug
      const allLessons = Object.values(mockLessons).flat();
      const lesson = allLessons.find((l) => l.slug === slug);
      if (lesson) {
        return Promise.resolve(lesson);
      }
      return Promise.reject(new Error('Lesson not found'));
    }

    // Real API call
    const response = await apiClient.get<Lesson>(
      `${API_ENDPOINTS.lessons}/${slug}`
    );
    return response.data;
  },

  /**
   * Fetch years/year groups
   */
  async getYears(): Promise<Year[]> {
    if (useMockData()) {
      // Return empty array for mock data (not implemented)
      return Promise.resolve([]);
    }

    // Real API call
    const response = await apiClient.get<Year[]>(API_ENDPOINTS.years);
    return response.data;
  },

  /**
   * Fetch subject by slug
   */
  async getSubject(slug: string): Promise<Subject> {
    if (useMockData()) {
      // Return mock data - find subject by slug
      const allSubjects = Object.values(mockSubjects).flat();
      const subject = allSubjects.find((s) => s.slug === slug);
      if (subject) {
        return Promise.resolve(subject);
      }
      return Promise.reject(new Error('Subject not found'));
    }

    // Real API call
    const response = await apiClient.get<Subject>(
      `${API_ENDPOINTS.subjects}/${slug}`
    );
    return response.data;
  },

  /**
   * Fetch unit by slug
   */
  async getUnit(slug: string): Promise<Unit> {
    if (useMockData()) {
      // Return mock data - find unit by slug
      const allUnits = Object.values(mockUnits).flat();
      const unit = allUnits.find((u) => u.slug === slug);
      if (unit) {
        return Promise.resolve(unit);
      }
      return Promise.reject(new Error('Unit not found'));
    }

    // Real API call
    const response = await apiClient.get<Unit>(
      `${API_ENDPOINTS.units}/${slug}`
    );
    return response.data;
  },
};
