import ProgressRail from './ProgressRail.jsx'
import Footer from './Footer.jsx'

export default function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="border-b border-hairline px-4 py-4 sm:px-6 sm:py-5 md:px-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-paper">
              Mock OA Readiness Predictor
            </p>
            <p className="font-mono text-xs text-muted">
              Verified placement readiness, not guessed.
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <ProgressRail />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-3xl animate-fadeIn">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
