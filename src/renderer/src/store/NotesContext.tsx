import { NoteItem } from '@shared/types/Note'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

type NotesContextType = {
  currentNote: NoteItem | null
  setCurrentNote: Dispatch<SetStateAction<NoteItem | null>>
  notes: NoteItem[]
  setNotes: Dispatch<SetStateAction<NoteItem[]>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const NotesContext = createContext<NotesContextType>({
  currentNote: null,
  setCurrentNote: () => {},
  notes: [],
  setNotes: () => {}
})

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [currentNote, setCurrentNote] = useState<NoteItem | null>(null)
  const [notes, setNotes] = useState<NoteItem[]>([])

  useEffect(() => {
    const getNotes = async () => {
      const allNotes = await window.electron.getNotes()
      setNotes(allNotes)
    }
    getNotes()
  }, [])
  return (
    <NotesContext.Provider value={{ currentNote, setCurrentNote, notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  )
}
