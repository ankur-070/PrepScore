export default function Card({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`rounded-lg border border-hairline bg-inkRaised p-5 sm:p-6 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
