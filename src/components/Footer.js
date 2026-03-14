import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">Beauty Brush</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              专业化妆刷制造商，致力于为每一位顾客提供高品质的化妆工具。我们相信，优质的工具能帮助您展现最美的自己。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-rose-400 transition">产品列表</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-rose-400 transition">品牌故事</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-rose-400 transition">联系我们</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-rose-400 transition">常见问题</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-400">
              <li>客服电话: 400-888-8888</li>
              <li>客服邮箱: service@beautybrush.com</li>
              <li>工作时间: 9:00-21:00</li>
              <li>公司地址: 上海市浦东新区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Beauty Brush. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-rose-400 transition">隐私政策</a>
            <a href="#" className="hover:text-rose-400 transition">服务条款</a>
            <a href="#" className="hover:text-rose-400 transition">配送政策</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
