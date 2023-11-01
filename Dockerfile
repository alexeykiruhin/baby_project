FROM node:18-alpine

WORKDIR /client


# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install


# Копируем файлы вашего приложения
COPY . .

CMD ["npm", "start"]
