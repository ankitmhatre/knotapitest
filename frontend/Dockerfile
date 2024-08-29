# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Use Nginx to serve the production build
FROM nginx:stable-alpine

# Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx is running
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
