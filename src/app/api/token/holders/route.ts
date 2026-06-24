import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mint = searchParams.get('mint')
  if (!mint) return NextResponse.json({ error: 'missing mint' }, { status: 400 })

  const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || ''
  try {
    const res = await fetch(`https://public-api.birdeye.so/public/tokenHolder?address=${mint}&limit=20`, {
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'x-api-key': BIRDEYE_API_KEY }),
      },
      next: { revalidate: 10 },
    })
    if (!res.ok) throw new Error('BirdEye failed')
    const data = await res.json()
    const holders = (data.data?.items || []).map((h: any) => ({
      address: h.owner,
      balance: h.amount,
      percentage: h.percentage || 0,
    }))
    return NextResponse.json({ holders })
  } catch {
    return NextResponse.json({ holders: [] })
  }
}
