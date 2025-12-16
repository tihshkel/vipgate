import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

// Icons
import PersonalDataIcon from '../../assets/icons/welcome/Icon/Main/40/personal-data.svg'
import OtherTravelersIcon from '../../assets/icons/welcome/Icon/Main/40/other-travelers.svg'
import SettingsIcon from '../../assets/icons/welcome/Icon/Main/40/settings.svg'
import CardIcon from '../../assets/icons/welcome/Icon/Main/40/card.svg'
import ConfidentialityIcon from '../../assets/icons/welcome/Icon/Main/40/confidentiality.svg'
import CastleIcon from '../../assets/icons/welcome/Icon/Main/40/castle.svg'
import AddPhotoIcon from '../../add-photo.svg'

// Custom Select Component
const CustomSelect = ({ options, value, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div 
        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-[#002C6E]' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 text-sm text-[#002C6E] hover:bg-[#F1F7FF] cursor-pointer"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const PersonalData = ({ userEmail, onLogout }) => {
  // State for form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(userEmail || '')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [citizenship, setCitizenship] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState('RU')
  
  // UI State
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false)
  const phoneDropdownRef = useRef(null)

  // Photo upload state
  const [photo, setPhoto] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('personalData')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.firstName) setFirstName(data.firstName)
        if (data.lastName) setLastName(data.lastName)
        if (data.email) setEmail(data.email)
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber)
        if (data.selectedCountryCode) setSelectedCountryCode(data.selectedCountryCode)
        if (data.day) setDay(data.day)
        if (data.month) setMonth(data.month)
        if (data.year) setYear(data.year)
        if (data.citizenship) setCitizenship(data.citizenship)
        if (data.photo) setPhoto(data.photo)
      } catch (e) {
        console.error("Error parsing saved data", e)
      }
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    const data = {
      firstName, lastName, email, phoneNumber, selectedCountryCode,
      day, month, year, citizenship, photo
    }
    localStorage.setItem('personalData', JSON.stringify(data))
  }, [firstName, lastName, email, phoneNumber, selectedCountryCode, day, month, year, citizenship, photo])

  const handleRemovePhoto = (e) => {
    e.stopPropagation()
    setPhoto(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPhoto(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPhoto(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Constants
  const days = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: i + 1 }))
  const monthsList = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  const months = monthsList.map((m, i) => ({ value: i + 1, label: m }))
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => ({ value: currentYear - i, label: currentYear - i }))
  
  const countriesList = [
    'Россия', 'Беларусь', 'Казахстан', 'Армения', 'Кыргызстан', 'Узбекистан',
    'Таджикистан', 'Азербайджан', 'Молдова', 'Грузия', 'Турция', 'ОАЭ', 'Китай', 
    'США', 'Великобритания', 'Германия', 'Франция', 'Италия', 'Испания'
  ]
  const countries = countriesList.map(c => ({ value: c, label: c }))

  const phoneCodes = [
    { code: '+7', country: 'RU', flag: '🇷🇺' },
    { code: '+375', country: 'BY', flag: '🇧🇾' },
    { code: '+7', country: 'KZ', flag: '🇰🇿' },
    { code: '+374', country: 'AM', flag: '🇦🇲' },
    { code: '+996', country: 'KG', flag: '🇰🇬' },
    { code: '+998', country: 'UZ', flag: '🇺🇿' },
    { code: '+992', country: 'TJ', flag: '🇹🇯' },
    { code: '+994', country: 'AZ', flag: '🇦🇿' },
    { code: '+373', country: 'MD', flag: '🇲🇩' },
    { code: '+995', country: 'GE', flag: '🇬🇪' },
    { code: '+90', country: 'TR', flag: '🇹🇷' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'GB', flag: '🇬🇧' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+39', country: 'IT', flag: '🇮🇹' },
    { code: '+34', country: 'ES', flag: '🇪🇸' },
  ]

  const selectedCountry = phoneCodes.find(c => c.country === selectedCountryCode)

  useEffect(() => {
    function handleClickOutside(event) {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target)) {
        setIsPhoneDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header isLoggedIn={true} userEmail={userEmail} onLogout={onLogout} userPhoto={photo} />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-4 max-w-[1440px]">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#002C6E] transition-colors">Главная</Link>
          <span>&gt;</span>
          <Link to="/profile" className="hover:text-[#002C6E] transition-colors">Личный кабинет</Link>
          <span>&gt;</span>
          <span className="text-[#002C6E]">Персональные данные</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-[1440px]">
        <h1 className="text-3xl md:text-4xl font-bold text-[#002C6E] mb-2">Персональные данные</h1>
        <p className="text-[#002C6E]/60 mb-8 text-lg">Обновите свои данные и узнайте, как мы их используем</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-[#F1F7FF] rounded-xl p-4 h-fit">
             <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#E5E7EB]/50 rounded-lg text-[#002C6E] shadow-sm">
                   <img src={PersonalDataIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Персональные данные</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#002C6E] hover:bg-white/50 rounded-lg transition-colors">
                   <img src={CastleIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Настройки безопасности</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#002C6E] hover:bg-white/50 rounded-lg transition-colors">
                   <img src={OtherTravelersIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Другие путешественники</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#002C6E] hover:bg-white/50 rounded-lg transition-colors">
                   <img src={SettingsIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Настройки персонализации</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#002C6E] hover:bg-white/50 rounded-lg transition-colors">
                   <img src={CardIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Способы оплаты</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-[#002C6E] hover:bg-white/50 rounded-lg transition-colors">
                   <img src={ConfidentialityIcon} className="w-5 h-5" alt=""/>
                   <span className="text-sm font-medium">Конфиденциальность</span>
                </a>
             </nav>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#F1F7FF] rounded-xl p-6 md:p-8">
               {/* Name */}
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                  <label className="md:col-span-1 text-sm font-bold text-[#002C6E]">Ваше имя</label>
                  <div className="md:col-span-2">
                     <input 
                       type="text" 
                       placeholder="Имя" 
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#002C6E]" 
                     />
                  </div>
                  <div className="md:col-span-2">
                     <input 
                       type="text" 
                       placeholder="Фамилия" 
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#002C6E]" 
                     />
                  </div>
               </div>

               {/* Email */}
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-4">
                  <label className="md:col-span-1 text-sm font-bold text-[#002C6E] pt-2">Адрес электронной почты</label>
                  <div className="md:col-span-4">
                     <div className="text-[10px] text-gray-500 mb-1">Только латинские буквы</div>
                     <div className="relative">
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#002C6E] pr-32" 
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#12A156] text-white text-[10px] px-2 py-1 rounded">Подтверждено</span>
                     </div>
                  </div>
               </div>

               {/* Phone */}
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                  <label className="md:col-span-1 text-sm font-bold text-[#002C6E]">Номер телефона</label>
                  <div className="md:col-span-4 flex gap-2">
                     <div className="relative min-w-[110px]" ref={phoneDropdownRef}>
                        <div 
                           className="w-full h-full px-2 py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between gap-2 cursor-pointer"
                           onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                        >
                           <div className="flex items-center gap-2">
                             <span className="text-lg leading-none">{selectedCountry?.flag}</span>
                             <span className="text-sm font-medium text-gray-700">{selectedCountry?.code}</span>
                           </div>
                           <svg className={`w-3 h-3 ml-1 text-gray-400 transition-transform ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                        </div>
                        {isPhoneDropdownOpen && (
                           <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto w-64">
                              {phoneCodes.map((c) => (
                                 <div 
                                    key={c.country} 
                                    className="px-4 py-2 text-sm text-[#002C6E] hover:bg-[#F1F7FF] cursor-pointer flex items-center gap-3"
                                    onClick={() => {
                                       setSelectedCountryCode(c.country)
                                       setIsPhoneDropdownOpen(false)
                                    }}
                                 >
                                    <span className="text-lg">{c.flag}</span>
                                    <span>{c.country}</span>
                                    <span className="text-gray-400 ml-auto">{c.code}</span>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                     <input 
                       type="tel" 
                       value={phoneNumber}
                       onChange={(e) => {
                         if (e.target.value.length <= 15) setPhoneNumber(e.target.value)
                       }}
                       placeholder="(___) ___ - __ - __" 
                       className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#002C6E]" 
                     />
                  </div>
               </div>

               {/* Date of Birth */}
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                  <label className="md:col-span-1 text-sm font-bold text-[#002C6E]">Дата рождения</label>
                  <div className="md:col-span-4 grid grid-cols-3 gap-2">
                      <CustomSelect 
                        options={days} 
                        value={day} 
                        onChange={setDay} 
                        placeholder="День" 
                      />
                      <CustomSelect 
                        options={months} 
                        value={month} 
                        onChange={setMonth} 
                        placeholder="Месяц" 
                      />
                      <CustomSelect 
                        options={years} 
                        value={year} 
                        onChange={setYear} 
                        placeholder="Год" 
                      />
                  </div>
               </div>

               {/* Citizenship */}
               <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-8">
                  <label className="md:col-span-1 text-sm font-bold text-[#002C6E]">Гражданство</label>
                  <div className="md:col-span-4 relative">
                     <CustomSelect 
                        options={countries} 
                        value={citizenship} 
                        onChange={setCitizenship} 
                        placeholder="Страна/регион гражданства" 
                     />
                  </div>
               </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4">
               <button className="px-6 py-2.5 rounded border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  Удалить аккаунт
               </button>
               <button className="px-6 py-2.5 rounded bg-[#002C6E] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Сохранить
               </button>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="lg:col-span-1">
             <input 
               type="file" 
               ref={fileInputRef}
               className="hidden" 
               accept="image/*"
               onChange={handleFileChange}
             />
             <div 
               className={`w-full aspect-square border-2 ${isDragging ? 'border-[#002C6E] bg-[#E6F0FF]' : 'border-[#FFB700] bg-[#F1F7FF]'} rounded-lg flex flex-col items-center justify-center p-4 mb-4 cursor-pointer hover:bg-[#E6F0FF] transition-colors relative overflow-hidden`}
               onClick={triggerFileInput}
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               onDrop={handleDrop}
             >
                {photo ? (
                  <div className="relative w-full h-full group">
                    <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                    <button 
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                      title="Удалить фото"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 mb-3">
                       <img src={AddPhotoIcon} alt="Добавить фото" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs text-gray-500 text-center">Перетащите фото сюда или</p>
                  </>
                )}
             </div>
             <button 
               className="w-full py-2.5 bg-white border border-[#002C6E] text-[#002C6E] rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
               onClick={triggerFileInput}
             >
                Выберите на устройстве
             </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PersonalData