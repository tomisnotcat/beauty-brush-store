'use client'

import { useState } from 'react'
import { Tag, Gift, Percent, Clock, ArrowRight, Check } from 'lucide-react'

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('available')

  const coupons = {
    available: [
      {
        id: 1,
        code: 'NEW50',
        type: 'discount',
        value: 50,
        minSpend: 200,
        desc: '新用户专享',
        validUntil: '2024-04-30',
        bg: 'from-rose-500 to-pink-500'
      },
      {
        id: 2,
        code: 'SPRING20',
        type: 'percent',
        value: 20,
        minSpend: 100,
        desc: '春季特惠',
        validUntil: '2024-03-31',
        bg: 'from-purple-500 to-indigo-500'
      },
      {
        id: 3,
        code: 'FREE_SHIP',
        type: 'shipping',
        value: 0,
        minSpend: 99,
        desc: '满99免运费',
        validUntil: '2024-12-31',
        bg: 'from-blue-500 to-cyan-500'
      },
    ],
    used: [
      {
        id: 4,
        code: 'WINTER30',
        type: 'discount',
        value: 30,
        minSpend: 150,
        desc: '冬季特惠',
        validUntil: '2024-01-31',
        bg: 'from-gray-400 to-gray-500'
      },
    ],
    expired: [
      {
        id: 5,
        code: 'VIP50',
        type: 'discount',
        value: 50,
        minSpend: 300,
        desc: 'VIP专属',
        validUntil: '2023-12-31',
        bg: 'from-gray-300 to-gray-400'
      },
    ]
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert('优惠券码已复制！')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          优<span className="gradient-text">惠券</span>
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'available', name: '可使用', icon: Gift },
            { id: 'used', name: '已使用', icon: Check },
            { id: 'expired', name: '已过期', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Coupon List */}
        <div className="space-y-4">
          {coupons[activeTab].map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm flex"
            >
              {/* Left - Value */}
              <div className={`w-32 bg-gradient-to-br ${coupon.bg} text-white flex flex-col items-center justify-center p-4`}>
                {coupon.type === 'percent' ? (
                  <div className="text-3xl font-bold">{coupon.value}%</div>
                ) : coupon.type === 'shipping' ? (
                  <div className="text-xl font-bold text-center">免运费</div>
                ) : (
                  <div className="text-3xl font-bold">¥{coupon.value}</div>
                )}
                <div className="text-xs opacity-80">优惠券</div>
              </div>

              {/* Right - Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="w-4 h-4 text-rose-500" />
                    <span className="font-medium">{coupon.desc}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    满¥{coupon.minSpend}可用
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    有效期至 {coupon.validUntil}
                  </p>
                </div>

                {activeTab === 'available' && (
                  <div className="flex items-center gap-2 mt-3">
                    <code className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">
                      {coupon.code}
                    </code>
                    <button
                      onClick={() => copyCode(coupon.code)}
                      className="ml-auto text-rose-500 text-sm hover:underline"
                    >
                      复制
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {coupons[activeTab].length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>暂无优惠券</p>
            </div>
          )}
        </div>

        {/* Get More */}
        {activeTab === 'available' && (
          <div className="mt-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2">更多优惠券</h3>
            <p className="text-sm opacity-90 mb-4">关注公众号获取更多优惠</p>
            <button className="px-6 py-2 bg-white text-rose-500 rounded-full font-medium inline-flex items-center gap-2 hover:bg-gray-100">
              领取更多 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
