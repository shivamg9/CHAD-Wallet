import { NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mint = searchParams.get('mint')
  if (!mint) return NextResponse.json({ error: 'missing mint' }, { status: 400 })

  const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || ''
  try {
    const res = await fetch(`https://public-api.birdeye.so/public/token/single?address=${mint}`, {
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'x-api-key': BIRDEYE_API_KEY }),
      },
      next: { revalidate: 5 },
    })
    if (!res.ok) throw new Error('BirdEye failed')
    const data = await res.json()
    const t = data.data
    const connection = new Connection('https://api.mainnet-beta.solana.com')
    const pubkey = new PublicKey(mint)
    const supply = await connection.getSupply(pubkey)
    const totalSupply = supply.value.total / Math.pow(10, t.decimals || 9)
    const marketCap = (t.price || 0) * totalSupply

    return NextResponse.json({
      token: {
        mint,
        symbol: t.symbol,
        name: t.name || t.symbol,
        image: t.logoURI || '',
        price: t.price || 0,
        priceChange24h: t.v24hChangePercent || 0,
        marketCap,
        volume24h: t.v24hUSD || 0,
        holders: 0,
        createdAt: new Date().toISOString(),
      }
    })
  } catch {
    return NextResponse.json({
      token: {
        mint,
        symbol: '???',
        name: 'Unknown Token',
        image: 'https://ipfs.io/ipfs/QmaACp3KApAZnwfSpYYCTfD9PdRDFmh4A7R4pL3oQVXWLE',
        price: 0.0001,
        priceChange24h: 0,
        marketCap: 100000,
        volume24h: 10000,
        holders: 0,
        createdAt: new Date().toISOString(),
      }
    })
  }
}
