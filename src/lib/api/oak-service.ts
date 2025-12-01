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
 * Backend API Response wrapper
 * The backend returns responses in the format: { success: true, data: T, message: string }
 */
interface BackendResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: any;
}

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

    // Real API call - unwrap the backend response to get the data array
    const response = await apiClient.get<BackendResponse<KeyStage[]>>(API_ENDPOINTS.keyStages);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch subjects for a specific key stage
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

    // Real API call - requires keyStageSlug
    if (!filters?.keyStageSlug) {
      throw new Error('keyStageSlug is required to fetch subjects');
    }

    const endpoint = API_ENDPOINTS.subjects(filters.keyStageSlug);
    const response = await apiClient.get<BackendResponse<Subject[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch units for a specific subject
   */
  async getUnits(filters?: UnitFilters): Promise<Unit[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.subjectSlug) {
        return Promise.resolve(mockUnits[filters.subjectSlug] || []);
      }
      return Promise.resolve(Object.values(mockUnits).flat());
    }

    // Real API call - requires subjectSlug
    if (!filters?.subjectSlug) {
      throw new Error('subjectSlug is required to fetch units');
    }

    const endpoint = API_ENDPOINTS.units(filters.subjectSlug);
    const response = await apiClient.get<BackendResponse<Unit[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch lessons for a specific unit
   */
  async getLessons(filters?: LessonFilters): Promise<Lesson[]> {
    if (useMockData()) {
      // Return mock data
      if (filters?.unitSlug) {
        return Promise.resolve(mockLessons[filters.unitSlug] || []);
      }
      return Promise.resolve(Object.values(mockLessons).flat());
    }

    // Real API call - requires unitSlug
    if (!filters?.unitSlug) {
      throw new Error('unitSlug is required to fetch lessons');
    }

    const endpoint = API_ENDPOINTS.lessons(filters.unitSlug);
    const response = await apiClient.get<BackendResponse<Lesson[]>>(endpoint);
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch a single lesson by slug
   * NOTE: This endpoint is not yet implemented in the backend API
   * You may need to add: GET /api/v1/oak/lessons/:slug
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

    // Real API call - requires backend endpoint implementation
    const response = await apiClient.get<BackendResponse<Lesson>>(`/lessons/${slug}`);
    return response.data.data; // Unwrap: response.data.data to get the object
  },

  /**
   * Fetch years/year groups
   * NOTE: This endpoint is not yet implemented in the backend API
   * You may need to add: GET /api/v1/oak/years
   */
  async getYears(): Promise<Year[]> {
    if (useMockData()) {
      // Return empty array for mock data (not implemented)
      return Promise.resolve([]);
    }

    // Real API call - requires backend endpoint implementation
    const response = await apiClient.get<BackendResponse<Year[]>>('/years');
    return response.data.data; // Unwrap: response.data.data to get the array
  },

  /**
   * Fetch subject by slug
   * NOTE: This endpoint is not yet implemented in the backend API
   * You may need to add: GET /api/v1/oak/subjects/:slug
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

    // Real API call - requires backend endpoint implementation
    const response = await apiClient.get<BackendResponse<Subject>>(`/subjects/${slug}`);
    return response.data.data; // Unwrap: response.data.data to get the object
  },

  /**
   * Fetch unit by slug
   * NOTE: This endpoint is not yet implemented in the backend API
   * You may need to add: GET /api/v1/oak/units/:slug
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

    // Real API call - requires backend endpoint implementation
    const response = await apiClient.get<BackendResponse<Unit>>(`/units/${slug}`);
    return response.data.data; // Unwrap: response.data.data to get the object
  },
};
