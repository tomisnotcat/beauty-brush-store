'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Package, DollarSign, Calendar } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState('7d')

  const stats = [
    { label: '总销售额', value: '¥45,680', change: '+12.5%', up: true, icon: DollarSign },
    { label: '订单数', value: '156', change: '+8.2%', up: true, icon: Package },
    { label: '访客数', value: '2,340', change: '+15.3%', up: true, icon: Users },
    { label: '转化率', value: '6.7%', change: '-0.3%', up: false, icon: TrendingUp },
  ]

  const salesData = [
    { day: '周一', sales: 1200 },
    { day: '周二', sales: 1800 },
    { day: '周三', sales: 1400 },
    { day: '周四', sales: 2100 },
    { day: '周五', sales: 2800 },
    { day: '周六', sales: 3200 },
    { day: '周日', sales: 2600 },
  ]

  const topProducts = [
    { name: '专业化妆刷套装', sales: 45, revenue: 17955, growth: '+12%' },
    { name: '钻石系列化妆刷', sales: 28, revenue: 25172, growth: '+8%' },
    { name: '基础入门套装', sales: 35, revenue: 4515, growth: '+25%' },
    { name: '粉底刷', sales: 52, revenue: 4628, growth: '+15%' },
    { name: '腮红刷', sales: 38, revenue: 3002, growth: '-3%' },
  ]

  const maxSales = Math.max(...salesData.map(d => d.sales))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">数据分析</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="7d">最近7天</option>
          <option value="30d">最近30天</option>
          <option value="90d">最近90天</option>
          <option value="1y">最近一年</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-rose-500" />
              </div>
              <span className={`text-sm ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">销售趋势</h2>
          <div className="flex items-end justify-between gap-2 h-64">
            {salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-lg transition-all hover:from-rose-600 hover:to-rose-500"
                  style={{ height: `${(data.sales / maxSales) * 100}%` }}
                />
                <p className="text-xs text-gray-500 mt-2">{data.day}</p>
                <p className="text-xs font-medium">¥{(data.sales / 1000).toFixed(1)}k</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">热销产品</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-6 h-6 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{product.name}</p>
                    <span className={`text-sm ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {product.growth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{product.sales} 件</span>
                    <span className="font-medium text-rose-500">¥{product.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">客户来源</h3>
          <div className="space-y-3">
            {[
              { source: '直接访问', percent: 35 },
              { source: '搜索引擎', percent: 28 },
              { source: '社交媒体', percent: 20 },
              { source: '推荐链接', percent: 12 },
              { source: '广告投放', percent: 5 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.source}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">地区分布</h3>
          <div className="space-y-3">
            {[
              { region: '上海', percent: 30 },
              { region: '北京', percent: 22 },
              { region: '广东', percent: 18 },
              { region: '浙江', percent: 15 },
              { region: '其他', percent: 15 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.region}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-sm text-gray-500 w-8">{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">设备类型</h3>
          <div className="space-y-4">
            {[
              { device: '手机', percent: 65 },
              { device: '电脑', percent: 28 },
              { device: '平板', percent: 7 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {item.device === '手机' ? '📱' : item.device === '电脑' ? '💻' : '📱'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.device}</span>
                    <span>{item.percent}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
