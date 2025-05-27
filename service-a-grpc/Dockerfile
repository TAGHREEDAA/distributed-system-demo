# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY ./proto ./proto
COPY ./src ./src

# Install dependencies
RUN npm install

# Install ts-node globally (optional)
RUN npm install -g ts-node typescript

# Command to run the server
CMD ["ts-node", "src/server.ts"]
