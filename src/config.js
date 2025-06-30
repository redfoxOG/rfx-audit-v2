export const config = {
  N8N_WEBHOOK_URL: import.meta.env.VITE_N8N_WEBHOOK_URL,
  N8N_STATUS_ENDPOINT: import.meta.env.VITE_N8N_STATUS_ENDPOINT,
  REPORT_BASE_URL: import.meta.env.VITE_REPORT_BASE_URL,
  SECRET: import.meta.env.VITE_SECRET,

  // New variables for Fix Engine
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET: import.meta.env.VITE_STRIPE_SECRET, // Used in Edge Functions
  STRIPE_WEBHOOK_SECRET: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET, // Used in Edge Functions
  AI_TUNER_URL: import.meta.env.VITE_AI_TUNER_URL,
  CALENDLY_API_KEY: import.meta.env.VITE_CALENDLY_API_KEY,
  JITSI_DOMAIN: import.meta.env.VITE_JITSI_DOMAIN,
};
