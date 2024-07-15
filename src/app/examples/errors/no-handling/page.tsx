export default function NoHandling() {
  return (
    <>
      <p>
        This page demonstrates what happens when an error is thrown in a
        component and there is no error boundary to catch it. The error will
        bubble up to the nearest error boundary, which in this case is the root
        of the app.
      </p>

      <ErrorComponent />
    </>
  )
}

function ErrorComponent() {
  throw new Error('Error thrown in component')

  return 'This will never be rendered'
}
