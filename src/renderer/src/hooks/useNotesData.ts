import { NotesContext } from '@renderer/store/NotesContext'
import { useContext } from 'react'

const useNotesData = () => {
  const { notes, setNotes } = useContext(NotesContext)
  return { notes, setNotes }
}
export default useNotesData
