import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_IDS = {
    'seeker_pro': 'price_1TgIfZPC3iP7bO6N7jfI0fxY',
    'seeker_premium': 'price_1TgJFQPC3iP7bO6NMaAP15G0',
    'recruiter_growth': 'price_1TgJGTPC3iP7bO6NLlB5NXp1',
    'recruiter_enterprise': 'price_1TgJHIPC3iP7bO6NipGhzbU9',
}