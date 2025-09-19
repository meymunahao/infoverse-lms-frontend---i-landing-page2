'use client';

import { useMemo } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement, Filler);

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { intersect: false, mode: 'index' as const },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { family: 'Inter' } },
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.2)' },
      ticks: { color: '#64748b', font: { family: 'Inter' } },
      suggestedMin: 40,
      suggestedMax: 100,
    },
  },
};

const doughnutOptions = {
  responsive: true,
  cutout: '65%',
  plugins: {
    legend: { display: false },
  },
};

export default function ProgressDashboard() {
  const lineData = useMemo(
    () => ({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [
        {
          label: 'Practice scores',
          data: [58, 64, 72, 81, 92],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    }),
    [],
  );

  const doughnutData = useMemo(
    () => ({
      labels: ['Completed', 'In progress', 'Pending'],
      datasets: [
        {
          data: [72, 20, 8],
          backgroundColor: ['#1d4ed8', '#60a5fa', '#dbeafe'],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  return (
    <div className="grid gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:grid-cols-3" id="dashboard">
      <div className="lg:col-span-2">
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">Weekly mastery growth</h3>
        <div className="h-64">
          <Line data={lineData} options={lineOptions} aria-label="Line chart showing weekly mastery growth" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-neutral-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-neutral-900">Course completion</h3>
        <div className="h-48 w-48">
          <Doughnut data={doughnutData} options={doughnutOptions} aria-label="Doughnut chart showing completion rates" />
        </div>
        <p className="text-sm text-neutral-600">You are ahead of 87% of learners this term.</p>
      </div>
    </div>
  );
}
