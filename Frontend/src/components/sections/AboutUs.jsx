import React from 'react'
import aboutPhoto1 from '../../assets/icons/about-photo1.jpg'
import aboutPhoto2 from '../../assets/icons/about-photo2.jpg'
import aboutPhoto3 from '../../assets/icons/about-photo3.jpg'
import aboutPhoto4 from '../../assets/icons/about-photo4.jpg'
import aboutPhoto5 from '../../assets/icons/about-photo5.jpg'

const AboutUs = () => {
  const largeCard = {
    id: 1,
    image: aboutPhoto1,
    title: '«Забота, которая требуется каждому путешественнику»',
    description: 'Спокойная, чистая атмосфера и продуманный сервис делают поездку заметно комфортнее'
  }

  const smallCards = [
    {
      id: 2,
      image: aboutPhoto2,
      title: '«Быстро, чётко и полностью без стресса»',
      description: 'Сервис работает организованно: никакого ожидания, только комфорт и простота на каждом этапе'
    },
    {
      id: 3,
      image: aboutPhoto4,
      title: '«Быстрый и безупречно организованный сервис»',
      description: 'Процесс занимает считанные минуты: всё продумано, гладко и экономит время путешественников'
    },
    {
      id: 4,
      image: aboutPhoto3,
      title: '«По-настоящему премиальный опыт»',
      description: 'Помощь с первых минут, внимательное сопровождение и отсутствие очередей создают ощущение высокого класса'
    },
    {
      id: 5,
      image: aboutPhoto5,
      title: '«Пересадка проходит удивительно легко»',
      description: 'От трансфера до сопровождения – всё работает чётко, с вниманием к деталям и полной поддержкой клиента'
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue mb-2 md:mb-3">
          О нас говорят
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Большой вертикальный блок слева */}
        <div className="lg:w-1/3">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img 
              src={largeCard.image} 
              alt={largeCard.title}
              className="w-full h-full object-cover"
              style={{ display: 'block', verticalAlign: 'bottom' }}
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                <h3 className="font-bold mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl" style={{ color: '#002C6E' }}>
                  {largeCard.title}
                </h3>
                <p className="leading-relaxed text-sm md:text-base lg:text-lg" style={{ color: '#002C6E' }}>
                  {largeCard.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка 2x2 справа */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {smallCards.map((card) => (
            <div key={card.id} className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src={card.image} 
                alt={card.title}
                className="w-full h-full object-cover"
                style={{ display: 'block', verticalAlign: 'bottom' }}
              />
              <div className={`absolute inset-0 pointer-events-none ${card.id === 3 ? 'bg-gradient-to-b from-black/40 via-transparent to-transparent' : ''}`}>
                <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-bold mb-2 md:mb-3" style={{ color: card.id === 3 ? '#FFFFFF' : '#002C6E', fontSize: '22px' }}>
                    {card.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: card.id === 3 ? '#FFFFFF' : '#002C6E', fontSize: '16px' }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
