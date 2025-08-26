import { NotesContext } from '@renderer/store/NotesContext'
import { useContext, useEffect, useRef, useState } from 'react'

const useNoteContent = () => {
  const [noteContent, setNoteContent] = useState<string>('')
  const { currentNote } = useContext(NotesContext)

  const getNoteContent = async (name: string, requestId: number) => {
    const data = await window.electron.getNoteContent(name)
    // simple race protection: ensure content belongs to the latest request
    if (latestRequestRef.current === requestId) setNoteContent(data)
  }

  const latestRequestRef = useRef(0)

  useEffect(() => {
    if (currentNote) {
      latestRequestRef.current += 1
      const requestId = latestRequestRef.current
      getNoteContent(currentNote.name, requestId)
    } else {
      setNoteContent('')
    }
  }, [currentNote])

  return { noteContent }
}
export default useNoteContent
