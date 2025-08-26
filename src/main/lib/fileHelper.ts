import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import fs, { promises as fsp } from 'fs'
import os from 'os'
import path from 'path'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

const getBaseNotesDir = (): string => {
  const homeDir = os.homedir()
  return path.join(homeDir, 'notes')
}

const resolveNotePathSafe = (name: string): string => {
  const baseDir = getBaseNotesDir()
  const resolved = path.resolve(baseDir, name)
  if (!resolved.startsWith(path.resolve(baseDir))) {
    throw new Error('Invalid note path')
  }
  return resolved
}

const getLastUpdated = async (filePath) => {
  const stats = await fsp.stat(filePath)
  return stats.mtime // Date object
}

const getLastUpdatedDate = async (filePath) => {
  const isoString = await getLastUpdated(filePath)
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = dayjs(isoString).tz(tz).format('Do MMMM YY')
  return date
}
const getLastUpdatedTime = async (filePath) => {
  const isoString = await getLastUpdated(filePath)
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const time = dayjs(isoString).tz(tz).format('h:mm A')
  return time
}

const readFileFromPath = async (pathName) => {
  return fsp.readFile(pathName, 'utf8')
}

const writeFileFromPath = async (pathName, data) => {
  return fsp.writeFile(pathName, data, 'utf8')
}

const getFirstHeadingOrWord = async (filePath) => {
  const content = await fsp.readFile(filePath, 'utf-8')
  const lines = content.split(/\r?\n/)

  for (const line of lines) {
    if (line.trim().startsWith('#')) {
      return line.replace(/^#+\s*/, '').trim()
    }
  }

  const firstWord = content.trim().split(/\s+/)[0] || ''
  return firstWord
}

const createFile = async (dirPath, fileName, content = '') => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  const filePath = path.join(dirPath, fileName)
  await fsp.writeFile(filePath, content, 'utf-8')
  return filePath
}

export const getALLNotes = async () => {
  const dirPath = getBaseNotesDir()
  ensureDir(dirPath)
  const files = await fsp.readdir(dirPath)
  const mdFiles = files.filter((file) => path.extname(file).toLowerCase() === '.md')
  const notes = await Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = path.join(dirPath, file)
      return {
        name: file,
        title: await getFirstHeadingOrWord(fullPath),
        lastModifiedDate: await getLastUpdatedDate(fullPath),
        lastModifiedTime: await getLastUpdatedTime(fullPath)
      }
    })
  )
  return notes
}

export const createNote = async () => {
  const dirPath = getBaseNotesDir()
  ensureDir(dirPath)
  await createFile(dirPath, `${Date.now()}.md`, '## Untitled')
  return getALLNotes()
}

export const getNoteData = async (_: unknown, { name }: { name: string }) => {
  const filePath = resolveNotePathSafe(name)
  const data = await readFileFromPath(filePath)
  return data
}

export const setNoteData = async (
  _: unknown,
  { content, name }: { content: string; name: string }
) => {
  const filePath = resolveNotePathSafe(name)
  await writeFileFromPath(filePath, content)
  return {
    name,
    title: await getFirstHeadingOrWord(filePath),
    lastModifiedDate: await getLastUpdatedDate(filePath),
    lastModifiedTime: await getLastUpdatedTime(filePath)
  }
}
