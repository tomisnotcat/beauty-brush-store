'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
      },
      redirect: 'if_required',
    })

    if (submitError) {
      setError(submitError.message)
      setLoading(false)
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 transition"
      >
        {loading ? '处理中...' : `支付 ¥${amount}`}
      </button>
    </form>
  )
}

export default function StripeCheckout({ items, customer }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const initPayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer }),
      })
      const data = await res.json()
      setClientSecret(data.clientSecret)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <p className="mb-4 text-gray-600">订单金额: <span className="font-bold text-rose-500">¥{total}</span></p>
        <button
          onClick={initPayment}
          disabled={loading}
          className="px-8 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50"
        >
          {loading ? '初始化...' : '开始支付'}
        </button>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm amount={total} onSuccess={(pi) => console.log('Success:', pi)} />
    </Elements>
  )
}
