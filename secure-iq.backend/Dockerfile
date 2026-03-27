# ================================
# Stage 1: Build
# ================================
FROM node:22-alpine AS build
WORKDIR /app

COPY secure-iq.backend/package.json secure-iq.backend/package-lock.json* ./
RUN npm ci --frozen-lockfile

COPY secure-iq.backend/ . 

FROM node:22-alpine AS runner
WORKDIR /app

EXPOSE 3001

CMD ["npm", "run", "start:dev"]