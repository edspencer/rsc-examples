import Image from 'next/image'
import CaptionedContent from './CaptionedContent'

export default function Figure({
  className = '',
  src,
  caption,
  alt,
  width = 930,
  height = 600,
}: {
  className?: string
  src: string
  caption: string
  alt?: string
  width?: number
  height?: number
  href?: string
  target?: string
}) {
  return (
    <CaptionedContent className={className} caption={caption}>
      <div className="flex justify-center">
        <Image
          className="rounded-md"
          src={src}
          width={width}
          height={height}
          alt={alt ?? caption}
        />
      </div>
    </CaptionedContent>
  )
}
