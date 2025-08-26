import { ReactNode } from 'react'

type RootLayoutProps = {
  sidebar: ReactNode
  content: ReactNode
}
const RootLayout = ({ sidebar, content }: RootLayoutProps) => {
  return (
    <div className="flex h-full w-full">
      <header className="fixed w-screen top-0 left-0 h-8"></header>
      <div className="flex-2 h-full pt-8 px-2 min-w-[30%]">{sidebar}</div>
      <div className="flex-6 h-full border-l bg-zinc-900/50 border-l-white/20 overflow-scroll">
        {content}
      </div>
    </div>
  )
}
export default RootLayout
