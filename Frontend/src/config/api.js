// Конфигурация API
// ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ:
// true = работа БЕЗ бэкенда (mock данные)
// false = работа С бэкендом (реальный API)

const USE_MOCK = true  // ← ИЗМЕНИТЕ НА false ДЛЯ РАБОТЫ С БЭКЕНДОМ

export const API_CONFIG = {
  MOCK_MODE: USE_MOCK,
  
  // URL бэкенда
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // Эндпоинты
  ENDPOINTS: {
    SEND_CODE: '/api/auth/send-code/',
    VERIFY_CODE: '/api/auth/verify-code/',
  }
}

// Получить полный URL для эндпоинта
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

