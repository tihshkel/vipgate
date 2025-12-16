import React from 'react'
import TicketsIcon from '../../../Description/tikets.svg'

const LoyaltyProgram = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vip-blue mb-3">
          Путешествуйте больше, тратьте меньше
        </h2>
        <p className="text-lg md:text-xl text-[#809DCA]">
          Один раз подключаетесь — дальше всегда со скидкой
        </p>
      </div>

      <div className="border-2 border-vip-yellow rounded-lg p-6 md:p-8 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
          {/* Изображение - вверху на мобильных, справа на десктопе */}
          <div className="flex-shrink-0 order-first lg:order-last">
            <img src={TicketsIcon} alt="Билеты" className="w-full max-w-md" />
          </div>
          {/* Текст - внизу на мобильных, слева на десктопе */}
          <div className="flex-1 order-last lg:order-first">
            <h3 className="text-2xl md:text-3xl font-bold text-vip-blue mb-4">
              Удобно, выгодно и без лишних условий.
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Станьте участником программы лояльности и получайте особые цены на Fast Track, VIP-залы, трансферы и сопровождение. Ваш комфорт — всегда со скидкой.
            </p>
            <button className="bg-vip-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors">
              Стать участником
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoyaltyProgram
