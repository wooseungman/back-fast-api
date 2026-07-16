import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const currentUser = {
  department: 'VCO Planning Team',
  employeeId: 'SKI-240718',
  name: '홍길동',
  profileImage:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23e11d48"/%3E%3Cstop offset="1" stop-color="%23fb7185"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="96" height="96" rx="28" fill="%23fff1f2"/%3E%3Ccircle cx="48" cy="38" r="18" fill="url(%23g)"/%3E%3Cpath d="M20 82c4-18 16-28 28-28s24 10 28 28" fill="url(%23g)"/%3E%3C/svg%3E',
}

function SearchIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 21-4.3-4.3" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v6h6" />
    </svg>
  )
}

export default function DashboardPage({ menuName, page }) {
  const defaultDateRange = [new Date(2026, 6, 1), new Date(2026, 6, 16)]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [startDate, endDate] = dateRange
  const tableTitle = page.tableTitle ?? `${menuName} 조회 결과`
  const tableSubtitle = page.tableSubtitle ?? page.subtitle

  return (
    <main className="main-content">
      <header className="content-header">
        <div>
          <span className="page-eyebrow">VCO Back-casting</span>
          <h1 className="page-title" id="main-title">
            {page.title}
          </h1>
        </div>
        <div className="user-summary" aria-label="접속 사용자 정보">
          <img
            className="user-avatar"
            src={currentUser.profileImage}
            alt={`${currentUser.name} 프로필 사진`}
          />
          <div className="user-summary-body">
            <span className="user-summary-label">접속 사용자</span>
            <strong>{currentUser.name}</strong>
            <dl className="user-meta">
              <div>
                <dt>부서</dt>
                <dd>{currentUser.department}</dd>
              </div>
              <div>
                <dt>사번</dt>
                <dd>{currentUser.employeeId}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <section className="content-toolbar" aria-label="조회 조건">
        <div className="toolbar-group">
          <label className="toolbar-field">
            <span>기간</span>
            <DatePicker
              className="dashboard-input datepicker-input"
              dateFormat="yyyy.MM.dd"
              endDate={endDate}
              onChange={(dates) => setDateRange(dates)}
              placeholderText="기간 선택"
              selectsRange
              startDate={startDate}
            />
          </label>
          <label className="toolbar-field">
            <span>권역</span>
            <select className="dashboard-input">
              <option>All markets</option>
              <option>Domestic</option>
              <option>Export</option>
            </select>
          </label>
          <label className="toolbar-field">
            <span>제품</span>
            <select className="dashboard-input">
              <option>{menuName}</option>
            </select>
          </label>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="btn-soft btn-with-icon" onClick={() => setDateRange(defaultDateRange)}>
            <ResetIcon />
            초기화
          </button>
          <button type="button" className="btn-primary btn-with-icon">
            <SearchIcon />
            조회
          </button>
        </div>
      </section>

      <section className="content-table-section" aria-label={`${menuName} 상세 데이터`}>
        <article className="content-panel">
          <div className="panel-heading">
            <div>
              <h3 className="content-panel-title">{tableTitle}</h3>
              <p className="table-subtitle">{tableSubtitle}</p>
            </div>
            <span>Plan / Actual / Gap</span>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Channel</th>
                  <th>Plan</th>
                  <th>Actual</th>
                  <th>Gap</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  )
}
