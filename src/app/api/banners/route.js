import { NextResponse } from 'next/server'

// Mock banners
let banners = [
  { id: 1, title: '新品上市', subtitle: '限时优惠', image: '/banners/banner1.jpg', link: '/products', active: true },
  { id: 2, title: '会员专享', subtitle: '8折优惠', image: '/banners/banner2.jpg', link: '/products?sale=true', active: false },
]

export async function GET() {
  return NextResponse.json(banners)
}

export async function POST(request) {
  const body = await request.json()
  const newBanner = {
    id: banners.length + 1,
    ...body,
  }
  banners.push(newBanner)
  return NextResponse.json(newBanner, { status: 201 })
}
