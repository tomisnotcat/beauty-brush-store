'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Menu, X, ChevronLeft, Image, Star, PackageCheck, Tag } from 'lucide-react'

const menuItems = [
  { name: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { name: '产品管理', href: '/admin/products', icon: Package },
  { name: '库存管理', href: '/admin/inventory', icon: PackageCheck },
  { name: '订单管理', href: '/admin/orders', icon: ShoppingCart },
  { name: '客户管理', href: '/admin/customers', icon: Users },
  { name: '优惠券管理', href: '/admin/coupons', icon: Tag },
  { name: '评价管理', href: '/admin/reviews', icon: Star },
  { name: '横幅管理', href: '/admin/banners', icon: Image },
  { name: '数据分析', href: '/admin/analytics', icon: BarChart3 },
  { name: '系统设置', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Simple auth check - in production use proper auth
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    // For demo, allow access
    setIsAuthorized(true)
  }, [])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">请先登录管理后台</h2>
          <Link href="/login" className="text-rose-500 hover:underline">
            前往登录
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b px-4 py-2 flex items-center justify-between">
        <span className="font-semibold">管理后台</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-gray-900 text-white transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link href="/admin" className="text-xl font-bold">管理后台</Link>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive ? 'bg-rose-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition">
            <ChevronLeft className="w-5 h-5" />
            返回前台
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
