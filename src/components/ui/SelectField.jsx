export default function SelectField({ label, value, onChange, options, id, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-display text-sm font-medium text-paper">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-hairline bg-ink px-3.5 py-2.5 font-mono text-sm text-paper focus:border-accent focus:outline-none"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  )
}
