export const config = {
  N8N_WEBHOOK_URL: "https://your-n8n-instance.com/webhook/REPLACE_ME",
  N8N_STATUS_ENDPOINT: "https://your-n8n-instance.com/webhook/status/REPLACE_ME",
  REPORT_BASE_URL: "https://your-report-storage.com/reports",
  SECRET: "REPLACE_WITH_32_CHAR_HEX_SECRET",
  
  // New variables for Fix Engine
  STRIPE_PUBLISHABLE_KEY: "pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY",
  STRIPE_SECRET: "sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY", // Used in Edge Functions
  STRIPE_WEBHOOK_SECRET: "whsec_REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET", // Used in Edge Functions
  AI_TUNER_URL: "http://ai-tuner:8000",
  CALENDLY_API_KEY: "REPLACE_WITH_YOUR_CALENDLY_API_KEY",
  JITSI_DOMAIN: "meet.redfoxsecurities.com",
};