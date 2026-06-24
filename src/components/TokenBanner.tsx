'use client'

import { useState, useEffect } from 'react'

interface Token {
  mint: string
  symbol: string
  name: string
  image: string
  price?: number
  priceChange?: number
}

export function TokenBanner({ direction = 'up', onTokenClick }: { direction?: 'up' | 'down', onTokenClick?: (mint: string) => void }) {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/tokens/trending')
        const data = await res.json()
        if (data.tokens) {
          setTokens(data.tokens.slice(0, 10))
        }
      } catch (e) {
        const fallback: Token[] = [
          { mint: 'DezXAZ8z7PnrnRJjz3wXBoRgXiCaQxEuW8Qk7ey9g easy', symbol: 'WIF', name: 'dogwifhat', image: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE' },
          { mint: '7gc...', symbol: 'BONK', name: 'Bonk', image: 'https://ipfs.io/ipfs/QmYjhr9CzXhKkLWZxxZ7gJ5n8nXkV7Dg3Uj3fGn7yjvGzW' },
          { mint: 'MEW...', symbol: 'MEW', name: 'Cat in a Dogs World', image: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE' },
          { mint: 'JUP...', symbol: 'JUP', name: 'Jupiter', image: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE' },
          { mint: 'RAY...', symbol: 'RAY', name: 'Raydium', image: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE' },
        ]
        setTokens(fallback)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  if (loading) return null

  return (
    <div className={`w-full overflow-hidden bg-chad-gray py-2 ${direction === 'up' ? '' : 'border-y border-chad-surface'}`}>
      <div className={`flex gap-8 ${direction === 'up' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
        style={{ width: `${tokens.length * 200}px` }}>
        {tokens.map((token) => (
          <button
            key={token.mint}
            onClick={() => onTokenClick?.(token.mint)}
            className="flex items-center gap-2 hover:opacity-80 transition whitespace-nowrap"
          >
            <img src={token.image} alt={token.symbol} className="w-5 h-5 rounded-full" />
            <span className="font-semibold text-sm">{token.symbol}</span>
            <span className="text-chad-muted text-xs">${token.price?.toFixed(6)}</span>
            {token.priceChange && (
              <span className={`text-xs ${token.priceChange >= 0 ? 'text-chad-green' : 'text-chad-red'}`}>
                {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
