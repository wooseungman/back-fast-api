import React, { useEffect, useState } from 'react'
import { fetchPublicApiRows, getFallbackPublicApiRows } from '../services/publicApi'

const numberFormat = new Intl.NumberFormat('ko-KR')

export default function PublicApiPreview() {
  const [state, setState] = useState({
    status: 'loading',
    error: '',
    endpoint: '',
    rows: [],
    source: '',
  })

  const loadRows = () => {
    const controller = new AbortController()

    setState((current) => ({
      ...current,
      status: 'loading',
      error: '',
    }))

    fetchPublicApiRows({ signal: controller.signal })
      .then((result) => {
        setState({
          status: 'success',
          error: '',
          ...result,
        })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return

        const fallback = getFallbackPublicApiRows()
        setState({
          status: 'fallback',
          error: error.message,
          ...fallback,
        })
      })

    return () => controller.abort()
  }

  useEffect(() => loadRows(), [])

  return (
    <section className="content-table-section" aria-label="공공 API 연결 테스트">
      <article className="content-panel public-api-panel">
        <div className="panel-heading public-api-heading">
          <div>
            <h3 className="content-panel-title">공공 API 연결 테스트</h3>
            <span>{state.source || '서울 열린데이터광장 샘플 API 호출 중'}</span>
          </div>
          <div className="public-api-actions">
            <span className={`public-api-status public-api-status-${state.status}`}>
              {state.status === 'loading' ? 'Loading' : state.status === 'success' ? 'Live' : 'Fallback'}
            </span>
            <button type="button" className="btn-soft" onClick={loadRows}>
              Refresh
            </button>
          </div>
        </div>

        <div className="public-api-meta">
          <span>Endpoint</span>
          <code>{state.endpoint || 'openapi.seoul.go.kr'}</code>
        </div>

        {state.error ? (
          <p className="public-api-error">
            실제 API 호출이 실패해서 샘플 데이터로 표시 중입니다. 원인: {state.error}
          </p>
        ) : null}

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>기준일</th>
                <th>노선</th>
                <th>역명</th>
                <th>승차</th>
                <th>하차</th>
              </tr>
            </thead>
            <tbody>
              {state.rows.map((row) => (
                <tr key={`${row.date}-${row.line}-${row.station}`}>
                  <td>{row.date}</td>
                  <td>{row.line}</td>
                  <td>{row.station}</td>
                  <td>{numberFormat.format(row.ride)}</td>
                  <td>{numberFormat.format(row.alight)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
