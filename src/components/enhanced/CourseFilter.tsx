'use client';

import { ChangeEvent, ReactNode } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { useA11y } from '@/hooks/useA11y';

export type CourseFilterValues = {
  query: string;
  category: string;
  level: string;
  duration: string;
  price: string;
};

type FilterOption = {
  label: string;
  value: string;
};

export type CourseFilterProps = {
  values: CourseFilterValues;
  categories: FilterOption[];
  levels: FilterOption[];
  durations: FilterOption[];
  priceRanges: FilterOption[];
  onChange: (values: CourseFilterValues) => void;
};

const Fieldset = ({ title, children }: { title: string; children: ReactNode }) => (
  <fieldset className="space-y-spacing-3xs">
    <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
      {title}
    </legend>
    {children}
  </fieldset>
);

export default function CourseFilter({
  values,
  categories,
  levels,
  durations,
  priceRanges,
  onChange,
}: CourseFilterProps) {
  const { announce } = useA11y();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const updated = { ...values, [name]: value } as CourseFilterValues;
    onChange(updated);
    announce(`${name} updated to ${value || 'all'}`);
  };

  const baseSelectClasses =
    'block w-full rounded-xl border border-white/10 bg-white/5 px-spacing-3xs py-2 text-sm text-neutral-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';

  return (
    <section
      id="course-filters"
      aria-label="Course filters"
      className="glass-surface space-y-spacing-sm p-spacing-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-spacing-2xs">
        <h2 className="text-xl font-semibold text-neutral-50">Curate your pathway</h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-spacing-3xs py-1 text-xs font-semibold text-primary-100">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Dynamic filters
        </span>
      </header>
      <div className="relative">
        <Search className="pointer-events-none absolute left-spacing-3xs top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden />
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <input
          id="course-search"
          type="search"
          name="query"
          value={values.query}
          onChange={handleChange}
          placeholder="Search by skill, role or keyword"
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-spacing-sm text-sm text-neutral-100 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        />
      </div>
      <div className="grid gap-spacing-sm md:grid-cols-2 xl:grid-cols-4">
        <Fieldset title="Category">
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            aria-label="Category"
            className={baseSelectClasses}
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Fieldset>
        <Fieldset title="Level">
          <select
            name="level"
            value={values.level}
            onChange={handleChange}
            aria-label="Level"
            className={baseSelectClasses}
          >
            {levels.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Fieldset>
        <Fieldset title="Duration">
          <select
            name="duration"
            value={values.duration}
            onChange={handleChange}
            aria-label="Duration"
            className={baseSelectClasses}
          >
            {durations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Fieldset>
        <Fieldset title="Investment">
          <select
            name="price"
            value={values.price}
            onChange={handleChange}
            aria-label="Investment"
            className={baseSelectClasses}
          >
            {priceRanges.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Fieldset>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-spacing-2xs text-xs text-neutral-400">
        <p>
          Showing results tailored to <span className="font-semibold text-neutral-200">{values.level || 'All levels'}</span>
          {values.category ? ` • ${values.category}` : ''}
        </p>
        <button
          type="button"
          className={clsx(
            'rounded-full px-spacing-3xs py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
            values.category || values.level || values.duration || values.price || values.query
              ? 'text-primary-200 hover:text-primary-100'
              : 'text-neutral-500',
          )}
          onClick={() => {
            const reset: CourseFilterValues = {
              query: '',
              category: '',
              level: '',
              duration: '',
              price: '',
            };
            onChange(reset);
            announce('Filters cleared');
          }}
        >
          Reset filters
        </button>
      </footer>
    </section>
  );
}
