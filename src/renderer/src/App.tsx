import Content from './components/content/Content'
import RootLayout from './components/layout/RootLayout'
import Sidebar from './components/sidebar/Sidebar'
import { NotesProvider } from './store/NotesContext'

function App() {
  return (
    <NotesProvider>
      <div className="h-screen w-screen">
        <RootLayout sidebar={<Sidebar />} content={<Content />} />
      </div>
    </NotesProvider>
  )
}

export default App
