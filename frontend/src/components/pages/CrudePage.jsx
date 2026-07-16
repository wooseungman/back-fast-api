import React from 'react'
import DashboardPage from './DashboardPage'

const page = {
  title: 'Crude Performance Review',
  subtitle: '원유 도입 계획 대비 실제 투입량 및 수급 Gap 분석',
  tableTitle: 'Crude 데이터 조회 결과',
  tableSubtitle: '원유 유형별 Plan, Actual, Gap, Rate를 비교합니다.',
  chartTitle: 'Crude Intake Trend',
  chartCaption: 'Daily intake volume',
  chartBars: [48, 64, 58, 76, 69, 83, 71, 88],
  kpis: [
    { label: 'Plan', value: '214.8K', unit: 'bbl', delta: '+3.2%', tone: 'neutral', progress: 78 },
    { label: 'Actual', value: '209.1K', unit: 'bbl', delta: '-1.4%', tone: 'warning', progress: 72 },
    { label: 'Gap', value: '-5.7K', unit: 'bbl', delta: 'Watch', tone: 'danger', progress: 46 },
    { label: '달성률', value: '97.3', unit: '%', delta: '+0.8% WoW', tone: 'success', progress: 97 },
  ],
  rows: [
    ['Arab Light', '86.0K', '84.2K', '-1.8K', '97.9%'],
    ['Murban', '58.5K', '57.1K', '-1.4K', '97.6%'],
    ['Basrah', '70.3K', '67.8K', '-2.5K', '96.4%'],
  ],
}

export default function CrudePage() {
  return <DashboardPage menuName="Crude" page={page} />
}
