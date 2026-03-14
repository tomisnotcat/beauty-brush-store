'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, UserCheck, UserX, Search } from 'lucide-react'

export default function AdminStaffPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const staff = [
    { id: 1, name: '张管理员', email: 'admin@beautybrush.com', role: '超级管理员', status: 'active', lastLogin: '2024-03-14 10:30' },
    { id: 2, name: '李客服', email: 'service@beautybrush.com', role: '客服', status: 'active', lastLogin: '2024-03-14 09:15' },
    { id: 3, name: '王运营', email: '运营@beautybrush.com', role: '运营', status: 'active', lastLogin: '2024-03-13 16:45' },
    { id: 4, name: '赵仓库', email: 'warehouse@beautybrush.com', role: '仓库管理', status: 'inactive', lastLogin: '2024-03-01 11:20' },
  ]

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleStatus = (id) => {
    alert('状态已切换')
  }

  const deleteStaff = (id) => {
    if (confirm('确定删除该员工？')) {
      alert('员工已删除')
    }
  }

  const roles = [
    { id: 'admin', name: '超级管理员', desc: '所有权限' },
    { id: 'manager', name: '管理员', desc: '大部分权限' },
    { id: 'service', name: '客服', desc: '订单、客户管理' },
    { id: 'warehouse', name: '仓库管理', desc: '库存、订单' },
    { id: '运营', name: '运营', desc: '产品、内容' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">员工管理</h1>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加员工
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold">{staff.length}</p>
          <p className="text-sm text-gray-500">员工总数</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-green-500">{staff.filter(s => s.status === 'active').length}</p>
          <p className="text-sm text-gray-500">在职</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-400">{staff.filter(s => s.status === 'inactive').length}</p>
          <p className="text-sm text-gray-500">禁用</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-rose-500">1</p>
          <p className="text-sm text-gray-500">超级管理员</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索员工姓名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">员工</th>
              <th className="text-left p-4 font-medium text-gray-500">角色</th>
              <th className="text-left p-4 font-medium text-gray-500">状态</th>
              <th className="text-left p-4 font-medium text-gray-500">最后登录</th>
              <th className="text-right p-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(person => (
              <tr key={person.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {person.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                    {person.role}
                  </span>
                </td>
                <td className="p-4">
                  {person.status === 'active' ? (
                    <span className="flex items-center gap-2 text-green-500">
                      <UserCheck className="w-4 h-4" /> 在职
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-400">
                      <UserX className="w-4 h-4" /> 禁用
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-500">{person.lastLogin}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button 
                      onClick={() => toggleStatus(person.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {person.status === 'active' ? (
                        <UserX className="w-4 h-4 text-gray-400" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                    <button 
                      onClick={() => deleteStaff(person.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
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
