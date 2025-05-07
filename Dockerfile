# Use Node.js LTS base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only the package files first (for caching install step)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the codebase
COPY . .

# Run a production build (filters out drafts/future posts)
# RUN NODE_ENV=production npm run build
RUN npm run build

# Expose the default Eleventy output directory (_site) via a static server
# You can use a simple HTTP server like `serve`
# RUN npm install -g serve

# Expose the port for the container
EXPOSE 8080

# Start the production server
# CMD ["serve", "-s", "_site", "-l", "8080"]
CMD ["-s", "_site", "-l", "8080"]