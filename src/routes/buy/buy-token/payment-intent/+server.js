import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
let SECRET_STRIPE_KEY =
    'sk_test_51MSsFsJq03eCRPS3OHpuy17SRcHKPIiScRwrk23QdwKOt1dYcKYxBnVh9ciMMrbeb47vooudhtQ7ipfojSfEPEYJ00ieql6Nyh';

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1200,
        currency: 'usd',
        payment_method_types: ['card']
    })

    return json({
        clientSecret: paymentIntent.client_secret
    })
}