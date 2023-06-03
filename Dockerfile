
################################
# STEP 1 build executable binary
################################
FROM node:16-alpine AS builder

# Use node adapter in docker container build mode.
ENV ADAPTER node

# Make the 'app' folder the current working directory.
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# `npm ci` more fit for productions environment.
RUN npm ci

# Copy project files and folders to the current working directory (i.e. 'app' folder).
COPY . .

# Build the app.
RUN npm run build

RUN npm prune --production

############################
# STEP 2 build a small image
############################
FROM node:16-alpine
LABEL maintainer="https://github.com/saferwall"
LABEL version="0.5.0"
LABEL description="Saferwall UI Dashboard"

# Make the 'app' folder the current working directory.
WORKDIR /app

# Copy the artifacts from the build stage.
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
