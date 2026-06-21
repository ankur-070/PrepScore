import { useEffect, useRef, useState } from 'react'

const TONE_STYLES = {
  building: 'border-correction/40 text-correction',
  steady: 'border-accent/40 text-accent',
  strong: 'border-accent/40 text-accent',
  excellent: 'border-verified/40 text-verified',
}

export default function ScoreHero({ score, tier }) {
  const [displayScore, setDisplayScore] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayScore(score)
      return undefined
    }

    const durationMs = 900
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setDisplayScore(Math.round(eased * score * 10) / 10)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [score])

  return (
    <div className="flex flex-col items-start gap-5 rounded-xl border border-hairline bg-inkRaised p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-5xl font-semibold tabular-nums text-paper xs:text-6xl md:text-7xl">
          {displayScore.toFixed(0)}
        </span>
        <span className="font-mono text-base text-muted xs:text-lg">/ 100</span>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-auto md:items-end md:text-right">
        <span
          className={`inline-flex w-fit max-w-full items-center rounded-full border px-3 py-1 font-display text-sm font-medium ${
            TONE_STYLES[tier.tone] ?? TONE_STYLES.building
          }`}
        >
          {tier.name}
        </span>
        {tier.companies.length > 0 && (
          <span className="text-xs text-muted">
            e.g. {tier.companies.join(', ')}
          </span>
        )}
        <p className="max-w-xs text-xs text-muted md:text-right">{tier.summary}</p>
      </div>
    </div>
  )
}
