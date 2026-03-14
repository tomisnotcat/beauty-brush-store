'use client'

import { useState, useEffect } from 'react'
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 156,
    totalRevenue: 45680,
    totalCustomers: 89,
    totalProducts: 12,
  })

  const recentOrders = [
    { id: 'DD20240314001', customer: '张三', amount: 399, status: 'pending', date: '2024-03-14' },
    { id: 'DD20240313002', customer: '李四', amount: 199, status: 'shipped', date: '2024-03-13' },
    { id: 'DD20240312003', customer: '王五', amount: 699, status: 'completed', date: '2024-03-12' },
    { id: 'DD20240311004', customer: '赵六', amount: 159, status: 'completed', date: '2024-03-11' },
    { id: 'DD20240310005', customer: '钱七', amount: 899, status: 'rejected', date: '2024-03-10' },
  ]

  const topProducts = [
    { name: '专业化妆刷套装', sales: 45, revenue: 17955 },
    { name: '钻石系列化妆刷', sales: 28, revenue: 25172 },
    { name: '基础入门套装', sales: 35, revenue: 4515 },
    { name: '粉底刷', sales: 52, revenue: 4628 },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    shipped: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  const statCards = [
    { title: '总订单', value: stats.totalOrders, icon: ShoppingCart, change: '+12%', up: true, color: 'bg-blue-500' },
    { title: '总收入', value: `¥${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+8%', up: true, color: 'bg-green-500' },
    { title: '客户数', value: stats.totalCustomers, icon: Users, change: '+5%', up: true, color: 'bg-purple-500' },
    { title: '商品数', value: stats.totalProducts, icon: Package, change: '+2', up: true, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">最近订单</h2>
            <a href="/admin/orders" className="text-rose-500 text-sm hover:underline">查看全部</a>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">¥{order.amount}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[order.status]}`}>
                    {order.status === 'pending' ? '待处理' : order.status === 'shipped' ? '配送中' : order.status === 'completed' ? '已完成' : '已拒绝'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">热销产品</h2>
            <a href="/admin/products" className="text-rose-500 text-sm hover:underline">查看全部</a>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} 件</p>
                  </div>
                </div>
                <p className="font-bold text-rose-500">¥{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/products/new" className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">添加产品</p>
          </a>
          <a href="/admin/orders" className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">处理订单</p>
          </a>
          <a href="/admin/customers" className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">客户管理</p>
          </a>
          <a href="/admin/analytics" className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">数据分析</p>
          </a>
        </div>
      </div>
    </div>
  )
}
