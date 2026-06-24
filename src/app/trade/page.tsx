'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface TokenInfo {
  mint: string
  symbol: string
  name: string
  image: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  holders: number
  createdAt: string
}

interface Trade {
  signature: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  timestamp: number
}

export default function TradePage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState<TokenInfo | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [holders, setHolders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    const mint = searchParams.get('mint')
    if (!mint) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const [infoRes, tradesRes, holdersRes] = await Promise.all([
          fetch(`/api/token/info?mint=${mint}`),
          fetch(`/api/token/trades?mint=${mint}`),
          fetch(`/api/token/holders?mint=${mint}`),
        ])
        const info = await infoRes.json()
        const tradesData = await tradesRes.json()
        const holdersData = await holdersRes.json()
        if (info.token) setToken(info.token)
        if (tradesData.trades) setTrades(tradesData.trades)
        if (holdersData.holders) setHolders(holdersData.holders)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchParams])

  const handleSwap = () => {
    alert(`Swap ${amount} SOL for ${token?.symbol || 'tokens'} (Jupiter integration would go here)`)
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-chad-accent">Loading...</div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-chad-muted hover:text-white transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        {!token ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Select a token to trade</h2>
            <p className="text-chad-muted">Click on a token from the banners above or use the search.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-sm text-chad-muted uppercase tracking-wider">Trending</h3>
              <TrendingSidebar onSelect={setToken} />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <img src={token.image} alt={token.symbol} className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="text-2xl font-bold">{token.symbol}</h1>
                  <p className="text-chad-muted text-sm">{token.name}</p>
                </div>
                <a
                  href={`https://solscan.io/token/${token.mint}`}
                  target="_blank"
                  rel="noopener"
                  className="ml-auto text-chad-muted hover:text-white"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-chad-gray p-4 rounded-xl">
                  <div className="text-chad-muted text-xs mb-1">Price</div>
                  <div className="text-lg font-bold">${token.price.toFixed(6)}</div>
                </div>
                <div className="bg-chad-gray p-4 rounded-xl">
                  <div className="text-chad-muted text-xs mb-1">24h Change</div>
                  <div className={`text-lg font-bold ${token.priceChange24h >= 0 ? 'text-chad-green' : 'text-chad-red'}`}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </div>
                </div>
                <div className="bg-chad-gray p-4 rounded-xl">
                  <div className="text-chad-muted text-xs mb-1">Market Cap</div>
                  <div className="text-lg font-bold">${(token.marketCap / 1e6).toFixed(2)}M</div>
                </div>
              </div>

              <div className="bg-chad-gray rounded-xl border border-chad-surface p-4 min-h-[400px]">
                <ChartPanel mint={token.mint} />
              </div>

              <div className="bg-chad-gray rounded-xl border border-chad-surface overflow-hidden">
                <div className="p-4 border-b border-chad-surface">
                  <h3 className="font-semibold">Holders ({token.holders})</h3>
                </div>
                <div className="divide-y divide-chad-surface">
                  {holders.slice(0, 10).map((h, i) => (
                    <div key={i} className="p-4 flex items-center justify-between text-sm">
                      <span className="font-mono">{h.address?.slice(0, 4)}...{h.address?.slice(-4)}</span>
                      <span className="text-chad-muted">{h.balance ? (h.balance / 1e9).toLocaleString() : '-'} {token.symbol}</span>
                      <span className="text-chad-muted">{h.percentage ? h.percentage.toFixed(2) : '-'}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-chad-gray rounded-xl border border-chad-surface overflow-hidden">
                <div className="p-4 border-b border-chad-surface">
                  <h3 className="font-semibold">Live Trades</h3>
                </div>
                <div className="divide-y divide-chad-surface max-h-64 overflow-y-auto">
                  {trades.map((t) => (
                    <div key={t.signature} className="p-3 flex items-center justify-between text-sm">
                      <span className={`font-bold ${t.type === 'buy' ? 'text-chad-green' : 'text-chad-red'}`}>
                        {t.type.toUpperCase()}
                      </span>
                      <span className="font-mono">{t.amount.toLocaleString()}</span>
                      <span className="text-chad-muted">${t.price.toFixed(6)}</span>
                      <a href={`https://solscan.io/tx/${t.signature}`} target="_blank" rel="noopener" className="text-chad-accent hover:underline">
                        view
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-chad-gray rounded-2xl border border-chad-surface p-6 sticky top-20">
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setSide('buy')}
                    className={`flex-1 py-3 rounded-xl font-bold transition ${side === 'buy' ? 'bg-chad-green text-black' : 'bg-chad-surface text-chad-muted'}`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setSide('sell')}
                    className={`flex-1 py-3 rounded-xl font-bold transition ${side === 'sell' ? 'bg-chad-red text-black' : 'bg-chad-surface text-chad-muted'}`}
                  >
                    Sell
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-chad-muted block mb-1">Amount ({side === 'buy' ? 'SOL' : token.symbol})</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-chad-surface border border-chad-muted/20 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-chad-accent"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-chad-muted">
                    <span>Rate</span>
                    <span>1 SOL = {token.price ? (1 / token.price).toFixed(2) : '-'} {token.symbol}</span>
                  </div>
                  <div className="flex justify-between text-xs text-chad-muted">
                    <span>Fee</span>
                    <span>0.1%</span>
                  </div>
                  <button
                    onClick={handleSwap}
                    className="w-full py-4 bg-chad-accent hover:bg-chad-accent/90 text-black font-bold rounded-xl transition"
                  >
                    {side === 'buy' ? 'Buy' : 'Sell'} {token.symbol}
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-chad-surface">
                  <h4 className="text-sm font-semibold mb-2">Your Position</h4>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-chad-muted">Balance</span>
                    <span>0.00 {token.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-chad-muted">Value</span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TrendingSidebar({ onSelect }: { onSelect: (t: TokenInfo) => void }) {
  const [tokens, setTokens] = useState<TokenInfo[]>([])

  useEffect(() => {
    fetch('/api/tokens/trending')
      .then(r => r.json())
      .then(d => d.tokens && setTokens(d.tokens.slice(0, 8)))
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-2">
      {tokens.map((t) => (
        <button
          key={t.mint}
          onClick={() => onSelect(t)}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-chad-surface transition text-left"
        >
          <img src={t.image} alt={t.symbol} className="w-8 h-8 rounded-full" />
          <div>
            <div className="font-semibold text-sm">{t.symbol}</div>
            <div className="text-xs text-chad-muted">${t.price?.toFixed(6)}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

function ChartPanel({ mint }: { mint: string }) {
  const chartRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    import('lightweight-charts').then(({ createChart, ColorType }) => {
      const chart = createChart(chartRef.current!, {
        width: chartRef.current!.clientWidth,
        height: 380,
        layout: {
          background: { type: ColorType.Solid, color: '#000000' },
          textColor: '#848E9C',
        },
        grid: { vertLines: { color: '#1E2329' }, horzLines: { color: '#1E2329' } },
        crosshair: { mode: 0 },
        rightPriceScale: { borderColor: '#1E2329' },
        timeScale: { borderColor: '#1E2329', timeVisible: true },
      })
      const candleSeries = chart.addCandlestickSeries({
        upColor: '#0ECB81',
        downColor: '#F6465D',
        borderVisible: false,
        wickUpColor: '#0ECB81',
        wickDownColor: '#F6465D',
      })

      fetch(`/api/token/candles?mint=${mint}`)
        .then(r => r.json())
        .then(d => {
          if (d.candles) candleSeries.setData(d.candles)
        })
        .catch(() => {})

      const ro = new ResizeObserver(() => {
        if (chartRef.current) chart.applyOptions({ width: chartRef.current.clientWidth })
      })
      ro.observe(chartRef.current)
      return () => { ro.disconnect(); chart.remove() }
    })
  }, [mint])

  return <div ref={chartRef} className="w-full" />
}
