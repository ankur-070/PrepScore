import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

export const chartTheme = {
  ink: '#0B0F14',
  paper: '#F2F4F0',
  muted: '#9AA5B1',
  verified: '#3DDC97',
  correction: '#FF6B5E',
  accent: '#5B8DEF',
  hairline: '#222A35',
  fontFamily: '"JetBrains Mono", monospace',
}

export const baseTooltipStyle = {
  backgroundColor: '#121821',
  borderColor: '#222A35',
  borderWidth: 1,
  titleColor: '#F2F4F0',
  bodyColor: '#9AA5B1',
  titleFont: { family: chartTheme.fontFamily, size: 12 },
  bodyFont: { family: chartTheme.fontFamily, size: 12 },
  padding: 10,
  cornerRadius: 6,
  displayColors: false,
}
