import { NextResponse } from 'next/server'

// Mock product data
let products = [
  { id: 1, name: '专业化妆刷套装', price: 399, category: '套装', inStock: true, stock: 50 },
  { id: 2, name: '钻石系列化妆刷', price: 899, category: '限量版', inStock: true, stock: 10 },
  { id: 3, name: '基础入门套装', price: 129, category: '入门', inStock: true, stock: 100 },
]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request) {
  const body = await request.json()
  const newProduct = {
    id: products.length + 1,
    ...body,
  }
  products.push(newProduct)
  return NextResponse.json(newProduct, { status: 201 })
}
