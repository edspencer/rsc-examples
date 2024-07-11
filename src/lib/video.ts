import puppeteer from 'puppeteer'
import commander from 'commander'
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder'
import ffmpeg from 'fluent-ffmpeg'
import Examples from './examples'
import type { Example } from './examples'

import { exec } from 'child_process'
import fs from 'fs'
import util from 'util'
import path from 'path'

const { program } = commander
program.version('0.0.1')

program
  .option('-f, --force', 'Force re-record of all videos')
  .option('-e, --example <slug>', 'Record a single example by slug')
  .option('-h, --host <host>', 'Host to record from', 'http://localhost:3002')
  .parse(process.argv)

const execPromise = util.promisify(exec)

const videoOutputDir = path.join(__dirname, '..', '..', 'public', 'videos')

const { allExamples } = new Examples()

const greenTick = '\x1b[32m✔\x1b[0m'
const redCross = '\x1b[31m✖\x1b[0m'
const yellowSkip = '\x1b[33m⏭\x1b[0m'

const ffmpegPath = '/opt/homebrew/bin/ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath)

/**
 * Main function to record all pages based on passed options
 */
async function main() {
  const { force, example, host } = program.opts()

  if (example) {
    const foundExample = allExamples.find((e) => e.slug === example)

    if (!foundExample) {
      console.error(`${redCross} Example not found: ${example}`)
      process.exit(1)
    }
    await recordExample(foundExample, host, force)
  } else {
    await recordExamples(host, force)
  }
}

/**
 * Records videos for all examples
 */
async function recordExamples(host: string, force = false) {
  console.log(`Recording pages to: ${videoOutputDir}`)

  for (const example of allExamples) {
    await recordExample(example, host, force)
  }
}

/**
 * Records a single example, creating the video and thumbnail
 * @param example The Example to record
 * @param force If true, will re-record the video even if it already exists
 * @returns void
 */
async function recordExample(example: Example, host: string, force = false) {
  const { slug, videoHeight = 600, videoWidth = 800 } = example

  const videoOutputParentDir = path.join(videoOutputDir, slug)
  if (!fs.existsSync(videoOutputParentDir)) {
    fs.mkdirSync(videoOutputParentDir, { recursive: true })
  }

  //where the video should end up
  const videoFile = path.join(videoOutputDir, slug, 'video.mp4')

  //where the thumbnail should end up
  const thumbFile = path.join(videoOutputDir, slug, 'thumb.png')

  if (fs.existsSync(videoFile) && !force) {
    console.log(`${yellowSkip} Video already exists for page: ${slug}`)
    return
  } else {
    console.log(`Recording page: ${slug}`)
  }

  const url = `${host}/examples/${slug}`
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [`--window-size=${videoWidth},${videoHeight}`],
    defaultViewport: {
      width: videoWidth,
      height: videoHeight,
    },
  })
  const page = await browser.newPage()

  const recorder = new PuppeteerScreenRecorder(page)
  const tmpFile = path.join(__dirname, 'temp.mp4')
  await recorder.start(tmpFile)
  await page.goto(url)

  // Record for 2 additional seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  await recorder.stop()
  await browser.close()

  // thumbnail the video and overlay the timer
  await createThumbnail(tmpFile, thumbFile)
  await addTimerOverlay(tmpFile, videoFile)
  fs.unlinkSync(tmpFile) // Clean up the temporary file
}

/**
 * Create a thumbnail from the last frame of the video
 * @param inputFile The video to create the thumbnail from
 * @param outputFile The thumbnail file to create
 */
async function createThumbnail(inputFile: string, outputFile: string) {
  console.log('Creating thumbnail')
  await new Promise<void>((resolve, reject) => {
    ffmpeg(inputFile)
      .on('end', resolve)
      .on('error', reject)
      .screenshots({
        timestamps: ['90%'],
        filename: 'thumb.png',
        folder: '.',
      })
  })
  console.log(`${greenTick} Thumbnail created`)

  // Move the thumbnail to the correct location
  fs.renameSync('thumb.png', outputFile)
}

async function addTimerOverlay(inputFile: string, outputFile: string) {
  console.log('Overlaying timer')

  //for some reason this fails when using the ffmpeg lib, but works via execPromise...
  const command = `ffmpeg -y -i ${inputFile} -vf "drawtext=text='%{pts\\:hms}':x=10:y=H-th-50:fontsize=48:fontcolor=black" -an ${outputFile}`

  console.log(`Running command: ${command}`)
  await execPromise(command)
    .then(({ stdout, stderr }) => {
      console.log('Done trimming')
      console.log(`ffmpeg stdout: ${stdout}`)
      console.error(`ffmpeg stderr: ${stderr}`)
    })
    .catch((error) => {
      console.error(`${redCross} Errored`)
      console.error(`Error: ${error.message}`)
      console.error(`ffmpeg stderr: ${error.stderr}`)
      throw error
    })

  console.log(`${greenTick} Trimming and overlaying timer completed`)
}

function buffersAreEqual(buf1: Buffer, buf2: Buffer): boolean {
  if (buf1.length !== buf2.length) return false
  for (let i = 0; i < buf1.length; i++) {
    if (buf1[i] !== buf2[i]) return false
  }
  return true
}

main().catch(console.error)
