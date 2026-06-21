// All thresholds below come directly from the product spec.
// Bands are checked in order; each threshold is inclusive of its `min`.

export const LEETCODE_THRESHOLDS = [
  { min: 0, max: 50, points: 5 },
  { min: 51, max: 100, points: 10 },
  { min: 101, max: 200, points: 15 },
  { min: 201, max: 300, points: 20 },
  { min: 301, max: Infinity, points: 25 },
]

export const CODECHEF_THRESHOLDS = [
  { min: 0, max: 100, points: 2 },
  { min: 101, max: 300, points: 5 },
  { min: 301, max: 500, points: 10 },
  { min: 501, max: Infinity, points: 15 },
]

// Spec only defines bands from 7.0 CGPA upward. Anything below 7.0 isn't
// covered by the spec, so it's treated as 0 points here rather than guessed at.
export const CGPA_THRESHOLDS = [
  { min: 8.5, max: Infinity, points: 15 },
  { min: 8.0, max: 8.49, points: 12 },
  { min: 7.5, max: 7.99, points: 10 },
  { min: 7.0, max: 7.49, points: 7 },
  { min: 0, max: 6.99, points: 0 },
]

export const PROJECT_POINTS = {
  '0': 0,
  '1': 10,
  '2': 15,
  '3+': 20,
}

export const INTERNSHIP_POINTS = {
  yes: 10,
  no: 0,
}

export const QUIZ_MAX_POINTS = 15
export const TOTAL_QUIZ_QUESTIONS = 8

export const MAX_SCORES = {
  dsa: 40,
  cgpa: 15,
  projects: 20,
  internship: 10,
  quiz: 15,
  total: 100,
}
