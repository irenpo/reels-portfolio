import { access, mkdir, readdir, rm } from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const videosDir = join(root, 'public', 'videos')
const postersDir = join(root, 'public', 'posters')

async function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => code === 0 ? resolvePromise() : reject(new Error(`${command} завершился с кодом ${code}`)))
  })
}

try {
  await access(videosDir)
} catch {
  throw new Error(`Папка с видео не найдена: ${videosDir}`)
}

await mkdir(postersDir, { recursive: true })
const files = (await readdir(videosDir)).filter((file) => ['.mp4', '.mov', '.m4v', '.webm'].includes(extname(file).toLowerCase()))

if (!files.length) throw new Error('В public/videos нет видеофайлов')

for (const file of files) {
  const input = join(videosDir, file)
  const output = join(postersDir, `${basename(file, extname(file))}.webp`)
  const temporaryPng = join(postersDir, `.${basename(file, extname(file))}-frame.png`)
  await mkdir(dirname(output), { recursive: true })
  console.log(`Создаю ${output}`)
  await run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', '3', '-i', input, '-frames:v', '1', '-vf', "scale='min(1280,iw)':-2", temporaryPng])
  try {
    await sharp(temporaryPng).webp({ quality: 82 }).toFile(output)
  } finally {
    await rm(temporaryPng, { force: true })
  }
}

console.log(`Готово: ${files.length} обложек`)
