import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14?target=denonext';

const stripeSecret = Deno.env.get('STRIPE_SECRET');
const siteUrl = Deno.env.get('SITE_URL') ?? 'http://localhost:3000';

if (!stripeSecret) {
  console.error('Missing STRIPE_SECRET environment variable');
}

const stripe = new Stripe(stripeSecret!, { apiVersion: '2024-04-10' });

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { priceId, scanId, fixId, userEmail } = await req.json();

  if (!priceId || !scanId || !fixId || !userEmail) {
    return new Response('Missing parameters', { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { scanId, fixId },
      success_url: `${siteUrl}/payment-success?scan_id=${scanId}`,
      cancel_url: `${siteUrl}/fixes/${scanId}`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return new Response('Unable to create session', { status: 500 });
  }
});
