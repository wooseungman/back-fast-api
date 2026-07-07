import React from 'react'

const menuItems = ['Crude', 'Diesel', 'Gasoline', 'FO', 'Aromatics']

export default function App() {
  return (
    <div className="flex h-full">
      {/* 사이드바 */}
      <nav className="nav-sidebar">
        <div className="nav-logo">
          <h2 className="nav-title">
            <span className="font-bold-rose-600">SKI</span> VCO<br/>Back-casting
          </h2>
        </div>
        <ul className="mt-5 list-none" id="menu-list">
          <li className="menu-item menu-item-base" data-menu="Crude">Crude</li>
          <li className="menu-item menu-item-base" data-menu="Diesel">Diesel</li>
          <li className="menu-item menu-item-base menu-item-active active" data-menu="Gasoline">Gasoline</li>
          <li className="menu-item menu-item-base" data-menu="FO">FO</li>
          <li className="menu-item menu-item-base" data-menu="Aromatics">Aromatics</li>
        </ul>
      </nav>

      {/* 메인 콘덴트 */}
      <main className="main-content">
        <h1 className="page-title" id="main-title">Gasoline VCO Back-casting</h1>
        <p className="page-subtitle">판매 및 생산 부문 계획(Plan) 대비 실적(Actual) 분석</p>
      </main>

      {/* AI 채탕 패널 */}
      <aside className="aside-chat">
        <div className="chat-header">
          <span className="text-rose-600">AI</span> 데이터 분석 Assistant
        </div>
        <div className="chat-box" id="chat-box">
          <div className="max-w-[85%] rounded-lg rounded-tl-none bg-slate-200 px-4 text-[0.9rem] leading-6 text-slate-800">
            안녕하세요. SKI VCO AI입니다.<br/>현재 화면의 데이터 트렌드, 수출 프리미엄 원인 분석들에 대해 질문해 주세요.
          </div>
        </div>
        <div className="chat-input-area">
          <input id="llm-input" type="text" placeholder="질문 입력..." className="field-base flex-1" />
          <button id="llm-send" className="btn-dark">전송</button>
        </div>
      </aside>
    </div>
  )

}
