# Use an official Node.js runtime as the base image
FROM node:18.13.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm ci --no-cache

ADD . /src
# Copy the entire project to the working directory
COPY . .

# Build the Nest.js application
RUN npm run build

# Expose the port on which your Nest.js application is listening
EXPOSE 3000

# Start the application
CMD npm run start:dev
