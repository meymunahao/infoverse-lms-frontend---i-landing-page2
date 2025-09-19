'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import AnimatedSection from '@/components/enhanced/AnimatedSection';
import CourseCard, { type Course } from '@/components/enhanced/CourseCard';
import EnhancedHero from '@/components/enhanced/EnhancedHero';
import Navigation from '@/components/enhanced/Navigation';
import CourseFilter, { type FilterState } from '@/components/features/CourseFilter';
import { usePerformanceMonitor } from '@/utils/performanceMonitor';

const Dashboard = dynamic(() => import('@/components/features/ProgressDashboard'), {
  ssr: false,
  loading: () => <p className="text-center text-sm text-neutral-500">Loading insights…</p>,
});

const courses: Course[] = [
  {
    id: 'stem-advanced',
    title: 'STEM Excellence Bootcamp',
    description: 'Live-led lessons across Physics, Chemistry, and Mathematics with adaptive assessments.',
    category: 'STEM',
    level: 'Advanced',
    duration: '8 weeks',
    price: '£149',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    highlight: 'Includes weekly mentor feedback and mock exam clinics.',
  },
  {
    id: 'foundation-sciences',
    title: 'Science Foundations Accelerator',
    description: 'Interactive labs and collaborative projects to build confident understanding.',
    category: 'STEM',
    level: 'Beginner',
    duration: '6 weeks',
    price: '£99',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'english-masterclass',
    title: 'English Mastery Masterclass',
    description: 'Sharpen critical reading, analysis, and persuasive writing with top tutors.',
    category: 'Humanities',
    level: 'Intermediate',
    duration: '6 weeks',
    price: '£149',
    image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'digital-creative',
    title: 'Creative Media Studio',
    description: 'Blend storytelling and design to build standout digital portfolios.',
    category: 'Creative',
    level: 'Beginner',
    duration: '4 weeks',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'business-analytics',
    title: 'Business Analytics for Teens',
    description: 'Unlock decision making with hands-on Excel, Python, and dashboard labs.',
    category: 'Business',
    level: 'Intermediate',
    duration: '12 weeks',
    price: '£249',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cs-discovery',
    title: 'Computer Science Discovery Path',
    description: 'Guided pathway through algorithms, app development, and cybersecurity basics.',
    category: 'STEM',
    level: 'Beginner',
    duration: '8 weeks',
    price: '£99',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
];

const testimonials = [
  {
    quote: 'Infoverse helped me move from nervous to exam-ready in weeks. Mentors kept me accountable and confident.',
    name: 'Amelia, A-level Student',
  },
  {
    quote: 'The analytics dashboard shows where to focus my revision. It feels like having a personal coach.',
    name: 'Kwame, WAEC Candidate',
  },
  {
    quote: 'Live study rooms and community check-ins made learning social and energising.',
    name: 'Zara, GCSE Candidate',
  },
];

const resourceLinks = [
  {
    title: 'Exam Playbooks',
    description: 'Actionable revision checklists and pacing strategies for major exams.',
    href: '#',
  },
  {
    title: 'Parent Support Hub',
    description: 'Guides to help guardians coach, motivate, and support their learners.',
    href: '#',
  },
  {
    title: 'Mentor Office Hours',
    description: 'Weekly live Q&A to troubleshoot study plans and exam nerves.',
    href: '#',
  },
];

export default function HomePage() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [filterState, setFilterState] = useState<FilterState | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(courses[0]);

  usePerformanceMonitor('HomePage');

  const handleFilter = useCallback((results: Course[], state: FilterState) => {
    setFilteredCourses(results);
    setFilterState(state);
    if (!results.find((course) => course.id === activeCourse?.id)) {
      setActiveCourse(results[0] ?? null);
    }
  }, [activeCourse?.id]);

  const courseCountLabel = useMemo(() => {
    const count = filteredCourses.length;
    if (!filterState || (filterState.search === '' && filterState.category === 'All')) {
      return `${count} curated programmes`;
    }
    return `${count} result${count === 1 ? '' : 's'} matched`;
  }, [filterState, filteredCourses.length]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main className="container flex flex-col gap-16 py-16">
        <EnhancedHero />

        <AnimatedSection id="courses" className="space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Courses</p>
            <h2 className="text-4xl font-semibold text-neutral-900">Choose your learning pathway</h2>
            <p className="max-w-2xl text-base text-neutral-600">
              Filter by level, duration, or price to find the right programme for your next exam milestone.
            </p>
          </div>
          <CourseFilter courses={courses} onFilter={handleFilter} />
          <p className="text-sm text-neutral-500">{courseCountLabel}</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isActive={activeCourse?.id === course.id}
                  onSelect={setActiveCourse}
                />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-100/50 p-10 text-center">
                <p className="text-base font-medium text-neutral-700">No courses match your filters yet.</p>
                <p className="text-sm text-neutral-500">Try adjusting your search to explore more programmes.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection id="dashboard" className="space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Insights</p>
            <h2 className="text-4xl font-semibold text-neutral-900">Track progress in real time</h2>
            <p className="max-w-2xl text-base text-neutral-600">
              Visual dashboards reveal mastery trends, completion rates, and where to focus next.
            </p>
          </div>
          <Dashboard />
        </AnimatedSection>

        <AnimatedSection id="success" className="grid gap-10 rounded-3xl bg-white p-10 shadow-sm lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-neutral-900">Designed for ambitious learners everywhere</h2>
            <p className="text-base text-neutral-600">
              Whether preparing for GCSEs, A-levels, or international exams, Infoverse Digital-Ed combines the best of live
              instruction and AI-personalised practice to help you achieve more in less time.
            </p>
            <ul className="space-y-4 text-sm text-neutral-700">
              <li>• Weekly mentor coaching and revision plans tailored to your performance.</li>
              <li>• Immersive study rooms with accountability pods and collaborative tools.</li>
              <li>• Real-time analytics showing strengths, gaps, and recommended actions.</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-primary-50 p-6 text-neutral-900">
              <p className="text-3xl font-semibold">94% exam success rate</p>
              <p className="text-sm text-neutral-600">Learners report higher confidence after just 3 weeks.</p>
            </div>
            <div className="rounded-3xl bg-accent-50 p-6 text-neutral-900">
              <p className="text-3xl font-semibold">Global community</p>
              <p className="text-sm text-neutral-600">Trusted across the UK, Europe, and West Africa.</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="testimonials" className="space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Voices from learners</p>
            <h2 className="text-4xl font-semibold text-neutral-900">What our community is saying</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-base text-neutral-700">“{testimonial.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-neutral-900">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="resources" className="space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">Resources</p>
            <h2 className="text-4xl font-semibold text-neutral-900">Stay supported between sessions</h2>
            <p className="max-w-2xl text-base text-neutral-600">
              Download templates, attend live mentor sessions, and tap into guides that keep revision momentum going.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {resourceLinks.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <h3 className="text-xl font-semibold text-neutral-900">{resource.title}</h3>
                <p className="mt-3 text-sm text-neutral-600">{resource.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">
                  Explore resource
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-4-4 4 4-4 4" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="cta" className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-accent-500 p-10 text-white shadow-elevated">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-4xl font-semibold">Start your personalised learning journey today</h2>
              <p className="max-w-2xl text-base text-white/80">
                Join early cohorts and unlock mentorship, analytics, and community support built to accelerate your exam success.
              </p>
            </div>
            <a
              href="https://infoversedigitaleducation.net"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-primary-600 transition hover:bg-neutral-100"
            >
              Join the waitlist
            </a>
          </div>
        </AnimatedSection>
      </main>

      <footer id="footer" className="bg-neutral-900 py-10 text-neutral-200">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">Infoverse Digital-Ed</p>
            <p className="text-sm text-neutral-400">
              United Kingdom: +44 7412 858 175
              <br />
              West Africa: +234 903 284 0916
              <br />
              Email: info@infoversedigitaleducation.net
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><a href="#courses" className="hover:text-white">Courses</a></li>
              <li><a href="#dashboard" className="hover:text-white">Progress</a></li>
              <li><a href="#testimonials" className="hover:text-white">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><a href="#resources" className="hover:text-white">Guides</a></li>
              <li><a href="#cta" className="hover:text-white">Join waitlist</a></li>
              <li><a href="#footer" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Follow</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li><a href="https://www.instagram.com" className="hover:text-white">Instagram</a></li>
              <li><a href="https://www.linkedin.com" className="hover:text-white">LinkedIn</a></li>
              <li><a href="https://www.youtube.com" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Infoverse Digital-Ed. All rights reserved.</p>
      </footer>
    </div>
  );
}
