import React from 'react'
import DashboardPage from './DashboardPage'

const page = {
  title: 'FO Performance Review',
  subtitle: '중유 제품 수요, 재고, 출하 계획 대비 실적 분석',
  tableTitle: 'FO 데이터 조회 결과',
  tableSubtitle: '중유 수요처별 Plan, Actual, Gap, Rate를 비교합니다.',
  chartTitle: 'FO Shipment Trend',
  chartCaption: 'Weekly shipment execution',
  chartBars: [66, 54, 61, 49, 57, 63, 58, 70],
  kpis: [
    { label: 'Plan', value: '82.7K', unit: 'bbl', delta: '-0.6%', tone: 'neutral', progress: 68 },
    { label: 'Actual', value: '79.4K', unit: 'bbl', delta: '-1.9%', tone: 'warning', progress: 61 },
    { label: 'Gap', value: '-3.3K', unit: 'bbl', delta: 'Delay', tone: 'danger', progress: 42 },
    { label: '달성률', value: '96.0', unit: '%', delta: '-0.7% WoW', tone: 'warning', progress: 82 },
  ],
  rows: [
    ['Marine', '34.2K', '33.1K', '-1.1K', '96.8%'],
    ['Utility', '28.4K', '26.9K', '-1.5K', '94.7%'],
    ['Industrial', '20.1K', '19.4K', '-0.7K', '96.5%'],
  ],
}

export default function FoPage(props) {
  return <DashboardPage menuName="FO" page={page} {...props} />
}
