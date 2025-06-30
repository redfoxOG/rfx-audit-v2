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
## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for instructions on deploying with Portainer and configuring an Nginx reverse proxy.
