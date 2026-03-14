'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products, categories } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, Heart, Eye, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const { addToCart } = useCartStore()

  const filteredProducts = products.filter(p => 
    selectedCategory === 'all' || p.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            全部<span className="gradient-text">产品</span>
          </h1>
          <p className="text-gray-500">精选优质化妆刷，满足您的各种需求</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-500'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-full bg-white"
            >
              <option value="default">默认排序</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="name">名称排序</option>
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.images[0] || '/products/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-rose-500 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                
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
                    className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 transition"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无产品</p>
          </div>
        )}
      </div>
    </div>
  )
}
