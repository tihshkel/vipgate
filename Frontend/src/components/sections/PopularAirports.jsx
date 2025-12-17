import React from 'react'
import airportPhoto1 from '../../../airport-photo1.jpg'
import airportPhoto2 from '../../../airport-photo2.jpg'
import airportPhoto3 from '../../../airport-photo3.jpg'
import airportPhoto4 from '../../../airport-photo4.jpg'

const PopularAirports = () => {
  const airports = [
    {
      id: 1,
      image: airportPhoto1,
      city: 'Домодедово, Россия',
      code: 'DME'
    },
    {
      id: 2,
      image: airportPhoto2,
      city: 'Абу-Даби, ОАЭ',
      code: 'AUH'
    },
    {
      id: 3,
      image: airportPhoto3,
      city: 'Шереметьево, Россия',
      code: 'SVO'
    },
    {
      id: 4,
      image: airportPhoto4,
      city: 'Анталья, Турция',
      code: 'AYT'
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue mb-2 md:mb-3">
          Популярные аэропорты
        </h2>
        <p className="text-lg md:text-xl text-[#809DCA]">
          Откройте доступ в пару кликов
        </p>
      </div>

      <div className="relative flex items-start">
        {/* Стрелка влево */}
        <button 
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 text-vip-blue hover:text-vip-light-blue transition-colors cursor-pointer"
          aria-label="Предыдущий"
          tabIndex={0}
        >
          <span className="text-5xl font-light">‹</span>
        </button>

        {/* Карточки аэропортов с горизонтальным скроллом на мобильных */}
        <div className="w-full overflow-x-auto lg:overflow-visible scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-4 md:gap-6 lg:flex-wrap">
            {airports.map((airport) => (
              <div 
                key={airport.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto md:flex-1 md:min-w-0 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                tabIndex={0}
              >
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[6px] mb-3">
                  <img 
                    src={airport.image} 
                    alt={airport.city}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-vip-blue mb-1">
                    {airport.city}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">{airport.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Стрелка вправо */}
        <button 
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 text-vip-blue hover:text-vip-light-blue transition-colors cursor-pointer"
          aria-label="Следующий"
          tabIndex={0}
        >
          <span className="text-5xl font-light">›</span>
        </button>
      </div>

    </section>
  )
}

export default PopularAirports
