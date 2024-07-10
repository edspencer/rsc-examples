---
title: Blending server components and client components
slug: static-pages/server-client
nextjs:
  metadata:
    title: Blending server components and client components
    description: Any time you need a component to be running in the browser, mark it use client
---

It's easy to mix and match server and client components with RSC and next.js. Although many components can be partially or entirely rendered on the server, there are those that need to run inside the context of a browser - for example anything using the microphone, measuring window sizes or providing custom user interactions.

In this example, we have a server-rendered Page, with child component that has to

```page.tsx
import MicrophoneList from './microphonelist'

export default async function Page() {
  return (
    <div>
      <h1>Blending server and client components</h1>
      <h2>Server-rendered</h2>
      <p>This section was rendered as a server component</p>
      <MicrophoneList />
    </div>
  )
}
```

Here's our `<MicrophoneList />` child component, which will run as a client component because of the `'use client'` directive. It just finds all of the microphones attached to your browser and lists them, to show that it is indeed running in the browser:

```microphonelist.tsx
'use client'

import { useEffect, useState } from 'react'
import { getMicrophones } from './utils'

export default function MicrophoneList() {
  const [microphones, setMicrophones] = useState([] as MediaDeviceInfo[])

  useEffect(() => {
    const fetchMicrophones = async () => {
      setMicrophones(await getMicrophones())
    }
    fetchMicrophones()
  }, [])

  return (
    <div>
      <h1>Available Microphones</h1>
      <p>
        This component is marked `use client`, because it needs to run in the
        browser to access the mediaDevices API.
      </p>
      <ul>
        {microphones.map((mic, index) => (
          <li key={index}>{mic.label || `Microphone ${index + 1}`}</li>
        ))}
      </ul>
    </div>
  )
}
```
