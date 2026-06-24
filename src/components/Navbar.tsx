'use client'

import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'

export function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-chad-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-chad-accent rounded-lg flex items-center justify-center">
              <span className="font-bold text-black text-lg">C</span>
            </div>
            <span className="font-bold text-xl tracking-tight">ChadWallet</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/trade" className="text-chad-muted hover:text-white transition">Trade</Link>
            <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener" className="text-chad-muted hover:text-white transition">Android</a>
            <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener" className="text-chad-muted hover:text-white transition">iOS</a>
          </div>

          <div className="flex items-center gap-3">
            {ready && authenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-chad-muted hidden sm:block">
                  {user?.wallet?.address?.slice(0, 4)}...{user?.wallet?.address?.slice(-4)}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-chad-surface hover:bg-chad-muted/20 rounded-lg text-sm font-medium transition"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="px-5 py-2 bg-chad-accent hover:bg-chad-accent/90 text-black rounded-lg text-sm font-bold transition"
              >
                Sign in with Apple
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
