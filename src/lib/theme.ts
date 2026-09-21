import { useEffect, useState } from 'react'
import { getSettings, updateSettings, type Settings } from './storage'

function applyTheme(theme: Settings['theme']) {
  const isDark =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Settings['theme']>(() => getSettings().theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => applyTheme('system')
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [theme])

  const setTheme = (t: Settings['theme']) => {
    setThemeState(t)
    updateSettings({ theme: t })
  }

  return { theme, setTheme }
}
