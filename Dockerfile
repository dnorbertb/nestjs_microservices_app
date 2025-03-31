FROM node:22

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Configure RabbitMQ users and permissions
RUN apt-get update && apt-get install -y curl
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Reinstall bcrypt
RUN npm uninstall bcrypt
RUN npm i bcrypt

# Start command
CMD ["npm", "run", "start:all:dev"]