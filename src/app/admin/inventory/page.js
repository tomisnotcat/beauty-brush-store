'use client'

import { useState } from 'react'
import { Package, AlertTriangle, CheckCircle, XCircle, Plus, Minus } from 'lucide-react'

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: '专业化妆刷套装', sku: 'BB-SET-001', stock: 50, minStock: 10, price: 399, status: 'ok' },
    { id: 2, name: '钻石系列化妆刷', sku: 'BB-DIA-002', stock: 8, minStock: 5, price: 899, status: 'low' },
    { id: 3, name: '基础入门套装', sku: 'BB-BAS-003', stock: 100, minStock: 20, price: 129, status: 'ok' },
    { id: 4, name: '粉底刷', sku: 'BB-FND-004', stock: 80, minStock: 15, price: 89, status: 'ok' },
    { id: 5, name: '眼影刷套装', sku: 'BB-EYE-005', stock: 3, minStock: 10, price: 159, status: 'critical' },
    { id: 6, name: '腮红刷', sku: 'BB-BLS-006', stock: 0, minStock: 10, price: 79, status: 'out' },
  ])

  const updateStock = (id, change) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + change)
        let status = 'ok'
        if (newStock === 0) status = 'out'
        else if (newStock <= item.minStock * 0.3) status = 'critical'
        else if (newStock <= item.minStock) status = 'low'
        return { ...item, stock: newStock, status }
      }
      return item
    }))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ok': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'low': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'critical': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'out': return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'ok': return '正常'
      case 'low': return '库存不足'
      case 'critical': return '库存紧张'
      case 'out': return '已售罄'
    }
  }

  const stats = {
    total: inventory.length,
    ok: inventory.filter(i => i.status === 'ok').length,
    low: inventory.filter(i => i.status === 'low').length,
    critical: inventory.filter(i => i.status === 'critical').length,
    out: inventory.filter(i => i.status === 'out').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">库存管理</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-gray-500" />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-gray-500">全部商品</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <div>
            <p className="text-2xl font-bold text-green-500">{stats.ok}</p>
            <p className="text-sm text-gray-500">库存正常</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-yellow-500">
          <div>
            <p className="text-2xl font-bold text-yellow-500">{stats.low}</p>
            <p className="text-sm text-gray-500">库存不足</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500">
          <div>
            <p className="text-2xl font-bold text-orange-500">{stats.critical}</p>
            <p className="text-sm text-gray-500">库存紧张</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <div>
            <p className="text-2xl font-bold text-red-500">{stats.out}</p>
            <p className="text-sm text-gray-500">已售罄</p>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {(stats.low + stats.critical + stats.out > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">
                {stats.low + stats.critical + stats.out} 个商品需要补货
              </p>
              <p className="text-sm text-yellow-600">
                请及时处理库存不足的商品
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-500">商品</th>
                <th className="text-left p-4 font-medium text-gray-500">SKU</th>
                <th className="text-center p-4 font-medium text-gray-500">库存</th>
                <th className="text-center p-4 font-medium text-gray-500">最低库存</th>
                <th className="text-center p-4 font-medium text-gray-500">状态</th>
                <th className="text-center p-4 font-medium text-gray-500">库存价值</th>
                <th className="text-center p-4 font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-500 font-mono text-sm">{item.sku}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xl font-bold ${
                      item.status === 'out' ? 'text-red-500' :
                      item.status === 'critical' ? 'text-orange-500' :
                      item.status === 'low' ? 'text-yellow-500' : 'text-gray-800'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-500">{item.minStock}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className={`text-sm ${
                        item.status === 'out' ? 'text-red-500' :
                        item.status === 'critical' ? 'text-orange-500' :
                        item.status === 'low' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-medium">
                    ¥{(item.stock * item.price).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStock(item.id, 1)}
                        className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-200"
                      >
                        <Plus className="w-4 h-4 text-rose-500" />
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
