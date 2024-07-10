import Examples from '@/lib/examples'
import ExampleGallery from '@/components/Gallery'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'

export default function HomePage() {
  const examples = new Examples()
  const publishedExamples = examples.publishedExamples

  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title="RSC Examples Gallery" />
        <Prose>
          <ExampleGallery examples={publishedExamples} />
        </Prose>
      </article>
      <PrevNextLinks />
    </div>
  )
}
