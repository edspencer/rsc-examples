import Link from 'next/link'
import VideoPreview from '@/components/VideoPreview'

export function FullPageDemo({
  slug,
  fullPage,
}: {
  slug?: string
  fullPage: boolean
}) {
  if (!fullPage) return null

  return (
    <div className="mt-12">
      <h2>Live Demo</h2>
      <p>
        This example can't be easily inlined as it demonstrates how a full-page
        feels to the end user. Here it is inside an iframe, and there's a
        looping video below too.
      </p>
      <p>
        <Link target="_blank" href={`/examples/${slug}`}>
          Click here to test it out yourself
        </Link>
      </p>
      <iframe
        src={`/examples/${slug}`}
        className="h-96 w-full rounded-md border border-slate-500"
      />
      <figcaption className="text-center text-sm italic text-slate-500">
        This is an iframe pointing to{' '}
        <Link target="_blank" href={`/examples/${slug}`}>
          /examples/{slug}
        </Link>
      </figcaption>
      <VideoPreview slug={slug} />
    </div>
  )
}
