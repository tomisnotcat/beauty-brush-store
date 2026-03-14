'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Copy, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'NEW50', type: 'discount', value: 50, minSpend: 200, validUntil: '2024-04-30', active: true, usage: 45 },
    { id: 2, code: 'SPRING20', type: 'percent', value: 20, minSpend: 100, validUntil: '2024-03-31', active: true, usage: 128 },
    { id: 3, code: 'FREESHIP', type: 'shipping', value: 0, minSpend: 99, validUntil: '2024-12-31', active: false, usage: 256 },
  ])

  const toggleActive = (id) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c))
  }

  const deleteCoupon = (id) => {
    if (confirm('确定删除优惠券？')) {
      setCoupons(coupons.filter(c => c.id !== id))
    }
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert('已复制！')
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'discount': return '金额优惠'
      case 'percent': return '折扣优惠'
      case 'shipping': return '免运费'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'discount': return 'bg-blue-100 text-blue-700'
      case 'percent': return 'bg-purple-100 text-purple-700'
      case 'shipping': return 'bg-green-100 text-green-700'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">优惠券管理</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加优惠券
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold">{coupons.length}</p>
          <p className="text-sm text-gray-500">优惠券总数</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-500">{coupons.filter(c => c.active).length}</p>
          <p className="text-sm text-gray-500">进行中</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold">{coupons.reduce((s, c) => s + c.usage, 0)}</p>
          <p className="text-sm text-gray-500">总使用次数</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-rose-500">¥{coupons.reduce((s, c) => s + c.usage * c.value, 0)}</p>
          <p className="text-sm text-gray-500">优惠总额</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">优惠码</th>
              <th className="text-left p-4 font-medium text-gray-500">类型</th>
              <th className="text-left p-4 font-medium text-gray-500">优惠</th>
              <th className="text-left p-4 font-medium text-gray-500">最低消费</th>
              <th className="text-left p-4 font-medium text-gray-500">有效期</th>
              <th className="text-center p-4 font-medium text-gray-500">已使用</th>
              <th className="text-center p-4 font-medium text-gray-500">状态</th>
              <th className="text-right p-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-gray-100 rounded font-mono">{coupon.code}</code>
                    <button onClick={() => copyCode(coupon.code)} className="text-gray-400 hover:text-rose-500">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(coupon.type)}`}>
                    {getTypeLabel(coupon.type)}
                  </span>
                </td>
                <td className="p-4 font-bold text-rose-500">
                  {coupon.type === 'percent' ? `${coupon.value}%` : coupon.type === 'shipping' ? '免运费' : `¥${coupon.value}`}
                </td>
                <td className="p-4">¥{coupon.minSpend}</td>
                <td className="p-4 text-gray-500">{coupon.validUntil}</td>
                <td className="p-4 text-center">{coupon.usage} 次</td>
                <td className="p-4 text-center">
                  <button onClick={() => toggleActive(coupon.id)}>
                    {coupon.active ? (
                      <ToggleRight className="w-8 h-8 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-300" />
                    )}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => deleteCoupon(coupon.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
