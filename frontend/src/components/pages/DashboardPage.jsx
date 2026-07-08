import React from 'react'

const currentUser = {
  department: 'VCO Planning Team',
  employeeId: 'SKI-240718',
  name: '홍길동',
  profileImage:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23e11d48"/%3E%3Cstop offset="1" stop-color="%23fb7185"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="96" height="96" rx="28" fill="%23fff1f2"/%3E%3Ccircle cx="48" cy="38" r="18" fill="url(%23g)"/%3E%3Cpath d="M20 82c4-18 16-28 28-28s24 10 28 28" fill="url(%23g)"/%3E%3C/svg%3E',
}

export default function DashboardPage({ menuName, page }) {
  return (
    <main className="main-content">
      <header className="content-header">
        <div>
          <span className="page-eyebrow">VCO Back-casting</span>
          <h1 className="page-title" id="main-title">
            {page.title}
          </h1>
          <p className="page-subtitle">{page.subtitle}</p>
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
            <span>Period</span>
            <select className="dashboard-input">
              <option>2026.07 MTD</option>
              <option>2026 Q3</option>
              <option>2026 YTD</option>
            </select>
          </label>
          <label className="toolbar-field">
            <span>Region</span>
            <select className="dashboard-input">
              <option>All markets</option>
              <option>Domestic</option>
              <option>Export</option>
            </select>
          </label>
        </div>
        <div className="toolbar-actions">
          <button className="btn-soft">Reset</button>
          <button className="btn-primary">Apply</button>
        </div>
      </section>

      <section className="content-kpi-grid" aria-label="요약 지표">
        {page.kpis.map((kpi) => (
          <article className={`content-card kpi-card kpi-${kpi.tone}`} key={kpi.label}>
            <div className="kpi-card-top">
              <h3 className="content-card-title">{kpi.label}</h3>
              <span className="kpi-status">{kpi.delta}</span>
            </div>
            <div className="kpi-value">
              {kpi.value}
              <span>{kpi.unit}</span>
            </div>
            <div className="kpi-track">
              <span style={{ width: `${kpi.progress}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="content-chart-grid content-chart-grid-single" aria-label={`${menuName} 차트`}>
        <article className="content-panel">
          <div className="panel-heading">
            <h3 className="content-panel-title">{page.chartTitle}</h3>
            <span>{page.chartCaption}</span>
          </div>
          <div className="chart-preview line-chart-preview" aria-label={`${menuName} 트렌드 차트 미리보기`}>
            {page.chartBars.map((height, index) => (
              <span key={`${menuName}-bar-${index}`} style={{ height: `${height}%` }} />
            ))}
          </div>
        </article>
      </section>

      <section className="content-table-section" aria-label={`${menuName} 상세 데이터`}>
        <article className="content-panel">
          <div className="panel-heading">
            <h3 className="content-panel-title">{menuName} 상세 데이터</h3>
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
