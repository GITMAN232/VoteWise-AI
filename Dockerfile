# Stage 1: Build the Vite React Application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run defaults to port 8080
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
