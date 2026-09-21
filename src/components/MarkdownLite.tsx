/** Renders `**bold**` markdown (the only markdown lesson content uses) as <strong>. */
export function MarkdownLite({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}
