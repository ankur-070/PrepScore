import { useAssessment } from '../../context/AssessmentContext.jsx'
import { SUBJECTS, CONFIDENCE_LEVELS } from '../../data/subjects.js'
import Card from '../ui/Card.jsx'
import RadioGroup from '../ui/RadioGroup.jsx'
import Button from '../ui/Button.jsx'

export default function SelfAssessmentStep() {
  const { confidence, updateConfidence, isConfidenceValid, nextStep, previousStep } = useAssessment()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isConfidenceValid) nextStep()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-accent">Step 2 of 4</span>
        <h1 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          Before the quiz, take a guess
        </h1>
        <p className="text-sm text-muted">
          Rate how confident you feel in each subject right now. There's no wrong
          answer — in the next step, a short quiz will check how accurate your gut
          feeling actually is, and that comparison is one of the most useful parts
          of this report.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {SUBJECTS.map((subject) => (
          <Card key={subject.key} className="flex flex-col gap-3">
            <div>
              <p className="font-display text-sm font-medium text-paper">{subject.fullName}</p>
              <p className="text-xs text-muted">{subject.description}</p>
            </div>
            <RadioGroup
              name={`confidence-${subject.key}`}
              value={confidence[subject.key]}
              onChange={(v) => updateConfidence(subject.key, v)}
              options={CONFIDENCE_LEVELS}
              size="sm"
            />
          </Card>
        ))}

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {isConfidenceValid
              ? "All set — let's see how accurate that was."
              : 'Rate every subject to continue.'}
          </p>
          <div className="flex w-full gap-3 sm:w-auto">
            <Button type="button" variant="ghost" onClick={previousStep} className="flex-1 sm:flex-none">
              ← Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isConfidenceValid}
              className="flex-1 sm:flex-none"
            >
              Continue to Quiz →
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
