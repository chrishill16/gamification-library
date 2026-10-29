import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/behaviours', label: 'Behaviours' },
  { to: '/mechanics', label: 'Mechanics' },
  { to: '/examples', label: 'Examples' },
]

export function Header() {
  return (
    <header className="border-b border-border-subtle bg-surface-raised">
      <a href="#main" className="skip-link rounded bg-ink px-3 py-2 text-sm font-medium text-surface">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink to="/" className="text-base font-semibold tracking-tight text-ink">
          The Gamification Library
        </NavLink>
        <nav aria-label="Primary" className="flex gap-5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
