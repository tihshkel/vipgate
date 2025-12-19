// Конфигурация API
// ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ:
// USE_MOCK: true = работа БЕЗ бэкенда (mock данные), false = работа С бэкендом (реальный API)
// USE_LOCALHOST: true = localhost для разработки, false = продакшен сервер (109.73.198.109)

const USE_MOCK = false  // ← ИЗМЕНИТЕ НА false ДЛЯ РАБОТЫ С БЭКЕНДОМ
const USE_LOCALHOST = false  // ← ИЗМЕНИТЕ НА false ДЛЯ РАБОТЫ С ПРОДАКШЕН СЕРВЕРОМ

// Определение BASE_URL на основе режима
const getBaseUrl = () => {
  // Если указана переменная окружения, используем её
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  
  // Иначе используем переключатель USE_LOCALHOST
  if (USE_LOCALHOST) {
    return 'http://localhost:8000'
  } else {
    // В продакшене используем nginx на порту 80 (без указания порта)
    return 'http://109.73.198.109'
  }
}

export const API_CONFIG = {
  MOCK_MODE: USE_MOCK,
  USE_LOCALHOST: USE_LOCALHOST,
  
  // URL бэкенда
  BASE_URL: getBaseUrl(),
  
  // Эндпоинты
  ENDPOINTS: {
    SEND_CODE: '/api/auth/send-code/',
    VERIFY_CODE: '/api/auth/verify-code/',
    GET_PROFILE: '/api/auth/profile/',
    UPDATE_PROFILE: '/api/auth/profile/update/',
    UPLOAD_PHOTO: '/api/auth/profile/upload-photo/',
  }
}

// Получить полный URL для эндпоинта
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

