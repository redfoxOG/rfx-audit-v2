# RedFox Securities Audit Platform

This is an automated website security/exposure audit application.

## Environment Configuration

Copy `.env.example` to `.env` and fill in the values for your Supabase
credentials, workflow URLs and other settings. These environment variables are
used both by the server and the front‑end so they can be tuned per environment.

## Logging

The Docker container now runs the server using **PM2** with the
`pm2-logrotate` module enabled. Logs are written to `/var/log/rfx-audit` inside
the container and rotated automatically to keep only the most recent files.

## Future Enhancements Roadmap

- **User Authentication**: Implement OAuth (e.g., GitHub, Google) for returning users to view their scan history and manage settings.
- **Team & Workspace Features**: Allow users to create teams and share scan results within a workspace.
- **Advanced Scan Profiles**: Offer different scan profiles (e.g., "Quick Scan," "Full Pentest," "API Scan") with varying levels of intensity and checks.
- **Webhook Notifications**: Integrate with Slack, Discord, and Microsoft Teams to send alerts when scans are complete or critical vulnerabilities are found.
- **Subscription Model**: Implement a rate-limiting and subscription portal using Stripe to offer premium features, higher scan quotas, and advanced reporting.
- **Theme Toggle**: Add a light-mode theme for users who prefer it over the default dark "hacker" theme.
- **Custom Report Branding**: Allow premium users to add their own logo and branding to the generated PDF reports.


## Testing

Run ESLint before deployment to ensure code quality:

```bash
npm test
```
=======

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
