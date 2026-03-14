'use client'

import { useState } from 'react'
import { Bell, Plus, Edit, Trash2, Send, Eye, EyeOff, Search } from 'lucide-react'

export default function AdminNotificationsPage() {
  const [tab, setTab] = useState('notifications')
  
  const notifications = [
    { id: 1, title: '新订单提醒', content: '您有新的订单需要处理', type: 'order', target: 'all', sent: 1, date: '2024-03-14 10:30', active: true },
    { id: 2, title: '库存不足警告', content: '多个商品库存不足', type: 'warning', target: 'admin', sent: 1, date: '2024-03-13 15:20', active: true },
    { id: 3, title: '促销活动通知', content: '春季促销活动已开始', type: 'promotion', target: 'all', sent: 1, date: '2024-03-10 09:00', active: false },
    { id: 4, title: '系统维护通知', content: '系统将于今晚22:00维护', type: 'system', target: 'all', sent: 1, date: '2024-03-05 18:00', active: false },
  ]

  const templates = [
    { id: 1, name: '订单确认', content: '您的订单已确认，我们会尽快处理', type: 'order' },
    { id: 2, name: '发货通知', content: '您的订单已发货，快递单号：{tracking}', type: 'shipping' },
    { id: 3, name: '签收提醒', content: '您的订单已送达，请确认收货', type: 'delivery' },
    { id: 4, name: '评价邀请', content: '感谢您的购买，请对我们的服务做出评价', type: 'review' },
  ]

  const getTypeBadge = (type) => {
    const colors = {
      order: 'bg-blue-100 text-blue-700',
      warning: 'bg-yellow-100 text-yellow-700',
      promotion: 'bg-rose-100 text-rose-700',
      system: 'bg-gray-100 text-gray-700',
    }
    const labels = { order: '订单', warning: '警告', promotion: '促销', system: '系统' }
    return <span className={`px-2 py-1 rounded-full text-xs ${colors[type]}`}>{labels[type]}</span>
  }

  const toggleActive = (id) => {
    alert('状态已切换')
  }

  const deleteNotification = (id) => {
    if (confirm('确定删除？')) alert('已删除')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">消息通知</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          创建通知
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('notifications')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            tab === 'notifications' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          通知列表
        </button>
        <button
          onClick={() => setTab('templates')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            tab === 'templates' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          消息模板
        </button>
      </div>

      {tab === 'notifications' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-gray-500">总通知</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-green-500">{notifications.filter(n => n.active).length}</p>
              <p className="text-sm text-gray-500">进行中</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold">{notifications.reduce((s, n) => s + n.sent, 0)}</p>
              <p className="text-sm text-gray-500">总发送次数</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-rose-500">{templates.length}</p>
              <p className="text-sm text-gray-500">模板数量</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索通知..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-500">标题</th>
                  <th className="text-left p-4 font-medium text-gray-500">类型</th>
                  <th className="text-left p-4 font-medium text-gray-500">发送对象</th>
                  <th className="text-left p-4 font-medium text-gray-500">发送次数</th>
                  <th className="text-left p-4 font-medium text-gray-500">发送时间</th>
                  <th className="text-center p-4 font-medium text-gray-500">状态</th>
                  <th className="text-right p-4 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map(n => (
                  <tr key={n.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium">{n.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{n.content}</p>
                    </td>
                    <td className="p-4">{getTypeBadge(n.type)}</td>
                    <td className="p-4 text-gray-500">{n.target === 'all' ? '全部用户' : '管理员'}</td>
                    <td className="p-4">{n.sent} 次</td>
                    <td className="p-4 text-gray-500">{n.date}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleActive(n.id)}>
                        {n.active ? <Eye className="w-5 h-5 text-green-500" /> : <EyeOff className="w-5 h-5 text-gray-300" />}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4 text-blue-500" /></button>
                        <button onClick={() => deleteNotification(n.id)} className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-2 gap-4">
          {templates.map(t => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{t.name}</h3>
                {getTypeBadge(t.type)}
              </div>
              <p className="text-gray-600 text-sm mb-4">{t.content}</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm hover:bg-rose-100">编辑</button>
                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">预览</button>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex items-center justify-center text-gray-400 hover:border-rose-500 hover:text-rose-500 transition">
            <Plus className="w-5 h-5 mr-2" /> 添加模板
          </button>
        </div>
      )}
    </div>
  )
}
