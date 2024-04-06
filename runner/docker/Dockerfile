FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM base AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

RUN apk add --no-cache python3 py3-pytest
RUN npm install --global jest

COPY . .
