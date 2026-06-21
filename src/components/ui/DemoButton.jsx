import { useAssessment } from '../../context/AssessmentContext.jsx'
import { demoProfile } from '../../data/demoProfile.js'

export default function DemoButton({ className = '' }) {
  const { loadDemoProfile } = useAssessment()

  return (
    <button
      type="button"
      onClick={() => loadDemoProfile(demoProfile)}
      className={`inline-flex items-center gap-2 rounded-md border border-dashed border-muted px-4 py-2 font-mono text-xs text-muted transition-colors duration-150 hover:border-accent hover:text-accent ${className}`}
    >
      <span aria-hidden="true">⚡</span>
      Try Demo Profile
    </button>
  )
}
