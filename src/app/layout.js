import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartProvider from '@/components/CartProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beauty Brush Store | 高端化妆刷品牌',
  description: '专业化妆刷制造商，提供高品质化妆工具',
  keywords: '化妆刷, 美妆工具, 专业化妆刷, 美容工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
