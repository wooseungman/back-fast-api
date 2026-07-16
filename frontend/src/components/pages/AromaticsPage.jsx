import React from 'react'
import DashboardPage from './DashboardPage'

const page = {
  title: 'Aromatics Performance Review',
  subtitle: '방향족 제품별 생산 계획, 출하 실적, 수익성 신호 분석',
  tableTitle: 'Aromatics 데이터 조회 결과',
  tableSubtitle: '방향족 제품별 Plan, Actual, Gap, Rate를 비교합니다.',
  chartTitle: 'Aromatics Product Mix',
  chartCaption: 'PX / BZ / TL execution',
  chartBars: [74, 69, 78, 85, 80, 92, 87, 95],
  kpis: [
    { label: 'Plan', value: '96.5K', unit: 'ton', delta: '+6.2%', tone: 'neutral', progress: 84 },
    { label: 'Actual', value: '99.8K', unit: 'ton', delta: '+3.4%', tone: 'success', progress: 93 },
    { label: 'Gap', value: '+3.3K', unit: 'ton', delta: 'Ahead', tone: 'success', progress: 86 },
    { label: '달성률', value: '103.4', unit: '%', delta: '+2.8% WoW', tone: 'success', progress: 100 },
  ],
  rows: [
    ['PX', '52.8K', '54.6K', '+1.8K', '103.4%'],
    ['BZ', '24.2K', '25.1K', '+0.9K', '103.7%'],
    ['TL', '19.5K', '20.1K', '+0.6K', '103.1%'],
  ],
}

export default function AromaticsPage(props) {
  return <DashboardPage menuName="Aromatics" page={page} {...props} />
}
