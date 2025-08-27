import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import { Milkdown, useEditor } from '@milkdown/react'
import useNoteContent from '@renderer/hooks/useNoteContent'
import useNotesData from '@renderer/hooks/useNotesData'
import { NotesContext } from '@renderer/store/NotesContext'
import _ from 'lodash'
import { useContext, useEffect } from 'react'

export const MilkdownEditor = () => {
  const { currentNote } = useContext(NotesContext)
  const { noteContent } = useNoteContent()
  const { setNotes } = useNotesData()
  const updateFile = async (value: string) => {
    if (!currentNote) return
    const updatedNote = await window.electron.setNoteContent(currentNote.name, value)
    setNotes((prev) => {
      const updated = prev.map((each) => {
        if (each.name === updatedNote.name) {
          return { ...each, ...updatedNote }
        }
        return each
      })
      return [...updated]
    })
  }
  useEffect(() => console.log(noteContent), [noteContent])

  const debouncedSearch = _.debounce((value) => {
    updateFile(value)
  }, 500)
  useEditor(
    (root) => {
      const crepe = new Crepe({
        root,
        defaultValue: noteContent
      })

      crepe.on((listener) => {
        listener.markdownUpdated((_, markdown) => {
          debouncedSearch(markdown)
        })
      })
      return crepe
    },
    [noteContent]
  )
  return <Milkdown />
}
