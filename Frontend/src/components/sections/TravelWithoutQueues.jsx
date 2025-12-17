import React from 'react'

const TravelWithoutQueues = () => {
  return (
    <section className="bg-vip-blue text-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          Путешествуйте без очередей
        </h2>
        <p className="text-lg md:text-xl mb-8 md:mb-10 text-white/90">
          VIP-комфорт, доступный каждому
        </p>
        <button 
          className="bg-white text-vip-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          tabIndex={0}
        >
          Забронировать
        </button>
      </div>
    </section>
  )
}

export default TravelWithoutQueues

