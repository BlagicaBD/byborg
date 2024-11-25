FROM mcr.microsoft.com/playwright:v1.18.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && \
    npx playwright install && \
    npm install -g allure-commandline

# Copy the rest of the application
COPY . .

# Expose any ports you may use (e.g., for a UI server)
EXPOSE 8088

# Default command to run tests
CMD ["npx", "codeceptjs", "run", "--steps"]