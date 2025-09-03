import { createContext, ReactNode, useEffect, useState } from 'react'

type SysInfoContextType = {
  sysInfo: object | null
  setSysInfo: (data) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const SysInfoContext = createContext<SysInfoContextType>({
  sysInfo: null,
  setSysInfo: () => {}
})

export const SystemInfoProvider = ({ children }: { children: ReactNode }) => {
  const [sysInfo, setSysInfo] = useState<object | null>(null)

  const fetchPlateformInfo = async () => {
    const plateformData = await window.electron.getPlateformInfo()
    const root = document.getElementById('root')
    if (root) {
      root.classList.add(plateformData.os) // e.g. "win32" or "darwin"
    }
    setSysInfo(plateformData)
  }

  useEffect(() => {
    fetchPlateformInfo()
  }, [])

  return (
    <SysInfoContext.Provider value={{ sysInfo, setSysInfo }}>{children}</SysInfoContext.Provider>
  )
}
