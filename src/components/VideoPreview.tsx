import Link from 'next/link'

export default function VideoPreview({ slug }: { slug?: string }) {
  if (!slug) return null

  return (
    <>
      <h2 id="preview">Video Preview</h2>
      <p>
        This is a looping video showing how this example behaves. Click it to
        open the live example in a new window:
      </p>

      <Link href={`/live/${slug}`} target="_blank">
        <video
          className="rounded-lg border border-slate-200 object-cover p-4 shadow-lg dark:border-slate-800"
          src={`/videos/${slug}/video.mp4`}
          controls
          muted
          loop
          autoPlay
          height={600}
          width={800}
        />
      </Link>
    </>
  )
}
