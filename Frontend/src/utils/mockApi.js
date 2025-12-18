// Моки API для разработки без бэкенда

// Имитация задержки сети
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Хранилище моковых данных
const mockStorage = {
  codes: {}, // email -> code
  attempts: {}, // email -> attempts count
}

// Генерация случайного 6-значного кода
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Мок отправки кода
export const mockSendCode = async (email) => {
  await delay(800) // Имитация задержки сети
  
  // Генерируем код
  const code = generateCode()
  
  // Сохраняем код (симулируем хранение на сервере)
  mockStorage.codes[email] = {
    code,
    createdAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 минут
    attempts: 0,
  }
  
  // Выводим код в консоль для удобства разработки
  console.log('%c🔐 КОД ВЕРИФИКАЦИИ (МОК):', 'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;')
  console.log(`Email: ${email}`)
  console.log(`Код: ${code}`)
  console.log('%cЭтот код можно использовать для входа', 'color: #666; font-size: 12px;')
  
  return {
    ok: true,
    status: 200,
    json: async () => ({
      message: 'Код верификации отправлен на ваш email',
      email: email
    })
  }
}

// Мок проверки кода
export const mockVerifyCode = async (email, enteredCode) => {
  await delay(500) // Имитация задержки сети
  
  const storedData = mockStorage.codes[email]
  
  // Код не найден или истек
  if (!storedData) {
    return {
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Код верификации не найден или истек. Запросите новый код.',
        error_type: 'expired'
      })
    }
  }
  
  // Проверка срока действия
  if (Date.now() > storedData.expiresAt) {
    delete mockStorage.codes[email]
    return {
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Срок действия кода истёк. Запросите новый и попробуйте ещё раз',
        error_type: 'expired'
      })
    }
  }
  
  // Проверка количества попыток
  if (storedData.attempts >= 5) {
    delete mockStorage.codes[email]
    return {
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Превышено количество попыток. Запросите новый код.',
        error_type: 'expired'
      })
    }
  }
  
  // Проверка кода
  if (storedData.code === enteredCode) {
    // Код верный
    delete mockStorage.codes[email]
    return {
      ok: true,
      status: 200,
      json: async () => ({
        message: 'Email адрес подтвержден',
        verified: true
      })
    }
  } else {
    // Код неверный
    storedData.attempts++
    const remainingAttempts = 5 - storedData.attempts
    
    return {
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Неверный код. Попробуйте ещё раз',
        error_type: 'invalid_code',
        remaining_attempts: remainingAttempts
      })
    }
  }
}





