import { Spinner } from './Spinner'

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="min-w-0 max-w-2xl flex-auto border border-red-500 px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Spinner />
        <p className="font-display text-sm font-medium text-slate-900 dark:text-white">
          {message}
        </p>
      </div>
    </div>
  )
}
