import { apiClient } from './client';
import { API_ENDPOINTS } from '@/config/api.config';
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
 * Oak National Academy API Service
 */

export const oakService = {
  /**
   * Fetch all key stages (KS1-4)
   */
  async getKeyStages(): Promise<KeyStage[]> {
    const response = await apiClient.get<KeyStage[]>(API_ENDPOINTS.keyStages);
    return response.data;
  },

  /**
   * Fetch subjects, optionally filtered by key stage
   */
  async getSubjects(filters?: SubjectFilters): Promise<Subject[]> {
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
    const response = await apiClient.get<Lesson>(
      `${API_ENDPOINTS.lessons}/${slug}`
    );
    return response.data;
  },

  /**
   * Fetch years/year groups
   */
  async getYears(): Promise<Year[]> {
    const response = await apiClient.get<Year[]>(API_ENDPOINTS.years);
    return response.data;
  },

  /**
   * Fetch subject by slug
   */
  async getSubject(slug: string): Promise<Subject> {
    const response = await apiClient.get<Subject>(
      `${API_ENDPOINTS.subjects}/${slug}`
    );
    return response.data;
  },

  /**
   * Fetch unit by slug
   */
  async getUnit(slug: string): Promise<Unit> {
    const response = await apiClient.get<Unit>(
      `${API_ENDPOINTS.units}/${slug}`
    );
    return response.data;
  },
};
