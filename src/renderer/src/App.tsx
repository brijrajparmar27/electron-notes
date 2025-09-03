import Content from './components/content/Content'
import RootLayout from './components/layout/RootLayout'
import Sidebar from './components/sidebar/Sidebar'
import { NotesProvider } from './store/NotesContext'
import { SystemInfoProvider } from './store/SystemContext'

function App() {
  return (
    <NotesProvider>
      <SystemInfoProvider>
        <div className="h-screen w-screen">
          <RootLayout sidebar={<Sidebar />} content={<Content />} />
        </div>
      </SystemInfoProvider>
    </NotesProvider>
  )
}

export default App
