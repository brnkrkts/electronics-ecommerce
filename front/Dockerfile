FROM node:18-alpine

WORKDIR /app

# Explicitly mark this container as development
ENV NODE_ENV=development

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]