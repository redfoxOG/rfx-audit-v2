# RedFox Securities Audit Platform

This is an automated website security/exposure audit application.

## Future Enhancements Roadmap

- **User Authentication**: Implement OAuth (e.g., GitHub, Google) for returning users to view their scan history and manage settings.
- **Team & Workspace Features**: Allow users to create teams and share scan results within a workspace.
- **Advanced Scan Profiles**: Offer different scan profiles (e.g., "Quick Scan," "Full Pentest," "API Scan") with varying levels of intensity and checks.
- **Webhook Notifications**: Integrate with Slack, Discord, and Microsoft Teams to send alerts when scans are complete or critical vulnerabilities are found.
- **Subscription Model**: Implement a rate-limiting and subscription portal using Stripe to offer premium features, higher scan quotas, and advanced reporting.
- **Theme Toggle**: Add a light-mode theme for users who prefer it over the default dark "hacker" theme.
- **Custom Report Branding**: Allow premium users to add their own logo and branding to the generated PDF reports.


## Hosting Setup

1. **Point the Domain**
   - Create an A record for `audit.redfoxsecurities.com` that points to your home server's public IP address.
2. **Obtain HTTPS Certificates**
   - Install Certbot and request a certificate for the domain:
     ```bash
     sudo apt-get install certbot
     sudo certbot certonly --standalone -d audit.redfoxsecurities.com \
       --non-interactive --agree-tos -m admin@redfoxsecurities.com
     ```
   - Set up automatic renewal using a cron job:
     ```bash
     0 0 * * * certbot renew --quiet
     ```
   - If using a reverse proxy like Caddy or Nginx, you can rely on its built-in Let's Encrypt support instead.
=======
## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for instructions on deploying with Portainer and configuring an Nginx reverse proxy.

