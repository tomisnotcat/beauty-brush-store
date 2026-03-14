export const metadata = {
  title: '关于我们 | Beauty Brush',
  description: '了解 Beauty Brush 品牌故事',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          关于<span className="gradient-text">我们</span>
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">品牌故事</h2>
            <p className="text-gray-600 leading-relaxed">
              Beauty Brush 创立于2015年，是一家专注于高端化妆刷研发与制造的品牌。我们相信，每一位女性都值得拥有最好的化妆工具来展现自己的美丽。
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-4">品质承诺</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              我们精选全球顶级刷毛材料，结合传统手工工艺与现代科技，每一把刷子都经过严格的品质检验。从选材到成品，我们致力于为客户提供最优质的化妆刷。
            </p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span>
                顶级纤维刷毛，柔软亲肤
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span>
                人体工学手柄设计
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span>
                30天无理由退换
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-500">✓</span>
                专业售后团队
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">我们的使命</h2>
            <p className="text-gray-600 leading-relaxed">
              让每一位顾客都能拥有专业级的化妆体验。我们不只是销售产品，更是传递美丽与自信。Beauty Brush，与您一起绽放美丽。
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
