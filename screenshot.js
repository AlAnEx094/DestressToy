import { chromium } from 'playwright'
import { spawn } from 'child_process'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SCREENSHOTS_DIR = join(__dirname, 'artifacts', 'screenshots')
const PORT = 5173
const URL = `http://localhost:${PORT}`

const VIEWPORTS = [
  { name: 'screen_1440', width: 1440, height: 900 },
  { name: 'screen_1024', width: 1024, height: 768 },
  { name: 'screen_390',  width: 390,  height: 844 },
]

function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', '--port', String(PORT)], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    const timeout = setTimeout(() => {
      server.kill()
      reject(new Error('Dev server did not start within 15 seconds'))
    }, 15000)

    server.stdout.on('data', (data) => {
      if (data.toString().includes('Local:')) {
        clearTimeout(timeout)
        resolve(server)
      }
    })

    server.stderr.on('data', (data) => {
      const msg = data.toString()
      if (msg.includes('error') || msg.includes('Error')) {
        clearTimeout(timeout)
        server.kill()
        reject(new Error(msg))
      }
    })

    server.on('exit', (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timeout)
        reject(new Error(`Server exited with code ${code}`))
      }
    })
  })
}

async function takeScreenshots() {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true })

  let server
  let browser

  try {
    console.log('Starting dev server...')
    server = await startServer()
    console.log(`Server running at ${URL}`)

    browser = await chromium.launch()

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage()
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(URL, { waitUntil: 'networkidle' })
      const path = join(SCREENSHOTS_DIR, `${vp.name}.png`)
      await page.screenshot({ path, fullPage: true })
      await page.close()
      console.log(`Screenshot saved: ${path}`)
    }

    console.log('All screenshots saved.')
  } finally {
    if (browser) await browser.close()
    if (server) server.kill()
  }
}

takeScreenshots().catch((err) => {
  console.error('Screenshot failed:', err.message)
  process.exit(1)
})
