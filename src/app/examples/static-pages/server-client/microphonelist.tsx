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
