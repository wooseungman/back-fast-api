import React from 'react'
import DashboardPage from './DashboardPage'

const page = {
  title: 'Gasoline Performance Review',
  subtitle: '휘발유 판매 및 생산 부문 계획 대비 실적 분석',
  tableTitle: 'Gasoline 데이터 조회 결과',
  tableSubtitle: '휘발유 판매 구분별 Plan, Actual, Gap, Rate를 비교합니다.',
  chartTitle: 'Gasoline Margin Trend',
  chartCaption: 'Daily volume and margin signal',
  chartBars: [42, 58, 50, 72, 62, 82, 74, 78],
  kpis: [
    { label: 'Plan', value: '128.4K', unit: 'bbl', delta: '+4.8%', tone: 'neutral', progress: 72 },
    { label: 'Actual', value: '121.9K', unit: 'bbl', delta: '-2.1%', tone: 'warning', progress: 64 },
    { label: 'Gap', value: '-6.5K', unit: 'bbl', delta: 'Needs action', tone: 'danger', progress: 46 },
    { label: '달성률', value: '94.9', unit: '%', delta: '+1.6% WoW', tone: 'success', progress: 94 },
  ],
  rows: [
    ['Domestic', '42.1K', '40.8K', '-1.3K', '96.9%'],
    ['Export', '54.7K', '50.4K', '-4.3K', '92.1%'],
    ['Blend', '31.6K', '30.7K', '-0.9K', '97.2%'],
  ],
}

export default function GasolinePage() {
  return <DashboardPage menuName="Gasoline" page={page} />
}
