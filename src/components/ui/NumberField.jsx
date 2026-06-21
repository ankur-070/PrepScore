export default function NumberField({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max,
  step = 1,
  hint,
  id,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-display text-sm font-medium text-paper">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-hairline bg-ink px-3.5 py-2.5 font-mono text-sm text-paper placeholder:text-muted focus:border-accent focus:outline-none"
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  )
}
