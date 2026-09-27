import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm font-medium tracking-wide transition-colors duration-200',
    isActive
      ? 'text-teal-800'
      : 'text-stone-600 hover:text-teal-700',
  ].join(' ')

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FBF8F3]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/logo-mark.png"
            alt="Rafna Investment"
            className="h-10 w-10 rounded-lg object-cover shadow-sm ring-1 ring-stone-200"
          />
          <div className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight text-teal-900 sm:text-xl">
              Rafna Investment
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 sm:block">
              Kamkunji, Nairobi
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              [
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-teal-800 bg-teal-800 text-white'
                  : 'border-stone-300 text-stone-600 hover:border-teal-700 hover:text-teal-800',
              ].join(' ')
            }
          >
            Admin
          </NavLink>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-700 hover:bg-stone-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-[#FBF8F3] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/admin"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Admin
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
