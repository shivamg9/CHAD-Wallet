import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mint = searchParams.get('mint')
  if (!mint) return NextResponse.json({ error: 'missing mint' }, { status: 400 })

  const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY || ''
  try {
    const res = await fetch(`https://public-api.birdeye.so/public/tx/token_transfer?address=${mint}&tx_type=transfer&limit=20`, {
      headers: {
        'accept': 'application/json',
        'x-chain': 'solana',
        ...(BIRDEYE_API_KEY && { 'x-api-key': BIRDEYE_API_KEY }),
      },
      next: { revalidate: 5 },
    })
    const data = await res.json()
    const trades = (data.data?.items || []).map((item: any, i: number) => ({
      signature: item.txHash || `fake-${mint}-${i}`,
      type: item.from === mint ? 'sell' : 'buy',
      amount: item.amount || 0,
      price: item.humanType === 'buy' ? (item.price || 0) : 0,
      timestamp: item.blockUnixTime || Date.now() - i * 60000,
    }))
    return NextResponse.json({ trades })
  } catch {
    return NextResponse.json({ trades: [] })
  }
}
