const LAYOUT_CLASSES = {
  row: 'flex flex-row flex-wrap',
  column: 'flex flex-col',
  grid: 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2',
}

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options, // [{ value, label, sublabel? }]
  layout = 'row', // 'row' | 'column' | 'grid'
  size = 'md', // 'md' | 'sm'
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      {label && (
        <legend className="font-display text-sm font-medium text-paper">{label}</legend>
      )}
      <div className={`gap-2 ${LAYOUT_CLASSES[layout] ?? LAYOUT_CLASSES.row}`}>
        {options.map((opt) => {
          const isSelected = value === opt.value
          return (
            <label
              key={opt.value}
              className={`flex min-w-0 cursor-pointer items-center justify-center rounded-md border px-4 py-2.5 text-center transition-colors duration-150 ${
                size === 'sm' ? 'text-xs' : 'text-sm'
              } ${
                isSelected
                  ? 'border-accent bg-accent/10 text-paper'
                  : 'border-hairline bg-ink text-muted hover:border-muted hover:text-paper'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className="break-words font-mono">{opt.label}</span>
              {opt.sublabel && (
                <span className="ml-1.5 whitespace-nowrap text-muted">{opt.sublabel}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
