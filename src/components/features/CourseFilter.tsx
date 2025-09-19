'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Course } from '@/components/enhanced/CourseCard';

export type FilterState = {
  search: string;
  category: string;
  level: string;
  duration: string;
  price: string;
};

type CourseFilterProps = {
  courses: Course[];
  onFilter: (filtered: Course[], state: FilterState) => void;
};

const defaultState: FilterState = {
  search: '',
  category: 'All',
  level: 'All',
  duration: 'All',
  price: 'All',
};

const durationOptions = ['All', '4 weeks', '6 weeks', '8 weeks', '12 weeks'];
const priceOptions = ['All', 'Free', '£99', '£149', '£249'];

export default function CourseFilter({ courses, onFilter }: CourseFilterProps) {
  const [filters, setFilters] = useState<FilterState>(defaultState);

  const categories = useMemo(() => ['All', ...new Set(courses.map((course) => course.category))], [courses]);
  const levels = useMemo(
    () => ['All', ...new Set(courses.map((course) => course.level))],
    [courses],
  );

  useEffect(() => {
    onFilter(filteredCoursesForState(courses, filters), filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  const handleChange = (key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(filteredCoursesForState(courses, updated), updated);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('search', event.target.value);
  };

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <form className="grid gap-4 md:grid-cols-4" aria-label="Course filters">
        <label className="md:col-span-2">
          <span className="sr-only">Search courses</span>
          <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-3">
            <Search className="size-5 text-neutral-400" aria-hidden />
            <input
              value={filters.search}
              onChange={handleSearch}
              className="w-full bg-transparent text-sm text-neutral-700 outline-none"
              placeholder="Search for exams, skills, or topics"
              type="search"
              name="search"
            />
          </div>
        </label>
        <FilterSelect
          label="Category"
          name="category"
          value={filters.category}
          options={categories}
          onChange={(value) => handleChange('category', value)}
        />
        <FilterSelect
          label="Level"
          name="level"
          value={filters.level}
          options={levels}
          onChange={(value) => handleChange('level', value)}
        />
        <FilterSelect
          label="Duration"
          name="duration"
          value={filters.duration}
          options={durationOptions}
          onChange={(value) => handleChange('duration', value)}
        />
        <FilterSelect
          label="Price"
          name="price"
          value={filters.price}
          options={priceOptions}
          onChange={(value) => handleChange('price', value)}
        />
      </form>
    </div>
  );
}

function FilterSelect({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: keyof FilterState;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-neutral-600">
      <span>{label}</span>
      <select
        className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700"
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function filteredCoursesForState(courses: Course[], state: FilterState) {
  return courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(state.search.toLowerCase());
    const matchesCategory = state.category === 'All' || course.category === state.category;
    const matchesLevel = state.level === 'All' || course.level === state.level;
    const matchesDuration = state.duration === 'All' || course.duration === state.duration;
    const matchesPrice = state.price === 'All' || course.price === state.price;
    return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
  });
}
