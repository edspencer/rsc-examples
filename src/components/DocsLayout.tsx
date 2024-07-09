import { DocsHeader } from '@/components/DocsHeader'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'

import VideoPreview from '@/components/VideoPreview'
import Link from 'next/link'
import { Icon } from '@/components/Icon'

export function DocsLayout({
  children,
  frontmatter: { title, slug },
}: {
  children: React.ReactNode
  frontmatter: { title?: string; slug?: string }
}) {
  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title={title} />
        <ExampleHeader slug={slug} />
        <Prose>
          {children}
          <VideoPreview slug={slug} />
        </Prose>
      </article>
      <PrevNextLinks />
    </div>
  )
}

function SeeLiveExample({ slug }: { slug?: string }) {
  return (
    <ExampleHeaderLink
      title="Open Live Example"
      icon="installation"
      href={`/live/${slug}`}
      target="_blank"
    />
  )
}

function SeeSourceCode({ slug }: { slug?: string }) {
  return (
    <ExampleHeaderLink
      title="Full Example Source"
      icon="presets"
      href={`https://github.com/edspencer/rsc-examples/tree/main/src/app/live/${slug}/page.tsx`}
    />
  )
}

function ExampleHeader({ slug }: { slug?: string }) {
  if (!slug) return

  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <SeeLiveExample slug={slug} />
      <SeeSourceCode slug={slug} />
    </div>
  )
}

function ExampleHeaderLink({
  title,
  href,
  icon,
  target,
}: {
  title: string
  href: string
  icon: React.ComponentProps<typeof Icon>['icon']
  target?: string
}) {
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative flex gap-4 overflow-hidden rounded-xl p-6">
        <Icon icon={icon} className="h-8 w-8" />
        <h2 className="font-display text-base text-slate-900 dark:text-white">
          <Link target={target} href={href}>
            <span className="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>
      </div>
    </div>
  )
}
