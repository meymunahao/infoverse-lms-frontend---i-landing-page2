'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const Doughnut = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
  ssr: false,
});

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

export default function ProgressDashboard() {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import('chart.js/auto').then(() => {
      if (mounted) setChartsReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const weeklyProgress = useMemo(
    () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Engaged hours',
          data: [3, 4.5, 6, 5, 7.5, 4, 2.5],
          fill: true,
          tension: 0.4,
          backgroundColor: 'rgba(99, 102, 241, 0.25)',
          borderColor: 'rgba(129, 140, 248, 1)',
          pointBackgroundColor: '#818cf8',
          pointRadius: 4,
        },
      ],
    }),
    [],
  );

  const completionBreakdown = useMemo(
    () => ({
      labels: ['Completed', 'In progress', 'Not started'],
      datasets: [
        {
          data: [62, 28, 10],
          backgroundColor: ['#6366f1', '#ec4899', '#334155'],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  const competencyGains = useMemo(
    () => ({
      labels: ['AI Automation', 'Product Strategy', 'Cloud Foundations', 'Data storytelling'],
      datasets: [
        {
          label: 'Cohort average',
          data: [78, 65, 86, 71],
          backgroundColor: ['rgba(129, 140, 248, 0.6)'],
        },
      ],
    }),
    [],
  );

  return (
    <AnimatedSection
      id="dashboard"
      className="glass-surface space-y-spacing-sm p-spacing-sm"
      aria-label="Learner progress analytics"
    >
      <header className="flex flex-wrap items-center justify-between gap-spacing-2xs">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-50">Real-time progress intelligence</h2>
          <p className="text-sm text-neutral-300">Monitor engagement, completion and competency uplift across cohorts.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-spacing-3xs py-1 text-xs font-semibold text-primary-100">
          <Sparkles className="h-4 w-4" aria-hidden />
          AI insights enabled
        </span>
      </header>
      {!chartsReady ? (
        <div className="grid gap-spacing-sm md:grid-cols-2 xl:grid-cols-3" role="status" aria-live="polite">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid gap-spacing-sm md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-spacing-sm">
            <Line
              data={weeklyProgress}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                  y: {
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                    ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                  },
                },
              }}
              height={240}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-spacing-sm">
            <Doughnut
              data={completionBreakdown}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: 'rgba(226, 232, 240, 0.8)', boxWidth: 12 },
                  },
                },
              }}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-spacing-sm md:col-span-2 xl:col-span-1">
            <Bar
              data={competencyGains}
              options={{
                plugins: { legend: { display: false } },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: { color: 'rgba(226, 232, 240, 0.7)', maxRotation: 0, minRotation: 0 },
                    grid: { display: false },
                  },
                  y: {
                    ticks: { color: 'rgba(226, 232, 240, 0.7)' },
                    grid: { color: 'rgba(148, 163, 184, 0.1)' },
                  },
                },
              }}
              height={240}
            />
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}
