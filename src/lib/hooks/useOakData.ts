import useSWR from 'swr';
import { oakService } from '@/lib/api/oak-service';
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
 * Custom hooks for fetching Oak National Academy data with SWR
 */

export function useKeyStages() {
  return useSWR<KeyStage[]>('key-stages', () => oakService.getKeyStages());
}

export function useSubjects(filters?: SubjectFilters) {
  const key = filters
    ? ['subjects', filters.keyStageSlug]
    : 'subjects';

  return useSWR<Subject[]>(key, () => oakService.getSubjects(filters));
}

export function useSubject(slug: string | null) {
  return useSWR<Subject>(
    slug ? ['subject', slug] : null,
    () => slug ? oakService.getSubject(slug) : Promise.reject('No slug')
  );
}

export function useUnits(filters?: UnitFilters) {
  const key = ['units', filters?.subjectSlug, filters?.yearSlug].filter(
    Boolean
  );

  return useSWR<Unit[]>(
    filters ? key : 'units',
    () => oakService.getUnits(filters)
  );
}

export function useUnit(slug: string | null) {
  return useSWR<Unit>(
    slug ? ['unit', slug] : null,
    () => slug ? oakService.getUnit(slug) : Promise.reject('No slug')
  );
}

export function useLessons(filters?: LessonFilters) {
  const key = [
    'lessons',
    filters?.unitSlug,
    filters?.subjectSlug,
    filters?.keyStageSlug,
  ].filter(Boolean);

  return useSWR<Lesson[]>(
    filters ? key : 'lessons',
    () => oakService.getLessons(filters)
  );
}

export function useLesson(slug: string | null) {
  return useSWR<Lesson>(
    slug ? ['lesson', slug] : null,
    () => slug ? oakService.getLesson(slug) : Promise.reject('No slug')
  );
}

export function useYears() {
  return useSWR<Year[]>('years', () => oakService.getYears());
}
