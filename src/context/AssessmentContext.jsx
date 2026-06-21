import { createContext, useContext, useState, useCallback, useMemo } from 'react'

const AssessmentContext = createContext(null)

export const STEPS = ['profile', 'self-assessment', 'quiz', 'results']

const initialProfile = {
  leetcode: '',
  codechef: '',
  cgpa: '',
  projects: '', // '0' | '1' | '2' | '3+'
  internship: '', // 'yes' | 'no'
}

const initialConfidence = {
  dbms: null,
  os: null,
  cn: null,
  oop: null,
}

const initialQuizAnswers = {} // { [questionId]: selectedOption }

export function AssessmentProvider({ children }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [profile, setProfile] = useState(initialProfile)
  const [confidence, setConfidence] = useState(initialConfidence)
  const [quizAnswers, setQuizAnswers] = useState(initialQuizAnswers)

  const currentStep = STEPS[stepIndex]

  const updateProfile = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }, [])

  const updateConfidence = useCallback((subject, value) => {
    setConfidence((prev) => ({ ...prev, [subject]: value }))
  }, [])

  const answerQuizQuestion = useCallback((questionId, option) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }))
  }, [])

  // ---- Validation gates: a step can't be left until its data is complete ----
  const isProfileValid = useMemo(() => {
    const { leetcode, codechef, cgpa, projects, internship } = profile
    if (leetcode === '' || codechef === '' || cgpa === '') return false
    const lc = Number(leetcode)
    const cc = Number(codechef)
    const gpa = Number(cgpa)
    if (Number.isNaN(lc) || lc < 0) return false
    if (Number.isNaN(cc) || cc < 0) return false
    if (Number.isNaN(gpa) || gpa < 0 || gpa > 10) return false
    if (!projects) return false
    if (!internship) return false
    return true
  }, [profile])

  const isConfidenceValid = useMemo(() => {
    return Object.values(confidence).every((v) => v !== null && v >= 1 && v <= 5)
  }, [confidence])

  const isQuizValid = useMemo(() => {
    return Object.keys(quizAnswers).length === 8
  }, [quizAnswers])

  const validityByStep = {
    profile: isProfileValid,
    'self-assessment': isConfidenceValid,
    quiz: isQuizValid,
    results: true,
  }

  const canAdvance = validityByStep[currentStep]

  const nextStep = useCallback(() => {
    setStepIndex((prev) => {
      if (!validityByStep[STEPS[prev]]) return prev
      return Math.min(prev + 1, STEPS.length - 1)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileValid, isConfidenceValid, isQuizValid, currentStep])

  const previousStep = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goToStep = useCallback((stepName) => {
    const targetIndex = STEPS.indexOf(stepName)
    if (targetIndex === -1) return
    // Only allow jumping to a step if all prior steps are valid
    for (let i = 0; i < targetIndex; i += 1) {
      if (!validityByStep[STEPS[i]]) return
    }
    setStepIndex(targetIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileValid, isConfidenceValid, isQuizValid])

  const loadDemoProfile = useCallback((demo) => {
    setProfile(demo.profile)
    setConfidence(demo.confidence)
    setQuizAnswers({})
    setStepIndex(0)
  }, [])

  const resetAssessment = useCallback(() => {
    setProfile(initialProfile)
    setConfidence(initialConfidence)
    setQuizAnswers({})
    setStepIndex(0)
  }, [])

  const value = {
    stepIndex,
    currentStep,
    steps: STEPS,
    profile,
    confidence,
    quizAnswers,
    updateProfile,
    updateConfidence,
    answerQuizQuestion,
    isProfileValid,
    isConfidenceValid,
    isQuizValid,
    canAdvance,
    nextStep,
    previousStep,
    goToStep,
    loadDemoProfile,
    resetAssessment,
  }

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return ctx
}
