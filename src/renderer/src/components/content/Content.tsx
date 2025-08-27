import { MilkdownProvider } from '@milkdown/react'
import { NotesContext } from '@renderer/store/NotesContext'
import { useContext, type FC } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/Dog.json'
import { MilkdownEditor } from './Milkdown/MilkdownEditor'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Content: FC = () => {
  const { currentNote } = useContext(NotesContext)

  if (!currentNote) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    )
  }

  return (
    <div>
      <div className="h-[30px] flex justify-center items-center">
        <p className="text-xs">{currentNote.title}</p>
      </div>
      <MilkdownProvider>
        <MilkdownEditor />
      </MilkdownProvider>
    </div>
  )
}

export default Content
