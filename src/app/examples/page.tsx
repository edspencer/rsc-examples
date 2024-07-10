import { DocsLayout } from '@/components/DocsLayout'
import { navigation } from '@/lib/navigation'

export default function HomePage() {
  const examples = navigation
    .map((section) => section.links)
    .flat()
    .filter((link) => (link.href = '/'))

  console.log(examples)

  return (
    <DocsLayout frontmatter={{ title: 'RSC Examples Gallery' }}>
      <p>Welcome! cool how it works</p>
    </DocsLayout>
  )
}
