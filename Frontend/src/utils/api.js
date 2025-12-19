// Универсальный API клиент с поддержкой моков

import { API_CONFIG, getApiUrl } from '../config/api'
import { mockSendCode, mockVerifyCode } from './mockApi'

// Обертка для fetch с поддержкой моков
export const apiRequest = async (endpoint, options = {}) => {
  if (API_CONFIG.MOCK_MODE) {
    // Используем моки
    console.log(`[MOCK API] ${options.method || 'GET'} ${endpoint}`)
    
    if (endpoint === API_CONFIG.ENDPOINTS.SEND_CODE && options.method === 'POST') {
      const body = JSON.parse(options.body || '{}')
      return mockSendCode(body.email)
    }
    
    if (endpoint === API_CONFIG.ENDPOINTS.VERIFY_CODE && options.method === 'POST') {
      const body = JSON.parse(options.body || '{}')
      return mockVerifyCode(body.email, body.code)
    }
    
    // Если мок не найден, возвращаем ошибку
    return {
      ok: false,
      status: 404,
      json: async () => ({ error: 'Mock endpoint not found' })
    }
  } else {
    // Используем реальный API
    const url = getApiUrl(endpoint)
    console.log('[API Request]', options.method || 'GET', url, options)
    return fetch(url, options)
  }
}

// Удобные функции для конкретных эндпоинтов
export const sendVerificationCode = async (email) => {
  return apiRequest(API_CONFIG.ENDPOINTS.SEND_CODE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
}

export const verifyCode = async (email, code) => {
  return apiRequest(API_CONFIG.ENDPOINTS.VERIFY_CODE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  })
}










