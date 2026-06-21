import { useAssessment } from '../../context/AssessmentContext.jsx'
import { SUBJECTS } from '../../data/subjects.js'
import { questionsBySubject } from '../../data/quizQuestions.js'
import Card from '../ui/Card.jsx'
import RadioGroup from '../ui/RadioGroup.jsx'
import Button from '../ui/Button.jsx'

export default function QuizStep() {
  const { quizAnswers, answerQuizQuestion, isQuizValid, nextStep, previousStep } = useAssessment()

  const answeredCount = Object.keys(quizAnswers).length

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isQuizValid) nextStep()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-accent">Step 3 of 4</span>
        <h1 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          Quick reality check
        </h1>
        <p className="text-sm text-muted">
          8 short questions, 2 per subject. This isn't meant to trip you up — it's
          here to see how your actual knowledge lines up with the confidence you
          just rated yourself.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {SUBJECTS.map((subject) => {
          const questions = questionsBySubject(subject.key)
          return (
            <Card key={subject.key} className="flex flex-col gap-5">
              <p className="font-display text-sm font-medium text-paper">{subject.fullName}</p>
              <div className="flex flex-col gap-5">
                {questions.map((q, i) => (
                  <div key={q.id} className="flex flex-col gap-2.5">
                    <p className="text-sm text-paper">
                      <span className="mr-1.5 font-mono text-xs text-muted">
                        Q{i + 1}.
                      </span>
                      {q.question}
                    </p>
                    <RadioGroup
                      name={q.id}
                      value={quizAnswers[q.id] ?? null}
                      onChange={(v) => answerQuizQuestion(q.id, v)}
                      options={q.options.map((opt) => ({ value: opt, label: opt }))}
                      layout="grid"
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )
        })}

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {isQuizValid
              ? "All answered — let's see your report."
              : `${answeredCount} of 8 answered.`}
          </p>
          <div className="flex w-full gap-3 sm:w-auto">
            <Button type="button" variant="ghost" onClick={previousStep} className="flex-1 sm:flex-none">
              ← Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isQuizValid}
              className="flex-1 sm:flex-none"
            >
              See My Readiness Report →
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
