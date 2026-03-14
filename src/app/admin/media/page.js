'use client'

import { useState } from 'react'
import { Upload, Image as ImageIcon, Trash2, Search, Filter, Grid, List } from 'lucide-react'

export default function AdminMediaPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedFolder, setSelectedFolder] = useState('all')
  
  const folders = [
    { id: 'all', name: '全部', count: 24 },
    { id: 'products', name: '产品图片', count: 12 },
    { id: 'banners', name: '横幅', count: 4 },
    { id: 'blog', name: '博客', count: 6 },
    { id: 'avatars', name: '头像', count: 2 },
  ]

  const media = [
    { id: 1, name: 'brush-set-1.jpg', folder: 'products', size: '245 KB', date: '2024-03-10' },
    { id: 2, name: 'banner-home.jpg', folder: 'banners', size: '1.2 MB', date: '2024-03-08' },
    { id: 3, name: 'blog-1.jpg', folder: 'blog', size: '890 KB', date: '2024-03-05' },
    { id: 4, name: 'avatar-1.jpg', folder: 'avatars', size: '45 KB', date: '2024-03-01' },
  ]

  const filteredMedia = selectedFolder === 'all' ? media : media.filter(m => m.folder === selectedFolder)

  const totalSize = '2.4 MB'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">媒体库</h1>
          <p className="text-gray-500 text-sm">共 {media.length} 个文件，总计 {totalSize}</p>
        </div>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          上传文件
        </button>
      </div>

      <div className="flex gap-6">
        {/* Folders */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium mb-3">文件夹</h3>
            <div className="space-y-1">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                    selectedFolder === folder.id ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{folder.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文件..."
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Items */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm group">
                  <div className="aspect-square bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-rose-300" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400">{item.size}</span>
                      <button className="text-red-500 opacity-0 group-hover:opacity-100 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-500">文件名</th>
                    <th className="text-left p-4 font-medium text-gray-500">文件夹</th>
                    <th className="text-left p-4 font-medium text-gray-500">大小</th>
                    <th className="text-left p-4 font-medium text-gray-500">上传日期</th>
                    <th className="text-right p-4 font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map(item => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-purple-100 rounded flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-rose-300" />
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 capitalize">{item.folder}</td>
                      <td className="p-4 text-gray-500">{item.size}</td>
                      <td className="p-4 text-gray-500">{item.date}</td>
                      <td className="p-4 text-right">
                        <button className="text-red-500 hover:bg-red-50 p-2 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
