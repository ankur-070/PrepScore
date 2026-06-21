import { MAX_SCORES } from '../data/scoringConfig.js'

const WEAK_DSA_THRESHOLD = MAX_SCORES.dsa * 0.5 // below 20/40
const WEAK_SUBJECT_PERCENT = 50 // 0 or 1 of 2 correct

const SUBJECT_RECOMMENDATIONS = {
  dbms: 'Revise normalization, joins, indexing, and transactions.',
  os: 'Revise scheduling, memory management, and synchronization.',
  cn: 'Focus on HTTP/HTTPS, OSI model, TCP vs UDP.',
  oop: 'Practice OOP principles and Java implementation questions.',
}

/**
 * Generates a personalized, ordered list of prep recommendations from the
 * score breakdown, confidence analysis, and profile.
 */
export function buildRecommendations(breakdown, analysis, profile) {
  const recommendations = []

  if (breakdown.dsa < WEAK_DSA_THRESHOLD) {
    recommendations.push('Solve 100+ additional LeetCode problems and participate in contests.')
  }

  analysis.forEach((subject) => {
    if (subject.actualPercent <= WEAK_SUBJECT_PERCENT) {
      const tip = SUBJECT_RECOMMENDATIONS[subject.subjectKey]
      if (tip) recommendations.push(tip)
    }
  })

  if (profile.internship === 'no') {
    recommendations.push('Gain practical experience through internships or open-source contributions.')
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "You're in a strong position across the board — keep your momentum with timed mock assessments."
    )
  }

  return recommendations
}
