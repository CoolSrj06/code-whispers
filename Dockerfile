# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
# For production, it's better to use npm ci --omit=dev
RUN npm install

# Bundle app source
COPY . .

# Make port 8001 available to the world outside this container
EXPOSE 8001

# Define environment variable for the port
ENV PORT=8001

# Run index.js when the container launches
# Using "node index.js" for production instead of "nodemon index.js"
CMD [ "node", "index.js" ] 