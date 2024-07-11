'use client'
import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import Link from 'next/link'
import Image from 'next/image'

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
    <div className="font-display">
      <input
        type="text"
        placeholder="Search examples..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-10 mt-6 w-full rounded-md border border-gray-300 p-2 placeholder:italic dark:border-slate-800 dark:bg-slate-900 dark:text-sky-100"
      />
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2">
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
  const { title, slug } = example

  return (
    <animated.div
      style={style}
      key={title}
      className="example-box text-slate-700"
    >
      <Link href={slug} className="mb-3 flex flex-col gap-4 hover:underline">
        <h4 className="text-slate-900">{example.galleryTitle || title}</h4>
        <div className="flex items-start gap-3">
          <Image
            className="aspect-[1/1] rounded-lg bg-gray-100 object-cover"
            src={`/videos/${slug}/thumb.png`}
            alt={title}
            height={75}
            width={75}
          />
          <p className="font-sans text-sm">{example.description}</p>
        </div>
      </Link>
      <Tags tags={example.tags} />
    </animated.div>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 font-sans">
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
