import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mint = searchParams.get('mint')
  if (!mint) return NextResponse.json({ error: 'missing mint' }, { status: 400 })

  const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || ''
  try {
    const res = await fetch(`https://public-api.birdeye.so/public/ohlcv?address=${mint}&type=1H&limit=100`, {
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'x-api-key': BIRDEYE_API_KEY }),
      },
      next: { revalidate: 10 },
    })
    if (!res.ok) throw new Error('BirdEye failed')
    const data = await res.json()
    const candles = (data.data?.items || []).map((c: any) => ({
      time: c.unixTime,
      open: c.o,
      high: c.h,
      low: c.l,
      close: c.c,
    }))
    return NextResponse.json({ candles })
  } catch {
    return NextResponse.json({ candles: [] })
  }
}
