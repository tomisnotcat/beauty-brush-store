import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      <Hero />
      <FeaturedProducts />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
