# Base image
FROM node:18

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# Install ts-node and typescript globally
RUN npm install -g ts-node typescript

# Copy source code
COPY ./src ./src

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["ts-node", "src/server.ts"]