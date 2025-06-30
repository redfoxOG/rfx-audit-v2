export const config = {
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_STATUS_ENDPOINT: process.env.N8N_STATUS_ENDPOINT,
  REPORT_BASE_URL: process.env.REPORT_BASE_URL,
  SECRET: process.env.SECRET,

  // New variables for Fix Engine
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET: process.env.STRIPE_SECRET, // Used in Edge Functions
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET, // Used in Edge Functions
  AI_TUNER_URL: process.env.AI_TUNER_URL,
  CALENDLY_API_KEY: process.env.CALENDLY_API_KEY,
  JITSI_DOMAIN: process.env.JITSI_DOMAIN,
};