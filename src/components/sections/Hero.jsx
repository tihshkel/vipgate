import React, { useState, useRef, useEffect } from 'react'
import mainPhoto from '../../../main-photo.jpg'
import { SearchIcon } from '../ui/Icons'

// База данных для автодополнения
const searchSuggestions = [
  // Аэропорты
  { type: 'airport', code: 'VIE', name: 'Vienna International Airport', country: 'Austria', countryCode: 'AT', searchText: 'vie vienna австрия' },
  { type: 'airport', code: 'SVO', name: 'Sheremetyevo International Airport', country: 'Russia', countryCode: 'RU', searchText: 'svo шереметьево москва россия' },
  { type: 'airport', code: 'DME', name: 'Domodedovo International Airport', country: 'Russia', countryCode: 'RU', searchText: 'dme домодедово москва россия' },
  { type: 'airport', code: 'VKO', name: 'Vnukovo International Airport', country: 'Russia', countryCode: 'RU', searchText: 'vko внуково москва россия' },
  { type: 'airport', code: 'LED', name: 'Pulkovo Airport', country: 'Russia', countryCode: 'RU', searchText: 'led пулково санкт-петербург петербург' },
  { type: 'airport', code: 'DXB', name: 'Dubai International Airport', country: 'UAE', countryCode: 'AE', searchText: 'dxb dubai дубай оаэ' },
  { type: 'airport', code: 'JFK', name: 'John F. Kennedy International Airport', country: 'USA', countryCode: 'US', searchText: 'jfk нью-йорк сша' },
  { type: 'airport', code: 'LHR', name: 'Heathrow Airport', country: 'UK', countryCode: 'GB', searchText: 'lhr heathrow лондон великобритания' },
  { type: 'airport', code: 'CDG', name: 'Charles de Gaulle Airport', country: 'France', countryCode: 'FR', searchText: 'cdg paris париж франция' },
  { type: 'airport', code: 'FRA', name: 'Frankfurt Airport', country: 'Germany', countryCode: 'DE', searchText: 'fra frankfurt франкфурт германия' },
  { type: 'airport', code: 'IST', name: 'Istanbul Airport', country: 'Turkey', countryCode: 'TR', searchText: 'ist istanbul стамбул турция' },
  { type: 'airport', code: 'BKK', name: 'Suvarnabhumi Airport', country: 'Thailand', countryCode: 'TH', searchText: 'bkk bangkok бангкок таиланд' },
  
  // Страны
  { type: 'country', name: 'Vietnam', countryCode: 'VN', searchText: 'vietnam вьетнам' },
  { type: 'country', name: 'Russia', countryCode: 'RU', searchText: 'russia россия' },
  { type: 'country', name: 'Thailand', countryCode: 'TH', searchText: 'thailand таиланд' },
  { type: 'country', name: 'Turkey', countryCode: 'TR', searchText: 'turkey турция' },
  { type: 'country', name: 'UAE', countryCode: 'AE', searchText: 'uae оаэ' },
  { type: 'country', name: 'India', countryCode: 'IN', searchText: 'india индия' },
  
  // Рейсы (примеры)
  { type: 'flight', code: 'VI123', name: 'Vistara Airlines', country: 'India', countryCode: 'IN', searchText: 'vi123 vistara' },
  { type: 'flight', code: 'SU100', name: 'Aeroflot', country: 'Russia', countryCode: 'RU', searchText: 'su100 aeroflot аэрофлот' },
  { type: 'flight', code: 'EK123', name: 'Emirates', country: 'UAE', countryCode: 'AE', searchText: 'ek123 emirates' },
]

// Функция для получения иконки флага по коду страны
const getCountryFlag = (countryCode) => {
  const flags = {
    'AT': '🇦🇹', 'RU': '🇷🇺', 'AE': '🇦🇪', 'US': '🇺🇸', 'GB': '🇬🇧', 
    'FR': '🇫🇷', 'DE': '🇩🇪', 'TR': '🇹🇷', 'TH': '🇹🇭', 'VN': '🇻🇳', 'IN': '🇮🇳'
  }
  return flags[countryCode] || '🌍'
}

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [suggestionsPosition, setSuggestionsPosition] = useState({ top: 0, left: 0, width: 0 })
  const searchInputRefMobile = useRef(null)
  const searchInputRefDesktop = useRef(null)
  const suggestionsRef = useRef(null)

  // Обновление позиции подсказок
  const updateSuggestionsPosition = () => {
    const inputRef = window.innerWidth >= 1024 ? searchInputRefDesktop.current : searchInputRefMobile.current
    if (inputRef) {
      const rect = inputRef.getBoundingClientRect()
      setSuggestionsPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }

  // Фильтрация подсказок
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim()
      const filtered = searchSuggestions.filter(item => {
        const searchableText = `${item.code || ''} ${item.name} ${item.country || ''} ${item.searchText}`.toLowerCase()
        return searchableText.includes(query)
      }).slice(0, 5) // Ограничиваем до 5 подсказок
      
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
      setFocusedIndex(-1)
      if (filtered.length > 0) {
        // Небольшая задержка для обновления позиции после рендера
        setTimeout(() => {
          updateSuggestionsPosition()
        }, 0)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Обновление позиции при изменении размера окна или скролле
  useEffect(() => {
    if (showSuggestions) {
      const handleResize = () => updateSuggestionsPosition()
      const handleScroll = () => updateSuggestionsPosition()
      
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll, true)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [showSuggestions])

  // Обработка изменения поискового запроса
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Обработка выбора подсказки
  const handleSuggestionSelect = (suggestion) => {
    let displayText = ''
    if (suggestion.type === 'airport') {
      displayText = `${suggestion.code} - ${suggestion.name} (${suggestion.country})`
    } else if (suggestion.type === 'country') {
      displayText = suggestion.name
    } else if (suggestion.type === 'flight') {
      displayText = `${suggestion.code} (${suggestion.name} - ${suggestion.country})`
    }
    setSearchQuery(displayText)
    setShowSuggestions(false)
    const inputRef = window.innerWidth >= 1024 ? searchInputRefDesktop.current : searchInputRefMobile.current
    inputRef?.focus()
  }

  // Обработка фокуса на поле ввода
  const handleInputFocus = () => {
    updateSuggestionsPosition()
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  // Обработка потери фокуса
  const handleInputBlur = (e) => {
    // Задержка, чтобы клик по подсказке успел обработаться
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget)) {
        setShowSuggestions(false)
      }
    }, 200)
  }

  // Обработка навигации по подсказкам с клавиатуры
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault()
      handleSuggestionSelect(suggestions[focusedIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setFocusedIndex(-1)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-visible">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 bg-no-repeat overflow-hidden"
        style={{ 
          backgroundImage: `url(${mainPhoto})`,
          backgroundPosition: 'right top',
          backgroundSize: '160%',
          backgroundAttachment: 'local'
        }}
      >
      </div>

      {/* Контент - текст слева вверху */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-12 md:pt-16">
        <div className="max-w-md w-full text-left space-y-4">
          {/* Мобильная версия */}
          <div className="lg:hidden space-y-4">
            <h1 className="font-bold text-vip-blue leading-tight" style={{ fontSize: '32px' }}>
              VIP-сервисы в аэропортах по всему миру
            </h1>
            <p className="text-gray-500" style={{ fontSize: '20px' }}>
              Fast Track, VIP-залы и другие сервисы — быстро и удобно
            </p>
          </div>
          
          {/* Десктопная версия */}
          <div className="hidden lg:block space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue leading-tight whitespace-pre-line">
              VIP-сервисы в аэропортах{'\n'}
              по всему миру – комфорт,{'\n'}
              доступный каждому
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#809DCA] font-medium">
              Бронируйте Fast Track, VIP-залы, трансферы<br />
              и сопровождение удобно и быстро
            </p>
            <button 
              className="bg-vip-blue text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg mt-6"
              tabIndex={0}
            >
              Забронировать
            </button>
          </div>
        </div>
      </div>

      {/* Кнопка "Забронировать" внизу по центру - только для мобильной версии */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pb-4 lg:hidden">
        <div className="flex justify-center">
          <button 
            className="bg-vip-blue text-white px-8 py-3 text-base font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
            tabIndex={0}
          >
            Забронировать
          </button>
        </div>
      </div>

      {/* Поисковая строка внизу */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pb-8 md:pb-12 overflow-visible">
        {/* Мобильная версия */}
        <div className="lg:hidden max-w-md space-y-3 overflow-visible">
          <div className="relative z-50 overflow-visible">
            <input
              ref={searchInputRefMobile}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder="Аэропорт, город или номер рейса..."
              className="w-full pl-12 pr-4 py-4 border-2 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-vip-yellow"
              style={{ borderColor: '#FFB700' }}
              tabIndex={0}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon className="w-5 h-5" />
            </span>
            {/* Подсказки для мобильной версии */}
            {showSuggestions && suggestions.length > 0 && suggestionsPosition.width > 0 && (
              <div 
                ref={suggestionsRef}
                className="fixed bg-white border-2 rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto"
                style={{ 
                  borderColor: '#FFB700',
                  top: `${suggestionsPosition.top}px`,
                  left: `${suggestionsPosition.left}px`,
                  width: `${suggestionsPosition.width}px`
                }}
              >
                {suggestions.map((suggestion, index) => {
                  let displayText = ''
                  if (suggestion.type === 'airport') {
                    displayText = `${suggestion.code} - ${suggestion.name} (${suggestion.country})`
                  } else if (suggestion.type === 'country') {
                    displayText = suggestion.name
                  } else if (suggestion.type === 'flight') {
                    displayText = `${suggestion.code} (${suggestion.name} - ${suggestion.country})`
                  }
                  
                  return (
                    <button
                      key={`${suggestion.type}-${suggestion.code || suggestion.name}-${index}`}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left ${
                        focusedIndex === index ? 'bg-gray-50' : ''
                      }`}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-2xl flex-shrink-0">{getCountryFlag(suggestion.countryCode)}</span>
                        <span className="text-sm text-gray-800 truncate">{displayText}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <button 
            className="w-full bg-vip-blue text-white py-4 rounded-lg text-base font-semibold hover:bg-opacity-90 transition-colors shadow-md"
            tabIndex={0}
          >
            Найти
          </button>
        </div>
        
        {/* Десктопная версия */}
        <div className="hidden lg:flex flex-col sm:flex-row max-w-5xl mx-auto overflow-visible">
          <div className="flex-1 relative z-50 overflow-visible">
            <input
              ref={searchInputRefDesktop}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder="Аэропорт, город или номер рейса..."
              className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-4 md:py-5 border-2 border-r-0 rounded-l-lg rounded-r-none text-base md:text-lg bg-white focus:outline-none focus:ring-2 focus:ring-vip-yellow"
              style={{ borderColor: '#FFB700' }}
              tabIndex={0}
            />
            <span className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
            </span>
            {/* Подсказки для десктопной версии */}
            {showSuggestions && suggestions.length > 0 && suggestionsPosition.width > 0 && (
              <div 
                ref={suggestionsRef}
                className="fixed bg-white border-2 rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto"
                style={{ 
                  borderColor: '#FFB700',
                  top: `${suggestionsPosition.top}px`,
                  left: `${suggestionsPosition.left}px`,
                  width: `${suggestionsPosition.width}px`
                }}
              >
                {suggestions.map((suggestion, index) => {
                  let displayText = ''
                  if (suggestion.type === 'airport') {
                    displayText = `${suggestion.code} - ${suggestion.name} (${suggestion.country})`
                  } else if (suggestion.type === 'country') {
                    displayText = suggestion.name
                  } else if (suggestion.type === 'flight') {
                    displayText = `${suggestion.code} (${suggestion.name} - ${suggestion.country})`
                  }
                  
                  return (
                    <button
                      key={`${suggestion.type}-${suggestion.code || suggestion.name}-${index}`}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left ${
                        focusedIndex === index ? 'bg-gray-50' : ''
                      }`}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-2xl flex-shrink-0">{getCountryFlag(suggestion.countryCode)}</span>
                        <span className="text-sm text-gray-800 truncate">{displayText}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <button 
            className="bg-vip-blue text-white px-6 md:px-10 py-4 md:py-5 rounded-r-lg rounded-l-none text-base md:text-lg font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap shadow-md hover:shadow-lg border-2 border-l-0"
            style={{ borderColor: '#FFB700' }}
            tabIndex={0}
          >
            Найти
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
