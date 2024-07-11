import Link from 'next/link'
import Image from 'next/image'

export default function ExampleGallery({ examples }: { examples: any[] }) {
  return (
    <div className="font-display">
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2">
        {examples.map((example) => (
          <ExampleGalleryItem key={example.slug} example={example} />
        ))}
      </div>
    </div>
  )
}

export function ExampleGalleryItem({ example }: { example: any }) {
  const { title, slug } = example

  return (
    <div className="example-box text-slate-700">
      <Link href={slug} className="mb-3 flex flex-col gap-4 hover:underline">
        <h4 className="text-slate-900">{example.galleryTitle || title}</h4>
        <div className="flex items-start gap-3">
          <Image
            className="aspect-[1/1] rounded-lg bg-gray-100 object-cover"
            src={`/videos/${slug}/thumb.png`}
            alt={title}
            height={75}
            width={75}
          />
          <p className="font-sans text-sm">{example.description}</p>
        </div>
      </Link>
      <Tags tags={example.tags} />
    </div>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 font-sans">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-slate-900">
      {tag}
    </span>
  )
}
