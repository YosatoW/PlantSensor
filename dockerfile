# base Image with Bun pre-installed
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the Cource Code
COPY . /app/

# Install the dependencies
RUN bun install

# Start the Application
CMD ["bun", "run", "src/app.ts"]