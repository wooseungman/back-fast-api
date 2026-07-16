import React from 'react'

const currentUser = {
  department: 'VCO Planning Team',
  employeeId: 'SKI-240718',
  name: '홍길동',
  profileImage:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%230f766e"/%3E%3Cstop offset="1" stop-color="%232dd4bf"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="96" height="96" rx="28" fill="%23ecfdf5"/%3E%3Ccircle cx="48" cy="38" r="18" fill="url(%23g)"/%3E%3Cpath d="M20 82c4-18 16-28 28-28s24 10 28 28" fill="url(%23g)"/%3E%3C/svg%3E',
}

const adminPages = {
  CodeGroups: {
    title: '코드그룹 관리',
    subtitle: '공통코드 그룹을 등록하고 사용 여부와 정렬 순서를 관리합니다.',
    badge: 'Code Group',
    rows: [
      ['PRODUCT_TYPE', '제품 구분', 'Y', '10', '제품 메뉴 및 조회 조건'],
      ['REGION_TYPE', '권역 구분', 'Y', '20', 'Domestic / Export'],
      ['USE_YN', '사용 여부', 'Y', '30', 'Y / N'],
    ],
  },
  CodeDetails: {
    title: '코드상세 관리',
    subtitle: '코드그룹에 속한 상세 코드를 등록하고 노출 순서를 관리합니다.',
    badge: 'Code Detail',
    rows: [
      ['1', 'PRODUCT_TYPE', 'CRUDE', 'Crude', 'Y'],
      ['2', 'PRODUCT_TYPE', 'DIESEL', 'Diesel', 'Y'],
      ['3', 'PRODUCT_TYPE', 'GASOLINE', 'Gasoline', 'Y'],
    ],
  },
  Users: {
    title: '사용자 관리',
    subtitle: '사용자 기본 정보와 관리자 권한 부여 상태를 관리합니다.',
    badge: 'Users',
    rows: [
      ['SKI-240718', '홍길동', 'VCO Planning Team', 'Admin', 'Y'],
      ['SKI-240719', '김민수', 'Sales Planning Team', 'User', 'Y'],
      ['SKI-240720', '이서연', 'Production Team', 'User', 'Y'],
    ],
  },
  Roles: {
    title: '권한 관리',
    subtitle: '메뉴 접근 권한과 관리자 기능 사용 권한을 관리합니다.',
    badge: 'Roles',
    rows: [
      ['ADMIN', '관리자', '전체 관리자 기능', 'Y', '10'],
      ['PLANNER', '계획 담당자', '업무 화면 조회/편집', 'Y', '20'],
      ['VIEWER', '조회 사용자', '업무 화면 조회', 'Y', '30'],
    ],
  },
}

const columnsByMenu = {
  CodeGroups: ['코드그룹 ID', '코드그룹명', '사용여부', '정렬순서', '설명'],
  CodeDetails: ['코드상세 ID', '코드그룹 ID', '코드', '코드명', '사용여부'],
  Users: ['사번', '이름', '부서', '권한', '사용여부'],
  Roles: ['권한 ID', '권한명', '설명', '사용여부', '정렬순서'],
}

export default function AdminPage({ activeMenu, isAdminMode, onToggleAdmin }) {
  const page = adminPages[activeMenu] ?? adminPages.CodeGroups
  const columns = columnsByMenu[activeMenu] ?? columnsByMenu.CodeGroups

  return (
    <main className="main-content admin-main-content">
      <header className="content-header">
        <div>
          <span className="page-eyebrow admin-eyebrow">Admin Console</span>
          <h1 className="page-title" id="main-title">
            {page.title}
          </h1>
          <p className="page-subtitle">{page.subtitle}</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className={`admin-mode-button${isAdminMode ? ' admin-mode-button-active' : ''}`}
            onClick={onToggleAdmin}
          >
            Admin
          </button>
          <div className="user-summary admin-user-summary" aria-label="접속 사용자 정보">
            <img
              className="user-avatar"
              src={currentUser.profileImage}
              alt={`${currentUser.name} 프로필 사진`}
            />
            <div className="user-summary-body">
              <span className="user-summary-label">관리자</span>
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
        </div>
      </header>

      <section className="content-toolbar admin-toolbar" aria-label="관리자 조회 조건">
        <div className="toolbar-group">
          <label className="toolbar-field">
            <span>검색어</span>
            <input className="dashboard-input" placeholder="ID 또는 이름 입력" />
          </label>
          <label className="toolbar-field">
            <span>사용여부</span>
            <select className="dashboard-input">
              <option>전체</option>
              <option>Y</option>
              <option>N</option>
            </select>
          </label>
          <label className="toolbar-field">
            <span>관리 대상</span>
            <select className="dashboard-input">
              <option>{page.badge}</option>
            </select>
          </label>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="btn-soft">초기화</button>
          <button type="button" className="btn-admin-primary">조회</button>
        </div>
      </section>

      <section className="content-table-section" aria-label={`${page.title} 테이블`}>
        <article className="content-panel admin-panel">
          <div className="panel-heading">
            <div>
              <h3 className="content-panel-title">{page.badge} 목록</h3>
              <p className="table-subtitle">{page.subtitle}</p>
            </div>
            <span>Admin</span>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((row) => (
                  <tr key={row.join('-')}>
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
