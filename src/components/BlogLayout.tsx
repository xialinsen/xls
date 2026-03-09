import { BookOpenText } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

type BlogLayoutProps = {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]" to="/">
            <BookOpenText className="h-4 w-4 text-bronze" />
            RITUAL NOTES
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavItem to="/">首页</NavItem>
            <NavItem to="/archive">归档</NavItem>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}

type NavItemProps = {
  to: string
  children: ReactNode
}

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'border-b border-bronze pb-1 text-ink'
          : 'pb-1 text-ink/70 transition hover:border-b hover:border-ink/30 hover:text-ink'
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}
