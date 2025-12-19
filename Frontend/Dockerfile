# Frontend Dockerfile для React/Vite
# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Аргументы сборки
ARG VITE_API_BASE_URL=http://109.73.198.109:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Копирование package файлов
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Этап продакшена с nginx
FROM nginx:alpine

# Копирование собранного приложения
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт для nginx
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]

