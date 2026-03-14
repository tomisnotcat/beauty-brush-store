'use client'

import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

export default function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.featured)
  const { addToCart } = useCartStore()
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          热门<span className="gradient-text">产品</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          精选好评如潮的热门产品，为您打造完美妆容
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-2xl shadow-sm overflow-hidden"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image */}
            <Link href={`/products/${product.id}`}>
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={product.images[0] || '/products/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-rose-500 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-rose-500 transition">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-rose-500">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ¥{product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition shadow-lg shadow-rose-500/30"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
          查看全部产品
        </Link>
      </div>
    </section>
  )
}
