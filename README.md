# ✈️ VIPGate - VIP-сервисы в аэропортах

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**Современное веб-приложение для бронирования VIP-сервисов в аэропортах**

[Демо](#) • [Документация](#) • [Сообщить о проблеме](https://github.com/tihshkel/vipgate/issues)

</div>

---

## 📋 О проекте

VIPGate — это точная копия дизайна сайта [Vipgate.com](https://vipgate.com), созданная с использованием современных веб-технологий. Приложение предоставляет пользователям удобный интерфейс для бронирования VIP-сервисов в аэропортах, включая Fast Track, VIP-залы, встречу и проводы, а также другие премиум-услуги.

### 🎯 Основные возможности

- 🎫 **Бронирование VIP-услуг** — Fast Track, VIP-залы, трансферы
- 🔍 **Поиск аэропортов** — быстрый поиск по популярным направлениям
- 👤 **Личный кабинет** — управление бронированиями и профилем
- 💎 **Программа лояльности** — накопительные бонусы и статусы
- 📱 **Адаптивный дизайн** — отличная работа на всех устройствах
- ⚡ **Быстрая загрузка** — оптимизированная производительность

---

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** версии 18.0 или выше
- **npm** версии 9.0 или выше (или **yarn** / **pnpm**)

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/tihshkel/vipgate.git
   cd vipgate
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Запустите проект в режиме разработки**
   ```bash
   npm run dev
   ```

4. **Откройте в браузере**
   
   Перейдите по адресу, который будет показан в терминале (обычно `http://localhost:5173`)

---

## 📦 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск сервера разработки с hot-reload |
| `npm run build` | Создание production сборки |
| `npm run preview` | Предпросмотр production сборки локально |

---

## 🏗️ Структура проекта

```
VIPGATE/
├── 📁 public/                 # Статические файлы
│   └── favicon.svg
│
├── 📁 src/
│   ├── 📁 assets/            # Изображения, иконки, SVG
│   │   ├── icons/           # Иконки приложения
│   │   ├── burger-menu/     # Иконки меню
│   │   └── ...
│   │
│   ├── 📁 components/       # React компоненты
│   │   ├── 📁 layout/       # Компоненты макета
│   │   │   ├── Header.jsx   # Шапка сайта с навигацией
│   │   │   └── Footer.jsx   # Подвал сайта
│   │   │
│   │   ├── 📁 sections/     # Секции главной страницы
│   │   │   ├── Hero.jsx              # Главная секция
│   │   │   ├── VIPServices.jsx       # VIP-сервисы
│   │   │   ├── PopularAirports.jsx   # Популярные аэропорты
│   │   │   ├── HowItWorks.jsx        # Как это работает
│   │   │   ├── TravelWithoutQueues.jsx # Путешествие без очередей
│   │   │   ├── LoyaltyProgram.jsx     # Программа лояльности
│   │   │   └── AboutUs.jsx           # О нас
│   │   │
│   │   └── 📁 ui/           # UI компоненты
│   │       ├── SearchBar.jsx # Поисковая строка
│   │       └── Icons.jsx     # Компонент иконок
│   │
│   ├── 📁 pages/            # Страницы приложения
│   │   ├── 📁 Home/         # Главная страница
│   │   ├── 📁 Auth/         # Авторизация
│   │   ├── 📁 FastTrack/    # Страница Fast Track
│   │   └── 📁 Account/      # Личный кабинет
│   │
│   ├── 📁 layouts/          # Макеты страниц
│   │   └── MainLayout.jsx   # Основной макет
│   │
│   ├── App.jsx              # Главный компонент приложения
│   ├── main.jsx             # Точка входа
│   └── index.css            # Глобальные стили
│
├── 📄 package.json          # Зависимости и скрипты
├── 📄 vite.config.js        # Конфигурация Vite
├── 📄 tailwind.config.js     # Конфигурация Tailwind CSS
└── 📄 README.md             # Документация
```

---

## 🛠️ Технологии

### Основной стек

- **[React 18.2](https://react.dev/)** — библиотека для создания пользовательских интерфейсов
- **[Vite 5.0](https://vitejs.dev/)** — быстрый сборщик и dev-сервер
- **[React Router DOM 7.10](https://reactrouter.com/)** — маршрутизация в React приложении
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** — utility-first CSS фреймворк

### Инструменты разработки

- **PostCSS** — обработка CSS
- **Autoprefixer** — автоматическое добавление префиксов
- **TypeScript типы** — типизация для React

---

## ✨ Особенности

### 🎨 Дизайн

- ✅ **Pixel-perfect** копия оригинального дизайна
- ✅ **Современный UI/UX** с использованием Tailwind CSS
- ✅ **Адаптивная верстка** для всех устройств
- ✅ **Оптимизированные изображения** для быстрой загрузки

### ⚡ Производительность

- ✅ **Быстрая загрузка** благодаря Vite
- ✅ **Code splitting** для оптимизации bundle
- ✅ **Lazy loading** компонентов и изображений
- ✅ **Оптимизация ассетов**

### ♿ Доступность

- ✅ **Семантический HTML**
- ✅ **ARIA атрибуты** для screen readers
- ✅ **Клавиатурная навигация**
- ✅ **WCAG 2.1 AA** соответствие

---

## 📱 Страницы приложения

- **🏠 Главная** (`/`) — обзор сервисов и возможностей
- **🔐 Авторизация** (`/login`) — вход в личный кабинет
- **⚡ Fast Track** (`/fast-track`) — бронирование Fast Track
- **👤 Личный кабинет** (`/account`) — управление профилем и бронированиями

---

## 🎯 Планы развития

- [ ] Интеграция с API для реальных бронирований
- [ ] Многоязычность (i18n)
- [ ] Темная тема
- [ ] PWA поддержка
- [ ] Unit и E2E тесты
- [ ] CI/CD pipeline

---

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Пожалуйста:

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---

## 📄 Лицензия

Этот проект создан в образовательных целях и является копией дизайна сайта [Vipgate.com](https://vipgate.com).

---

## 👨‍💻 Автор

**tihshkel**

- GitHub: [@tihshkel](https://github.com/tihshkel)
- Email: tihshkle@gmail.com

---

## 🙏 Благодарности

- [Vipgate.com](https://vipgate.com) за оригинальный дизайн
- Сообщество React и Vite за отличные инструменты
- Tailwind CSS за прекрасный фреймворк

---

<div align="center">

**Сделано с ❤️ используя React и Tailwind CSS**

⭐ Если проект был полезен, поставьте звезду!

</div>
