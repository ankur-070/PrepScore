export default function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline px-4 py-5 sm:px-6 sm:py-6 md:px-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="font-mono text-xs text-muted">
          <p>Developed by: Ankur Singh</p>
          <p>ankursingh9998@gmail.com</p>
        </div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-hairline px-4 py-2 font-display text-xs font-medium text-paper transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          Built for Digital Heroes
        </a>
      </div>
    </footer>
  )
}
