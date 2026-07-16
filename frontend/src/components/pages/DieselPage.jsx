import React from 'react'
import DashboardPage from './DashboardPage'

const page = {
  title: 'Diesel Performance Review',
  subtitle: '경유 생산 및 판매 실적의 계획 대비 달성률 분석',
  tableTitle: 'Diesel 데이터 조회 결과',
  tableSubtitle: '경유 채널별 Plan, Actual, Gap, Rate를 비교합니다.',
  chartTitle: 'Diesel Sales Trend',
  chartCaption: 'Domestic / export demand',
  chartBars: [52, 58, 67, 61, 79, 86, 82, 90],
  kpis: [
    { label: 'Plan', value: '152.6K', unit: 'bbl', delta: '+5.1%', tone: 'neutral', progress: 81 },
    { label: 'Actual', value: '156.8K', unit: 'bbl', delta: '+2.7%', tone: 'success', progress: 92 },
    { label: 'Gap', value: '+4.2K', unit: 'bbl', delta: 'Ahead', tone: 'success', progress: 88 },
    { label: '달성률', value: '102.8', unit: '%', delta: '+3.4% WoW', tone: 'success', progress: 100 },
  ],
  rows: [
    ['Domestic', '62.4K', '63.9K', '+1.5K', '102.4%'],
    ['Export', '72.1K', '74.8K', '+2.7K', '103.7%'],
    ['Bunker', '18.1K', '18.1K', '0.0K', '100.0%'],
  ],
}

export default function DieselPage() {
  return <DashboardPage menuName="Diesel" page={page} />
}
