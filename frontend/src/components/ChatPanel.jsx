import React, { useEffect, useState } from 'react'

export default function ChatPanel() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false

    return window.localStorage.getItem('vco:chat-panel-collapsed') === 'true'
  })
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요. SKI VCO AI입니다.\n현재 화면의 데이터 트렌드, 수출 프리미엄 원인 분석들에 대해 질문해 주세요.',
      isBot: true,
    },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    window.localStorage.setItem('vco:chat-panel-collapsed', String(isCollapsed))
  }, [isCollapsed])

  const handleSend = () => {
    if (input.trim() === '') return

    // 사용자 메시지 추가
    setMessages([...messages, { id: messages.length + 1, text: input, isBot: false }])
    setInput('')

    // 봇 응답 (추후 실제 AI API 연동)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: '죄송합니다. 현재 응답 기능이 준비 중입니다.', isBot: true },
      ])
    }, 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <aside className={`aside-chat${isCollapsed ? ' aside-chat-collapsed' : ''}`}>
      {isCollapsed ? (
        <button
          type="button"
          className="chat-collapsed-button"
          onClick={() => setIsCollapsed(false)}
          aria-label="AI Assistant 펼치기"
          title="AI Assistant 펼치기"
        >
          <span>AI</span>
          <strong>Assistant</strong>
          <i>‹</i>
        </button>
      ) : null}
      <div className="chat-header">
        <div>
          <span className="chat-kicker">AI Assistant</span>
          <strong>데이터 분석</strong>
        </div>
        <div className="chat-header-actions">
          <span className="chat-status">Online</span>
          <button
            type="button"
            className="chat-toggle-button"
            onClick={() => setIsCollapsed(true)}
            aria-label="AI Assistant 접기"
            title="AI Assistant 접기"
          >
            ›
          </button>
        </div>
      </div>
      <div className="chat-box" id="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          id="llm-input"
          type="text"
          placeholder="질문 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="field-base flex-1"
        />
        <button id="llm-send" onClick={handleSend} className="btn-send" aria-label="전송">
          →
        </button>
      </div>
    </aside>
  )
}
