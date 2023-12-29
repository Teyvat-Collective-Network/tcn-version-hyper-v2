FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install
COPY . .

ENV NODE_ENV=production

USER bun
CMD ["bun", "start"]