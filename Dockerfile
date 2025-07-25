# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies (use npm ci for clean install, or yarn install)
RUN npm ci --force

# Copy the rest of the application code
COPY src .

# Build the Next.js application for production
RUN npm run build

# Stage 2: Run the production application
FROM node:20-alpine AS runner

WORKDIR /app

# Set Node.js environment to production
ENV NODE_ENV production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.production ./.env.production

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3002

# Command to run the application
CMD ["npm", "start"]