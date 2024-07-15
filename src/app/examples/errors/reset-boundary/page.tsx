import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'

export default function ResettablePage() {
  return (
    <>
      <p>
        This page has a component with a 50% chance of throwing an error. If it
        does, a Reset button will appear that you can click to reset the
        component.
      </p>
      <p>The rest of the page will render as normal.</p>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ErrorComponent />
      </ErrorBoundary>
    </>
  )
}

async function ErrorComponent() {
  // Simulate a delay so we can see the Reset button spinning
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (Math.random() > 0.5) {
    throw new Error('Error thrown in component')
  }

  return (
    <p className="border border-blue-700 p-4">
      This has a 50% chance of throwing an error, but this time it rendered
      fine.
    </p>
  )
}
