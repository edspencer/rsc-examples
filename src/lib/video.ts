import puppeteer from 'puppeteer'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'
import ffmpeg from 'fluent-ffmpeg'

import { exec } from 'child_process'
import fs from 'fs'
import util from 'util'
import path from 'path'

const execPromise = util.promisify(exec)

const liveExamplesDir = path.join(__dirname, '..', 'app', 'live')
const videoOutputDir = path.join(__dirname, '..', '..', 'public', 'videos')

async function findDirectoriesWithPageFile(
  parentDir: string,
): Promise<string[]> {
  const result: string[] = []

  async function searchDir(dir: string, baseDir: string): Promise<void> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await searchDir(fullPath, baseDir)
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        result.push(path.relative(baseDir, dir))
        return // Once we find a page.tsx, no need to search further in this directory
      }
    }
  }

  await searchDir(parentDir, parentDir)
  return result
}

async function recordPages() {
  const slugs = await findDirectoriesWithPageFile(liveExamplesDir)
  console.log(`Found ${slugs.length} directories with page.tsx files`)
  console.log(slugs)

  for (const slug of slugs) {
    const pageName = path.basename(slug)
    const videoOutputParentDir = path.join(videoOutputDir, slug)
    if (!fs.existsSync(videoOutputParentDir)) {
      fs.mkdirSync(videoOutputParentDir, { recursive: true })
    }
    const videoFile = path.join(videoOutputDir, slug, 'video.mp4')
    console.log(`Recording page: ${slug}`)

    console.log(videoFile)

    const url = `http://localhost:3002/live/${slug}` // Replace with your URL
    await recordPage(url, videoFile)
  }
}

async function recordPage(url: string, outputFile: string) {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [`--window-size=800,600`],
    defaultViewport: {
      width: 800,
      height: 600,
    },
  })
  const page = await browser.newPage()

  const recorder = new PuppeteerScreenRecorder(page)
  const tmpFile = path.join(liveExamplesDir, 'temp.mp4')
  await recorder.start(tmpFile)
  await page.goto(url)

  // Record for 2 additional seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await recorder.stop()
  await browser.close()

  // Trim the video and overlay the timer
  await trimAndOverlayTimer(tmpFile, outputFile)
  fs.unlinkSync(tmpFile) // Clean up the temporary file
}

const ffmpegPath = '/opt/homebrew/bin/ffmpeg' // Replace with the path from `which ffmpeg`
ffmpeg.setFfmpegPath(ffmpegPath)

async function trimAndOverlayTimer(inputFile: string, outputFile: string) {
  const frames: Buffer[] = []
  let lastFrame: Buffer | null = null
  let lastFrameIndex = 0

  // Extract frames from the video
  await new Promise<void>((resolve, reject) => {
    ffmpeg(inputFile)
      .on('end', resolve)
      .on('error', reject)
      .outputOptions('-vf', 'fps=10') // Extract 10 frames per second
      .output('%d.png')
      .run()
  })

  // Load frames into buffers
  const frameFiles = fs
    .readdirSync('.')
    .filter((file) => file.match(/^\d+\.png$/))
  console.log(frameFiles)
  for (const file of frameFiles) {
    const frame = fs.readFileSync(file)
    frames.push(frame)
    if (!lastFrame || !buffersAreEqual(lastFrame, frame)) {
      lastFrame = frame
      lastFrameIndex = frames.length - 1
    }
    fs.unlinkSync(file) // Clean up the frame file
  }

  console.log(`lastFrameIndex: ${lastFrameIndex} (${frames.length} frames)`)

  // Calculate the duration for the trim filter
  const duration = Math.floor(lastFrameIndex / 10)
  console.log(`Duration for trimming: ${duration} seconds`)

  // Create the trimmed video with timer overlay
  console.log('Start trimming and overlaying timer')
  const command = `ffmpeg -y -i ${inputFile} -vf "trim=start=0:end=${duration},drawtext=text='%{pts\\:hms}':x=10:y=H-th-50:fontsize=48:fontcolor=black" -an ${outputFile}`

  console.log(`Running command: ${command}`)
  await execPromise(command)
    .then(({ stdout, stderr }) => {
      console.log('Done trimming')
      console.log(`ffmpeg stdout: ${stdout}`)
      console.error(`ffmpeg stderr: ${stderr}`)
    })
    .catch((error) => {
      console.error('Errored')
      console.error(`Error: ${error.message}`)
      console.error(`ffmpeg stderr: ${error.stderr}`)
      throw error
    })

  console.log('Trimming and overlaying timer completed')
}

function buffersAreEqual(buf1: Buffer, buf2: Buffer): boolean {
  if (buf1.length !== buf2.length) return false
  for (let i = 0; i < buf1.length; i++) {
    if (buf1[i] !== buf2[i]) return false
  }
  return true
}

recordPages().catch(console.error)
