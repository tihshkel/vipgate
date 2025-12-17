import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FastTrackIcon, ChairIcon, CarIcon, PeopleIcon, RussianFlagIcon, QuestionIcon, ChatIcon, DownloadIcon } from '../ui/Icons'
import QRCodeImage from '../../assets/icons/QR Code.jpg'
import GooglePlayImage from '../../assets/icons/Icon/Social/Google Play.jpg'
import AppGalleryImage from '../../assets/icons/Icon/Social/AppGallery.jpg'
import AppleImage from '../../assets/icons/Icon/Social/Apple.jpg'
import InfoIcon from '../../assets/icons/info2-icon.svg'
import BurgerMenuIcon from '../../assets/icons/burbermenu-icon.svg'
import LoginIcon from '../../assets/icons/Icon/Main/40/LogIn.svg'
import DownloadMenuIcon from '../../assets/burger-menu/dowanload.svg'
import InfoMenuIcon from '../../assets/burger-menu/info.svg'
import ChatMenuIcon from '../../assets/burger-menu/chat.svg'
import CookieIcon from '../../assets/burger-menu/cookie.svg'
import DocsIcon from '../../assets/burger-menu/docs.svg'
import Docs2Icon from '../../assets/burger-menu/docs2.svg'
import PersonalDataIcon from '../../assets/icons/welcome/Icon/Main/40/personal-data.svg'
import CaseIcon from '../../assets/icons/welcome/Icon/Main/40/case.svg'
import DocsIconMain from '../../assets/icons/welcome/Icon/Main/40/docs.svg'
import WalletIcon from '../../assets/icons/welcome/Icon/Main/40/wallet.svg'
import ReviewIcon from '../../assets/icons/welcome/Icon/Main/40/review.svg'
import FavoriteIcon from '../../assets/icons/welcome/Icon/Main/40/favorite.svg'
import OutIcon from '../../assets/icons/Icon/Main/24/Out.svg'

const Header = ({ onLoginClick, isLoggedIn, userEmail, onLogout, userPhoto }) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currencySearchQuery, setCurrencySearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('Русский')
  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'RUB', name: 'Российский рубль', flag: '🇷🇺' })
  const [savedPhoto, setSavedPhoto] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('personalData')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.photo) setSavedPhoto(data.photo)
      } catch (e) {}
    }
  }, [])

  const displayPhoto = userPhoto || savedPhoto

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' }
  ]

  const currencies = [
    { code: 'RUB', name: 'Российский рубль', flag: '🇷🇺' },
    { code: 'USD', name: 'Доллар США', flag: '🇺🇸' },
    { code: 'KRW', name: 'Корейская вона', flag: '🇰🇷' },
    { code: 'VND', name: 'Вьетнамский донг', flag: '🇻🇳' },
    { code: 'EUR', name: 'Евро', flag: '🇪🇺' },
    { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧' },
    { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳' },
    { code: 'JPY', name: 'Японская иена', flag: '🇯🇵' },
    { code: 'AUD', name: 'Австралийский доллар', flag: '🇦🇺' },
    { code: 'CAD', name: 'Канадский доллар', flag: '🇨🇦' },
    { code: 'CHF', name: 'Швейцарский франк', flag: '🇨🇭' },
    { code: 'SGD', name: 'Сингапурский доллар', flag: '🇸🇬' },
    { code: 'HKD', name: 'Гонконгский доллар', flag: '🇭🇰' },
    { code: 'NZD', name: 'Новозеландский доллар', flag: '🇳🇿' },
    { code: 'SEK', name: 'Шведская крона', flag: '🇸🇪' },
    { code: 'NOK', name: 'Норвежская крона', flag: '🇳🇴' },
    { code: 'DKK', name: 'Датская крона', flag: '🇩🇰' },
    { code: 'PLN', name: 'Польский злотый', flag: '🇵🇱' },
    { code: 'TRY', name: 'Турецкая лира', flag: '🇹🇷' },
    { code: 'THB', name: 'Тайский бат', flag: '🇹🇭' },
    { code: 'MYR', name: 'Малайзийский ринггит', flag: '🇲🇾' },
    { code: 'IDR', name: 'Индонезийская рупия', flag: '🇮🇩' },
    { code: 'INR', name: 'Индийская рупия', flag: '🇮🇳' },
    { code: 'AED', name: 'Дирхам ОАЭ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Саудовский риял', flag: '🇸🇦' }
  ]

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(currencySearchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(currencySearchQuery.toLowerCase())
  )

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name)
    setShowLanguageModal(false)
    setSearchQuery('')
  }

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency)
    setShowCurrencyModal(false)
    setCurrencySearchQuery('')
  }

  return (
    <header className="bg-vip-blue text-white px-4 md:px-8 py-3 md:py-4 sticky top-0 z-[60]">
      <div className="container mx-auto max-w-[1440px]">
        {/* Мобильная версия */}
        <div className="lg:hidden">
          {/* Верхняя строка - Логотип и иконки */}
          <div className="flex items-center justify-between mb-3">
            {/* Логотип */}
            <Link to="/" className="text-lg sm:text-xl font-bold hover:text-vip-gold transition-colors">Vipgate.com</Link>

            {/* Правая часть - Иконки входа и бургер-меню */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-80 transition-opacity relative"
                    aria-label="Уведомления"
                    tabIndex={0}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <button
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${displayPhoto ? '' : 'bg-vip-yellow'} text-vip-blue font-bold text-base sm:text-lg flex items-center justify-center hover:opacity-90 transition-opacity overflow-hidden`}
                    aria-label="Профиль"
                    tabIndex={0}
                  >
                    {displayPhoto ? (
                      <img src={displayPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      userEmail ? userEmail.charAt(0).toUpperCase() : 'A'
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Войти"
                  tabIndex={0}
                >
                  <img src={LoginIcon} alt="Войти" className="w-9 h-9 sm:w-10 sm:h-10" />
                </button>
              )}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Меню"
                tabIndex={0}
              >
                <img src={BurgerMenuIcon} alt="Меню" className="w-9 h-9 sm:w-10 sm:h-10" />
              </button>
            </div>
          </div>

          {/* Нижняя строка - Fast Track и VIP lounge */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide pb-1">
            <Link to="/fast-track" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
              <FastTrackIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-medium">Fast Track</span>
            </Link>
            <a href="#" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
              <ChairIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-medium">VIP lounge</span>
            </a>
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          {/* Логотип */}
          <Link to="/" className="text-xl md:text-2xl font-bold flex-shrink-0 hover:text-vip-gold transition-colors">Vipgate.com</Link>

          {/* Навигация */}
          <nav className="flex items-center gap-4 xl:gap-8 overflow-x-auto scrollbar-hide">
            <Link to="/fast-track" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap">
              <FastTrackIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span>Fast Track</span>
            </Link>
            <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap">
              <ChairIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span>VIP lounge</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap">
              <CarIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span>Transfer</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap">
              <PeopleIcon className="w-4 h-4 xl:w-5 xl:h-5" />
              <span>Meet & assist</span>
            </a>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-3 xl:gap-6 flex-shrink-0">
          {/* Валюта - скрыта на мобильных */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* Кнопка выбора валюты */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyModal(true)}
                className="flex items-center gap-2 text-sm hover:text-vip-gold transition-colors cursor-pointer"
                tabIndex={0}
                aria-label="Выбрать валюту"
              >
                <span>{selectedCurrency.code}</span>
              </button>
              
              {/* Модальное окно выбора валюты */}
              {showCurrencyModal && (
                <>
                  {/* Затемнение фона */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                      setShowCurrencyModal(false)
                      setCurrencySearchQuery('')
                    }}
                  />
                  
                  {/* Модальное окно */}
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <div
                      className="bg-white rounded-lg shadow-xl w-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Информационный текст */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-xs text-gray-700 leading-relaxed">
                            Там, где это необходимо, цены будут конвертированы и отображены в выбранной вами валюте. Валюта, в которой вы заплатите, зависит от вашего бронирования. Кроме того, может взиматься сервисный сбор.
                          </p>
                        </div>
                      </div>

                      {/* Поле поиска */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                          <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder="Выберите валюту"
                            value={currencySearchQuery}
                            onChange={(e) => setCurrencySearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vip-blue focus:border-transparent text-sm"
                            style={{ color: '#002E75' }}
                            autoFocus
                            tabIndex={0}
                          />
                        </div>
                      </div>

                      {/* Список валют */}
                      <div className="max-h-80 overflow-y-auto">
                        {filteredCurrencies.length > 0 ? (
                          filteredCurrencies.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => handleCurrencySelect(currency)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                              tabIndex={0}
                            >
                              <span className="text-xl">{currency.flag}</span>
                              <span className="text-gray-800 text-sm">{currency.name}, {currency.code}</span>
                              {selectedCurrency.code === currency.code && (
                                <span className="ml-auto text-vip-blue">✓</span>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            Валюта не найдена
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Кнопка выбора языка */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageModal(true)}
                className="flex items-center gap-2 text-sm hover:text-vip-gold transition-colors cursor-pointer"
                tabIndex={0}
                aria-label="Выбрать язык"
              >
                <RussianFlagIcon className="w-5 h-5" />
              </button>
              
              {/* Модальное окно выбора языка */}
              {showLanguageModal && (
                <>
                  {/* Затемнение фона */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                      setShowLanguageModal(false)
                      setSearchQuery('')
                    }}
                  />
                  
                  {/* Модальное окно */}
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <div
                      className="bg-white rounded-lg shadow-xl w-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Поле поиска */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                          <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder="Выберите язык"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vip-blue focus:border-transparent text-sm"
                            style={{ color: '#002E75' }}
                            autoFocus
                            tabIndex={0}
                          />
                        </div>
                      </div>

                      {/* Список языков */}
                      <div className="max-h-80 overflow-y-auto">
                        {filteredLanguages.length > 0 ? (
                          filteredLanguages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => handleLanguageSelect(language)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                              tabIndex={0}
                            >
                              <span className="text-xl">{language.flag}</span>
                              <span className="text-gray-800 text-sm">{language.name}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            Язык не найден
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Иконки */}
          <div className="hidden lg:flex items-center gap-2">
            <button 
              className="hover:text-vip-gold transition-colors w-8 h-8 flex items-center justify-center" 
              aria-label="Помощь"
              tabIndex={0}
            >
              <QuestionIcon className="w-5 h-5" />
            </button>
            <button 
              className="hover:text-vip-gold transition-colors w-8 h-8 flex items-center justify-center" 
              aria-label="Чат"
              tabIndex={0}
            >
              <ChatIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Кнопки */}
          {isLoggedIn ? (
            <>
              {/* Иконка колокольчика */}
              <button 
                className="hover:text-vip-gold transition-colors w-8 h-8 flex items-center justify-center relative"
                aria-label="Уведомления"
                tabIndex={0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              {/* Круглая кнопка с первой буквой и выпадающее меню */}
              <div className="relative">
                <div className="flex flex-col items-center gap-0 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  <button
                    className={`w-10 h-10 rounded-full ${displayPhoto ? '' : 'bg-[#E5E7EB]'} border-2 border-[#FFB700] text-[#002C6E] font-bold text-lg flex items-center justify-center hover:opacity-90 transition-opacity overflow-hidden`}
                    aria-label="Профиль"
                    tabIndex={0}
                  >
                    {displayPhoto ? (
                      <img src={displayPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      userEmail ? userEmail.charAt(0).toUpperCase() : 'A'
                    )}
                  </button>
                  <span className="text-[10px] font-bold mt-0.5">Start</span>
                </div>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                    <div className="absolute top-full right-0 mt-2 w-[320px] bg-white rounded-xl shadow-lg z-50 py-2 divide-y divide-gray-100 border border-gray-100">
                       {/* Items */}
                       <Link to="/profile/personal-data" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={PersonalDataIcon} className="w-5 h-5" alt="Мой аккаунт"/>
                          <span className="text-sm font-medium">Мой аккаунт</span>
                       </Link>
                       <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={CaseIcon} className="w-5 h-5" alt="Бронирования"/>
                          <span className="text-sm font-medium">Бронирования и поездки</span>
                       </a>
                       <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={DocsIconMain} className="w-5 h-5" alt="Программа лояльности"/>
                          <span className="text-sm font-medium">Программа лояльности</span>
                       </a>
                       <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={WalletIcon} className="w-5 h-5" alt="Вознаграждения"/>
                          <span className="text-sm font-medium">Вознаграждения и кошелек</span>
                       </a>
                       <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={ReviewIcon} className="w-5 h-5" alt="Отзывы"/>
                          <span className="text-sm font-medium">Отзывы</span>
                       </a>
                       <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors">
                          <img src={FavoriteIcon} className="w-5 h-5" alt="Избранное"/>
                          <span className="text-sm font-medium">Избранное</span>
                       </a>
                       <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-700 hover:bg-[#F1F7FF] hover:text-[#002C6E] transition-colors text-left">
                          <img src={OutIcon} className="w-5 h-5" alt="Выйти"/>
                          <span className="text-sm font-medium">Выйти из аккаунта</span>
                       </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <button 
              className="bg-white text-vip-blue px-3 xl:px-5 py-2 rounded text-xs xl:text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              tabIndex={0}
              onClick={onLoginClick}
            >
              <span className="hidden md:inline">Войти в аккаунт</span>
              <span className="md:hidden">Войти</span>
            </button>
          )}
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="bg-vip-blue border border-white text-white px-3 xl:px-5 py-2 rounded text-xs xl:text-sm font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors whitespace-nowrap"
            tabIndex={0}
          >
            <DownloadIcon className="w-4 h-4" />
            <span className="hidden xl:inline">Скачать приложение</span>
            <span className="xl:hidden">Скачать</span>
          </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {showMobileMenu && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full sm:w-[320px] bg-white z-50 lg:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out">
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
                <button
                  onClick={() => {
                    setShowCurrencyModal(true)
                    setShowMobileMenu(false)
                  }}
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <span className="text-base">{selectedCurrency.code} {selectedCurrency.name}</span>
                </button>

                {/* Язык */}
                <button
                  onClick={() => {
                    setShowLanguageModal(true)
                    setShowMobileMenu(false)
                  }}
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <RussianFlagIcon className="w-6 h-6" />
                  <span className="text-base">Россия</span>
                </button>

                {/* Скачать приложение */}
                <button
                  onClick={() => {
                    setShowDownloadModal(true)
                    setShowMobileMenu(false)
                  }}
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

      {/* Модальное окно скачивания приложения */}
      {showDownloadModal && (
        <>
          {/* Затемнение фона */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowDownloadModal(false)}
          />
          
          {/* Модальное окно */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
                tabIndex={0}
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Заголовок */}
              <div className="p-6 pb-4 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <img 
                    src={InfoIcon} 
                    alt="Информация" 
                    className="w-8 h-8"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-vip-blue mb-2">
                    Приложение доступно только на мобильных устройствах
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Скачайте VIPGate App в вашем магазине приложений:
                  </p>
                </div>
              </div>

              {/* Секции магазинов приложений - горизонтальное расположение */}
              <div className="px-6 pb-6 grid grid-cols-3 gap-6">
                {/* Google Play */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src={GooglePlayImage} 
                      alt="Google Play" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-3">Google Play</p>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={QRCodeImage} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* AppGallery */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src={AppGalleryImage} 
                      alt="AppGallery" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-3">AppGallery</p>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={QRCodeImage} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* App Store */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src={AppleImage} 
                      alt="App Store" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-3">App Store</p>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={QRCodeImage} 
                      alt="QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </header>
  )
}

export default Header
