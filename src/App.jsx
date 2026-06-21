import { useAssessment } from './context/AssessmentContext.jsx'
import PageShell from './components/layout/PageShell.jsx'
import ProfileStep from './components/steps/ProfileStep.jsx'
import SelfAssessmentStep from './components/steps/SelfAssessmentStep.jsx'
import QuizStep from './components/steps/QuizStep.jsx'
import ResultsStep from './components/steps/ResultsStep.jsx'

export default function App() {
  const { currentStep } = useAssessment()
  return (
    <PageShell>
      {currentStep === 'profile' && <ProfileStep />}
      {currentStep === 'self-assessment' && <SelfAssessmentStep />}
      {currentStep === 'quiz' && <QuizStep />}
      {currentStep === 'results' && <ResultsStep />}
    </PageShell>
  )
}
