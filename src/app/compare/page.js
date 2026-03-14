'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/data/products'
import { Scale, X, Check } from 'lucide-react'

export default function ComparePage() {
  const [compareList, setCompareList] = useState([])

  const addToCompare = (product) => {
    if (compareList.length < 4 && !compareList.find(p => p.id === product.id)) {
      setCompareList([...compareList, product])
    }
  }

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(p => p.id !== id))
  }

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Scale className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">产品比较</h2>
          <p className="text-gray-500 mb-8">选择产品进行对比</p>
          
          {/* Product Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="relative h-32 bg-gray-100 rounded-lg mb-3">
                  <Image
                    src={product.images[0] || '/products/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                <p className="text-rose-500 font-bold">¥{product.price}</p>
                <button
                  onClick={() => addToCompare(product)}
                  className="w-full mt-2 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600"
                >
                  添加对比
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const comparisonFeatures = [
    { name: '价格', key: 'price', format: (v) => `¥${v}` },
    { name: '基础价格', key: 'basePrice', format: (v) => v ? `¥${v}` : '-' },
    { name: '分类', key: 'category' },
    { name: '配置项数量', key: 'attributes', format: (v) => v?.length || 0 },
    { name: '库存', key: 'stock' },
    { name: '在售', key: 'inStock', format: (v) => v ? '✓' : '✗' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          产品<span className="gradient-text">比较</span>
        </h1>

        {/* Compare Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-50 w-32"></th>
                  {compareList.map(product => (
                    <th key={product.id} className="p-4 text-center bg-gray-50 min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="relative h-40 bg-gray-100 rounded-lg mb-3">
                          <Image
                            src={product.images[0] || '/products/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="font-medium text-sm">{product.name}</h3>
                      </div>
                    </th>
                  ))}
                  {/* Empty slots */}
                  {[...Array(4 - compareList.length)].map((_, i) => (
                    <th key={`empty-${i}`} className="p-4 text-center bg-gray-50 min-w-[200px]">
                      <div className="h-40 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">添加产品</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    {compareList.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        {feature.format ? feature.format(product[feature.key]) : product[feature.key]}
                      </td>
                    ))}
                    {[...Array(4 - compareList.length)].map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 text-center text-gray-300">-</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add More */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setCompareList([])}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
          >
            清空对比
          </button>
        </div>
      </div>
    </div>
  )
}
