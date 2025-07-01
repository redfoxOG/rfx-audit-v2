# Deployment Guide

This guide explains how to deploy the audit application using Portainer and configure an Nginx reverse proxy with Let's Encrypt TLS.

## 1. Build with Portainer

1. Log in to Portainer.
2. Navigate to **Stacks** and choose **Add stack**.
3. Paste the contents of `docker-deploy.yaml` or upload it from the repository.
4. Deploy the stack. Portainer builds the Docker image from the included `Dockerfile`.
5. The stack exposes port **3001** inside the container and maps it to host port **8085** as defined in `docker-deploy.yaml`:
   ```yaml
   services:
     audit:
       ports:
         - "8085:3001"
   ```

## 2. Configure Nginx Reverse Proxy

Use an external Nginx instance to route traffic for `audit.redfoxsecurities.com` to the container and obtain a Let's Encrypt certificate.

1. Install Nginx and Certbot on the host that will serve as the reverse proxy.
2. Create an Nginx site configuration similar to the following:
   ```nginx
   server {
       listen 80;
       server_name audit.redfoxsecurities.com;
       location / {
           proxy_pass http://localhost:8085;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
3. Enable the configuration and reload Nginx.
4. Obtain and install a Let's Encrypt certificate using Certbot:
   ```bash
   sudo certbot --nginx -d audit.redfoxsecurities.com
   ```
   Certbot updates the Nginx configuration to redirect HTTP to HTTPS and automatically renew the certificate.

With these steps completed, requests to `https://audit.redfoxsecurities.com` will terminate TLS at the reverse proxy and forward to the container running on port 8085.
