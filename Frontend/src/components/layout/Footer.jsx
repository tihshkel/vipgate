import React from 'react'
import { DownloadIcon } from '../ui/Icons'

const Footer = ({ onLoginClick }) => {
  return (
    <footer className="relative bg-[#D9E4F8] text-vip-blue">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Основная секция футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Левая секция - Информация о компании */}
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-vip-blue">
              Vipgate.com
            </h3>
            <p className="text-base md:text-lg text-vip-blue/90">
              Мы создаём сервис, который помогает вам путешествовать
            </p>
          </div>

          {/* Средняя секция - Навигация */}
          <div className="flex flex-row gap-8 md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                О компании
              </a>
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                Отмена брони
              </a>
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                Аэропорты
              </a>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                FAQ
              </a>
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                Контакты
              </a>
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                Документы
              </a>
              <a href="#" className="text-base md:text-lg text-vip-blue hover:underline">
                Партнерам
              </a>
            </div>
          </div>

          {/* Правая секция - Контакты и кнопки */}
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <a href="tel:+79123456789" className="text-xl md:text-2xl lg:text-3xl font-bold block mb-3 md:mb-4 text-vip-blue hover:underline">
                +7 (912) 345-67-89
              </a>
              <a href="mailto:info@vipgate.ru" className="text-xl md:text-2xl lg:text-3xl font-bold block text-vip-blue hover:underline">
                info@vipgate.ru
              </a>
            </div>
            <div className="flex flex-col gap-2 md:gap-3">
              <button
                className="bg-vip-blue text-white px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold hover:bg-opacity-90 transition-colors text-center rounded-[6px]"
                tabIndex={0}
                aria-label="Войти в аккаунт"
                onClick={onLoginClick}
              >
                Войти в аккаунт
              </button>
              <button
                className="text-white px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 rounded-[6px]"
                style={{ backgroundColor: '#FFB700' }}
                tabIndex={0}
                aria-label="Скачать приложение"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Скачать приложение</span>
              </button>
            </div>
          </div>
        </div>

        {/* Нижняя секция - Копирайт и соцсети */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 md:pt-8 border-t border-vip-blue/10">
          <div className="text-sm md:text-base text-vip-blue">
            2026. Все права защищены
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-vip-blue">
            <a href="#" className="hover:underline">
              WhatsApp
            </a>
            <span className="text-vip-blue">\</span>
            <a href="#" className="hover:underline">
              Telegram
            </a>
            <span className="text-vip-blue">\</span>
            <a href="#" className="hover:underline">
              WeChat
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
