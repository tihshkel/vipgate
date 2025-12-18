import React from 'react'
import { Link } from 'react-router-dom'
import { RussianFlagIcon, QuestionIcon, ChatIcon, DownloadIcon, FastTrackIcon, ChairIcon, CarIcon, PeopleIcon } from '../../components/ui/Icons'
import Footer from '../../components/layout/Footer'
import BurgerMenuIcon from '../../assets/icons/burbermenu-icon.svg'
import DownloadMenuIcon from '../../assets/burger-menu/dowanload.svg'
import InfoMenuIcon from '../../assets/burger-menu/info.svg'
import ChatMenuIcon from '../../assets/burger-menu/chat.svg'
import CookieIcon from '../../assets/burger-menu/cookie.svg'
import DocsIcon from '../../assets/burger-menu/docs.svg'
import Docs2Icon from '../../assets/burger-menu/docs2.svg'

// Иконки из welcome/Icon/Main/40
import CaseIcon from '../../assets/icons/welcome/Icon/Main/40/case.svg'
import FavoriteIcon from '../../assets/icons/welcome/Icon/Main/40/favorite.svg'
import ReviewIcon from '../../assets/icons/welcome/Icon/Main/40/review.svg'
import WalletIcon from '../../assets/icons/welcome/Icon/Main/40/wallet.svg'
import CardIcon from '../../assets/icons/welcome/Icon/Main/40/card.svg'
import TransactionIcon from '../../assets/icons/welcome/Icon/Main/40/transaction.svg'
import PersonalDataIcon from '../../assets/icons/welcome/Icon/Main/40/personal-data.svg'
import OtherTravelersIcon from '../../assets/icons/welcome/Icon/Main/40/other-travelers.svg'
import SupportIcon from '../../assets/icons/welcome/Icon/Main/40/support.svg'
import DocsIconMain from '../../assets/icons/welcome/Icon/Main/40/docs.svg'
import BookIcon from '../../assets/icons/welcome/Icon/Main/40/book.svg'
import ConfidentialityIcon from '../../assets/icons/welcome/Icon/Main/40/confidentiality.svg'
import SettingsIcon from '../../assets/icons/welcome/Icon/Main/40/settings.svg'
import MessageIcon from '../../assets/icons/welcome/Icon/Main/40/message.svg'
import BlockIcon from '../../assets/icons/welcome/Icon/Main/40/block.svg'
import Block2Icon from '../../assets/icons/welcome/Icon/Main/40/block2.svg'
import CastleIcon from '../../assets/icons/welcome/Icon/Main/40/castle.svg'
import StarIcon from '../../assets/icons/welcome/Icon/Main/40/Star.svg'
import OutIcon from '../../assets/icons/Icon/Main/24/Out.svg'

// Иллюстрации для уровней лояльности
import StartIllustration from '../../assets/icons/welcome/Icon/Main/start.svg'
import PlatinumBlockIllustration from '../../assets/icons/welcome/Icon/Main/platinum-block.svg'
import BlackBlockIllustration from '../../assets/icons/welcome/Icon/Main/black-block.svg'
import DiamondBlockIllustration from '../../assets/icons/welcome/Icon/Main/diamond-block.svg'

const PersonalAccount = ({ userEmail, onLogout }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const [showProfileMenu, setShowProfileMenu] = React.useState(false)
  
  // Получаем первую букву email для аватара
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : 'A'

  return (
    <div className="min-h-screen bg-white">
      {/* Хедер */}
      <header className="bg-vip-blue text-white px-4 md:px-8 py-4 sticky top-0 z-50">
        <div className="container mx-auto max-w-[1440px]">
          {/* Мобильная версия */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              <div className="text-base sm:text-lg font-bold">Vipgate.com</div>
              <div className="flex items-center gap-2">
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

          {/* Десктопная версия - два ряда */}
          <div className="hidden lg:flex flex-col gap-3">
            {/* Верхний ряд */}
            <div className="flex items-center justify-between">
              {/* Логотип */}
              <Link to="/" className="text-xl md:text-2xl font-bold flex-shrink-0 hover:text-vip-gold transition-colors">Vipgate.com</Link>

              {/* Правая часть верхнего ряда */}
              <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
                {/* Валюта */}
                <div className="flex items-center gap-2 text-sm">
                  <span>RUB</span>
                </div>

                {/* Язык */}
                <div className="flex items-center gap-2 text-sm">
                  <RussianFlagIcon className="w-5 h-5" />
                </div>

                {/* Иконки */}
                <div className="flex items-center gap-2">
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
                      className="w-10 h-10 rounded-full bg-[#E5E7EB] border-2 border-[#FFB700] text-[#002C6E] font-bold text-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="Профиль"
                      tabIndex={0}
                    >
                      {userInitial}
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
              </div>
            </div>

            {/* Нижний ряд */}
            <div className="flex items-center justify-between">
              {/* Навигация */}
              <nav className="flex items-center gap-4 xl:gap-8 overflow-x-auto scrollbar-hide">
                <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap text-white px-3 py-1.5 rounded-lg">
                  <FastTrackIcon className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>Fast Track</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap text-white px-3 py-1.5 rounded-lg">
                  <ChairIcon className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>VIP lounge</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap text-white px-3 py-1.5 rounded-lg">
                  <CarIcon className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>Transfer</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-vip-gold transition-colors text-sm xl:text-base whitespace-nowrap text-white px-3 py-1.5 rounded-lg">
                  <PeopleIcon className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>Meet & assist</span>
                </a>
              </nav>

              {/* Кнопка скачивания приложения */}
              <button 
                className="bg-vip-blue border border-white text-white px-4 xl:px-6 py-2.5 rounded-lg text-sm xl:text-base font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors whitespace-nowrap w-[220px] xl:w-[250px]"
                tabIndex={0}
              >
                <DownloadIcon className="w-4 h-4" />
                <span className="hidden xl:inline">Скачать приложение</span>
                <span className="xl:hidden">Скачать</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-4 max-w-[1440px]">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-vip-blue transition-colors">Главная</Link>
          <span>&gt;</span>
          <span className="text-vip-blue">Личный кабинет</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-[1440px]">
        <div className="max-w-[1440px] mx-auto">
          {/* Welcome Section */}
          <h1 className="text-3xl md:text-4xl font-bold text-vip-blue mb-8">Добро пожаловать</h1>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12 bg-[#F1F7FF] rounded-xl p-6 md:p-8">
            {/* Left Column - Loyalty Program */}
            <div className="xl:col-span-2">
              {/* Loyalty Status */}
              <div className="">
                <h2 className="text-lg md:text-xl font-semibold text-vip-blue mb-2">
                  До уровня Platinum осталось: 3 поездки или 12 000₽
                </h2>
                <p className="text-gray-600 mb-8 text-sm md:text-base">
                  Повышайте статус — увеличивайте преимущества
                </p>

                {/* Progress Bar with Level Buttons and Blocks Container */}
                <div className="relative w-full overflow-x-auto scrollbar-hide pb-4">
                  <div className="min-w-[900px] relative px-2">
                    {/* Connection Line Removed */}

                    <div className="grid grid-cols-4 gap-0">
                      {/* START LEVEL */}
                      <div className="relative flex flex-col group cursor-pointer">
                        {/* Button */}
                        <div className="relative z-10 pl-0 mb-3 flex items-center">
                           <button className="rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm bg-[#FFB700]">
                              <svg className="w-4 h-4 text-[#002C6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              <span className="font-semibold text-sm text-[#002C6E]">Start</span>
                           </button>
                           <div className="h-[2px] bg-[#D9E4F8] flex-1 ml-4 mr-10 rounded-full"></div>
                        </div>
                        {/* Card */}
                        <div className="relative h-[130px] w-[120%] -ml-4 z-10">
                           <img src={BlockIcon} className="absolute inset-0 w-full h-full object-fill" alt="bg" />
                           <div className="relative z-10 p-4 pt-6 pl-6 flex flex-col h-full justify-center">
                              <img src={StartIllustration} className="w-14 h-14 mb-2 object-contain" alt="icon" />
                              <p className="text-xs font-bold text-vip-blue leading-tight mb-1">Start — базовый уровень</p>
                              <p className="text-[10px] text-vip-blue/80 leading-tight">1% баллами с каждой покупки</p>
                           </div>
                        </div>
                      </div>

                      {/* PLATINUM LEVEL */}
                      <div className="relative flex flex-col group cursor-pointer -ml-10">
                        {/* Button */}
                        <div className="relative z-10 pl-6 mb-3 flex items-center">
                           <button className="rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm bg-[#E5E7EB]">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              <span className="font-semibold text-sm text-gray-600">Platinum</span>
                           </button>
                           <div className="h-[2px] bg-[#D9E4F8] flex-1 ml-4 mr-10 rounded-full"></div>
                        </div>
                        {/* Card */}
                        <div className="relative h-[130px] w-[135%] -ml-0 z-20">
                           <img src={Block2Icon} className="absolute inset-0 w-full h-full object-fill" alt="bg" />
                           <div className="relative z-10 p-4 pt-6 pl-12 flex flex-col h-full justify-center">
                              <img src={PlatinumBlockIllustration} className="w-14 h-14 mb-2 object-contain" alt="icon" />
                              <p className="text-xs font-bold text-gray-600 leading-tight mb-1">Platinum — при сумме от ...</p>
                              <p className="text-[10px] text-gray-500 leading-tight">2% баллами с каждой покупки</p>
                           </div>
                        </div>
                      </div>

                      {/* BLACK LEVEL */}
                      <div className="relative flex flex-col group cursor-pointer -ml-10">
                         {/* Button */}
                        <div className="relative z-10 pl-6 mb-3 flex items-center">
                           <button className="rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm bg-[#E5E7EB]">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              <span className="font-semibold text-sm text-gray-600">Black</span>
                           </button>
                           <div className="h-[2px] bg-[#D9E4F8] flex-1 ml-4 mr-10 rounded-full"></div>
                        </div>
                        {/* Card */}
                        <div className="relative h-[130px] w-[135%] -ml-0 z-30">
                           <img src={Block2Icon} className="absolute inset-0 w-full h-full object-fill" alt="bg" />
                           <div className="relative z-10 p-4 pt-6 pl-12 flex flex-col h-full justify-center">
                              <img src={BlackBlockIllustration} className="w-14 h-14 mb-2 object-contain" alt="icon" />
                              <p className="text-xs font-bold text-gray-600 leading-tight mb-1">Black — при сумме от ...</p>
                              <p className="text-[10px] text-gray-500 leading-tight">3% баллами с каждой покупки</p>
                           </div>
                        </div>
                      </div>

                      {/* DIAMOND LEVEL */}
                      <div className="relative flex flex-col group cursor-pointer -ml-10">
                         {/* Button */}
                        <div className="relative z-10 pl-6 mb-3 flex items-center">
                           <button className="rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm bg-[#E5E7EB]">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                              <span className="font-semibold text-sm text-gray-600">Diamond</span>
                           </button>
                        </div>
                        {/* Card */}
                        <div className="relative h-[130px] w-[135%] -ml-0 z-40">
                           <img src={Block2Icon} className="absolute inset-0 w-full h-full object-fill" alt="bg" />
                           <div className="relative z-10 p-4 pt-6 pl-12 flex flex-col h-full justify-center">
                              <img src={DiamondBlockIllustration} className="w-14 h-14 mb-2 object-contain" alt="icon" />
                              <p className="text-xs font-bold text-gray-600 leading-tight mb-1">Diamond — при сумме от ...</p>
                              <p className="text-[10px] text-gray-500 leading-tight">4% баллами с каждой покупки</p>
                           </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <a href="#" className="text-vip-blue text-sm underline mt-4 inline-block hover:text-vip-gold transition-colors">
                  Узнать больше о вознаграждениях
                </a>
              </div>
            </div>

            {/* Right Column - Bonus Info */}
            <div className="space-y-6">
              {/* Your Bonuses Box */}
              <div className="bg-[#002C6E] text-white rounded-md p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ваши бонусы: 350 баллов</h3>
                <a href="#" className="text-white text-base hover:opacity-80 transition-opacity">Подробнее</a>
              </div>

              {/* How Points Work Box */}
              <div className="border-2 border-[#002C6E] rounded-md p-8">
                <h3 className="text-xl font-bold text-[#002C6E] mb-6">Как работают баллы</h3>
                <ul className="space-y-2 text-[#002C6E]" style={{ fontSize: '16px' }}>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">10 баллов за каждые 100 ₽</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">Баллы начисляются после оплаты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">При отмене заказа бонусы списываются</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">Действуют 12 месяцев</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">Баллами можно оплатить новый заказ полностью или частично</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">Бонусы не начисляются за оплату баллами</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#002C6E] flex-shrink-0"></span>
                    <span className="leading-tight">Не обмениваются на деньги</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Account Sections Grid */}
          <div className="space-y-6">
            {/* Top Row - 4 sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Мои путешествия */}
            <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
              <h3 className="text-lg font-semibold text-vip-blue mb-4">Мои путешествия</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={CaseIcon} alt="Бронирования" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Бронирования</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={FavoriteIcon} alt="Избранное" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Избранное</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={ReviewIcon} alt="Мои отзывы" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Мои отзывы</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Платежная информация */}
            <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
              <h3 className="text-lg font-semibold text-vip-blue mb-4">Платежная информация</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={WalletIcon} alt="Вознаграждения и кошелек" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Вознаграждения и кошелек</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={CardIcon} alt="Способы оплаты" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Способы оплаты</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={TransactionIcon} alt="Транзакции" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Транзакции</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Управление аккаунтом */}
            <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
              <h3 className="text-lg font-semibold text-vip-blue mb-4">Управление аккаунтом</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={PersonalDataIcon} alt="Персональные данные" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Персональные данные</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={OtherTravelersIcon} alt="Другие путешественники" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Другие путешественники</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Помощь */}
            <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
              <h3 className="text-lg font-semibold text-vip-blue mb-4">Помощь</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={SupportIcon} alt="Связаться со службой поддержки" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Связаться со службой поддержки</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={BookIcon} alt="Центр знаний по безопасности" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Центр знаний по безопасности</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                  <div className="flex items-center gap-3">
                    <img src={DocsIconMain} alt="Разрешение споров" className="w-6 h-6 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">Разрешение споров</span>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            </div>

            {/* Bottom Row - 2 sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Юридические данные */}
              <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
                <h3 className="text-lg font-semibold text-vip-blue mb-4">Юридические данные</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                    <div className="flex items-center gap-3">
                      <img src={ConfidentialityIcon} alt="Конфиденциальность и управление данными" className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">Конфиденциальность и управление данными</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Настройки */}
              <div className="border border-gray-200 rounded-xl p-6 bg-[#F1F7FF]">
                <h3 className="text-lg font-semibold text-vip-blue mb-4">Настройки</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                    <div className="flex items-center gap-3">
                      <img src={SettingsIcon} alt="Настройки персонализации" className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">Настройки персонализации</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                    <div className="flex items-center gap-3">
                      <img src={MessageIcon} alt="Настройки рассылки" className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">Настройки рассылки</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#" className="flex items-center justify-between group hover:text-vip-blue transition-colors text-[#002C6E]">
                    <div className="flex items-center gap-3">
                      <img src={CastleIcon} alt="Настройки безопасности" className="w-6 h-6 transition-transform group-hover:scale-110" />
                      <span className="text-sm font-medium">Настройки безопасности</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
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
          <div className="fixed inset-y-0 right-0 w-full sm:w-[320px] bg-white z-50 lg:hidden shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
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
              <div className="space-y-1">
                <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                  <span className="text-base">RUB Российский рубль</span>
                </div>
                <div className="w-full flex items-center gap-3 text-vip-blue py-3 px-2 rounded-lg">
                  <RussianFlagIcon className="w-6 h-6" />
                  <span className="text-base">Россия</span>
                </div>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={DownloadMenuIcon} alt="Скачать" className="w-6 h-6" />
                  <span className="text-base">Скачать приложение</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={InfoMenuIcon} alt="Поддержка" className="w-6 h-6" />
                  <span className="text-base">Служба поддержки</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={ChatMenuIcon} alt="Контакты" className="w-6 h-6" />
                  <span className="text-base">Контакты</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={CookieIcon} alt="Cookies" className="w-6 h-6" />
                  <span className="text-base">Конфиденциальность и cookies</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={DocsIcon} alt="Условия" className="w-6 h-6" />
                  <span className="text-base">Условия использования</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 text-vip-blue hover:bg-gray-50 transition-colors py-3 px-2 rounded-lg"
                  tabIndex={0}
                >
                  <img src={Docs2Icon} alt="Юридическая информация" className="w-6 h-6" />
                  <span className="text-base">Юридическая информация</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PersonalAccount
