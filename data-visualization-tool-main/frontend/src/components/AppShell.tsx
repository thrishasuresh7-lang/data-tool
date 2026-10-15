import { ROUTES } from "../constants/routes";
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { saveLastModule } from '../services/studentState'

type NavItem = {
  to: string
  label: string
}

type AppShellProps = {
  navItems: NavItem[]
  children: ReactNode
}

const pathToLabel: Record<string, string> = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.LEARN]: 'Learn',
  [ROUTES.DATASETS]: 'Datasets',
  [ROUTES.DATA_EXPLORER]: 'Data Explorer',
  [ROUTES.DATA_CLEANING_LAB]: 'Data Cleaning Lab',
  [ROUTES.VISUALIZATION_LAB]: 'Visualization Lab',
  [ROUTES.STATISTICS_LAB]: 'Statistics Lab',
  [ROUTES.INSIGHTS_LAB]: 'Insights Lab',
  [ROUTES.PRACTICE]: 'Practice',
  [ROUTES.CHALLENGES]: 'Challenges',
  [ROUTES.PROJECTS]: 'Projects',
  [ROUTES.LEARNING_PATH]: 'Learning Path',
  [ROUTES.RESOURCES]: 'Resources',
  [ROUTES.PROGRESS]: 'Progress',
}

export default function AppShell({ navItems, children }: AppShellProps) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    saveLastModule(location.pathname)
  }, [location.pathname])

  const currentModule = useMemo(() => pathToLabel[location.pathname] ?? 'Module', [location.pathname])
  const breadcrumbs = useMemo(() => {
    if (location.pathname === '/') {
      return ['Home']
    }
    return ['Home', currentModule]
  }, [location.pathname, currentModule])

  return (
    <div className="platform-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand-block">
          <p className="brand-kicker">University Edition</p>
          <h2>DataScience Lab</h2>
        </div>
        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="content-shell">
        <header className="top-header">
          <button
            type="button"
            className="menu-button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <div className="header-meta">
            <p className="breadcrumbs">{breadcrumbs.join(' / ')}</p>
            <h1 className="module-indicator">{currentModule}</h1>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}
