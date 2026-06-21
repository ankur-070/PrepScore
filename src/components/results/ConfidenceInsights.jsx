import Card from '../ui/Card.jsx'

export default function ConfidenceInsights({ accuracy, underestimated, overestimated }) {
  return (
    <Card className="flex flex-col gap-5 border-accent/30">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-accent">Signature insight</p>
        <h2 className="font-display text-xl font-semibold text-paper">
          How Accurate Was Your Self-Assessment?
        </h2>
      </div>

      <div className="flex items-end gap-2">
        <span className="font-display text-4xl font-semibold tabular-nums text-paper">
          {accuracy}%
        </span>
        <span className="mb-1 font-mono text-xs text-muted">Self-Assessment Accuracy</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="font-display text-sm font-medium text-verified">You underestimated:</p>
          {underestimated.length === 0 ? (
            <p className="text-xs text-muted">Nothing here — no subject outperformed your prediction.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {underestimated.map((item) => (
                <li key={item.subjectKey} className="flex items-start gap-2 text-sm text-paper">
                  <span className="mt-0.5 text-verified" aria-hidden="true">✓</span>
                  <span>{item.insight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-display text-sm font-medium text-correction">You overestimated:</p>
          {overestimated.length === 0 ? (
            <p className="text-xs text-muted">Nothing here — your confidence held up under testing.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {overestimated.map((item) => (
                <li key={item.subjectKey} className="flex items-start gap-2 text-sm text-paper">
                  <span className="mt-0.5 text-correction" aria-hidden="true">⚠</span>
                  <span>{item.insight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  )
}
