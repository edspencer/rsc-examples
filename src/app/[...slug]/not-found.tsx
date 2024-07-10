import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="mt-3 font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          Coming Soon
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This example is in progress and will be available soon.
        </p>
        <Link
          href="/"
          className="mt-8 text-sm font-medium text-slate-900 dark:text-white"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
