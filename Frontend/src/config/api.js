// Конфигурация API
// Для разработки без бэкенда используйте MOCK_MODE = true

export const API_CONFIG = {
  // Режим моков (true - использовать заглушки, false - реальный API)
  // По умолчанию используем моки для удобства разработки
  MOCK_MODE: import.meta.env.VITE_USE_MOCK_API !== 'false',
  
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

