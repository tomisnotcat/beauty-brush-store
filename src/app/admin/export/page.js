'use client'

import { useState } from 'react'
import { Download, File, FileSpreadsheet, FileJson, Image } from 'lucide-react'

export default function AdminExportPage() {
  const [exporting, setExporting] = useState(null)
  
  const exportOptions = [
    { 
      id: 'products', 
      name: '产品数据', 
      desc: '导出所有产品信息',
      icon: File,
      fields: ['ID', '名称', '价格', '分类', '库存', '状态']
    },
    { 
      id: 'orders', 
      name: '订单数据', 
      desc: '导出所有订单记录',
      icon: FileSpreadsheet,
      fields: ['订单号', '客户', '产品', '金额', '状态', '日期']
    },
    { 
      id: 'customers', 
      name: '客户数据', 
      desc: '导出客户联系方式',
      icon: FileJson,
      fields: ['ID', '姓名', '邮箱', '电话', '订单数', '消费总额']
    },
    { 
      id: 'inventory', 
      name: '库存数据', 
      desc: '导出库存信息',
      icon: File,
      fields: ['SKU', '产品名', '库存', '预警值', '状态']
    },
  ]

  const recentExports = [
    { id: 1, name: 'products_20240314.csv', type: '产品数据', size: '245 KB', date: '2024-03-14 10:30' },
    { id: 2, name: 'orders_202403.csv', type: '订单数据', size: '1.2 MB', date: '2024-03-13 15:20' },
    { id: 3, name: 'customers_export.json', type: '客户数据', size: '89 KB', date: '2024-03-10 09:15' },
  ]

  const handleExport = (type) => {
    setExporting(type)
    setTimeout(() => {
      setExporting(null)
      alert('导出成功！文件将自动下载。')
    }, 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">数据导出</h1>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {exportOptions.map(option => (
          <div key={option.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
                <option.icon className="w-7 h-7 text-rose-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{option.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{option.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {option.fields.map(field => (
                    <span key={field} className="px-2 py-1 bg-gray-100 rounded text-xs">{field}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleExport(option.id)}
              disabled={exporting === option.id}
              className="w-full mt-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {exporting === option.id ? (
                <>导出中...</>
              ) : (
                <>
                  <Download className="w-5 h-5" /> 导出
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Bulk Export */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="font-bold text-lg mb-4">批量导出</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {exportOptions.map(option => (
            <label key={option.id} className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="w-4 h-4 text-rose-500 rounded" />
              <span>{option.name}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option>CSV 格式</option>
            <option>Excel 格式</option>
            <option>JSON 格式</option>
          </select>
          <button className="px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600">
            批量导出
          </button>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-lg">最近导出</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">文件名</th>
              <th className="text-left p-4 font-medium text-gray-500">类型</th>
              <th className="text-left p-4 font-medium text-gray-500">大小</th>
              <th className="text-left p-4 font-medium text-gray-500">导出时间</th>
              <th className="text-right p-4 font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {recentExports.map(exp => (
              <tr key={exp.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{exp.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-500">{exp.type}</td>
                <td className="p-4 text-gray-500">{exp.size}</td>
                <td className="p-4 text-gray-500">{exp.date}</td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1 text-rose-500 hover:bg-rose-50 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
