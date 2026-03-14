'use client'

import { useState } from 'react'

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState('brushes')

  const guides = {
    brushes: {
      title: '化妆刷尺寸参考',
      image: '/size-guide/brushes.jpg',
      table: [
        { size: 'S', diameter: '20mm', length: '100mm', use: '细节处理' },
        { size: 'M', diameter: '25mm', length: '120mm', use: '面部常用' },
        { size: 'L', diameter: '30mm', length: '140mm', use: '大面积' },
        { size: 'XL', diameter: '35mm', length: '160mm', use: '身体彩妆' },
      ]
    },
    sets: {
      title: '套装选择指南',
      content: [
        { title: '初学者套装 (5支)', desc: '包含基础刷型，满足日常妆容需求' },
        { title: '专业套装 (12支)', desc: '完整刷型配置，适合专业化妆师' },
        { title: '大师套装 (20支)', desc: '全方位配置，顶级品质' },
      ]
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          尺寸<span className="gradient-text">指南</span>
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('brushes')}
            className={`px-6 py-3 rounded-full font-medium transition ${
              activeTab === 'brushes' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            刷具尺寸
          </button>
          <button
            onClick={() => setActiveTab('sets')}
            className={`px-6 py-3 rounded-full font-medium transition ${
              activeTab === 'sets' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            套装选择
          </button>
        </div>

        {activeTab === 'brushes' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-rose-50">
                <tr>
                  <th className="p-4 text-left">尺寸</th>
                  <th className="p-4 text-left">刷头直径</th>
                  <th className="p-4 text-left">总长度</th>
                  <th className="p-4 text-left">适用场景</th>
                </tr>
              </thead>
              <tbody>
                {guides.brushes.table.map((row, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4 font-bold">{row.size}</td>
                    <td className="p-4">{row.diameter}</td>
                    <td className="p-4">{row.length}</td>
                    <td className="p-4 text-gray-600">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sets' && (
          <div className="space-y-4">
            {guides.sets.content.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">💡 选择建议</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 根据使用习惯选择尺寸，经常旅行建议选择便携装</li>
            <li>• 专业化妆师推荐全套配置</li>
            <li>• 敏感肌肤选择天然刷毛</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
