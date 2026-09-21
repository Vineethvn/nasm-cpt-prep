import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Wrench, AlertTriangle, Settings, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../lib/theme'
import { getStore } from '../lib/storage'
import clsx from 'clsx'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/modules', label: 'Modules', icon: BookOpen },
  { to: '/trainers', label: 'Trainers', icon: Wrench },
  { to: '/weak-spots', label: 'Weak Spots', icon: AlertTriangle },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Layout() {
  const { theme, setTheme } = useTheme()
  const streak = getStore().streak.current

  function cycleTheme() {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')
  }

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <aside className="hidden sm:flex sm:w-56 sm:flex-col sm:border-r sm:border-(--color-border) sm:p-4 sm:gap-1">
        <div className="font-semibold text-lg px-2 mb-4">NASM-CPT Prep</div>
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
                isActive ? 'bg-(--color-accent)/10 text-(--color-accent) font-medium' : 'text-(--color-text-muted) hover:bg-(--color-border)/40',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </aside>

      <header className="sm:hidden flex items-center justify-between border-b border-(--color-border) px-4 py-3">
        <div className="font-semibold">NASM-CPT Prep</div>
        <div className="flex items-center gap-3">
          {streak > 0 && <span className="text-xs text-(--color-text-muted)">🔥 {streak}</span>}
          <button aria-label="Toggle theme" onClick={cycleTheme}><ThemeIcon size={18} /></button>
        </div>
      </header>

      <div className="hidden sm:flex sm:items-center sm:justify-end sm:absolute sm:top-4 sm:right-6 sm:gap-3 sm:z-10">
        {streak > 0 && <span className="text-xs text-(--color-text-muted)">🔥 {streak} day streak</span>}
        <button aria-label="Toggle theme" onClick={cycleTheme} className="rounded-lg border border-(--color-border) p-2">
          <ThemeIcon size={16} />
        </button>
      </div>

      <main className="flex-1 pb-20 sm:pb-8 px-4 py-6 sm:px-8 max-w-3xl w-full mx-auto">
        <Outlet />
      </main>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 border-t border-(--color-border) bg-(--color-surface) flex justify-around py-2">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx('flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]', isActive ? 'text-(--color-accent)' : 'text-(--color-text-muted)')
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
