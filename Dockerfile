# Use Node.js for SSR
FROM node:18 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the SSR Angular application
RUN npm run build --configuration=production

# Expose port 4000 (default port for Angular SSR)
EXPOSE 4000

# Start the Angular Universal server
CMD ["node", "dist/website-foundation/server/server.mjs"]
