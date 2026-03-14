'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Package, CheckCircle, Truck, Home, AlertCircle } from 'lucide-react'

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)

  const handleTrack = () => {
    // Mock tracking result
    setTrackingResult({
      id: orderId,
      status: 'shipping',
      carrier: '顺丰快递',
      trackingNumber: 'SF1234567890',
      timeline: [
        { time: '2024-03-14 14:30', status: '已签收', location: '上海市浦东新区', completed: true },
        { time: '2024-03-13 09:20', status: '配送中', location: '上海市', completed: true },
        { time: '2024-03-12 18:45', status: '到达上海分拨中心', location: '上海', completed: true },
        { time: '2024-03-11 20:30', status: '已发出', location: '杭州', completed: true },
        { time: '2024-03-11 10:00', status: '已下单', location: '', completed: true },
      ]
    })
  }

  const statusIcons = {
    pending: <Package className="w-6 h-6" />,
    paid: <CheckCircle className="w-6 h-6" />,
    processing: <Package className="w-6 h-6" />,
    shipping: <Truck className="w-6 h-6" />,
    delivered: <Home className="w-6 h-6" />,
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          查<span className="gradient-text">看物流</span>
        </h1>

        {/* Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <label className="block text-sm font-medium mb-2">输入订单号</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="请输入订单号"
              className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={handleTrack}
              className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              查询
            </button>
          </div>
        </div>

        {/* Result */}
        {trackingResult && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Status */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-500">订单状态</p>
                <p className="text-xl font-bold text-rose-500">配送中</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">快递单号</p>
                <p className="font-medium">{trackingResult.trackingNumber}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {trackingResult.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {index === 0 ? <Truck className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    </div>
                    {index < trackingResult.timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${item.completed ? 'bg-rose-200' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className={`font-medium ${item.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                      {item.status}
                    </p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                    {item.location && (
                      <p className="text-sm text-gray-400">{item.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help */}
        <div className="mt-8 bg-rose-50 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-rose-700">需要帮助？</p>
              <p className="text-sm text-rose-600 mt-1">
                如有物流问题，请联系客服：400-888-8888
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
