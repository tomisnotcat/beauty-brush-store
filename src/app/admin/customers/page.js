'use client'

import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react'

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const customers = [
    { id: 1, name: '张三', email: 'zhangsan@email.com', phone: '13800138000', orders: 5, spent: 1999, joinDate: '2024-01-15', level: 'VIP' },
    { id: 2, name: '李四', email: 'lisi@email.com', phone: '13900139000', orders: 3, spent: 899, joinDate: '2024-02-20', level: '普通' },
    { id: 3, name: '王五', email: 'wangwu@email.com', phone: '13700137000', orders: 8, spent: 3999, joinDate: '2023-11-10', level: 'VIP' },
    { id: 4, name: '赵六', email: 'zhaoliu@email.com', phone: '13600136000', orders: 1, spent: 199, joinDate: '2024-03-01', level: '普通' },
    { id: 5, name: '钱七', email: 'qianqi@email.com', phone: '13500135000', orders: 12, spent: 5999, joinDate: '2023-08-05', level: 'SVIP' },
  ]

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  )

  const levelColors = {
    '普通': 'bg-gray-100 text-gray-700',
    'VIP': 'bg-yellow-100 text-yellow-700',
    'SVIP': 'bg-purple-100 text-purple-700',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">客户管理</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加客户
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索客户姓名、邮箱或电话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-500">客户</th>
                <th className="text-left p-4 font-medium text-gray-500">联系方式</th>
                <th className="text-left p-4 font-medium text-gray-500">订单数</th>
                <th className="text-left p-4 font-medium text-gray-500">消费金额</th>
                <th className="text-left p-4 font-medium text-gray-500">等级</th>
                <th className="text-left p-4 font-medium text-gray-500">注册时间</th>
                <th className="text-right p-4 font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name[0]}
                      </div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-sm text-gray-500">{customer.phone}</p>
                  </td>
                  <td className="p-4">{customer.orders} 单</td>
                  <td className="p-4 font-bold text-rose-500">¥{customer.spent.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${levelColors[customer.level]}`}>
                      {customer.level}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{customer.joinDate}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Edit className="w-5 h-5 text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
