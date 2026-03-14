'use client'

import { testimonials } from '@/data/products'
import Image from 'next/image'

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          用户<span className="gradient-text">评价</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          来自真实用户的使用体验
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.name[0]}
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
