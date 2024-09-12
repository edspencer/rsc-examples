import { DocsHeader } from '@/components/DocsHeader'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { ExampleHeader } from './ExampleHeader'
import { FullPageDemo } from './FullPageDemo'
import { RelatedExamples } from './RelatedExamples'
import Examples, { Example } from '@/lib/examples'

export function DocsLayout({
  children,
  frontmatter: example,
}: {
  children: React.ReactNode
  frontmatter: Example
}) {
  const examples = new Examples()
  const { title, slug, related = [] } = example

  const relatedExamples = related
    .map((slug) => {
      return examples.visibleExamples.find((e) => e.slug === slug)
    })
    .filter((c) => !!c)
    .slice(0, 3)

  return (
    <div className="flex min-w-0 max-w-2xl flex-col gap-8 px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title={title} />
        <ExampleHeader slug={slug} />
        <Prose>
          {children}
          <FullPageDemo example={example} />
        </Prose>
      </article>
      <RelatedExamples examples={relatedExamples} />
      <PrevNextLinks />
    </div>
  )
}
