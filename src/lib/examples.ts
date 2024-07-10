import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export type Tag = {
  tag: string
  count: number
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
  path.join(examplesDir, example.slug, 'page.mdx')

export default class Examples {
  baseDirectory: string
  allFiles: string[]
  allExamples: any[]
  publishedExamples: any[]

  constructor() {
    this.baseDirectory = path.join(examplesDir)

    // console.time('Finding all .mdx files in the blog directory');
    this.allFiles = findMdxFiles(this.baseDirectory)
    // console.timeEnd('Finding all .mdx files in the blog directory');

    // console.time('Reading all .mdx files');
    this.allExamples = this.allFiles
      .map((file) => {
        const source = fs.readFileSync(file)
        const { data } = matter(source)

        return data
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // console.timeEnd('Reading all .mdx files');

    if (process.env.NODE_ENV !== 'production') {
      this.publishedExamples = this.allExamples
    } else {
      this.publishedExamples = this.allExamples.filter(
        (example) => example.status !== 'draft',
      )
    }
  }

  getExamplesByTag(tag: string) {
    return this.publishedExamples.filter((example: any) =>
      example.tags.includes(tag),
    )
  }

  getTags(): string[] {
    const tags = new Set()
    this.publishedExamples.forEach((example: any) => {
      example.tags.forEach((tag: string) => {
        tags.add(tag)
      })
    })
    return Array.from(tags).map((tag) => String(tag))
  }

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

  getLatestExamples(count: number) {
    return this.publishedExamples.slice(0, count)
  }
}
