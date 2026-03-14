'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useCartStore()
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">Beauty Brush</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-rose-500 font-medium transition">
              首页
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-rose-500 font-medium transition">
              产品列表
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-rose-500 font-medium transition">
              品牌故事
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-500 font-medium transition">
              联系我们
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-rose-500 font-medium py-2">
                首页
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-rose-500 font-medium py-2">
                产品列表
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-rose-500 font-medium py-2">
                品牌故事
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-rose-500 font-medium py-2">
                联系我们
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
