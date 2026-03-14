import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: '全部产品', href: '/products' },
      { name: '热门推荐', href: '/products?filter=featured' },
      { name: '新品上市', href: '/products?filter=new' },
      { name: '优惠专区', href: '/products?sale=true' },
    ],
    company: [
      { name: '品牌故事', href: '/about' },
      { name: '联系我们', href: '/contact' },
      { name: '加入我们', href: '/careers' },
      { name: '新闻动态', href: '/blog' },
    ],
    support: [
      { name: '帮助中心', href: '/faq' },
      { name: '配送说明', href: '/shipping' },
      { name: '退换政策', href: '/returns' },
      { name: '隐私条款', href: '/privacy' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">Beauty Brush</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              专业化妆刷制造商，致力于为每一位顾客提供高品质的化妆工具。我们相信，优质的工具能帮助您展现最美的自己。
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all transform hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">购物</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-rose-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">公司</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-rose-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">帮助</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-rose-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">客服电话</p>
                <p className="font-medium">400-888-8888</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">客服邮箱</p>
                <p className="font-medium">service@beautybrush.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">公司地址</p>
                <p className="font-medium">上海市浦东新区</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {currentYear} Beauty Brush. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-rose-400 transition">隐私政策</a>
              <a href="#" className="hover:text-rose-400 transition">服务条款</a>
              <a href="#" className="hover:text-rose-400 transition">配送政策</a>
              <a href="#" className="hover:text-rose-400 transition">网站地图</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
