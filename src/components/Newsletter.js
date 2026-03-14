'use client'

import { useState } from 'react'
import { Send, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="bg-gradient-to-r from-rose-500 to-purple-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          订阅我们的Newsletter
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          获取最新产品资讯、优惠活动和美妆技巧
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="输入您的邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-rose-500 font-semibold rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            {subscribed ? (
              <>
                <Check className="w-5 h-5" />
                已订阅
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                订阅
              </>
            )}
          </button>
        </form>

        <p className="text-white/60 text-sm mt-4">
          我们尊重您的隐私，承诺不会发送垃圾邮件
        </p>
      </div>
    </section>
  )
}
