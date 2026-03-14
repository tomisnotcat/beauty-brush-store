'use client'

import { useState } from 'react'
import { Database, Download, Upload, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminBackupsPage() {
  const [backuping, setBackuping] = useState(false)
  
  const backups = [
    { id: 1, name: '完整备份_20240314.sql', type: 'full', size: '2.4 MB', date: '2024-03-14 10:30', status: 'success' },
    { id: 2, name: '产品数据_20240313.json', type: 'products', size: '156 KB', date: '2024-03-13 10:30', status: 'success' },
    { id: 3, name: '用户数据_20240313.json', type: 'users', size: '45 KB', date: '2024-03-13 10:30', status: 'success' },
    { id: 4, name: '完整备份_20240312.sql', type: 'full', size: '2.3 MB', date: '2024-03-12 10:30', status: 'success' },
    { id: 5, name: '订单数据_20240311.json', type: 'orders', size: '89 KB', date: '2024-03-11 10:30', status: 'failed' },
  ]

  const autoBackup = { enabled: true, frequency: 'daily', time: '03:00', keepDays: 7 }

  const handleBackup = (type) => {
    setBackuping(type)
    setTimeout(() => {
      setBackuping(false)
      alert('备份成功！')
    }, 2000)
  }

  const getStatusIcon = (status) => status === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">数据备份</h1>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <button onClick={() => handleBackup('full')} disabled={backuping} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition disabled:opacity-50">
          <Database className="w-8 h-8 text-rose-500 mb-3" />
          <p className="font-bold">完整备份</p>
          <p className="text-sm text-gray-500">备份所有数据</p>
        </button>
        <button onClick={() => handleBackup('products')} disabled={backuping} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition disabled:opacity-50">
          <Database className="w-8 h-8 text-blue-500 mb-3" />
          <p className="font-bold">产品备份</p>
          <p className="text-sm text-gray-500">仅备份产品数据</p>
        </button>
        <button onClick={() => handleBackup('orders')} disabled={backuping} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition disabled:opacity-50">
          <Database className="w-8 h-8 text-green-500 mb-3" />
          <p className="font-bold">订单备份</p>
          <p className="text-sm text-gray-500">仅备份订单数据</p>
        </button>
        <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <Upload className="w-8 h-8 text-purple-500 mb-3" />
          <p className="font-bold">恢复数据</p>
          <p className="text-sm text-gray-500">从备份恢复</p>
        </button>
      </div>

      {/* Auto Backup Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-bold text-lg mb-4">自动备份设置</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">自动备份</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>开启</option>
              <option>关闭</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">备份频率</label>
            <select className="w-full border rounded-lg px-3 py-2" defaultValue={autoBackup.frequency}>
              <option value="daily">每天</option>
              <option value="weekly">每周</option>
              <option value="monthly">每月</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">备份时间</label>
            <input type="time" className="w-full border rounded-lg px-3 py-2" defaultValue={autoBackup.time} />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">保留天数</label>
            <input type="number" className="w-full border rounded-lg px-3 py-2" defaultValue={autoBackup.keepDays} />
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg">保存设置</button>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-bold">备份历史</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">文件名</th>
              <th className="text-left p-4 font-medium text-gray-500">类型</th>
              <th className="text-right p-4 font-medium text-gray-500">大小</th>
              <th className="text-left p-4 font-medium text-gray-500">时间</th>
              <th className="text-center p-4 font-medium text-gray-500">状态</th>
              <th className="text-right p-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {backups.map(backup => (
              <tr key={backup.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{backup.name}</span>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-gray-100 rounded text-sm">{backup.type}</span></td>
                <td className="p-4 text-right">{backup.size}</td>
                <td className="p-4 text-gray-500">{backup.date}</td>
                <td className="p-4 text-center">{getStatusIcon(backup.status)}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded"><Download className="w-4 h-4 text-blue-500" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
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
