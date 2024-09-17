FROM node:21.6.2

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL=$DATABASE_URL

EXPOSE 4000

CMD ["npm","run","dev"]