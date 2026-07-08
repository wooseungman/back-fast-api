import React from 'react'
import AromaticsPage from './pages/AromaticsPage'
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

export default function MainContent({ activeMenu }) {
  const ActivePage = pageComponents[activeMenu] ?? GasolinePage

  return <ActivePage activeMenu={activeMenu} />
}
