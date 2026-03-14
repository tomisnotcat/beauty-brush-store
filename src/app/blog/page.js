'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ChevronRight } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const posts = [
    {
      id: 1,
      title: '如何选择适合自己的化妆刷',
      excerpt: '不同刷具适合不同妆容需求，本文教你如何根据自己的肤质和妆容选择合适的化妆刷...',
      category: '技巧',
      author: 'Beauty编辑',
      date: '2024-03-10',
      image: '/blog/brush-guide.jpg',
      readTime: 5,
    },
    {
      id: 2,
      title: '化妆刷的清洁与保养技巧',
      excerpt: '正确的清洁方法可以延长化妆刷的使用寿命，同时保证肌肤健康...',
      category: '护理',
      author: 'Beauty编辑',
      date: '2024-03-08',
      image: '/blog/cleaning.jpg',
      readTime: 3,
    },
    {
      id: 3,
      title: '2024年美妆趋势预测',
      excerpt: '今年流行的妆容风格有哪些？让我们一起来看看最新的美妆趋势...',
      category: '趋势',
      author: '时尚编辑',
      date: '2024-03-05',
      image: '/blog/trends.jpg',
      readTime: 4,
    },
    {
      id: 4,
      title: '专业化妆师分享：刷具使用技巧',
      excerpt: '从业十年的专业化妆师分享她的刷具使用心得和技巧...',
      category: '专访',
      author: 'Beauty编辑',
      date: '2024-03-01',
      image: '/blog/pro-tips.jpg',
      readTime: 6,
    },
  ]

  const categories = ['全部', '技巧', '护理', '趋势', '专访']

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">美妆博客</h1>
          <p className="text-xl opacity-90">获取最新美妆资讯和技巧</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === '全部' ? 'all' : cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === (cat === '全部' ? 'all' : cat)
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === 'all' && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-12">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-rose-200 to-purple-200">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">💄</div>
              </div>
              <div className="p-8">
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">
                  热门文章
                </span>
                <h2 className="text-2xl font-bold mt-4 mb-3">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {posts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {posts[0].date}
                  </span>
                  <span>{posts[0].readTime} 分钟阅读</span>
                </div>
                <button className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 inline-flex items-center gap-2">
                  阅读全文 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-rose-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center text-5xl">✨</div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {post.author}
                  </span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            暂无文章
          </div>
        )}
      </div>
    </div>
  )
}
