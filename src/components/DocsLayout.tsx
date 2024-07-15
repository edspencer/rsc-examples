import { DocsHeader } from '@/components/DocsHeader'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { ExampleHeader } from './ExampleHeader'
import { FullPageDemo } from './FullPageDemo'
import type { Example } from '@/lib/examples'

export function DocsLayout({
  children,
  frontmatter: example,
}: {
  children: React.ReactNode
  frontmatter: Example
}) {
  const { title, slug, fullPage, hasVideo } = example

  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title={title} />
        <ExampleHeader slug={slug} />
        <Prose>
          {children}
          <FullPageDemo example={example} />
        </Prose>
      </article>
      <PrevNextLinks />
    </div>
  )
}
