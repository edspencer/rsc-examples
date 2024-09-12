import path from 'path'
import { ReadNext } from 'read-next'

import Examples, { Example } from '../lib/examples'

const summarizationPrompt = `
The following content is a markdown document about an example of how to use React Server
Components. It contains sections of prose explaining what the example is about, may contain
links to other resources, and almost certainly contains code snippets.

Your goal is to generate a summary of the content that can be used to suggest related examples.
The summary will be used to create embeddings for a vector search. When you come across code
samples, please summarize the code in natural language.

Do not reply with anything except your summary of the example.`

const cacheDir = path.join(__dirname, '..', '..', 'read-next')
async function main() {
  console.log('Generating related examples')

  const readNext = await ReadNext.create({
    cacheDir,
    summarizationPrompt,
  })

  const examples = new Examples()
  const { publishedExamples } = examples

  const sourceDocuments = publishedExamples.map((example: Example) => ({
    pageContent: examples.getContent(example),
    id: example.slug,
  }))

  await readNext.index({ sourceDocuments })

  for (const example of publishedExamples) {
    const suggestions = await readNext.suggest({
      sourceDocument: sourceDocuments.find((s: any) => s.id === example.slug)!,
      limit: 5,
    })

    examples.updateMatter(example, {
      related: suggestions.related.map(
        (suggestion: any) => suggestion.sourceDocumentId,
      ),
    })
  }
}

main()
  .catch(console.error)
  .then(() => process.exit(0))
