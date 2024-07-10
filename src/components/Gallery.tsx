'use client'
import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import Link from 'next/link'

export default function ExampleGallery({ examples }: { examples: any[] }) {
  const [filter, setFilter] = useState('')
  const filteredExamples = examples.filter(
    (example) =>
      example.title.toLowerCase().includes(filter.toLowerCase()) ||
      example.tags.some((tag: string) =>
        tag.toLowerCase().includes(filter.toLowerCase()),
      ) ||
      example.galleryTitle?.toLowerCase().includes(filter.toLowerCase()),
  )

  const transitions = useTransition(filteredExamples, {
    keys: (item) => item.id,
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
  })

  return (
    <div>
      <input
        type="text"
        placeholder="Search examples..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="my-2 w-full rounded-md border border-gray-300 p-2 dark:border-slate-800 dark:bg-slate-900 dark:text-sky-100"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {transitions((style, item) => (
          <ExampleGalleryItem style={style} example={item} />
        ))}
      </div>
    </div>
  )
}

export function ExampleGalleryItem({
  example,
  style,
}: {
  example: any
  style: any
}) {
  return (
    <animated.div style={style} key={example.title} className="example-box">
      <Link href={example.slug}>
        <h4 className="font-bold">{example.galleryTitle || example.title}</h4>
      </Link>
      <p className="text-sm">{example.description}</p>
      <Tags tags={example.tags} />
    </animated.div>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}

export function Tag({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-sky-100 px-2 py-1 text-xs text-slate-900">
      {tag}
    </span>
  )
}
