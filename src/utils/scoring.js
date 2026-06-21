import {
  LEETCODE_THRESHOLDS,
  CODECHEF_THRESHOLDS,
  CGPA_THRESHOLDS,
  PROJECT_POINTS,
  INTERNSHIP_POINTS,
  QUIZ_MAX_POINTS,
  TOTAL_QUIZ_QUESTIONS,
} from '../data/scoringConfig.js'
import { QUIZ_QUESTIONS } from '../data/quizQuestions.js'

function matchThreshold(thresholds, value) {
  const match = thresholds.find((band) => value >= band.min && value <= band.max)
  return match ? match.points : 0
}

export function computeLeetcodeScore(leetcodeCount) {
  return matchThreshold(LEETCODE_THRESHOLDS, Number(leetcodeCount) || 0)
}

export function computeCodechefScore(codechefCount) {
  return matchThreshold(CODECHEF_THRESHOLDS, Number(codechefCount) || 0)
}

export function computeDSAScore(leetcodeCount, codechefCount) {
  return computeLeetcodeScore(leetcodeCount) + computeCodechefScore(codechefCount)
}

export function computeCGPAScore(cgpa) {
  return matchThreshold(CGPA_THRESHOLDS, Number(cgpa) || 0)
}

export function computeProjectScore(projects) {
  return PROJECT_POINTS[projects] ?? 0
}

export function computeInternshipScore(internship) {
  return INTERNSHIP_POINTS[internship] ?? 0
}

/** Counts how many of the 8 quiz questions were answered correctly. */
export function countCorrectAnswers(quizAnswers) {
  return QUIZ_QUESTIONS.reduce((count, q) => {
    return quizAnswers[q.id] === q.correctAnswer ? count + 1 : count
  }, 0)
}

export function computeQuizScore(quizAnswers) {
  const correct = countCorrectAnswers(quizAnswers)
  return (correct / TOTAL_QUIZ_QUESTIONS) * QUIZ_MAX_POINTS
}

/**
 * Computes the full readiness score breakdown from profile + quiz answers.
 * Returns each component rounded to 1 decimal plus the total out of 100.
 */
export function computeReadinessScore(profile, quizAnswers) {
  const dsa = computeDSAScore(profile.leetcode, profile.codechef)
  const cgpaScore = computeCGPAScore(profile.cgpa)
  const projectScore = computeProjectScore(profile.projects)
  const internshipScore = computeInternshipScore(profile.internship)
  const quizScore = computeQuizScore(quizAnswers)
  const correctAnswers = countCorrectAnswers(quizAnswers)

  const rawTotal = dsa + cgpaScore + projectScore + internshipScore + quizScore
  const total = Math.round(rawTotal * 10) / 10

  return {
    dsa,
    cgpa: cgpaScore,
    projects: projectScore,
    internship: internshipScore,
    quiz: Math.round(quizScore * 10) / 10,
    correctAnswers,
    total,
  }
}
