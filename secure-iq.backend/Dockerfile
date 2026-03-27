# ================================
# Stage 1: Build
# ================================
FROM node:22-alpine AS build
WORKDIR /app

COPY secure-iq.backend/package.json secure-iq.backend/package-lock.json* ./
RUN npm ci --frozen-lockfile

COPY secure-iq.backend/ . 
RUN npm run build
RUN ls -la 
# ================================
# Stage 2: Production
# ================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# สร้าง user ไม่ให้รันเป็น root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nestjs

# ติดตั้งเฉพาะ production dependencies
COPY secure-iq.backend/package.json secure-iq.backend/package-lock.json* ./
RUN npm ci --frozen-lockfile --omit=dev

COPY --from=build --chown=nestjs:nodejs /app/dist ./dist

USER nestjs

EXPOSE 3001

CMD ["npm", "run", "start:prod"]