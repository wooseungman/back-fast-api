const DEFAULT_PUBLIC_API_URL =
  'http://openapi.seoul.go.kr:8088/sample/json/CardSubwayStatsNew/1/10/20220301'

const fallbackRows = [
  {
    date: '20220301',
    line: '1호선',
    station: '서울역',
    ride: 39208,
    alight: 36782,
  },
  {
    date: '20220301',
    line: '2호선',
    station: '강남',
    ride: 61243,
    alight: 58901,
  },
  {
    date: '20220301',
    line: '3호선',
    station: '고속터미널',
    ride: 33518,
    alight: 34972,
  },
]

function normalizeSeoulSubwayRows(payload) {
  const rows = payload?.CardSubwayStatsNew?.row

  if (!Array.isArray(rows)) {
    return []
  }

  return rows.map((row) => ({
    date: row.USE_DT ?? '-',
    line: row.LINE_NUM ?? '-',
    station: row.SUB_STA_NM ?? '-',
    ride: Number(row.RIDE_PASGR_NUM ?? 0),
    alight: Number(row.ALIGHT_PASGR_NUM ?? 0),
  }))
}

export async function fetchPublicApiRows({ signal } = {}) {
  const endpoint = import.meta.env.VITE_PUBLIC_API_URL || DEFAULT_PUBLIC_API_URL
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const payload = await response.json()
  const rows = normalizeSeoulSubwayRows(payload)

  if (rows.length === 0) {
    throw new Error('API response has no rows')
  }

  return {
    endpoint,
    rows,
    source: '서울 열린데이터광장 지하철 승하차 인원 샘플 API',
  }
}

export function getFallbackPublicApiRows() {
  return {
    endpoint: DEFAULT_PUBLIC_API_URL,
    rows: fallbackRows,
    source: '샘플 데이터',
  }
}
