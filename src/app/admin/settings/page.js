'use client'

import { useState } from 'react'
import { Save, Store, Mail, Phone, MapPin, Clock, SocialMedia, Seo, Payment } from 'lucide-react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState({
    // General
    siteName: 'Beauty Brush',
    siteDescription: '专业化妆刷制造商，提供高品质化妆工具',
    logo: '',
    favicon: '',
    
    // Contact
    phone: '400-888-8888',
    email: 'service@beautybrush.com',
    address: '上海市浦东新区',
    workHours: '9:00-21:00',
    
    // Social
    wechat: 'beautybrush01',
    weibo: '',
    instagram: '',
    
    // Order
    freeShippingThreshold: 199,
    defaultShippingFee: 10,
    
    // SEO
    keywords: '化妆刷, 美妆工具, 专业化妆刷',
    analyticsId: '',
  })

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    alert('设置已保存！')
  }

  const tabs = [
    { id: 'general', name: '基本设置', icon: Store },
    { id: 'contact', name: '联系方式', icon: Phone },
    { id: 'social', name: '社交媒体', icon: SocialMedia },
    { id: 'order', name: '订单设置', icon: Payment },
    { id: 'seo', name: 'SEO设置', icon: Seo },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">系统设置</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? '保存中...' : '保存设置'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-2xl p-2 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === tab.id
                    ? 'bg-rose-50 text-rose-500'
                    : 'text-gray-600 hover:bg-gray50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">基本设置</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">网站名称</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={e => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">网站描述</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={e => setSettings({...settings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Logo URL</label>
                  <input
                    type="text"
                    value={settings.logo}
                    onChange={e => setSettings({...settings, logo: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">联系方式</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">客服电话</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={e => setSettings({...settings, phone: e.target.value})}
                      className="w-full px-4 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">客服邮箱</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={e => setSettings({...settings, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-xl"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">工作时间</label>
                  <input
                    type="text"
                    value={settings.workHours}
                    onChange={e => setSettings({...settings, workHours: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">公司地址</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={e => setSettings({...settings, address: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">社交媒体</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">微信公众号</label>
                  <input
                    type="text"
                    value={settings.wechat}
                    onChange={e => setSettings({...settings, wechat: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">微博</label>
                  <input
                    type="text"
                    value={settings.weibo}
                    onChange={e => setSettings({...settings, weibo: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <input
                    type="text"
                    value={settings.instagram}
                    onChange={e => setSettings({...settings, instagram: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {activeTab === 'order' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">订单设置</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">免运费门槛 (元)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={e => setSettings({...settings, freeShippingThreshold: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                  <p className="text-sm text-gray-500 mt-1">订单金额达到此数值免运费</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">默认运费 (元)</label>
                  <input
                    type="number"
                    value={settings.defaultShippingFee}
                    onChange={e => setSettings({...settings, defaultShippingFee: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-xl"
                  />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold">SEO 设置</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-2">关键词</label>
                  <input
                    type="text"
                    value={settings.keywords}
                    onChange={e => setSettings({...settings, keywords: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="关键词1, 关键词2, ..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.analyticsId}
                    onChange={e => setSettings({...settings, analyticsId: e.target.value})}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
