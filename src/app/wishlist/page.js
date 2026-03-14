'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlist(stored)
  }, [])

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter(id => id !== productId)
    setWishlist(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  const addToCart = (product) => {
    // Add to cart logic
    alert('已加入购物车')
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">心愿单是空的</h2>
          <p className="text-gray-500 mb-8">快去发现心仪的产品吧！</p>
          <Link href="/products" className="btn-primary inline-flex">
            浏览产品
          </Link>
        </div>
      </div>
    )
  }

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">心愿单 ({wishlist.length})</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.images[0] || '/products/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-rose-500">¥{product.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
