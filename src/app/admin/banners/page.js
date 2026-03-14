'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([
    { id: 1, title: '新品上市', subtitle: '限时优惠', image: '/banners/banner1.jpg', link: '/products', active: true },
    { id: 2, title: '会员专享', subtitle: '8折优惠', image: '/banners/banner2.jpg', link: '/products?sale=true', active: false },
  ])

  const toggleActive = (id) => {
    setBanners(banners.map(b => 
      b.id === id ? { ...b, active: !b.active } : b
    ))
  }

  const deleteBanner = (id) => {
    if (confirm('确定要删除这个横幅吗？')) {
      setBanners(banners.filter(b => b.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">横幅管理</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加横幅
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Preview */}
            <div className="h-40 bg-gradient-to-r from-rose-500 to-purple-600 flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-2xl font-bold">{banner.title}</p>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs ${banner.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {banner.active ? '启用' : '禁用'}
                </span>
                <span className="text-sm text-gray-500">链接: {banner.link}</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleActive(banner.id)}
                  className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    banner.active 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {banner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {banner.active ? '禁用' : '启用'}
                </button>
                <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteBanner(banner.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[200px] cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition">
          <div className="text-center text-gray-400">
            <Plus className="w-12 h-12 mx-auto mb-2" />
            <p>添加新横幅</p>
          </div>
        </div>
      </div>
    </div>
  )
}
