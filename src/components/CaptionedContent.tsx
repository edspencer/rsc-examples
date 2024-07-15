import clsx from 'clsx'

export default function CaptionedContent({
  children,
  caption,
  className = '',
}: {
  children: React.ReactNode
  caption?: string
  className?: string
}) {
  return (
    <figure className={clsx('my-6', className)}>
      {children}
      {caption ? (
        <figcaption className="pt-2 text-center text-sm italic text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
