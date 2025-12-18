import React, { useState, useRef, useEffect } from 'react'
import { SearchIcon } from './Icons'

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

// Функция для получения пути к флагу по коду страны
const getCountryFlag = (countryCode) => {
  if (!countryCode) return null
  try {
    // Используем правильный путь для Vite
    return new URL(`../../assets/flags/flag/${countryCode.toUpperCase()}.svg`, import.meta.url).href
  } catch {
    return null
  }
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [suggestionsPosition, setSuggestionsPosition] = useState({ top: 0, left: 0, width: 0 })
  const searchInputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Обновление позиции подсказок
  const updateSuggestionsPosition = () => {
    if (searchInputRef.current) {
      const rect = searchInputRef.current.getBoundingClientRect()
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
        updateSuggestionsPosition()
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
    searchInputRef.current?.focus()
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
    <section className="py-6 md:py-8 overflow-visible">
      <div className="container mx-auto px-4 md:px-8 overflow-visible">
        <div className="flex flex-col sm:flex-row max-w-6xl mx-auto overflow-visible">
          <div className="flex-1 relative z-50 overflow-visible">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder="Аэропорт, город или номер рейса..."
              className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-4 md:py-5 border-2 border-r-0 rounded-l-lg rounded-r-none text-base md:text-lg bg-white focus:outline-none"
              style={{ borderColor: '#FFB700' }}
              tabIndex={0}
            />
            <span className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-vip-blue">
              <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
            </span>
            {/* Подсказки */}
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
                        {getCountryFlag(suggestion.countryCode) && (
                          <img 
                            src={getCountryFlag(suggestion.countryCode)} 
                            alt={suggestion.country || suggestion.name} 
                            className="w-6 h-6 object-contain flex-shrink-0"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        )}
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
            className="bg-vip-blue text-white px-6 md:px-10 py-4 md:py-5 rounded-r-lg rounded-l-none text-base md:text-lg font-semibold whitespace-nowrap border-2 border-l-0 -ml-[2px]"
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

export default SearchBar

