import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export type Tag = {
  tag: string
  count: number
}

/**
 * Represents an example with various properties.
 */
export type Example = {
  title: string
  date: string
  slug: string
  tags: string[]
  status: string
  galleryTitle: string
  description: string
  videoHeight?: number
  iframeDemo?: boolean
  videoWidth?: number
  demoText?: string
  hasVideo?: boolean
  related?: string[]
}

//returns an array of all .mdx files in a directory and its subdirectories
function findMdxFiles(dir: string, files: string[] = []) {
  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      findMdxFiles(fullPath, files)
    } else if (stats.isFile() && path.extname(fullPath) === '.mdx') {
      files.push(fullPath)
    }
  })

  return files
}

export const examplesDir = path.join(process.cwd(), 'src', 'app', 'examples')
export const pathToExampleFile = (example: any) =>
  path.join(examplesDir, example.slug, 'README.mdx')

/**
 * Class representing a collection of examples.
 */
export default class Examples {
  /**
   * The base directory where examples are stored.
   */
  baseDirectory: string

  /**
   * Array of all file paths for the examples.
   */
  allFiles: string[]

  /**
   * Array of all examples.
   */
  allExamples: Example[]

  /**
   * Array of published examples.
   */
  publishedExamples: Example[]

  /**
   * Array of examples visible based on the environment.
   */
  visibleExamples: Example[]

  constructor() {
    this.baseDirectory = path.join(examplesDir)

    this.allFiles = findMdxFiles(this.baseDirectory)

    this.allExamples = this.allFiles
      .map((file) => {
        const source = fs.readFileSync(file)
        const { data } = matter(source)

        return data as Example
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    this.publishedExamples = this.allExamples.filter(
      (example) => example.status !== 'draft',
    )

    if (process.env.NODE_ENV !== 'production') {
      this.visibleExamples = this.allExamples
    } else {
      this.visibleExamples = this.allExamples.filter(
        (example) => example.status !== 'draft',
      )
    }
  }

  /**
   * Retrieves examples by a specific tag.
   * @param tag - The tag to filter examples by.
   * @returns An array of examples that match the given tag.
   */
  getExamplesByTag(tag: string) {
    return this.publishedExamples.filter((example: any) =>
      example.tags.includes(tag),
    )
  }

  /**
   * Retrieves all unique tags from the published examples.
   * @returns An array of unique tags.
   */
  getTags(): string[] {
    const tags = new Set()
    this.publishedExamples.forEach((example: any) => {
      example.tags.forEach((tag: string) => {
        tags.add(tag)
      })
    })
    return Array.from(tags).map((tag) => String(tag))
  }

  /**
   * Updates the front matter of a given example.
   * @param example - The example to update.
   * @param updates - An object containing the updates to apply.
   */
  updateMatter(example: Example, updates: Record<string, any>) {
    const fileName = pathToExampleFile(example)

    const fileContents = fs.readFileSync(fileName, 'utf-8')
    const { content, data } = matter(fileContents)

    const newContent = matter.stringify(content, { ...data, ...updates })

    fs.writeFileSync(fileName, newContent)
  }

  /**
   * Retrieves tags along with their counts.
   * @returns An array of tags with their respective counts.
   */
  getTagsWithCounts(): Tag[] {
    const tags = this.getTags()
    const tagCounts: any = {}
    tags.forEach((tag: string) => {
      tagCounts[tag] = this.getExamplesByTag(tag).length
    })
    return Object.keys(tagCounts)
      .map((tag: string) => ({ tag, count: tagCounts[tag] }) as Tag)
      .sort((a, b) => b.count - a.count)
  }

  /**
   * Retrieves the content of a given example.
   * @param example - The example to retrieve content for.
   * @returns The content of the example as a string.
   */
  getContent(example: any) {
    const source = fs.readFileSync(pathToExampleFile(example))

    try {
      return matter(source).content
    } catch (e) {
      console.error('Error reading example content for', example)
      console.error(e)
      return ''
    }
  }

  /**
   * Retrieves the latest published examples.
   * @param count - The number of latest examples to retrieve.
   * @returns An array of the latest published examples.
   */
  getLatestExamples(count: number) {
    return this.publishedExamples.slice(0, count)
  }
}
