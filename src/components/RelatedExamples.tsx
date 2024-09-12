import type { Example } from '@/lib/examples'
import Link from 'next/link'
import { Tags } from './Gallery'
import { Prose } from '@/components/Prose'

export function RelatedExamples({ examples }: { examples: Example[] }) {
  if (examples.length === 0) {
    return null
  }

  return (
    <div>
      <Prose>
        <h2>Similar Examples</h2>
      </Prose>
      <div className="flex flex-col gap-0 divide-y divide-gray-200">
        {examples.map((example) => (
          <RelatedExample key={example.slug} example={example} />
        ))}
      </div>
    </div>
  )
}

export function RelatedExample({ example }: { example: Example }) {
  return (
    <article
      key={example.slug}
      className="relative isolate flex flex-col gap-8 py-12 lg:flex-row"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:w-40 lg:shrink-0">
        <Link href={`/${example.slug}`}>
          <img
            src={`/videos/${example.slug}/thumb.png`}
            alt=""
            className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
          />
        </Link>
      </div>
      <div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/${example.slug}`}>{example.title}</Link>
          </h3>
          <div className="my-4 text-xs">
            <Tags tags={example.tags} />
          </div>
          <p className="mb-2 mt-1 text-sm leading-6 text-gray-600">
            {example.description}
          </p>
        </div>
      </div>
    </article>
  )
}
