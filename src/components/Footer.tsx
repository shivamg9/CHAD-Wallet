'use client'

import Link from 'next/link'
import { Twitter, MessageCircle, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-chad-surface bg-chad-gray mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-chad-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-black text-lg">C</span>
              </div>
              <span className="font-bold text-xl tracking-tight">ChadWallet</span>
            </Link>
            <p className="text-chad-muted text-sm max-w-md">
              The fastest way to trade Solana memecoins. Built for the people, powered by innovation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-chad-muted text-sm">
              <li><Link href="/trade" className="hover:text-white transition">Trade</Link></li>
              <li><a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener" className="hover:text-white transition">Android App</a></li>
              <li><a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener" className="hover:text-white transition">iOS App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="flex gap-4">
              <a href="#" className="text-chad-muted hover:text-white transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-chad-muted hover:text-white transition"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-chad-muted hover:text-white transition"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-chad-surface flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-chad-muted text-xs">© 2026 ChadWallet. All rights reserved.</p>
          <div className="flex gap-6 text-chad-muted text-xs">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
