import React from 'react'
import AromaticsPage from './pages/AromaticsPage'
import AdminPage from './pages/AdminPage'
import CrudePage from './pages/CrudePage'
import DieselPage from './pages/DieselPage'
import FoPage from './pages/FoPage'
import GasolinePage from './pages/GasolinePage'

const pageComponents = {
  Crude: CrudePage,
  Diesel: DieselPage,
  Gasoline: GasolinePage,
  FO: FoPage,
  Aromatics: AromaticsPage,
}

const adminPageComponents = {
  CodeGroups: AdminPage,
  CodeDetails: AdminPage,
  Users: AdminPage,
  Roles: AdminPage,
}

export default function MainContent({ activeMenu, isAdminMode, onToggleAdmin }) {
  const ActivePage = isAdminMode
    ? adminPageComponents[activeMenu] ?? AdminPage
    : pageComponents[activeMenu] ?? GasolinePage

  return (
    <ActivePage
      activeMenu={activeMenu}
      isAdminMode={isAdminMode}
      onToggleAdmin={onToggleAdmin}
    />
  )
}
