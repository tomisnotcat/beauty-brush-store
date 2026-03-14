'use client'

import { useState } from 'react'
import { Truck, Package, MapPin, Clock, Phone, CheckCircle } from 'lucide-react'

export default function ShippingPage() {
  const [activeTab, setActiveTab] = useState('delivery')

  const shippingMethods = [
    { name: '标准快递', time: '2-5天', price: '¥10', free: '满199免运费' },
    { name: '加急快递', time: '1-2天', price: '¥20', free: '' },
    { name: '当日达', time: '当天', price: '¥50', free: '' },
  ]

  const processSteps = [
    { icon: '📦', title: '下单', desc: '选择商品并提交订单' },
    { icon: '✅', title: '确认', desc: '客服确认订单' },
    { icon: '📤', title: '发货', desc: '48小时内发出' },
    { icon: '🚚', title: '运输', desc: '快递配送中' },
    { icon: '🏠', title: '签收', desc: '确认收货' },
  ]

  const areas = [
    { name: '江浙沪', time: '1-2天' },
    { name: '京津冀', time: '2-3天' },
    { name: '珠三角', time: '2-3天' },
    { name: '其他地区', time: '3-5天' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          配送<span className="gradient-text">说明</span>
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'delivery', name: '配送方式' },
            { id: 'process', name: '配送流程' },
            { id: 'time', name: '时效说明' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition ${
                activeTab === tab.id ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {activeTab === 'delivery' && (
          <div className="space-y-4">
            {shippingMethods.map((method, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{method.name}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {method.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rose-500 text-xl">{method.price}</p>
                  {method.free && (
                    <p className="text-sm text-green-500">{method.free}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'process' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center">
              {processSteps.map((step, i) => (
                <div key={i} className="text-center flex-1 relative">
                  {i < processSteps.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-200" />
                  )}
                  <div className="relative z-10 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    {step.icon}
                  </div>
                  <p className="font-bold text-sm">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'time' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-rose-50">
                <tr>
                  <th className="p-4 text-left">地区</th>
                  <th className="p-4 text-left">预计时效</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((area, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">{area.name}</td>
                    <td className="p-4">{area.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contact */}
        <div className="mt-8 bg-gray-900 text-white rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">配送问题？</h3>
          <p className="text-gray-400 mb-4">请联系客服</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-2">📞 400-888-8888</span>
            <span className="flex items-center gap-2">💬 微信: beautybrush01</span>
          </div>
        </div>
      </div>
    </div>
  )
}
