FROM node:20-alpine
WORKDIR /app

COPY secure-iq.frontend/package.json secure-iq.frontend/package-lock.json* ./
RUN npm ci --frozen-lockfile

COPY secure-iq.frontend/ . 
RUN npm run build

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]