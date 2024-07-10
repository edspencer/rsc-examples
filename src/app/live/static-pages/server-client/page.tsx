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
