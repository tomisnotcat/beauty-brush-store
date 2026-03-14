'use client'

import { useState } from 'react'
import { Search, Eye, Check, X, Truck } from 'lucide-react'

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const orders = [
    { id: 'DD20240314001', customer: '张三', phone: '13800138000', items: 2, total: 399, status: 'pending', date: '2024-03-14 10:30' },
    { id: 'DD20240313002', customer: '李四', phone: '13900139000', items: 1, total: 199, status: 'shipped', date: '2024-03-13 14:20' },
    { id: 'DD20240312003', customer: '王五', phone: '13700137000', items: 3, total: 699, status: 'completed', date: '2024-03-12 09:15' },
    { id: 'DD20240311004', customer: '赵六', phone: '13600136000', items: 1, total: 159, status: 'completed', date: '2024-03-11 16:45' },
    { id: 'DD20240310005', customer: '钱七', phone: '13500135000', items: 2, total: 899, status: 'rejected', date: '2024-03-10 11:20' },
    { id: 'DD20240309006', customer: '孙八', phone: '13400134000', items: 1, total: 299, status: 'shipped', date: '2024-03-09 13:30' },
  ]

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       order.customer.includes(searchQuery)
    const matchStatus = statusFilter === 'all' || order.status === statusFilter
    return matchSearch && matchStatus
  })

  const statusOptions = [
    { value: 'all', label: '全部状态' },
    { value: 'pending', label: '待处理' },
    { value: 'shipped', label: '配送中' },
    { value: 'completed', label: '已完成' },
    { value: 'rejected', label: '已拒绝' },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    shipped: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  const statusLabels = {
    pending: '待处理',
    shipped: '配送中',
    completed: '已完成',
    rejected: '已拒绝',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">订单管理</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索订单号或客户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-500">订单号</th>
                <th className="text-left p-4 font-medium text-gray-500">客户</th>
                <th className="text-left p-4 font-medium text-gray-500">商品</th>
                <th className="text-left p-4 font-medium text-gray-500">金额</th>
                <th className="text-left p-4 font-medium text-gray-500">状态</th>
                <th className="text-left p-4 font-medium text-gray-500">日期</th>
                <th className="text-right p-4 font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </td>
                  <td className="p-4">{order.items} 件</td>
                  <td className="p-4 font-bold text-rose-500">¥{order.total}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button className="p-2 hover:bg-green-50 rounded-lg">
                            <Check className="w-5 h-5 text-green-500" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg">
                            <X className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      )}
                      {order.status === 'shipped' && (
                        <button className="p-2 hover:bg-blue-50 rounded-lg">
                          <Truck className="w-5 h-5 text-blue-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            没有找到相关订单
          </div>
        )}
      </div>
    </div>
  )
}
