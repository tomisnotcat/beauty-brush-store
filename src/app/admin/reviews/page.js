'use client'

import { useState } from 'react'
import { Star, Check, X, Eye, Trash2, Filter } from 'lucide-react'

export default function AdminReviewsPage() {
  const [filter, setFilter] = useState('all')
  const [reviews, setReviews] = useState([
    { id: 1, productName: '专业化妆刷套装', user: '李美美', rating: 5, content: '很好用！', status: 'approved', date: '2024-03-10' },
    { id: 2, productName: '基础入门套装', user: '王小红', rating: 5, content: '推荐购买', status: 'approved', date: '2024-03-08' },
    { id: 3, productName: '钻石系列', user: '测试用户', rating: 1, content: '垃圾产品', status: 'pending', date: '2024-03-05' },
    { id: 4, productName: '粉底刷', user: '赵六', rating: 4, content: '还不错', status: 'approved', date: '2024-03-01' },
  ])

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter)

  const approveReview = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  const rejectReview = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }

  const deleteReview = (id) => {
    if (confirm('确定删除这条评价？')) {
      setReviews(reviews.filter(r => r.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">评价管理</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold">{reviews.length}</p>
          <p className="text-sm text-gray-500">总评价</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-500">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
          <p className="text-sm text-gray-500">已通过</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-yellow-500">
            {reviews.filter(r => r.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-500">待审核</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-red-500">
            {reviews.filter(r => r.status === 'rejected').length}
          </p>
          <p className="text-sm text-gray-500">已拒绝</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'all', label: '全部' },
          { value: 'pending', label: '待审核' },
          { value: 'approved', label: '已通过' },
          { value: 'rejected', label: '已拒绝' },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              filter === f.value
                ? 'bg-rose-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">用户</th>
              <th className="text-left p-4 font-medium text-gray-500">产品</th>
              <th className="text-left p-4 font-medium text-gray-500">评价</th>
              <th className="text-left p-4 font-medium text-gray-500">评分</th>
              <th className="text-left p-4 font-medium text-gray-500">状态</th>
              <th className="text-left p-4 font-medium text-gray-500">日期</th>
              <th className="text-right p-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(review => (
              <tr key={review.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium">{review.user}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">{review.productName}</td>
                <td className="p-4 max-w-xs">
                  <p className="text-sm line-clamp-2">{review.content}</p>
                </td>
                <td className="p-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    review.status === 'approved' ? 'bg-green-100 text-green-700' :
                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {review.status === 'approved' ? '已通过' : 
                     review.status === 'pending' ? '待审核' : '已拒绝'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{review.date}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {review.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => approveReview(review.id)}
                          className="p-2 hover:bg-green-50 rounded-lg"
                          title="通过"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </button>
                        <button 
                          onClick={() => rejectReview(review.id)}
                          className="p-2 hover:bg-red-50 rounded-lg"
                          title="拒绝"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => deleteReview(review.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
