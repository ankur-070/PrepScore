import Card from '../ui/Card.jsx'

export default function RecommendationsList({ recommendations }) {
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-semibold text-paper">What to focus on next</h2>
      <ol className="flex flex-col gap-3">
        {recommendations.map((tip, i) => (
          <li key={tip} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[10px] text-accent">
              {i + 1}
            </span>
            <span className="text-sm text-paper">{tip}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
