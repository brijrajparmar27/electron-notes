import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import { Milkdown, useEditor } from '@milkdown/react'
import useNotesData from '@renderer/hooks/useNotesData'
import { NotesContext } from '@renderer/store/NotesContext'
import _ from 'lodash'
import { useCallback, useContext, useEffect, useMemo } from 'react'

export const MilkdownEditor = ({ noteContent }: { noteContent: string }) => {
  const { currentNote, setCurrentNote } = useContext(NotesContext)
  const { setNotes } = useNotesData()
  const updateFile = useCallback(
    async (value: string) => {
      if (!currentNote) return
      const updatedNote = await window.electron.setNoteContent(currentNote.name, value)
      setCurrentNote(updatedNote)
      setNotes((prev) => {
        const updated = prev.map((each) => {
          if (each.name === updatedNote.name) {
            return { ...each, ...updatedNote }
          }
          return each
        })
        return [...updated]
      })
    },
    [currentNote, setCurrentNote, setNotes]
  )
  const debouncedSearch = useMemo(() => _.debounce((value) => updateFile(value), 500), [updateFile])
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])
  useEditor((root) => {
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
  }, [])
  return <Milkdown />
}
