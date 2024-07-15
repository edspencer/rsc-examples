import { ErrorBoundary } from 'react-error-boundary'

export default function PageWithBoundary() {
  return (
    <>
      <p>
        This page demonstrates what happens when an error is thrown in a
        component with an explicit error boundary.
      </p>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    </>
  )
}

function ErrorComponent() {
  throw new Error('Error thrown in component')

  return 'This will never be rendered'
}

function ErrorFallback() {
  return (
    <div className="text-red-700">There was an error with this content</div>
  )
}
