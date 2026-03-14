'use client'

import { useState } from 'react'
import { Gift, Clock, Hot, Calendar } from 'lucide-react'

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState('active')

  const promotions = {
    active: [
      {
        id: 1,
        title: '新人专享',
        desc: '新用户首单立减50元',
        discount: '¥50',
        code: 'NEW50',
        minSpend: 200,
        validUntil: '2024-04-30',
        type: 'discount'
      },
      {
        id: 2,
        title: '春季特惠',
        desc: '全店商品8折优惠',
        discount: '20%',
        code: 'SPRING20',
        minSpend: 100,
        validUntil: '2024-03-31',
        type: 'percent'
      },
      {
        id: 3,
        title: '免运费活动',
        desc: '订单满199免运费',
        discount: '免运费',
        code: 'FREESHIP',
        minSpend: 199,
        validUntil: '2024-12-31',
        type: 'shipping'
      },
    ],
    upcoming: [
      {
        id: 4,
        title: '五一劳动节',
        desc: '劳动节专属优惠',
        discount: '待定',
        startDate: '2024-05-01',
        type: 'discount'
      },
    ],
    expired: [
      {
        id: 5,
        title: '春节特惠',
        desc: '春节优惠活动',
        discount: '15%',
        code: 'CHINESE',
        validUntil: '2024-02-15',
        type: 'percent'
      },
    ]
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert('优惠码已复制！')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          优惠<span className="gradient-text">活动</span>
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'active', name: '进行中', icon: Hot },
            { id: 'upcoming', name: '即将开始', icon: Calendar },
            { id: 'expired', name: '已结束', icon: Gift },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Promo List */}
        <div className="space-y-4">
          {promotions[activeTab].map(promo => (
            <div key={promo.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{promo.title}</h3>
                    <p className="text-gray-500">{promo.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-rose-500">{promo.discount}</p>
                    {promo.minSpend && (
                      <p className="text-sm text-gray-500">满{promo.minSpend}元</p>
                    )}
                  </div>
                </div>

                {promo.code && (
                  <div className="flex items-center gap-3 mb-4">
                    <code className="px-4 py-2 bg-gray-100 rounded-lg font-mono">
                      {promo.code}
                    </code>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600"
                    >
                      复制
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {promo.validUntil && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      有效期至 {promo.validUntil}
                    </span>
                  )}
                  {promo.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {promo.startDate} 开始
                    </span>
                  )}
                </div>
              </div>

              {/* Expired overlay */}
              {activeTab === 'expired' && (
                <div className="bg-gray-100 px-6 py-2 text-center text-gray-500">
                  已结束
                </div>
              )}
            </div>
          ))}
        </div>

        {promotions[activeTab].length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Gift className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>暂无活动</p>
          </div>
        )}
      </div>
    </div>
  )
}
