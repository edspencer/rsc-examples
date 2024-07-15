A collection of React Server Component examples, hosted at https://rsc-examples.edspencer.net, or runnable locally via `npm start dev`.

These were created to support a series of blog posts I wrote about React Server Components at https://edspencer.net.

## Features

Uses `<MDXRemote>` to render the contents of the `README.mdx` files, using their frontmatter

## Adding Examples

Examples are found in the src/app/examples folder. Each example should contain at least a `README.mdx`, which will be rendered as the page content when the example is visited in the browser. Typically an example will also contain a `page.tsx`, which contains the actual example source, as well as potentially other auxiliary files.

The `README.mdx` should contain a frontmatter declaration that at least contains a title and a slug, which is the url the example will be served from. The slug should mirror the directory structure of the example files.

## Recording videos

Run `npm run video` to automatically generate timestamped videos of all examples that don't currently have one in the `public/videos` directory.

## To do

- Form examples
- Server Action examples
- Error handling
- Option to disable video looping
