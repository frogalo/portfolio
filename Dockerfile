# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and lock files first to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies (will also trigger prisma generate if in postinstall/build)
RUN npm ci

# Copy the entire application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Run the production application
FROM node:20-alpine AS runner

WORKDIR /app

# Set Node.js environment to production
ENV NODE_ENV=production
ENV PORT=3002

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy essential files for production runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy .env.production only if it exists (optional)
COPY --from=builder /app/.env.production* ./

# Expose the port
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]