'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Heart, Settings, LogOut, ChevronRight, Clock, MapPin, CreditCard } from 'lucide-react'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const menuItems = [
    { id: 'orders', name: '我的订单', icon: Package, href: '/account/orders' },
    { id: 'wishlist', name: '心愿单', icon: Heart, href: '/wishlist' },
    { id: 'address', name: '收货地址', icon: MapPin, href: '/account/address' },
    { id: 'payment', name: '支付方式', icon: CreditCard, href: '/account/payment' },
    { id: 'settings', name: '账户设置', icon: Settings, href: '/account/settings' },
  ]

  const orders = [
    { id: 'DD20240314001', date: '2024-03-14', status: 'pending', total: 399, items: 2 },
    { id: 'DD20240310002', date: '2024-03-10', status: 'shipped', total: 199, items: 1 },
    { id: 'DD20240305003', date: '2024-03-05', status: 'completed', total: 699, items: 3 },
  ]

  const statusMap = {
    pending: { text: '待发货', color: 'bg-yellow-100 text-yellow-700' },
    shipped: { text: '配送中', color: 'bg-blue-100 text-blue-700' },
    completed: { text: '已完成', color: 'bg-green-100 text-green-700' },
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">请先登录</h2>
          <Link href="/login" className="text-rose-500 hover:underline">
            前往登录
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">我的账户</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      activeTab === item.id ? 'bg-rose-50 text-rose-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    localStorage.removeItem('user')
                    window.location.href = '/'
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Package className="w-8 h-8 text-rose-500 mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">待处理订单</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Heart className="w-8 h-8 text-rose-500 mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">心愿单</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Clock className="w-8 h-8 text-rose-500 mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">历史订单</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">最近订单</h2>
                <Link href="/account/orders" className="text-rose-500 text-sm hover:underline">
                  查看全部
                </Link>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date} · {order.items}件商品</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusMap[order.status].color}`}>
                        {statusMap[order.status].text}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-rose-500">¥{order.total}</p>
                      <Link href={`/account/orders/${order.id}`} className="text-rose-500 text-sm flex items-center gap-1">
                        查看详情 <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
