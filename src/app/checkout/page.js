'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import StripeCheckout from '@/components/StripeCheckout'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'wechat',
  })
  const [loading, setLoading] = useState(false)

  const total = getCartTotal()
  const shipping = total > 199 ? 0 : 10
  const finalTotal = total + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    clearCart()
    alert('订单提交成功！')
    router.push('/')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-500">购物车是空的</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">确认订单</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">收货信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">收货人姓名 *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">联系电话 *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">详细地址 *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">城市 *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">支付方式</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-rose-500">
                <input
                  type="radio"
                  name="payment"
                  value="wechat"
                  checked={formData.paymentMethod === 'wechat'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="mr-3"
                />
                <span>微信支付</span>
              </label>
              <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-rose-500">
                <input
                  type="radio"
                  name="payment"
                  value="alipay"
                  checked={formData.paymentMethod === 'alipay'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="mr-3"
                />
                <span>支付宝</span>
              </label>
              <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:border-rose-500">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={formData.paymentMethod === 'stripe'}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="mr-3"
                />
                <span>银行卡支付 (Stripe)</span>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">订单详情</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>商品总额</span>
                <span>¥{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>运费</span>
                <span>{shipping === 0 ? '免运费' : `¥${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>应付总额</span>
                <span className="text-rose-500">¥{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {formData.paymentMethod === 'stripe' ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Stripe 支付</h2>
              <StripeCheckout 
                items={cart} 
                customer={{ name: formData.name, email: formData.phone + '@placeholder.com' }}
              />
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 transition"
            >
              {loading ? '提交中...' : '提交订单'}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
