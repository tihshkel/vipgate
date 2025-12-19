# Конфигурация API - Переключение между localhost и продакшен сервером

## Как переключаться между режимами

Откройте файл `Frontend/src/config/api.js` и измените значение `USE_LOCALHOST`:

### Для разработки (localhost):
```javascript
const USE_LOCALHOST = true  // ← Используется http://localhost:8000
```

### Для продакшена (сервер):
```javascript
const USE_LOCALHOST = false  // ← Используется http://109.73.198.109:8000
```

## Дополнительные настройки

### Переключение между mock и реальным API:
```javascript
const USE_MOCK = false  // false = реальный API, true = mock данные
```

### Использование переменной окружения:
Если установлена переменная окружения `VITE_API_BASE_URL`, она будет использоваться вместо переключателя `USE_LOCALHOST`.

## Примеры использования в коде

Все API вызовы теперь используют конфигурацию:

```javascript
import { getApiUrl, API_CONFIG } from '../config/api'

// Получить URL для эндпоинта
const url = getApiUrl(API_CONFIG.ENDPOINTS.GET_PROFILE)

// Или напрямую использовать BASE_URL
const fullUrl = `${API_CONFIG.BASE_URL}/api/auth/profile/`
```

## Доступные эндпоинты

- `API_CONFIG.ENDPOINTS.SEND_CODE` - отправка кода верификации
- `API_CONFIG.ENDPOINTS.VERIFY_CODE` - проверка кода
- `API_CONFIG.ENDPOINTS.GET_PROFILE` - получение профиля
- `API_CONFIG.ENDPOINTS.UPDATE_PROFILE` - обновление профиля
- `API_CONFIG.ENDPOINTS.UPLOAD_PHOTO` - загрузка фото профиля

