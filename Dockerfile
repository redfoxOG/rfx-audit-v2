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

# Runtime stage with Node
FROM node:18-alpine as runtime
WORKDIR /app

# Copy built frontend and server code
COPY --from=builder /app/dist ./dist
COPY server.js ./server.js
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the Express port
EXPOSE 3001

CMD ["node", "server.js"]
