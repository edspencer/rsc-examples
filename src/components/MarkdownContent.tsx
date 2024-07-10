import remarkGfm from 'remark-gfm'

//generic components shared between posts
// import Aside from './blog/posts/Aside'
// import Quote from './blog/posts/Quote'
// import Figure from './blog/posts/Figure'
// import Table, { TableRow, TableCell } from './blog/posts/Table'
// import CaptionedContent from './blog/posts/CaptionedContent'

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
  // pre: (props) => {
  //   console.log(props)
  //   return <Code {...props} />
  // },
  // Aside,
  // Quote,
  // Figure,
  // Table,
  // TableRow,
  // TableCell,
  // CaptionedContent,

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
