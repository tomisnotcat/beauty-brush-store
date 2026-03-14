'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: '你们的化妆刷是什么材质的？',
      answer: '我们的化妆刷采用高品质纤维刷毛，柔软亲肤，不扎脸。部分高端系列采用天然羊毛，触感更细腻。所有刷毛都经过严格筛选和质检，确保品质。'
    },
    {
      question: '如何选择适合自己的化妆刷？',
      answer: '根据您的需求选择：如果您是初学者，建议选择基础套装；如果您是专业化妆师，建议选择专业系列。您也可以根据刷具的功能（粉底刷、眼影刷、腮红刷等）单独购买。'
    },
    {
      question: '化妆刷如何清洗和保养？',
      answer: '建议每次使用后用纸巾轻轻擦拭残留化妆品。每周用温水和中性洗涤剂清洗一次，自然晾干。避免暴晒，不要用力揉搓刷毛。定期保养可以延长刷具使用寿命。'
    },
    {
      question: '支持哪些支付方式？',
      answer: '我们支持微信支付、支付宝、银行卡等多种支付方式。企业客户还可以申请月结账户。'
    },
    {
      question: '发货时间是多久？',
      answer: '订单确认后48小时内发货。普通快递2-5天送达，偏远地区可能需要5-7天。会员享受优先发货服务。'
    },
    {
      question: '退换货政策是怎样的？',
      answer: '我们提供30天无理由退换货服务。收到商品后如有质量问题，请及时联系客服处理。非质量问题退换货需保持商品全新状态，运费自理。'
    },
    {
      question: '如何成为代理商？',
      answer: '欢迎有合作意向的客户联系我们。您可以发送邮件至 business@beautybrush.com 或拨打客服电话了解详情。'
    },
    {
      question: '会员有什么福利？',
      answer: '会员享受积分返利、生日礼物、专属折扣、新品优先购买等特权。累计消费满一定金额可升级会员等级，享受更多优惠。'
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          常见<span className="gradient-text">问题</span>
        </h1>
        <p className="text-gray-500 text-center mb-12">
          找到您想了解的问题答案
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">没有找到答案？</h3>
          <p className="mb-4 opacity-90">我们的客服团队随时为您服务</p>
          <a href="/contact" className="inline-block px-6 py-3 bg-white text-rose-500 font-semibold rounded-full hover:bg-gray-100 transition">
            联系客服
          </a>
        </div>
      </div>
    </div>
  )
}
