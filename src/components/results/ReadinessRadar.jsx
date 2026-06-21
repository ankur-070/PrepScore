import { Radar } from 'react-chartjs-2'
import { chartTheme, baseTooltipStyle } from '../../lib/chartSetup.js'
import { MAX_SCORES } from '../../data/scoringConfig.js'
import Card from '../ui/Card.jsx'

export default function ReadinessRadar({ breakdown }) {
  const labels = ['DSA', 'Academics', 'Projects', 'Internship', 'CS Fundamentals']
  const values = [
    (breakdown.dsa / MAX_SCORES.dsa) * 100,
    (breakdown.cgpa / MAX_SCORES.cgpa) * 100,
    (breakdown.projects / MAX_SCORES.projects) * 100,
    (breakdown.internship / MAX_SCORES.internship) * 100,
    (breakdown.quiz / MAX_SCORES.quiz) * 100,
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Readiness',
        data: values,
        backgroundColor: 'rgba(91, 141, 239, 0.18)',
        borderColor: chartTheme.accent,
        borderWidth: 2,
        pointBackgroundColor: chartTheme.accent,
        pointBorderColor: chartTheme.ink,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 25,
        },
        grid: { color: chartTheme.hairline },
        angleLines: { color: chartTheme.hairline },
        pointLabels: {
          color: chartTheme.muted,
          font: { family: chartTheme.fontFamily, size: 11 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        ...baseTooltipStyle,
        callbacks: {
          label: (ctx) => `${Math.round(ctx.parsed.r)}% of max`,
        },
      },
    },
  }

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-semibold text-paper">Readiness Breakdown</h2>
        <p className="text-xs text-muted">Each axis shown as a percentage of its maximum possible score.</p>
      </div>
      <div className="h-60 w-full xs:h-64 sm:h-72">
        <Radar data={data} options={options} />
      </div>
    </Card>
  )
}
