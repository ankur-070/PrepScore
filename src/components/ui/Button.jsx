const VARIANTS = {
  primary: 'bg-accent text-ink hover:bg-accent/90 disabled:bg-hairline disabled:text-muted',
  ghost: 'bg-transparent text-paper border border-hairline hover:border-muted disabled:text-muted disabled:border-hairline',
  verified: 'bg-verified text-ink hover:bg-verified/90',
  link: 'bg-transparent text-accent hover:underline px-0',
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-display text-sm font-medium tracking-wide transition-colors duration-150 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
