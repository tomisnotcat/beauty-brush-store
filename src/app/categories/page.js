'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products, categories } from '@/data/products'
import { Filter, Grid, List } from 'lucide-react'

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getCategoryProducts = (categoryId) => {
    if (categoryId === 'all') return products
    return products.filter(p => p.category === categoryId)
  }

  const categoryInfo = {
    'all': { name: '全部产品', description: '所有化妆刷产品', count: products.length },
    '套装': { name: '化妆刷套装', description: '专业套装，满足各种需求', count: products.filter(p => p.category === '套装').length },
    '单支': { name: '单支刷', description: '精选单支，精准上妆', count: products.filter(p => p.category === '单支').length },
    '礼盒': { name: '礼盒套装', description: '精美礼盒，送礼首选', count: products.filter(p => p.category === '礼盒').length },
    '限量版': { name: '限量版', description: '稀有款式，收藏价值', count: products.filter(p => p.category === '限量版').length },
  }

  const currentProducts = getCategoryProducts(selectedCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {categoryInfo[selectedCategory]?.name || '全部产品'}
          </h1>
          <p className="text-xl opacity-90">
            {categoryInfo[selectedCategory]?.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.images[0] || '/products/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.tags?.length > 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-rose-500 text-white text-xs rounded-full">
                        {product.tags[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-rose-500 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-500">
                      ¥{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">该分类暂无产品</p>
          </div>
        )}
      </div>
    </div>
  )
}
