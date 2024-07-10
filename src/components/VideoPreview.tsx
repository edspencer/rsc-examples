import Link from 'next/link'

export default function VideoPreview({ slug }: { slug?: string }) {
  if (!slug) return null

  return (
    <>
      <h2 id="preview">Video Preview</h2>
      <p>
        In case the iframe doesn't work for some reason, this is a looping video
        of what you would see. Click the video to open the full page example in
        a new tab.
      </p>

      <Link href={`/examples/${slug}`} target="_blank">
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
