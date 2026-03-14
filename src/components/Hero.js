'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">新品上市 · 限时优惠</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">精致妆容</span>
            <br />
            从一把好刷开始
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            精选顶级刷毛，匠心工艺打造
            <br className="hidden sm:block" />
            让每一次上妆都成为享受
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              探索产品
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center justify-center">
              了解更多
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">10万+</div>
              <div className="text-sm text-gray-500">忠实用户</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">4.9</div>
              <div className="text-sm text-gray-500">用户评分</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-sm text-gray-500">好评率</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
