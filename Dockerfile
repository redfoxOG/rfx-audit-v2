FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY server.js ./server.js
COPY package.json package-lock.json* ./
COPY ecosystem.config.cjs ./ecosystem.config.cjs
RUN npm ci --omit=dev \
 && npm install -g pm2 \
 && mkdir -p /var/log/rfx-audit

EXPOSE 3001
CMD ["pm2-runtime", "ecosystem.config.cjs"]
