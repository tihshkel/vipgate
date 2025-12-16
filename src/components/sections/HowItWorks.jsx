import React from 'react'
import YellowIcon from '../../assets/icons/yellow-icon.svg'
import OneIcon from '../../assets/icons/one-icon.svg'
import TwoIcon from '../../assets/icons/two-icon.svg'
import ThreeIcon from '../../assets/icons/three-icon.svg'

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: OneIcon,
      text: 'Выберите аэропорт и услугу'
    },
    {
      number: 2,
      icon: TwoIcon,
      text: 'Оплатите онлайн'
    },
    {
      number: 3,
      icon: ThreeIcon,
      text: 'Получаете удовольствие от перелёта'
    }
  ]

  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue mb-2 md:mb-3">
          Как это работает
        </h2>
        <p className="text-lg md:text-xl text-[#809DCA]">
          Оформите любую VIP-услугу за несколько минут
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-0">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className="flex-1 relative"
            style={{
              marginLeft: index > 0 ? '-20px' : '0',
              zIndex: steps.length - index
            }}
          >
            {/* Желтый контур */}
            <img 
              src={YellowIcon} 
              alt="" 
              className="absolute inset-0 w-full h-full object-contain"
              style={{ 
                objectPosition: 'right center',
                height: '100%',
                transform: 'translateX(-20px)'
              }}
            />
            
            {/* Контент */}
            <div className="relative pt-8 pb-8 pl-0 pr-8 md:pt-12 md:pb-12 md:pl-0 md:pr-12 lg:pt-16 lg:pb-16 lg:pl-0 lg:pr-16 flex items-center gap-6 md:gap-8 min-h-[220px] md:min-h-[280px] lg:min-h-[320px]">
              {/* Номер иконка */}
              <div className="flex-shrink-0">
                <img 
                  src={step.icon} 
                  alt={`Шаг ${step.number}`}
                  className="h-auto w-20 md:w-28 lg:w-32"
                />
              </div>
              
              {/* Текст */}
              <div className="flex-1 pr-6 md:pr-8 lg:pr-10">
                <p className="font-bold text-vip-blue leading-tight" style={{ fontSize: '28px' }}>
                  {step.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
