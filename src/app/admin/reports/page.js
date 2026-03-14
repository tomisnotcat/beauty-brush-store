'use client'

import { useState } from 'react'
import { FileText, Download, Calendar, Filter, Printer } from 'lucide-react'

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('sales')
  
  const reportTypes = [
    { id: 'sales', name: '销售报表', icon: '💰' },
    { id: 'products', name: '产品报表', icon: '📦' },
    { id: 'customers', name: '客户报表', icon: '👥' },
    { id: 'inventory', name: '库存报表', icon: '📊' },
  ]

  const salesData = [
    { period: '2024-03', orders: 156, revenue: 45680, profit: 18272 },
    { period: '2024-02', orders: 142, revenue: 38900, profit: 15560 },
    { period: '2024-01', orders: 168, revenue: 51200, profit: 20480 },
    { period: '2023-12', orders: 198, revenue: 68900, profit: 27560 },
  ]

  const totalOrders = salesData.reduce((s, d) => s + d.orders, 0)
  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0)
  const totalProfit = salesData.reduce((s, d) => s + d.profit, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">报表中心</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-xl hover:bg-gray-50 flex items-center gap-2">
            <Printer className="w-4 h-4" /> 打印
          </button>
          <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
            <Download className="w-4 h-4" /> 导出
          </button>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {reportTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`p-6 rounded-xl text-center transition ${
              reportType === type.id 
                ? 'bg-rose-500 text-white' 
                : 'bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <div className="text-3xl mb-2">{type.icon}</div>
            <div className="font-medium">{type.name}</div>
          </button>
        ))}
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center gap-4">
        <Calendar className="w-5 h-5 text-gray-400" />
        <select className="border rounded-lg px-3 py-2">
          <option>2024年3月</option>
          <option>2024年2月</option>
          <option>2024年1月</option>
          <option>2023年全年</option>
        </select>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
          生成报表
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">总订单</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
          <p className="text-green-500 text-sm mt-1">+12% 同比增长</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">总收入</p>
          <p className="text-3xl font-bold text-rose-500">¥{totalRevenue.toLocaleString()}</p>
          <p className="text-green-500 text-sm mt-1">+8% 同比增长</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">总利润</p>
          <p className="text-3xl font-bold text-green-500">¥{totalProfit.toLocaleString()}</p>
          <p className="text-green-500 text-sm mt-1">+15% 同比增长</p>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">时间段</th>
              <th className="text-right p-4 font-medium text-gray-500">订单数</th>
              <th className="text-right p-4 font-medium text-gray-500">收入</th>
              <th className="text-right p-4 font-medium text-gray-500">利润</th>
              <th className="text-right p-4 font-medium text-gray-500">利润率</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{data.period}</td>
                <td className="p-4 text-right">{data.orders}</td>
                <td className="p-4 text-right font-bold text-rose-500">¥{data.revenue.toLocaleString()}</td>
                <td className="p-4 text-right font-bold text-green-500">¥{data.profit.toLocaleString()}</td>
                <td className="p-4 text-right text-gray-500">{Math.round(data.profit/data.revenue*100)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="p-4 font-bold">合计</td>
              <td className="p-4 text-right font-bold">{totalOrders}</td>
              <td className="p-4 text-right font-bold text-rose-500">¥{totalRevenue.toLocaleString()}</td>
              <td className="p-4 text-right font-bold text-green-500">¥{totalProfit.toLocaleString()}</td>
              <td className="p-4 text-right font-bold">{Math.round(totalProfit/totalRevenue*100)}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
