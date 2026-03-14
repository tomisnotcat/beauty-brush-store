'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import { ShoppingCart } from 'lucide-react'

export default function RecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    setRecentlyViewed(stored.slice(0, 4))
  }, [])

  if (recentlyViewed.length === 0) return null

  const viewedProducts = products.filter(p => recentlyViewed.includes(p.id))

  if (viewedProducts.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">最近浏览</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {viewedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src={product.images[0] || '/products/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            <p className="text-rose-500 font-bold">¥{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
