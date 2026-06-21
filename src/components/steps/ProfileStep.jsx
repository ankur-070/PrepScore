import { useAssessment } from '../../context/AssessmentContext.jsx'
import Card from '../ui/Card.jsx'
import NumberField from '../ui/NumberField.jsx'
import SelectField from '../ui/SelectField.jsx'
import RadioGroup from '../ui/RadioGroup.jsx'
import Button from '../ui/Button.jsx'
import DemoButton from '../ui/DemoButton.jsx'

const PROJECT_OPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3+', label: '3+' },
]

const INTERNSHIP_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export default function ProfileStep() {
  const { profile, updateProfile, isProfileValid, nextStep } = useAssessment()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isProfileValid) nextStep()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-accent">Step 1 of 4</span>
        <h1 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          Let's get a quick snapshot of where you stand
        </h1>
        <p className="text-sm text-muted">
          No judgment here — just numbers. This takes about a minute, and it's the
          baseline everything else builds on.
        </p>
      </div>

      <Card className="flex flex-col gap-3">
        <p className="font-display text-sm font-medium text-paper">In a hurry?</p>
        <p className="text-xs text-muted">
          Load a sample profile to see how the whole report works before filling in your own numbers.
        </p>
        <div>
          <DemoButton />
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <NumberField
            id="leetcode"
            label="LeetCode problems solved"
            value={profile.leetcode}
            onChange={(v) => updateProfile('leetcode', v)}
            placeholder="e.g. 120"
            hint="Total across all difficulties — your profile page has this number."
          />
          <NumberField
            id="codechef"
            label="CodeChef problems solved"
            value={profile.codechef}
            onChange={(v) => updateProfile('codechef', v)}
            placeholder="e.g. 350"
            hint="Don't have a CodeChef account? It's fine to enter 0."
          />
          <NumberField
            id="cgpa"
            label="Current CGPA"
            value={profile.cgpa}
            onChange={(v) => updateProfile('cgpa', v)}
            placeholder="e.g. 8.4"
            min={0}
            max={10}
            step={0.01}
            hint="On a 10-point scale. Use your latest available semester."
          />
          <SelectField
            id="projects"
            label="Number of projects"
            value={profile.projects}
            onChange={(v) => updateProfile('projects', v)}
            options={PROJECT_OPTIONS}
            hint="Personal, academic, or hackathon projects all count."
          />
          <div className="sm:col-span-2">
            <RadioGroup
              label="Internship experience"
              name="internship"
              value={profile.internship}
              onChange={(v) => updateProfile('internship', v)}
              options={INTERNSHIP_OPTIONS}
            />
            <p className="mt-1.5 text-xs text-muted">
              Includes remote, part-time, or short-term internships — they all count.
            </p>
          </div>
        </Card>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            {isProfileValid
              ? "Looks good — you're ready for the next step."
              : 'Fill in every field to continue.'}
          </p>
          <Button type="submit" variant="primary" disabled={!isProfileValid} className="w-full sm:w-auto">
            Continue to Self-Assessment →
          </Button>
        </div>
      </form>
    </div>
  )
}
