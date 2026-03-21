import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')

export async function POST(request) {
  try {
    const body = await request.json()
    const { items, customer } = body

    // Calculate total from items
    const amount = items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'cny',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: customer?.name || '',
        customerEmail: customer?.email || '',
      },
    })

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
