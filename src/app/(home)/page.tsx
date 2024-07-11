import Link from 'next/link'

import Examples from '@/lib/examples'
import ExampleGallery from '@/components/Gallery'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'

export default function HomePage() {
  const examples = new Examples()
  const publishedExamples = examples.publishedExamples

  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 md:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title="RSC Examples Gallery" />
        <Prose>
          <p>
            Gathered here are a couple of dozen different examples of how to use
            React Server Components. At the moment (July 2024), one needs to use
            a framework to take advantage of these things. All of these examples
            use <a href="https://nextjs.org">Next.js</a> as the framework of
            choice.
          </p>

          <p>
            Most of these examples were made to support a{' '}
            <Link href="https://edspencer.net/blog/tag/rsc">
              series of blog posts I wrote
            </Link>
            {` `}on{` `}
            <Link href="https://edspencer.net/blog/tag/rsc">
              React Server Components.
            </Link>
            {` `}Some examples link to the original blog post that they were
            created for.
          </p>

          <h3>All Examples</h3>
        </Prose>
        <ExampleGallery examples={publishedExamples} />
      </article>
      <PrevNextLinks />
    </div>
  )
}
