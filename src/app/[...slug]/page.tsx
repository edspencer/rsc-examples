import { notFound } from 'next/navigation'
import Examples from '@/lib/examples'
import { DocsLayout } from '@/components/DocsLayout'
import MarkdownContent from '@/components/MarkdownContent'

type Props = {
  params: { slug: string[] }
}

export default async function Page({ params }: Props) {
  const slug = params.slug.join('/')
  const examples = new Examples()
  const example = examples.publishedExamples.find(
    (example: any) => example.slug === slug,
  )

  if (!example) {
    return notFound()
  }

  const content = examples.getContent(example)

  return (
    <div>
      <DocsLayout frontmatter={example}>
        <MarkdownContent content={content} />
      </DocsLayout>
    </div>
  )

  // return <FullPost post={post} />
}
