'use client'

import { useState } from 'react'
import { Palette, Eye, Edit, Trash2, Check } from 'lucide-react'

export default function AdminThemesPage() {
  const [activeTab, setActiveTab] = useState('themes')
  
  const themes = [
    { id: 'default', name: '默认主题', colors: ['#ec4899', '#8b5cf6'], active: true },
    { id: 'ocean', name: '海洋主题', colors: ['#0ea5e9', '#06b6d4'], active: false },
    { id: 'forest', name: '森林主题', colors: ['#22c55e', '#84cc16'], active: false },
    { id: 'sunset', name: '日落主题', colors: ['#f97316', '#ef4444'], active: false },
  ]

  const customizeTheme = {
    primary: '#ec4899',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1f2937',
  }

  const activateTheme = (id) => {
    alert('主题已切换')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">主题设置</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('themes')} className={`px-4 py-2 rounded-full ${activeTab === 'themes' ? 'bg-rose-500 text-white' : 'bg-white'}`}>主题模板</button>
        <button onClick={() => setActiveTab('customize')} className={`px-4 py-2 rounded-full ${activeTab === 'customize' ? 'bg-rose-500 text-white' : 'bg-white'}`}>自定义</button>
      </div>

      {activeTab === 'themes' && (
        <div className="grid grid-cols-4 gap-4">
          {themes.map(theme => (
            <div key={theme.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm ${theme.active ? 'ring-2 ring-rose-500' : ''}`}>
              <div className="h-32 flex" style={{background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`}}>
                {theme.active && <div className="m-auto text-white font-bold flex items-center gap-2"><Check className="w-5 h-5" /> 使用中</div>}
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{theme.name}</h3>
                <div className="flex gap-1 mb-3">
                  {theme.colors.map((c, i) => <div key={i} className="w-6 h-6 rounded-full" style={{background: c}} />)}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => activateTheme(theme.id)} className="flex-1 py-2 bg-rose-500 text-white rounded-lg text-sm">使用</button>
                  <button className="px-3 py-2 border rounded-lg"><Eye className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'customize' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">颜色配置</h3>
            <div className="space-y-4">
              {Object.entries(customizeTheme).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="capitalize">{key}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={value} className="w-10 h-10 rounded cursor-pointer" />
                    <span className="text-sm font-mono">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-rose-500 text-white rounded-xl">保存配置</button>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4">预览</h3>
            <div className="rounded-xl overflow-hidden border">
              <div className="h-20" style={{background: `linear-gradient(135deg, ${customizeTheme.primary}, ${customizeTheme.secondary})`}} />
              <div className="p-4">
                <div className="h-4 w-3/4 mb-2 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
