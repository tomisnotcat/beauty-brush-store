'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/products'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const { cart } = useCartStore()
  const [wishlistCount, setWishlistCount] = useState(0)
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistCount(wishlist.length)
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="w-5 h-5 text-gray-700" /> : <Search className="w-5 h-5 text-gray-700" />}
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white rounded-xl shadow-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="搜索产品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-b focus:outline-none"
                    autoFocus
                  />
                  {searchResults.length > 0 && (
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map(p => (
                        <Link
                          key={p.id}
                          href={`/products/${p.id}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.images[0] || '/products/placeholder.jpg'} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                            <p className="text-rose-500 text-sm">¥{p.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 0 && searchResults.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">未找到相关产品</div>
                  )}
                </div>
              )}
            </div>

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition hidden sm:block">
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
