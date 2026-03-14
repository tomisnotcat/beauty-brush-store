'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          联系<span className="gradient-text">我们</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">联系方式</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-rose-500">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold">客服电话</h3>
                  <p className="text-gray-500">400-888-8888</p>
                  <p className="text-xs text-gray-400">工作日 9:00-21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-500">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold">邮箱</h3>
                  <p className="text-gray-500">service@beautybrush.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold">公司地址</h3>
                  <p className="text-gray-500">上海市浦东新区张江高科技园区</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-500">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold">微信客服</h3>
                  <p className="text-gray-500">beautybrush01</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">留言咨询</h2>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <p className="font-semibold text-green-500">留言已发送！</p>
                <p className="text-gray-500 text-sm">我们会尽快回复您</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">姓名</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">邮箱</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">主题</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">请选择</option>
                    <option value="product">产品咨询</option>
                    <option value="order">订单问题</option>
                    <option value="return">退换货</option>
                    <option value="cooperation">商务合作</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">留言内容</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  发送留言
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
