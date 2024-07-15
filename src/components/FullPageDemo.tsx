'use client'

import { useRef } from 'react'
import Link from 'next/link'
import VideoPreview from '@/components/VideoPreview'
import { Button } from '@/components/Button'
import type { Example } from '@/lib/examples'

export function FullPageDemo({ example }: { example: Example }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  const { slug, fullPage, hasVideo } = example

  if (!fullPage) return null

  return (
    <div className="mt-12">
      <h2>Live Demo</h2>
      <p>
        This example can't be easily inlined as it demonstrates how a full-page
        feels to the end user. Here it is inside an iframe, and there's a
        looping video below too.
      </p>
      <div className="flex items-center justify-between">
        <p>
          <Link target="_blank" href={`/examples/${slug}`}>
            Click here to test it out yourself
          </Link>
        </p>
        <Button variant="blank" onClick={handleRefresh} title="Refresh">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
      </div>
      <iframe
        ref={iframeRef}
        src={`/examples/${slug}`}
        className="h-96 w-full rounded-md border border-slate-500"
      />
      <figcaption className="text-center text-sm italic text-slate-500">
        This is an iframe pointing to{' '}
        <Link target="_blank" href={`/examples/${slug}`}>
          /examples/{slug}
        </Link>
      </figcaption>
      {hasVideo !== false ? <VideoPreview slug={slug} /> : null}
    </div>
  )
}
