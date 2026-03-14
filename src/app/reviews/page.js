'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ThumbsUp, MessageCircle } from 'lucide-react'

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')

  const reviews = [
    {
      id: 1,
      productId: 1,
      productName: '专业化妆刷套装 - 星辰系列',
      user: '李美美',
      rating: 5,
      content: '这套刷子真的超级好用！刷毛柔软又不扎脸，上妆特别服帖。包装也很精美，送人很有面子！',
      date: '2024-03-10',
      likes: 28,
      images: []
    },
    {
      id: 2,
      productId: 3,
      productName: '基础入门套装 - 清新系列',
      user: '王小红',
      rating: 5,
      content: '作为一个化妆新手，这套入门刷真的帮了我大忙。价格实惠，质量也很好，推荐！',
      date: '2024-03-08',
      likes: 15,
      images: []
    },
    {
      id: 3,
      productId: 2,
      productName: '钻石系列化妆刷 - 限量版',
      user: '张丽丽',
      rating: 5,
      content: '买来送朋友的生日礼物，她非常喜欢！刷子质感很好，礼盒包装也很高档。',
      date: '2024-03-05',
      likes: 32,
      images: []
    },
    {
      id: 4,
      productId: 4,
      productName: '粉底刷 - 完美遮瑕',
      user: '赵六',
      rating: 4,
      content: '粉底刷很好用，晕染均匀，不会留痕。唯一缺点是手柄有点细，但不影响使用。',
      date: '2024-03-01',
      likes: 8,
      images: []
    },
    {
      id: 5,
      productId: 1,
      productName: '专业化妆刷套装 - 星辰系列',
      user: '钱七',
      rating: 5,
      content: '第二次购买了，上次买来自己用，这次买来送闺蜜。真的超级推荐！',
      date: '2024-02-28',
      likes: 42,
      images: []
    },
  ]

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filter))

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percent: Math.round(reviews.filter(r => r.rating === rating).length / reviews.length * 100)
  }))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          用户<span className="gradient-text">评价</span>
        </h1>

        {/* Rating Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall */}
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">{avgRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-500">{reviews.length} 条评价</p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count, percent }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="w-8 text-sm">{rating} 星</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-gray-500 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', '5', '4', '3'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                filter === f 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f === 'all' ? '全部' : `${f}星`}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.user[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/products/${review.productId}`}
                  className="text-sm text-rose-500 hover:underline"
                >
                  {review.productName}
                </Link>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {review.content}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">回复</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            暂无评价
          </div>
        )}
      </div>
    </div>
  )
}
