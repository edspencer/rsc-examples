import { Spinner } from './Spinner'

export function LoadingMessage({
  message = 'Loading...',
}: {
  message?: string
}) {
  return (
    <div className="flex items-stretch gap-4">
      <Spinner />
      <div className="flex-grow">
        <p>{message}</p>
      </div>
    </div>
  )
}
