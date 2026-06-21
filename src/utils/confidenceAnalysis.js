import { SUBJECTS } from '../data/subjects.js'
import { questionsBySubject } from '../data/quizQuestions.js'

// A gap of 20 percentage points or less (i.e. within one confidence level)
// is treated as "accurate" rather than flagged as over/underestimating.
const ACCURATE_THRESHOLD = 20

/** 1-5 confidence rating -> percentage. 1->20%, 2->40%, ... 5->100%. */
export function predictedConfidenceToPercent(level) {
  if (!level) return 0
  return level * 20
}

/** Correct answers (0-2) for a subject -> percentage. 0->0%, 1->50%, 2->100%. */
export function quizPerformanceToPercent(correctCount, totalQuestions = 2) {
  if (!totalQuestions) return 0
  return (correctCount / totalQuestions) * 100
}

/** Counts correct answers for a single subject's quiz questions. */
export function getSubjectCorrectCount(subjectKey, quizAnswers) {
  const questions = questionsBySubject(subjectKey)
  return questions.reduce((count, q) => {
    return quizAnswers[q.id] === q.correctAnswer ? count + 1 : count
  }, 0)
}

function buildInsight(subjectLabel, status) {
  if (status === 'underestimated') {
    return `You performed better than expected in ${subjectLabel}.`
  }
  if (status === 'overestimated') {
    return `You may be overestimating your ${subjectLabel} preparation.`
  }
  return `Your self-assessment for ${subjectLabel} was right on target.`
}

/**
 * Runs the full confidence-vs-quiz comparison for every subject.
 * Returns one entry per subject with predicted/actual percentages,
 * the gap between them, a status, and a human-readable insight.
 */
export function analyzeConfidence(confidence, quizAnswers) {
  return SUBJECTS.map((subject) => {
    const questions = questionsBySubject(subject.key)
    const correctCount = getSubjectCorrectCount(subject.key, quizAnswers)
    const predictedPercent = predictedConfidenceToPercent(confidence[subject.key])
    const actualPercent = quizPerformanceToPercent(correctCount, questions.length)
    const gap = actualPercent - predictedPercent // positive = underestimated, negative = overestimated

    let status = 'accurate'
    if (gap >= ACCURATE_THRESHOLD) status = 'underestimated'
    else if (gap <= -ACCURATE_THRESHOLD) status = 'overestimated'

    return {
      subjectKey: subject.key,
      label: subject.label,
      fullName: subject.fullName,
      predictedPercent,
      actualPercent,
      gap,
      correctCount,
      totalQuestions: questions.length,
      status,
      insight: buildInsight(subject.fullName, status),
    }
  })
}

/**
 * Self-Assessment Accuracy: how close predicted confidence tracked actual
 * performance, averaged across all 4 subjects. 100% = perfectly calibrated,
 * 0% = maximally miscalibrated.
 */
export function computeSelfAssessmentAccuracy(confidence, quizAnswers) {
  const analysis = analyzeConfidence(confidence, quizAnswers)
  const avgAbsGap = analysis.reduce((sum, a) => sum + Math.abs(a.gap), 0) / analysis.length
  const accuracy = 100 - avgAbsGap
  return Math.round(Math.max(0, Math.min(100, accuracy)))
}

export function getUnderestimatedSubjects(analysis) {
  return analysis.filter((a) => a.status === 'underestimated')
}

export function getOverestimatedSubjects(analysis) {
  return analysis.filter((a) => a.status === 'overestimated')
}
