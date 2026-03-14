'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const total = getCartTotal()
  const shipping = total > 199 ? 0 : 10
  
  // Apply coupon discount
  let discount = 0
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = total * (appliedCoupon.value / 100)
    } else if (appliedCoupon.type === 'discount') {
      discount = appliedCoupon.value
    } else if (appliedCoupon.type === 'shipping') {
      discount = shipping
    }
  }
  
  const finalTotal = total + shipping - discount

  const applyCoupon = () => {
    setCouponError('')
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'NEW50' && total >= 200) {
      setAppliedCoupon({ type: 'discount', value: 50, code: 'NEW50' })
    } else if (couponCode.toUpperCase() === 'SPRING20' && total >= 100) {
      setAppliedCoupon({ type: 'percent', value: 20, code: 'SPRING20' })
    } else {
      setCouponError('优惠券无效或不满足使用条件')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">购物车是空的</h2>
          <p className="text-gray-500 mb-8">快去选购心仪的产品吧！</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            去购物
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">购物车 ({cart.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
                <Link href={`/products/${item.id}`}>
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.images?.[0] || '/products/placeholder.jpg'}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold mb-1 hover:text-rose-500">{item.name}</h3>
                  </Link>
                  <p className="text-rose-500 font-bold">¥{item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">¥{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">订单摘要</h2>
              
              {/* Coupon */}
              {!appliedCoupon ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">使用优惠券</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="输入优惠码"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600"
                    >
                      使用
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                  <p className="text-xs text-gray-400 mt-1">试试: NEW50, SPRING20</p>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">{appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    取消
                  </button>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">商品小计</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>优惠券</span>
                    <span>-¥{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">运费</span>
                  <span>{shipping === 0 ? '免运费' : `¥${shipping}`}</span>
                </div>
                {total < 199 && (
                  <p className="text-sm text-rose-500">再购¥{199 - total}免运费</p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>总计</span>
                    <span className="text-rose-500">¥{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center inline-flex">
                去结算
              </Link>

              <button
                onClick={clearCart}
                className="mt-4 w-full text-center text-gray-500 hover:text-red-500 text-sm"
              >
                清空购物车
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
