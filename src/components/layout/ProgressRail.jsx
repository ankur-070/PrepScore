import { useAssessment } from '../../context/AssessmentContext.jsx'

const STEP_LABELS = {
  profile: 'Profile',
  'self-assessment': 'Self-Assessment',
  quiz: 'Verification Quiz',
  results: 'Readiness Report',
}

export default function ProgressRail() {
  const { steps, stepIndex, currentStep, goToStep, isProfileValid, isConfidenceValid, isQuizValid } =
    useAssessment()

  const validityByStep = {
    profile: isProfileValid,
    'self-assessment': isConfidenceValid,
    quiz: isQuizValid,
    results: true,
  }

  return (
    <nav
      aria-label="Assessment progress"
      className="flex shrink-0 flex-row gap-2 overflow-x-auto px-4 py-4 md:w-56 md:flex-col md:gap-1 md:overflow-visible md:border-r md:border-hairline md:px-0 md:py-8"
    >
      {steps.map((step, i) => {
        const isComplete = i < stepIndex || (i === stepIndex && validityByStep[step] && step !== currentStep)
        const isCurrent = step === currentStep
        const isReachable = i === 0 || steps.slice(0, i).every((s) => validityByStep[s])

        return (
          <button
            key={step}
            type="button"
            onClick={() => isReachable && goToStep(step)}
            disabled={!isReachable}
            aria-current={isCurrent ? 'step' : undefined}
            className={`group flex shrink-0 items-center gap-3 rounded-md px-4 py-2.5 text-left transition-colors duration-150 md:px-5 ${
              isCurrent ? 'bg-inkRaised' : ''
            } ${isReachable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
          >
            <span
              className={`font-mono text-xs ${
                isCurrent ? 'text-accent' : i < stepIndex ? 'text-verified' : 'text-muted'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`whitespace-nowrap font-display text-sm font-medium ${
                isCurrent ? 'text-paper' : i < stepIndex ? 'text-muted' : 'text-muted'
              }`}
            >
              {STEP_LABELS[step]}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
