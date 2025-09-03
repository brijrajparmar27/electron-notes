import useNotesData from '@renderer/hooks/useNotesData'
import { NotesContext } from '@renderer/store/NotesContext'
import { useContext } from 'react'
import { IoIosAdd } from 'react-icons/io'
const Sidebar = () => {
  const { notes, setNotes } = useNotesData()
  const { currentNote, setCurrentNote } = useContext(NotesContext)

  const handleNoteOpen = (note) => {
    setCurrentNote(note)
  }
  const handleAdd = async () => {
    const notes = await window.electron.createNote()
    setNotes(notes)
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full flex justify-end">
        <button
          className="rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100 px-2 py-1 text-xs flex gap-1 justify-center items-center"
          onClick={handleAdd}
        >
          <IoIosAdd className="text-lg" />
          <p>Add Notes</p>
        </button>
      </div>
      <div
        className="flex flex-col gap-2 h-full box-border overflow-y-scroll pb-12 pt-5"
        id="scrollbar1"
      >
        {notes.map((each, i) => {
          return (
            <div
              key={i}
              className={
                each.name === currentNote?.name
                  ? 'rounded-md p-2 cursor-pointer transition-colors duration-100 bg-zinc-500/75 hover:bg-zinc-600/75'
                  : 'rounded-md p-2 cursor-pointer transition-colors duration-100 hover:bg-zinc-600/75'
              }
              onClick={() => handleNoteOpen(each)}
            >
              <div>{each.title}</div>
              <div className="flex justify-between text-xs">
                <div>{each.lastModifiedTime}</div>
                <div>{each.lastModifiedDate}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
