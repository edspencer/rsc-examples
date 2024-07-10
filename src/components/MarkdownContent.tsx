import remarkGfm from 'remark-gfm'
import { Code } from 'bright'
import { MDXRemote } from 'next-mdx-remote/rsc'

Code.theme = {
  dark: 'github-dark',
  light: 'github-light',
}

Code.defaultProps = {
  lang: 'shell',
  theme: 'github-light',
}

const mdxOptions = {
  remarkPlugins: [remarkGfm], //adds support for tables
  rehypePlugins: [],
}

const components = {
  pre: Code,

  //just colors any `inline code stuff` blue
  code: (props: object) => (
    <code style={{ color: 'rgb(0, 92, 197)' }} {...props} />
  ),
}

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <MDXRemote
      options={{ mdxOptions }}
      source={content}
      components={components}
    />
  )
}
