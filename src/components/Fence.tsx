import { Code } from 'bright'

Code.theme = {
  dark: 'github-dark',
  light: 'github-light',
}

Code.defaultProps = {
  lang: 'shell',
  theme: 'github-light',
}

export function Fence({
  children,
  language,
}: {
  children: React.ReactNode
  language: string
}) {
  //lmao this is horrible
  const lang = language.split('.')[1]

  return (
    <Code title={language} lang={lang}>
      {children}
    </Code>
  )
}
