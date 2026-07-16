import React, { useEffect, useState } from 'react'

export const menuItems = ['Crude', 'Diesel', 'Gasoline', 'FO', 'Aromatics']

const menuMeta = {
  Crude: 'CR',
  Diesel: 'DS',
  Gasoline: 'GS',
  FO: 'FO',
  Aromatics: 'AR',
}

const LEFT_MENU_COLLAPSED_KEY = 'vco:left-menu-collapsed'

function getSavedCollapsedState(storageKey) {
  if (typeof window === 'undefined') return false

  return window.localStorage.getItem(storageKey) === 'true'
}

export default function LeftFrameMenu({ activeMenu, onMenuSelect }) {
  const [isCollapsed, setIsCollapsed] = useState(() => getSavedCollapsedState(LEFT_MENU_COLLAPSED_KEY))

  useEffect(() => {
    window.localStorage.setItem(LEFT_MENU_COLLAPSED_KEY, String(isCollapsed))
  }, [isCollapsed])

  return (
    <nav className={`nav-sidebar${isCollapsed ? ' nav-sidebar-collapsed' : ''}`}>
      <div className="nav-logo">
        <div className="brand-mark">V</div>
        <h2 className="nav-title">
          <span className="font-bold-rose-600">SKI</span> VCO
          <span className="nav-title-sub">Back-casting</span>
        </h2>
        <button
          type="button"
          className="nav-toggle-button"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label={isCollapsed ? '좌측 메뉴 펼치기' : '좌측 메뉴 접기'}
          title={isCollapsed ? '좌측 메뉴 펼치기' : '좌측 메뉴 접기'}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>
      <ul className="mt-5 list-none" id="menu-list">
        {menuItems.map((item) => {
          const isActive = item === activeMenu

          return (
            <li
              key={item}
              role="button"
              tabIndex={0}
              className={`menu-item menu-item-base${isActive ? ' menu-item-active active' : ''}`}
              data-menu={item}
              onClick={() => onMenuSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onMenuSelect(item)
                }
              }}
            >
              <span className="menu-item-code">{menuMeta[item]}</span>
              <span className="menu-item-label">{item}</span>
            </li>
          )
        })}
      </ul>
      <div className="nav-footer">
        <span className="nav-footer-label">Current view</span>
        <strong>{activeMenu}</strong>
      </div>
    </nav>
  )
}
