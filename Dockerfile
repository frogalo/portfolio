# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and lock files first to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies (use npm ci for clean install)
# --force is generally not recommended as it bypasses checks.
# If you have peer dependency issues, address them or use --legacy-peer-deps
RUN npm ci

# Copy the entire application code (including 'public' and '.env.production' if they are present locally)
# This includes 'src', 'public', '.env.production', etc.
COPY . .

# Build the Next.js application for production
# This creates the optimized .next folder
RUN npm run build

# Stage 2: Run the production application
FROM node:20-alpine AS runner

WORKDIR /app

# Set Node.js environment to production
ENV NODE_ENV production
# Set the port Next.js will listen on (to match your Nginx config)
ENV PORT 3002

# Copy only the essential files for production runtime from the builder stage
# ./.next is the build output from `npm run build`
COPY --from=builder /app/.next ./.next
# public directory contains static assets that Next.js needs to serve
COPY --from=builder /app/public ./public
# package.json and node_modules are needed for 'npm start' to work correctly
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
# If you *must* include .env.production directly in the image (less secure for prod env vars)
# ensure it's copied from the builder stage where it was copied from local.
COPY --from=builder /app/.env.production ./.env.production

# Expose the port Next.js runs on (matches ENV PORT)
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]