'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(isLogin ? '登录成功！' : '注册成功！')
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <h2 className="text-2xl font-bold">{isLogin ? '欢迎回来' : '创建账户'}</h2>
            <p className="text-gray-500 mt-1">{isLogin ? '登录您的账户' : '注册一个新账户'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="您的姓名"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              {isLogin ? '登录' : '注册'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-rose-500 hover:text-rose-700"
            >
              {isLogin ? '没有账户？立即注册' : '已有账户？立即登录'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-center text-gray-400 text-sm">或使用以下方式登录</p>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-3 border rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="flex-1 py-3 border rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
                <img src="https://www.weixin.qq.com/favicon.ico" alt="WeChat" className="w-5 h-5" />
                微信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
