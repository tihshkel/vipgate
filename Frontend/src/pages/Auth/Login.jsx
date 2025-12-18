import React, { useState, useEffect, useRef } from 'react'
import { RussianFlagIcon, QuestionIcon, ChatIcon, DownloadIcon } from '../../components/ui/Icons'
import { sendVerificationCode, verifyCode } from '../../utils/api'
import LoginIconSvg from '../../assets/icons/login-icon.svg'
import GoogleIconSvg from '../../assets/icons/Icon/Social/Google.svg'
import AppleIconSvg from '../../assets/icons/Icon/Social/Apple.svg'
import BurgerMenuIcon from '../../assets/icons/burbermenu-icon.svg'
import LoginIconHeader from '../../assets/icons/Icon/Main/40/LogIn.svg'
import DownloadMenuIcon from '../../assets/burger-menu/dowanload.svg'
import InfoMenuIcon from '../../assets/burger-menu/info.svg'
import ChatMenuIcon from '../../assets/burger-menu/chat.svg'
import CookieIcon from '../../assets/burger-menu/cookie.svg'
import DocsIcon from '../../assets/burger-menu/docs.svg'
import Docs2Icon from '../../assets/burger-menu/docs2.svg'

const Login = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [showCodeVerification, setShowCodeVerification] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [focusedCodeIndex, setFocusedCodeIndex] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const emailInputRef = useRef(null)
  const codeInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [codeErrorType, setCodeErrorType] = useState(null) // 'invalid_code' или 'expired'
  const [sendCodeError, setSendCodeError] = useState(null) // Ошибка отправки кода
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false) // Отправка кода в фоне
  const countdownIntervalRef = useRef(null)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value.length > 0) {
      setEmailError(!validateEmail(value))
    } else {
      setEmailError(false)
    }
  }

  const handleEmailBlur = () => {
    setIsFocused(false)
    if (email.length > 0) {
      setEmailError(!validateEmail(email))
    }
  }

  const showLabel = isFocused || email.length > 0
  const isEmailValid = email.length > 0 && !emailError && validateEmail(email)

  // Автофокус на поле email при открытии страницы логина
  useEffect(() => {
    if (!showCodeVerification && emailInputRef.current) {
      // Небольшая задержка для обеспечения корректного рендеринга
      setTimeout(() => {
        emailInputRef.current?.focus()
      }, 100)
    }
  }, [showCodeVerification])

  // Таймер для повторной отправки кода
  useEffect(() => {
    if (showCodeVerification && countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [showCodeVerification, countdown])

  const handleContinue = async () => {
    if (isEmailValid) {
      // Сразу переходим на страницу ввода кода для лучшего UX
      setShowCodeVerification(true)
      setCountdown(60)
      setCanResend(false)
      setFocusedCodeIndex(0)
      setCodeError(false)
      setCodeErrorType(null)
      setSendCodeError(null)
      setIsSendingCode(true)
      
      // Фокусируемся на первой ячейке после небольшой задержки
      setTimeout(() => {
        codeInputRefs[0]?.current?.focus()
      }, 100)

      // Отправляем код асинхронно в фоне
      try {
        const response = await sendVerificationCode(email)

        const data = await response.json()

        if (!response.ok) {
          // Ошибка при отправке кода - показываем на странице ввода
          setSendCodeError(data.error || 'Ошибка при отправке кода верификации')
        }
      } catch (error) {
        console.error('Error sending verification code:', error)
        setSendCodeError('Ошибка при отправке кода верификации. Проверьте подключение к серверу.')
      } finally {
        setIsSendingCode(false)
      }
    }
  }

  const handleCodeChange = (index, value) => {
    // Разрешаем только цифры и только один символ
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 1)
    if (numericValue.length > 1) return
    
    // Сбрасываем ошибку при изменении кода
    if (codeError) {
      setCodeError(false)
      setCodeErrorType(null)
    }
    
    const newCode = [...code]
    newCode[index] = numericValue
    setCode(newCode)

    // Автоматический переход к следующему полю
    if (numericValue && index < 5) {
      setFocusedCodeIndex(index + 1)
      codeInputRefs[index + 1]?.current?.focus()
    }
  }

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setFocusedCodeIndex(index - 1)
      codeInputRefs[index - 1]?.current?.focus()
    }
  }

  const handleCodeFocus = (index) => {
    setFocusedCodeIndex(index)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newCode = [...code]
    pastedData.split('').forEach((char, i) => {
      if (i < 6 && /^\d$/.test(char)) {
        newCode[i] = char
      }
    })
    setCode(newCode)
    const nextEmptyIndex = newCode.findIndex(val => !val)
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      codeInputRefs[nextEmptyIndex]?.current?.focus()
    } else if (nextEmptyIndex === -1) {
      codeInputRefs[5]?.current?.blur()
    }
  }

  const handleResendCode = async () => {
    setIsSendingCode(true)
    setSendCodeError(null)
    setCodeError(false)
    setCodeErrorType(null)
    
      try {
        const response = await sendVerificationCode(email)

      const data = await response.json()

      if (response.ok) {
        setCountdown(60)
        setCanResend(false)
        setCode(['', '', '', '', '', ''])
        setTimeout(() => {
          codeInputRefs[0]?.current?.focus()
        }, 100)
      } else {
        setSendCodeError(data.error || 'Ошибка при повторной отправке кода')
      }
    } catch (error) {
      console.error('Error resending verification code:', error)
      setSendCodeError('Ошибка при повторной отправке кода')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleBackToLogin = () => {
    setShowCodeVerification(false)
    setCode(['', '', '', '', '', ''])
    setCountdown(60)
    setCanResend(false)
    setCodeError(false)
    setCodeErrorType(null)
    setSendCodeError(null)
    setIsSendingCode(false)
  }

  const handleConfirmCode = async () => {
    if (isCodeComplete) {
      setIsLoading(true)
      const enteredCode = code.join('')
      
      try {
        // Отправляем запрос на проверку кода
        const response = await verifyCode(email, enteredCode)

        const data = await response.json()

        if (response.ok && data.verified) {
          // Код правильный, переходим дальше
          setCodeError(false)
          setCodeErrorType(null)
          // Вызываем колбэк успешной авторизации с email пользователя
          if (onLoginSuccess) {
            onLoginSuccess(email)
          }
        } else {
          // Получаем тип ошибки от сервера
          const errorType = data.error_type || 'invalid_code'
          setCodeError(true)
          setCodeErrorType(errorType)
          
          // Если код истек, не очищаем поля ввода
          if (errorType === 'expired') {
            // Не очищаем код, чтобы пользователь мог увидеть, что он ввел
          } else {
            // Очищаем код для повторного ввода при неверном коде
            setCode(['', '', '', '', '', ''])
            setTimeout(() => {
              codeInputRefs[0]?.current?.focus()
            }, 100)
          }
        }
      } catch (error) {
        console.error('Error verifying code:', error)
        // При сетевой ошибке показываем общую ошибку
        setCodeError(true)
        setCodeErrorType('expired')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isCodeComplete = code.every(digit => digit !== '')

  // Если показываем страницу подтверждения кода
  if (showCodeVerification) {
    return (
      <div className="min-h-screen bg-white">
        {/* Хедер */}
        <header className="bg-vip-blue text-white px-4 md:px-8 py-4">
          <div className="container mx-auto">
            {/* Мобильная версия */}
            <div className="lg:hidden">
              {/* Верхняя строка - Логотип и иконки */}
              <div className="flex items-center justify-between">
                {/* Логотип */}
                <div className="text-base sm:text-lg font-bold">Vipgate.com</div>

                {/* Правая часть - Иконки входа и бургер-меню */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Войти"
                    tabIndex={0}
                  >
                    <img src={LoginIconHeader} alt="Войти" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Меню"
                    tabIndex={0}
                  >
                    <img src={BurgerMenuIcon} alt="Меню" className="w-10 h-10" />
                  </button>
                </div>
              </div>
            </div>

            {/* Десктопная версия */}
            <div className="hidden lg:flex items-center justify-between">
              <div className="text-xl md:text-2xl font-bold">Vipgate.com</div>
              <div className="flex items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <RussianFlagIcon className="w-8 h-6" />
                </div>
                <button 
                  className="w-5 h-5 flex items-center justify-center"
                  aria-label="Помощь"
                  tabIndex={0}
                >
                  <QuestionIcon className="w-5 h-5" />
                </button>
                <button 
                  className="w-5 h-5 flex items-center justify-center"
                  aria-label="Чат"
                  tabIndex={0}
                >
                  <ChatIcon className="w-5 h-5" />
                </button>
                <button 
                  className="bg-vip-blue border border-white text-white px-3 md:px-5 py-2 rounded text-xs md:text-sm font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors whitespace-nowrap"
                  tabIndex={0}
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Скачать приложение</span>
                  <span className="md:hidden">Скачать</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <div className="container mx-auto px-4 md:px-8 py-8 max-w-md mx-auto">
          {/* Заголовок */}
          <h1 className="text-left mb-3 font-bold text-vip-blue" style={{ fontSize: '22px' }}>
            Подтвердите адрес электронной почты, чтобы войти
          </h1>
          
          {/* Текст инструкции */}
          <p className="text-left mb-8 text-gray-600" style={{ fontSize: '14px' }}>
            {isSendingCode ? (
              <>Отправка кода на {email}...<br />Пожалуйста, подождите</>
            ) : (
              <>Мы отправили проверочный код на {email}<br />Введите код, чтобы продолжить</>
            )}
          </p>

          {/* Сообщение об ошибке отправки кода */}
          {sendCodeError && (
            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}>
              <p className="text-left" style={{ color: '#D62828', fontSize: '14px' }}>
                {sendCodeError}
              </p>
              <button
                onClick={handleBackToLogin}
                className="text-left mt-2 underline text-sm"
                style={{ color: '#D62828' }}
              >
                Вернуться назад
              </button>
            </div>
          )}

          {/* Поля ввода кода */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 md:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={codeInputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  onFocus={() => handleCodeFocus(index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-bold border-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    borderColor: codeError ? '#D62828' : (digit ? '#12A156' : (focusedCodeIndex === index ? '#3A78FE' : '#D1D5DB')),
                    backgroundColor: '#FFFFFF',
                    color: '#002C6E'
                  }}
                  tabIndex={0}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Сообщение о подтверждении */}
          {isCodeComplete && !codeError && (
            <p className="text-left mb-4" style={{ color: '#12A156', fontSize: '14px' }}>
              Электронный адрес подтвержден
            </p>
          )}

          {/* Сообщение об ошибке */}
          {codeError && (
            <p className="text-left mb-4" style={{ color: '#D62828', fontSize: '14px' }}>
              {codeErrorType === 'expired' 
                ? 'Срок действия кода истёк. Запросите новый и попробуйте ещё раз'
                : 'Пароли не совпадают'}
            </p>
          )}

          {/* Кнопка "Подтвердить адрес" */}
          <button
            onClick={handleConfirmCode}
            className="w-full py-4 rounded-lg text-base font-medium mb-6 transition-all duration-300"
            style={{
              backgroundColor: isCodeComplete && !isLoading && !isSendingCode ? '#0746A7' : '#ECEFF6',
              color: isCodeComplete && !isLoading && !isSendingCode ? '#FFFFFF' : '#9AA5BB'
            }}
            disabled={!isCodeComplete || isLoading || isSendingCode}
            tabIndex={0}
          >
            {isLoading ? 'Проверка...' : isSendingCode ? 'Отправка кода...' : 'Подтвердить адрес'}
          </button>

          {/* Сообщение о повторной отправке */}
          <p className="text-center mb-6 text-gray-600 text-sm">
            Не получили электронное письмо? Пожалуйста, проверьте папку со спамом или{' '}
            {isSendingCode ? (
              <span className="text-gray-400">отправка...</span>
            ) : canResend ? (
              <button
                onClick={handleResendCode}
                className="text-vip-blue underline font-medium"
                disabled={isSendingCode}
                tabIndex={0}
              >
                запросите другой код
              </button>
            ) : (
              <span>запросите другой код через {countdown} секунд</span>
            )}
          </p>

          {/* Ссылка "Вернуться на страницу входа" */}
          <div className="text-center mb-8">
            <button
              onClick={handleBackToLogin}
              className="text-vip-blue underline text-sm md:text-base"
              tabIndex={0}
            >
              Вернуться на страницу входа
            </button>
          </div>

          {/* Разделитель */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Текст согласия */}
          <p className="text-center mb-4 text-gray-600 text-xs md:text-sm">
            Входя в аккаунт или создавая новый, вы соглашаетесь с нашими{' '}
            <a href="#" className="text-vip-blue underline font-medium">Правилами и условиями</a>
            {' '}и{' '}
            <a href="#" className="text-vip-blue underline font-medium">Положением о конфиденциальности</a>
          </p>

          {/* Копирайт */}
          <p className="text-center text-gray-600 text-xs">
            2026. Все права защищены
          </p>
        </div>

        {/* Мобильное меню */}
        {showMobileMenu && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <div className="fixed inset-0 h-full w-full bg-white z-50 lg:hidden overflow-y-auto">
              <div className="p-6">
                {/* Заголовок меню */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-vip-blue">Еще</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="text-gray-600 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center"
                    tabIndex={0}
                    aria-label="Закрыть меню"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Список пунктов меню */}
                <div className="space-y-1">
                  {/* Валюта */}
                  <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                    <span className="text-base">RUB Российский рубль</span>
                  </div>

                  {/* Язык */}
                  <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                    <RussianFlagIcon className="w-6 h-6" />
                    <span className="text-base">Россия</span>
                  </div>

                  {/* Скачать приложение */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                  >
                    <img src={DownloadMenuIcon} alt="Скачать" className="w-6 h-6" />
                    <span className="text-base">Скачать приложение</span>
                  </button>

                  {/* Служба поддержки */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                    aria-label="Служба поддержки"
                  >
                    <img src={InfoMenuIcon} alt="Поддержка" className="w-6 h-6" />
                    <span className="text-base">Служба поддержки</span>
                  </button>

                  {/* Контакты */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                    aria-label="Контакты"
                  >
                    <img src={ChatMenuIcon} alt="Контакты" className="w-6 h-6" />
                    <span className="text-base">Контакты</span>
                  </button>

                  {/* Конфиденциальность и cookies */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                    aria-label="Конфиденциальность и cookies"
                  >
                    <img src={CookieIcon} alt="Cookies" className="w-6 h-6" />
                    <span className="text-base">Конфиденциальность и cookies</span>
                  </button>

                  {/* Условия использования */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                    aria-label="Условия использования"
                  >
                    <img src={DocsIcon} alt="Условия" className="w-6 h-6" />
                    <span className="text-base">Условия использования</span>
                  </button>

                  {/* Юридическая информация */}
                  <button
                    className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                    tabIndex={0}
                    aria-label="Юридическая информация"
                  >
                    <img src={Docs2Icon} alt="Юридическая информация" className="w-6 h-6" />
                    <span className="text-base">Юридическая информация</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Хедер */}
      <header className="bg-vip-blue text-white px-4 md:px-8 py-4">
        <div className="container mx-auto">
          {/* Мобильная версия */}
          <div className="lg:hidden">
            {/* Верхняя строка - Логотип и иконки */}
            <div className="flex items-center justify-between">
              {/* Логотип */}
              <div className="text-base sm:text-lg font-bold">Vipgate.com</div>

              {/* Правая часть - Иконки входа и бургер-меню */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Войти"
                  tabIndex={0}
                >
                  <img src={LoginIconHeader} alt="Войти" className="w-10 h-10" />
                </button>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Меню"
                  tabIndex={0}
                >
                  <img src={BurgerMenuIcon} alt="Меню" className="w-10 h-10" />
                </button>
              </div>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="text-xl md:text-2xl font-bold">Vipgate.com</div>
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2 text-sm">
                <RussianFlagIcon className="w-8 h-6" />
              </div>
              <button 
                className="w-5 h-5 flex items-center justify-center"
                aria-label="Помощь"
                tabIndex={0}
              >
                <QuestionIcon className="w-5 h-5" />
              </button>
              <button 
                className="w-5 h-5 flex items-center justify-center"
                aria-label="Чат"
                tabIndex={0}
              >
                <ChatIcon className="w-5 h-5" />
              </button>
              <button 
                className="bg-vip-blue border border-white text-white px-3 md:px-5 py-2 rounded text-xs md:text-sm font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors whitespace-nowrap"
                tabIndex={0}
              >
                <DownloadIcon className="w-4 h-4" />
                <span className="hidden md:inline">Скачать приложение</span>
                <span className="md:hidden">Скачать</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Кнопка "Вернуться назад" */}
      <div className="container mx-auto px-4 md:px-8 pt-4">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-vip-blue hover:underline mb-6"
          tabIndex={0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Вернуться назад</span>
        </button>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-md mx-auto">
        {/* Заголовок */}
        <h1 className="text-left mb-3 font-bold text-vip-blue text-2xl">
          Войдите или создайте аккаунт
        </h1>
        
        {/* Текст инструкции */}
        <p className="text-left mb-8 text-vip-blue">
          Чтобы получить доступ к нашим сервисам, войдите, используя данные своего аккаунта на Vipgate.com
        </p>

        {/* Поле ввода email */}
        <div className="mb-6">
          <div className="relative">
            {showLabel && (
              <label
                className="absolute left-4 px-2.5 bg-white text-xs transition-all duration-300 pointer-events-none z-10"
                style={{ 
                  color: emailError ? '#D62828' : '#809DCA',
                  top: '-0.5rem'
                }}
              >
                Введите почту
              </label>
            )}
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleEmailBlur}
              placeholder={showLabel ? '' : 'Введите электронный адрес'}
              className="w-full pl-12 pr-4 py-4 border-2 rounded-lg text-base bg-white focus:outline-none transition-all"
              style={{ 
                borderColor: emailError ? '#D62828' : '#3A78FE',
                paddingTop: showLabel ? '1rem' : '1rem',
                paddingBottom: showLabel ? '0.5rem' : '1rem'
              }}
              tabIndex={0}
            />
            <img 
              src={LoginIconSvg} 
              alt="Email" 
              className="absolute left-4 w-5 h-5 transition-all duration-300"
              style={{ 
                top: showLabel ? '1.25rem' : '50%',
                transform: showLabel ? 'none' : 'translateY(-50%)'
              }}
            />
          </div>
          {emailError && (
            <p className="text-sm text-[#D62828] mt-2">Проверьте правильность ввода</p>
          )}
        </div>

        {/* Кнопка "Продолжить через электронную почту" */}
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-lg text-base font-medium mb-6 transition-all duration-300"
          style={{
            backgroundColor: isEmailValid && !isLoading ? '#0746A7' : '#ECEFF6',
            color: isEmailValid && !isLoading ? '#FFFFFF' : '#9AA5BB'
          }}
          disabled={!isEmailValid || isLoading}
          tabIndex={0}
        >
          {isLoading ? 'Отправка...' : 'Продолжить через электронную почту'}
        </button>

        {/* Разделитель */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">или</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Иконки социальных сетей */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
            tabIndex={0}
            aria-label="Войти через Google"
          >
            <img src={GoogleIconSvg} alt="Google" className="w-10 h-10" />
          </button>
          <button
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
            tabIndex={0}
            aria-label="Войти через Apple"
          >
            <img src={AppleIconSvg} alt="Apple" className="w-10 h-10" />
          </button>
        </div>

        {/* Текст согласия */}
        <p className="text-center mb-8 text-vip-blue text-sm">
          Входя в аккаунт или создавая новый, вы соглашаетесь с нашими{' '}
          <a href="#" className="underline font-medium">Правилами и условиями</a>
          {' '}и{' '}
          <a href="#" className="underline font-medium">Положением о конфиденциальности</a>
        </p>

        {/* Копирайт */}
        <p className="text-center text-vip-blue text-sm">
          2026. Все права защищены
        </p>
      </div>

      {/* Мобильное меню */}
      {showMobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Заголовок меню */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-vip-blue">Еще</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center"
                  tabIndex={0}
                  aria-label="Закрыть меню"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Список пунктов меню */}
              <div className="space-y-1">
                {/* Валюта */}
                <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                  <span className="text-base">RUB Российский рубль</span>
                </div>

                {/* Язык */}
                <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                  <RussianFlagIcon className="w-6 h-6" />
                  <span className="text-base">Россия</span>
                </div>

                {/* Скачать приложение */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={DownloadMenuIcon} alt="Скачать" className="w-6 h-6" />
                  <span className="text-base">Скачать приложение</span>
                </button>

                {/* Служба поддержки */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                  aria-label="Служба поддержки"
                >
                  <img src={InfoMenuIcon} alt="Поддержка" className="w-6 h-6" />
                  <span className="text-base">Служба поддержки</span>
                </button>

                {/* Контакты */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                  aria-label="Контакты"
                >
                  <img src={ChatMenuIcon} alt="Контакты" className="w-6 h-6" />
                  <span className="text-base">Контакты</span>
                </button>

                {/* Конфиденциальность и cookies */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                  aria-label="Конфиденциальность и cookies"
                >
                  <img src={CookieIcon} alt="Cookies" className="w-6 h-6" />
                  <span className="text-base">Конфиденциальность и cookies</span>
                </button>

                {/* Условия использования */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                  aria-label="Условия использования"
                >
                  <img src={DocsIcon} alt="Условия" className="w-6 h-6" />
                  <span className="text-base">Условия использования</span>
                </button>

                {/* Юридическая информация */}
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                  aria-label="Юридическая информация"
                >
                  <img src={Docs2Icon} alt="Юридическая информация" className="w-6 h-6" />
                  <span className="text-base">Юридическая информация</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Login
