# Stage 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Use legacy peer deps to avoid ERESOLVE errors
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the production version
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
