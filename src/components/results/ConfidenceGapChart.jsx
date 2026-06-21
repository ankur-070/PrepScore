import { Bar } from 'react-chartjs-2'
import { chartTheme, baseTooltipStyle } from '../../lib/chartSetup.js'
import Card from '../ui/Card.jsx'

export default function ConfidenceGapChart({ analysis }) {
  const labels = analysis.map((a) => a.label)

  const data = {
    labels,
    datasets: [
      {
        label: 'Predicted Confidence',
        data: analysis.map((a) => a.predictedPercent),
        backgroundColor: 'rgba(154, 165, 177, 0.55)',
        borderRadius: 4,
        barThickness: 18,
      },
      {
        label: 'Actual Performance',
        data: analysis.map((a) => a.actualPercent),
        backgroundColor: analysis.map((a) =>
          a.status === 'overestimated'
            ? 'rgba(255, 107, 94, 0.85)'
            : 'rgba(61, 220, 151, 0.85)'
        ),
        borderRadius: 4,
        barThickness: 18,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: chartTheme.muted,
          font: { family: chartTheme.fontFamily, size: 10 },
          maxRotation: 30,
          minRotation: 0,
          autoSkip: false,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: chartTheme.muted,
          font: { family: chartTheme.fontFamily, size: 10 },
          callback: (v) => `${v}%`,
        },
        grid: { color: chartTheme.hairline },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          color: chartTheme.muted,
          font: { family: chartTheme.fontFamily, size: 11 },
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      tooltip: {
        ...baseTooltipStyle,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${Math.round(ctx.parsed.y)}%`,
        },
      },
    },
  }

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-semibold text-paper">Predicted vs Actual</h2>
        <p className="text-xs text-muted">
          Grey bars are what you predicted. Green means you undersold yourself, red means
          it's worth a revisit.
        </p>
      </div>
      <div className="h-60 w-full xs:h-64 sm:h-72">
        <Bar data={data} options={options} />
      </div>
    </Card>
  )
}
