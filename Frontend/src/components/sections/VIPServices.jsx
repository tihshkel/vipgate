import React from 'react'
import vipPhoto1 from '../../../vip-photo1.jpg'
import vipPhoto2 from '../../../vip-photo2.jpg'
import vipPhoto3 from '../../../vip-photo3.jpg'
import vipPhoto4 from '../../../vip-photo4.jpg'

const VIPServices = () => {
  const services = [
    {
      id: 1,
      image: vipPhoto1,
      title: 'VIP-зал',
      location: 'Шереметьево'
    },
    {
      id: 2,
      image: vipPhoto2,
      title: 'VIP-зал «Al Majlis»',
      location: 'Шереметьево'
    },
    {
      id: 3,
      image: vipPhoto3,
      title: 'The Salon (общий зал)',
      location: 'Шереметьево'
    },
    {
      id: 4,
      image: vipPhoto4,
      title: 'Трансфер',
      location: 'Шереметьево'
    },
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue mb-2 md:mb-3">VIP-сервисы</h2>
        <p className="text-lg md:text-xl text-[#809DCA]">
          Популярные решения, которые выбирают наши клиенты
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

        {/* Карточки с горизонтальным скроллом на мобильных */}
        <div className="w-full overflow-x-auto lg:overflow-visible scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex gap-4 md:gap-6 lg:flex-wrap">
            {services.map((service) => (
              <div 
                key={service.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto md:flex-1 md:min-w-0 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                tabIndex={0}
              >
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[6px] mb-3 bg-gray-100">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className={`w-full h-full ${
                      service.id === 2 ? 'object-contain' : 'object-cover'
                    }`}
                    style={
                      service.id === 2 
                        ? { objectPosition: 'center' }
                        : {}
                    }
                  />
                </div>
                <div className="bg-white">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-vip-blue mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">{service.location}</p>
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

export default VIPServices
