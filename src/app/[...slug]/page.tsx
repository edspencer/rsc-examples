import { notFound } from 'next/navigation'
import Examples from '@/lib/examples'
import { DocsLayout } from '@/components/DocsLayout'
import MarkdownContent from '@/components/MarkdownContent'
import { Metadata, ResolvingMetadata } from 'next'
import config from '@/lib/config'

const { siteName, siteUrl, twitterHandle } = config

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug.join('/')
  const { publishedExamples } = new Examples()
  const example = publishedExamples.find((e: any) => e.slug === slug)

  if (!example) {
    return notFound()
  }

  return {
    title: example.title,
    description: example.description,

    twitter: {
      card: 'summary_large_image',
      site: siteUrl,
      creator: twitterHandle,
      description: example.description,
    },

    openGraph: {
      siteName,
      title: example.title,
      description: example.description,
      authors: [config.author.name],
      type: 'article',
      locale: 'en_US',
      url: `${siteUrl}${example.slug}`,
    },
  }
}

export function generateStaticParams() {
  const { publishedExamples } = new Examples()

  const all = publishedExamples.map((example: any) => ({
    slug: example.slug.split('/'),
  }))

  return all
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
    <DocsLayout frontmatter={example}>
      <MarkdownContent content={content} />
    </DocsLayout>
  )
}
