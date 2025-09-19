'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/enhanced/Navigation';
import EnhancedHero from '@/components/enhanced/EnhancedHero';
import CourseFilter, { CourseFilterValues } from '@/components/enhanced/CourseFilter';
import CourseCard, { CourseCardProps } from '@/components/enhanced/CourseCard';
import AnimatedSection from '@/components/enhanced/AnimatedSection';
import { usePerformanceMonitor } from '@/utils/performanceMonitor';

const ProgressDashboard = dynamic(
  () => import('@/components/enhanced/ProgressDashboard'),
  {
    ssr: false,
    loading: () => (
      <div className="glass-surface p-spacing-sm text-sm text-neutral-300">Loading insights…</div>
    ),
  },
);

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: CourseCardProps['level'];
  duration: string;
  price: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 'ai-leadership',
    title: 'AI Leadership Studio',
    description: 'Transform strategic decisions with responsible AI frameworks and automation playbooks.',
    category: 'AI & Automation',
    level: 'Intermediate',
    duration: '6 weeks',
    price: '$980',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'product-systems',
    title: 'Product Systems Design',
    description: 'Design human-centric products with systems thinking, experimentation and rapid prototyping.',
    category: 'Product Design',
    level: 'Advanced',
    duration: '8 weeks',
    price: '$1,240',
    image: 'https://images.unsplash.com/photo-1587613864521-365022e11f66?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cloud-foundations',
    title: 'Cloud Foundations Accelerator',
    description: 'Build resilient architectures using AWS, Azure and GCP best practices with hands-on labs.',
    category: 'Cloud Engineering',
    level: 'Beginner',
    duration: '4 weeks',
    price: '$760',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'data-storytelling',
    title: 'Data Storytelling Bootcamp',
    description: 'Craft compelling narratives and dashboards that move leaders to action.',
    category: 'Data & Analytics',
    level: 'Intermediate',
    duration: '5 weeks',
    price: '$820',
    image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ux-research',
    title: 'UX Research in Motion',
    description: 'Master mixed-method user research, testing automation and insight synthesis.',
    category: 'Product Design',
    level: 'Beginner',
    duration: '6 weeks',
    price: '$690',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cyber-resilience',
    title: 'Cyber Resilience Studio',
    description: 'Secure digital ecosystems with zero-trust frameworks, threat modeling and incident playbooks.',
    category: 'Cybersecurity',
    level: 'Advanced',
    duration: '7 weeks',
    price: '$1,120',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80',
  },
];

const filterOptions = {
  categories: [
    { label: 'All categories', value: '' },
    { label: 'AI & Automation', value: 'AI & Automation' },
    { label: 'Product Design', value: 'Product Design' },
    { label: 'Cloud Engineering', value: 'Cloud Engineering' },
    { label: 'Data & Analytics', value: 'Data & Analytics' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
  ],
  levels: [
    { label: 'All levels', value: '' },
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ],
  durations: [
    { label: 'Any duration', value: '' },
    { label: 'Up to 4 weeks', value: '4 weeks' },
    { label: '5-6 weeks', value: '6 weeks' },
    { label: '7+ weeks', value: '7 weeks' },
  ],
  priceRanges: [
    { label: 'Any investment', value: '' },
    { label: 'Under $800', value: 'under-800' },
    { label: '$800 - $1,000', value: '800-1000' },
    { label: 'Above $1,000', value: 'above-1000' },
  ],
};

const defaultFilters: CourseFilterValues = {
  query: '',
  category: '',
  level: '',
  duration: '',
  price: '',
};

function matchesCourse(course: Course, filters: CourseFilterValues) {
  const matchesQuery = course.title.toLowerCase().includes(filters.query.toLowerCase());
  const matchesCategory = filters.category ? course.category === filters.category : true;
  const matchesLevel = filters.level ? course.level === filters.level : true;
  const matchesDuration = filters.duration
    ? filters.duration === '4 weeks'
      ? parseInt(course.duration) <= 4
      : filters.duration === '6 weeks'
      ? parseInt(course.duration) >= 5 && parseInt(course.duration) <= 6
      : parseInt(course.duration) >= 7
    : true;
  const coursePrice = parseInt(course.price.replace(/[^0-9]/g, ''), 10);
  const matchesPrice = filters.price
    ? filters.price === 'under-800'
      ? coursePrice < 800
      : filters.price === '800-1000'
      ? coursePrice >= 800 && coursePrice <= 1000
      : coursePrice > 1000
    : true;

  return matchesQuery && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
}

export default function Page() {
  const [filters, setFilters] = useState(defaultFilters);
  usePerformanceMonitor('LandingPage');

  const visibleCourses = useMemo(
    () => courses.filter((course) => matchesCourse(course, filters)),
    [filters],
  );

  return (
    <div className="flex min-h-screen flex-col gap-spacing-lg bg-background pb-spacing-xl">
      <Navigation />
      <main id="main-content" className="container space-y-spacing-lg py-spacing-lg">
        <EnhancedHero />
        <AnimatedSection className="space-y-spacing-md" direction="up">
          <CourseFilter
            values={filters}
            categories={filterOptions.categories}
            levels={filterOptions.levels}
            durations={filterOptions.durations}
            priceRanges={filterOptions.priceRanges}
            onChange={setFilters}
          />
          <section aria-live="polite" className="space-y-spacing-sm">
            <header className="flex flex-wrap items-end justify-between gap-spacing-2xs">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-50">Curated programmes</h2>
                <p className="text-sm text-neutral-400">
                  {visibleCourses.length} programmes match your filters in real-time.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 px-spacing-sm py-2 text-sm font-semibold text-neutral-100 transition hover:border-primary-400 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                Download syllabus
              </button>
            </header>
            <div className="container-grid">
              {visibleCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
              {visibleCourses.length === 0 && (
                <p className="rounded-3xl border border-white/10 bg-white/5 p-spacing-sm text-sm text-neutral-300">
                  No programmes currently fit those filters. Adjust your search to explore more pathways.
                </p>
              )}
            </div>
          </section>
        </AnimatedSection>
        <ProgressDashboard />
      </main>
      <footer className="border-t border-white/10 bg-surface/80 py-spacing-sm text-sm text-neutral-400">
        <div className="container flex flex-wrap items-center justify-between gap-spacing-2xs">
          <p>© {new Date().getFullYear()} Infoverse Digital-Ed. Designed for equitable learning.</p>
          <div className="flex gap-spacing-2xs">
            <a href="#privacy" className="hover:text-primary-200">
              Privacy
            </a>
            <a href="#terms" className="hover:text-primary-200">
              Terms
            </a>
            <a href="#accessibility" className="hover:text-primary-200">
              Accessibility
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
