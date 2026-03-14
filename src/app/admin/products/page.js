'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products, categories } from '@/data/products'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [productsList, setProductsList] = useState(products)

  const filteredProducts = productsList.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  const deleteProduct = (id) => {
    if (confirm('确定要删除这个产品吗？')) {
      setProductsList(productsList.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">产品管理</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加产品
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索产品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="all">全部分类</option>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-500">产品</th>
                <th className="text-left p-4 font-medium text-gray-500">分类</th>
                <th className="text-left p-4 font-medium text-gray-500">价格</th>
                <th className="text-left p-4 font-medium text-gray-500">库存</th>
                <th className="text-left p-4 font-medium text-gray-500">状态</th>
                <th className="text-right p-4 font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images[0] || '/products/placeholder.jpg'}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-rose-500">¥{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">¥{product.originalPrice}</p>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={product.stock < 20 ? 'text-red-500' : 'text-gray-600'}>
                      {product.stock} 件
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? '在售' : '缺货'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/products/${product.id}`} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </Link>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Edit className="w-5 h-5 text-blue-500" />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            没有找到相关产品
          </div>
        )}
      </div>
    </div>
  )
}
