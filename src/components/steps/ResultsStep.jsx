import { useMemo } from 'react'
import { useAssessment } from '../../context/AssessmentContext.jsx'
import { computeReadinessScore } from '../../utils/scoring.js'
import { getTier } from '../../utils/tierPredictor.js'
import {
  analyzeConfidence,
  computeSelfAssessmentAccuracy,
  getUnderestimatedSubjects,
  getOverestimatedSubjects,
} from '../../utils/confidenceAnalysis.js'
import { buildStrengthsAndWeaknesses } from '../../utils/strengthsWeaknesses.js'
import { buildRecommendations } from '../../utils/recommendations.js'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import ScoreHero from '../results/ScoreHero.jsx'
import ConfidenceInsights from '../results/ConfidenceInsights.jsx'
import ConfidenceGapChart from '../results/ConfidenceGapChart.jsx'
import ReadinessRadar from '../results/ReadinessRadar.jsx'
import RecommendationsList from '../results/RecommendationsList.jsx'

export default function ResultsStep() {
  const { profile, confidence, quizAnswers, previousStep, resetAssessment } = useAssessment()

  const breakdown = useMemo(
    () => computeReadinessScore(profile, quizAnswers),
    [profile, quizAnswers]
  )
  const tier = useMemo(() => getTier(breakdown.total), [breakdown.total])
  const analysis = useMemo(
    () => analyzeConfidence(confidence, quizAnswers),
    [confidence, quizAnswers]
  )
  const accuracy = useMemo(
    () => computeSelfAssessmentAccuracy(confidence, quizAnswers),
    [confidence, quizAnswers]
  )
  const underestimated = useMemo(() => getUnderestimatedSubjects(analysis), [analysis])
  const overestimated = useMemo(() => getOverestimatedSubjects(analysis), [analysis])
  const { strengths, weaknesses } = useMemo(
    () => buildStrengthsAndWeaknesses(breakdown, analysis, profile),
    [breakdown, analysis, profile]
  )
  const recommendations = useMemo(
    () => buildRecommendations(breakdown, analysis, profile),
    [breakdown, analysis, profile]
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-accent">Step 4 of 4</span>
        <h1 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          Your Readiness Report
        </h1>
        <p className="text-sm text-muted">
          Here's where you stand, what's working, and what to do next.
        </p>
      </div>

      <ScoreHero score={breakdown.total} tier={tier} />

      {/* Tier detail, inline per simplified architecture */}
      <Card className="flex flex-col gap-2">
        <p className="font-display text-sm font-medium text-paper">
          Score range {tier.min}–{tier.max}: {tier.name}
        </p>
        <p className="text-xs text-muted">{tier.summary}</p>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-5">
          <ScoreChip label="DSA" value={breakdown.dsa} max={40} />
          <ScoreChip label="CGPA" value={breakdown.cgpa} max={15} />
          <ScoreChip label="Projects" value={breakdown.projects} max={20} />
          <ScoreChip label="Internship" value={breakdown.internship} max={10} />
          <ScoreChip label="Quiz" value={breakdown.quiz} max={15} />
        </div>
      </Card>

      {/* Strengths / Weaknesses, inline per simplified architecture */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="flex flex-col gap-2">
          <p className="font-display text-sm font-medium text-verified">Strengths</p>
          <ul className="flex flex-col gap-1.5">
            {strengths.map((item) => (
              <li key={item} className="text-sm text-paper">
                + {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col gap-2">
          <p className="font-display text-sm font-medium text-correction">Weaknesses</p>
          <ul className="flex flex-col gap-1.5">
            {weaknesses.map((item) => (
              <li key={item} className="text-sm text-paper">
                − {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <ReadinessRadar breakdown={breakdown} />

      <ConfidenceInsights
        accuracy={accuracy}
        underestimated={underestimated}
        overestimated={overestimated}
      />

      <ConfidenceGapChart analysis={analysis} />

      <RecommendationsList recommendations={recommendations} />

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={previousStep} className="w-full sm:w-auto">
          ← Back to Quiz
        </Button>
        <Button type="button" variant="ghost" onClick={resetAssessment} className="w-full sm:w-auto">
          Start Over
        </Button>
      </div>
    </div>
  )
}

function ScoreChip({ label, value, max }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{label}</span>
      <span className="font-mono text-sm text-paper">
        {value}<span className="text-muted">/{max}</span>
      </span>
    </div>
  )
}
