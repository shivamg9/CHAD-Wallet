import { NextResponse } from 'next/server'

const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || ''

async function fetchWithTimeout(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'x-api-key': BIRDEYE_API_KEY }),
      },
      next: { revalidate: 10 },
    })
    if (!res.ok) throw new Error('BirdEye failed')
    return res.json()
  } catch {
    return null
  }
}

export async function GET() {
  const data = await fetchWithTimeout('https://public-api.birdeye.so/public/tokenlist?sort_by=v24h_change_desc&limit=20')
  const fallback: any[] = [
    { address: 'DezXAZ8z7PnrnRJjz3wXBoRgXiCaQxEuW8Qk7ey9g good', symbol: 'WIF', name: 'dogwifhat', logoURI: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE', price: 2.84, v24hChangePercent: 12.4, v24hUSD: 85000000, mc: 2850000000 },
    { address: '8f3a...', symbol: 'BONK', name: 'Bonk', logoURI: 'https://ipfs.io/ipfs/QmYjhr9CzXhKkLWZxxZ7gJ5n8nXkV7Dg3Uj3fGn7yjvGzW', price: 0.0000284, v24hChangePercent: 5.2, v24hUSD: 45000000, mc: 1800000000 },
    { address: 'MEW...', symbol: 'MEW', name: 'Cat in a Dogs World', logoURI: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE', price: 0.0048, v24hChangePercent: -3.1, v24hUSD: 32000000, mc: 480000000 },
    { address: 'JUP...', symbol: 'JUP', name: 'Jupiter', logoURI: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE', price: 1.24, v24hChangePercent: 8.9, v24hUSD: 95000000, mc: 3500000000 },
    { address: 'RAY...', symbol: 'RAY', name: 'Raydium', logoURI: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE', price: 3.45, v24hChangePercent: 4.7, v24hUSD: 42000000, mc: 980000000 },
  ]
  const tokens = data?.data?.tokens || fallback
  return NextResponse.json({ tokens: tokens.map((t: any) => ({
    mint: t.address || t.mint,
    symbol: t.symbol,
    name: t.name,
    image: t.logoURI || 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE',
    price: t.price || t.priceUsd,
    priceChange: t.v24hChangePercent || t.priceChange24h,
    marketCap: t.mc || t.marketCap,
    volume24h: t.v24hUSD || t.volume24h,
  })) })
}
