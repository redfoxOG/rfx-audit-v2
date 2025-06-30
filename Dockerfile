# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Runtime stage with Node and pm2 for log management
FROM node:18-alpine as runtime
WORKDIR /app

# Copy built frontend and server code
COPY --from=builder /app/dist ./dist
COPY server.js ./server.js
COPY ecosystem.config.js ./ecosystem.config.js
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --omit=dev \
    && npm install -g pm2 \
    && pm2 install pm2-logrotate \
    && pm2 set pm2-logrotate:max_size 10M \
    && pm2 set pm2-logrotate:retain 5 \
    && pm2 set pm2-logrotate:compress true

# Expose the Express port
EXPOSE 3001

RUN mkdir -p /var/log/rfx-audit

CMD ["pm2-runtime", "ecosystem.config.js"]
