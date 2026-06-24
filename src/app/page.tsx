import Link from 'next/link'
import { TokenBanner } from '@/components/TokenBanner'
import { ArrowRight, Play, Smartphone, Zap, TrendingUp, Shield } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen">
      <TokenBanner direction="down" />

      <main>
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-chad-accent/5 to-transparent" />
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chad-surface border border-chad-accent/20 mb-6">
                  <span className="w-2 h-2 bg-chad-green rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-chad-accent">Solana Memecoins</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                  Trade memecoins <br />
                  <span className="text-chad-accent">at Chad speed.</span>
                </h1>
                <p className="text-chad-muted text-lg mb-8 max-w-lg">
                  Lightning-fast swaps, real-time charts, and the best UI for trading Solana memecoins.
                  Built for degens, by degens.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/trade"
                    className="px-8 py-4 bg-chad-accent hover:bg-chad-accent/90 text-black font-bold rounded-xl transition inline-flex items-center gap-2"
                  >
                    Start Trading <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                    target="_blank"
                    rel="noopener"
                    className="px-8 py-4 bg-chad-surface hover:bg-chad-muted/20 font-semibold rounded-xl transition inline-flex items-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" /> Download App
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="relative bg-chad-gray rounded-2xl p-6 border border-chad-surface shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-chad-red" />
                    <div className="w-3 h-3 rounded-full bg-chad-accent" />
                    <div className="w-3 h-3 rounded-full bg-chad-green" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-chad-surface rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-chad-accent/20 flex items-center justify-center text-chad-accent font-bold text-xs">WIF</div>
                          <span className="font-semibold">dogwifhat</span>
                        </div>
                        <span className="text-chad-green text-sm">+12.4%</span>
                      </div>
                      <div className="text-2xl font-bold">$2.84</div>
                      <div className="h-24 bg-gradient-to-r from-chad-green/20 to-transparent rounded-lg mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Why ChadWallet?</h2>
            <p className="text-chad-muted text-center mb-12 max-w-2xl mx-auto">
              Everything you need to trade memecoins, all in one place.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-chad-gray p-8 rounded-2xl border border-chad-surface hover:border-chad-accent/30 transition">
                <div className="w-12 h-12 bg-chad-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-chad-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-chad-muted text-sm">Execute trades in milliseconds with our optimized routing through Jupiter.</p>
              </div>
              <div className="bg-chad-gray p-8 rounded-2xl border border-chad-surface hover:border-chad-accent/30 transition">
                <div className="w-12 h-12 bg-chad-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-chad-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
                <p className="text-chad-muted text-sm">Live charts, trending tokens, and holder analytics powered by BirdEye.</p>
              </div>
              <div className="bg-chad-gray p-8 rounded-2xl border border-chad-surface hover:border-chad-accent/30 transition">
                <div className="w-12 h-12 bg-chad-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-chad-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Auth</h3>
                <p className="text-chad-muted text-sm">Sign in with Apple and Google via Privy. Your keys, your control.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
