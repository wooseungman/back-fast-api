import React, { useState } from 'react'
import LeftFrameMenu from './components/LeftFrameMenu'
import MainContent from './components/MainContent'
import ChatPanel from './components/ChatPanel'

export default function App() {
  const [activeMenu, setActiveMenu] = useState('Gasoline')

  return (
    <div className="flex h-full">
      <LeftFrameMenu activeMenu={activeMenu} onMenuSelect={setActiveMenu} />
      <MainContent activeMenu={activeMenu} />
      <ChatPanel />
    </div>
  )
}
