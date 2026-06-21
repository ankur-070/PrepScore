import { MAX_SCORES } from '../data/scoringConfig.js'

// Thresholds are intentionally generous fractions of each component's max
// score, so a callout only fires when it's genuinely a stand-out strength
// or a genuine gap, not just slightly above/below average.
const STRONG_DSA_THRESHOLD = MAX_SCORES.dsa * 0.5 // 20/40
const WEAK_DSA_THRESHOLD = MAX_SCORES.dsa * 0.25 // 10/40
const STRONG_CGPA_THRESHOLD = 12 // out of 15
const STRONG_QUIZ_THRESHOLD = MAX_SCORES.quiz * 0.75 // 11.25/15 (6+/8 correct)
const WEAK_SUBJECT_PERCENT = 50 // 0 or 1 of 2 correct

/**
 * Builds the Strengths and Weaknesses lists shown on the Results page.
 * `breakdown` comes from computeReadinessScore(), `analysis` from
 * analyzeConfidence(), and `profile` is the raw profile object.
 */
export function buildStrengthsAndWeaknesses(breakdown, analysis, profile) {
  const strengths = []
  const weaknesses = []

  // --- DSA ---
  if (breakdown.dsa >= STRONG_DSA_THRESHOLD) {
    strengths.push('Strong DSA profile')
  } else if (breakdown.dsa <= WEAK_DSA_THRESHOLD) {
    weaknesses.push('Limited DSA practice so far')
  }

  // --- Academics ---
  if (breakdown.cgpa >= STRONG_CGPA_THRESHOLD) {
    strengths.push('Excellent academics')
  }

  // --- CS fundamentals (overall quiz performance) ---
  if (breakdown.quiz >= STRONG_QUIZ_THRESHOLD) {
    strengths.push('Good CS fundamentals')
  }

  // --- Per-subject weaknesses, driven by actual quiz performance ---
  analysis.forEach((subject) => {
    if (subject.actualPercent <= WEAK_SUBJECT_PERCENT) {
      weaknesses.push(`Weak ${subject.fullName}`)
    }
  })

  // --- Projects ---
  if (profile.projects === '3+' || profile.projects === '2') {
    strengths.push('Solid project portfolio')
  } else {
    weaknesses.push('Low project exposure')
  }

  // --- Internship ---
  if (profile.internship === 'yes') {
    strengths.push('Real-world internship experience')
  } else {
    weaknesses.push('No internship experience')
  }

  return { strengths, weaknesses }
}
