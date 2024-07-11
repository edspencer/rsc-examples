import Link from 'next/link'

import Examples from '@/lib/examples'
import ExampleGallery from '@/components/Gallery'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'

import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Server Components Examples Gallery',
  description:
    'An increasingly comprehensive set of examples on the various ways to use React Server Components',
}

export default function HomePage() {
  const examples = new Examples()
  const tags = examples.getTags()

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

          <p>
            The examples are grouped by tag in the grid below. Most examples
            have more than one tag so show up here more than once.
          </p>
          {/* <h3>All Examples</h3> */}
        </Prose>
        {/* <input
          type="text"
          placeholder="Search examples..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-10 mt-6 w-full rounded-md border border-gray-300 p-2 placeholder:italic dark:border-slate-800 dark:bg-slate-900 dark:text-sky-100"
        /> */}
        {tags.map((tag) => (
          <div key={tag} className="mb-24 mt-12">
            <h3 className="mb-4 font-display capitalize underline">
              {tag} examples
            </h3>

            <ExampleGallery examples={examples.getExamplesByTag(tag)} />
          </div>
        ))}
      </article>
      <PrevNextLinks />
    </div>
  )
}
