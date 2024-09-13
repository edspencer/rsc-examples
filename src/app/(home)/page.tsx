import { PrevNextLinks } from '@/components/PrevNextLinks'
import { DocsHeader } from '@/components/DocsHeader'
import { Prose } from '@/components/Prose'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 md:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
      <article>
        <DocsHeader title="Introduction" />
        <Prose>
          <p>
            React Server Components are a new technology that allow you to run
            React on both the client and the server. This is a huge step forward
            when it comes to creating performant sites and applications for your
            users. Because the technology is so new, there are not many examples
            out there showing how to use it in practice, hence this site.
          </p>

          <p>
            Most of these examples were made to support a{' '}
            <Link href="https://edspencer.net/blog/tag/rsc">
              series of blog posts I wrote
            </Link>
            {` `}on{` `}
            <Link href="https://edspencer.net/blog/tag/rsc">
              React Server Components.
            </Link>
            {` `}Some examples link to the original blog post that they were
            created for. At the moment (July 2024), one needs to use a framework
            to take advantage of these things. All of these examples use{' '}
            <Link href="https://nextjs.org">Next.js</Link> as the framework of
            choice.
          </p>
          <h3>Intro to React Server Components</h3>

          <p>
            Until now, React has been a client-side technology. This means that
            when you build a React application, the code that you write is
            executed in the browser. This is great for interactivity and
            responsiveness, but it can also mean loading megabytes of JS to the
            client.
          </p>
          <p>
            React Server Components are a new technology that allows you to run
            React on the server as well as the client. This means that you can
            render your React components on the server and send the resulting
            HTML to the browser.
          </p>

          <p>
            This has a number of benefits. By rendering your components on the
            server, you can reduce the amount of work that the browser has to
            do, as well as the amount of code it must download to do it. This
            can lead to faster load times and a smoother user experience. It can
            also make your application more accessible, as the HTML that is sent
            to the browser is fully rendered and can be read by screen readers
            and other assistive technologies.
          </p>

          <p>
            RSCs look almost exactly the same as client side components, but
            with a few differences: they can't use hooks, they can't use
            client-side only APIs, and they can't use client-side only libraries
            (like window or document). They can, however, use data from the
            server, which is a huge advantage.
          </p>

          <h3>Learn More</h3>

          <p>
            RSCs will change the way most React devs work, and there's quite a
            lot to understand before you can use them fully. Here are some
            articles that I've written that might help you understand some of
            the benefits and pitfalls of using RSCs:
          </p>

          <ul>
            <li>
              <Link href="https://edspencer.net/2024/6/18/understanding-react-server-components-and-suspense">
                Loading Fast & Slow: async React Server Components and Suspense
              </Link>
            </li>
            <li>
              <Link href="https://edspencer.net/2024/7/12/promises-across-the-void-react-server-components">
                Promises across the void: Streaming data with RSC
              </Link>
            </li>
            <li>
              <Link href="https://edspencer.net/2024/7/1/decoding-react-server-component-payloads">
                Decoding React Server Component Payloads
              </Link>
            </li>
            <li>
              <Link href="https://edspencer.net/2024/7/16/errors-and-retry-with-react-server-components">
                Error handling and retry with React Server Components
              </Link>
            </li>
          </ul>

          <p>
            I'd also strongly recommend the following content from other
            authors:
          </p>

          <ul>
            <li>
              <Link href="https://www.joshwcomeau.com/react/server-components/">
                Making Sense of React Server Components
              </Link>
            </li>
            <li>
              <Link href="https://www.smashingmagazine.com/2024/05/forensics-react-server-components/">
                Forensics of React Server Components by Lazar Nikolov
              </Link>
            </li>
            <li>
              <Link href="https://www.plasmic.app/blog/how-react-server-components-work">
                How React server components work by @chungwu
              </Link>
            </li>
          </ul>
        </Prose>
      </article>
      <PrevNextLinks />
    </div>
  )
}
