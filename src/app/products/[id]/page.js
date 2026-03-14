'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function ProductDetailPage({ params }) {
  const productId = parseInt(params.id)
  const product = products.find(p => p.id === productId)
  const { addToCart } = useCartStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">产品未找到</h2>
          <Link href="/products" className="text-rose-500 hover:underline">
            返回产品列表
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-rose-500">首页</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-rose-500">产品列表</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src={product.images[0] || '/products/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.tags?.length > 0 && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-rose-500 text-white text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-500 ml-2">(128 条评价)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-rose-500">¥{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">¥{product.originalPrice}</span>
                    <span className="px-2 py-1 bg-red-500 text-white text-sm rounded">
                      省 ¥{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">数量</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-500">库存: {product.stock} 件</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? '已加入购物车' : '加入购物车'}
              </button>
              <button className="w-14 h-14 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-rose-500 hover:text-rose-500 transition">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Info */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-8 text-center">📦</span>
                <span>48小时内发货</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-8 text-center">🛡️</span>
                <span>30天无理由退换</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-8 text-center">🚚</span>
                <span>满199免运费</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">相关产品</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={p.images[0] || '/products/placeholder.jpg'}
                    alt={p.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-800 line-clamp-1">{p.name}</h3>
                <p className="text-rose-500 font-bold">¥{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
