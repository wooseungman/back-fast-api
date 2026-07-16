import React, { useState } from 'react'
import LeftFrameMenu from './components/LeftFrameMenu'
import MainContent from './components/MainContent'
import ChatPanel from './components/ChatPanel'

function getSavedAdminMode() {
  if (typeof window === 'undefined') return false

  return window.localStorage.getItem('vco:admin-mode') === 'true'
}

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(() => getSavedAdminMode())
  const [activeMenu, setActiveMenu] = useState(() => (getSavedAdminMode() ? 'CodeGroups' : 'Gasoline'))

  const handleAdminToggle = () => {
    setIsAdminMode((current) => {
      const nextMode = !current
      window.localStorage.setItem('vco:admin-mode', String(nextMode))
      setActiveMenu(nextMode ? 'CodeGroups' : 'Gasoline')
      return nextMode
    })
  }

  return (
    <div className={`app-shell flex h-full${isAdminMode ? ' app-shell-admin' : ''}`}>
      <LeftFrameMenu activeMenu={activeMenu} isAdminMode={isAdminMode} onMenuSelect={setActiveMenu} />
      <MainContent
        activeMenu={activeMenu}
        isAdminMode={isAdminMode}
        onToggleAdmin={handleAdminToggle}
      />
      <ChatPanel />
    </div>
  )
}
