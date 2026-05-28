import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const source = 'public/logo-bear.png'
const sourceBuffer = await readFile(source)

const pngTargets = [
  ['public/favicon-16x16.png', 16],
  ['public/favicon-32x32.png', 32],
  ['public/favicon-48x48.png', 48],
  ['public/apple-touch-icon.png', 180],
  ['public/logo-bear.png', 512],
]

for (const [file, size] of pngTargets) {
  await sharp(sourceBuffer)
    .resize(size, size, { fit: 'cover' })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: size <= 48,
      quality: 90,
    })
    .toFile(file)
}

console.log(`Generated ${pngTargets.length} favicon assets`)
