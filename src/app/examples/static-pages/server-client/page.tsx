import MicrophoneList from './microphonelist'

export default async function Page() {
  return (
    <>
      <h2>Blending server and client components</h2>
      <h3>Server-rendered</h3>
      <p>This section was rendered as a server component</p>
      <MicrophoneList />
    </>
  )
}
