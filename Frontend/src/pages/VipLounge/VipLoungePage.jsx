import React, { useState, useRef } from 'react'
import SearchBar from '../../components/ui/SearchBar'
import vipLoungeIcon1 from '../../assets/vip-lounge/vip-lounge1.svg'
import vipLoungeIcon2 from '../../assets/vip-lounge/vip-lounge2.svg'
import vipLoungeIcon3 from '../../assets/vip-lounge/vip-lounge3.svg'
import blockBg from '../../assets/icons/welcome/Icon/Main/40/block.svg'
import starIcon from '../../assets/icons/welcome/Icon/Main/40/Star.svg'
import airportPhoto1 from '../../../airport-photo1.jpg'
import airportPhoto2 from '../../../airport-photo2.jpg'
import airportPhoto3 from '../../../airport-photo3.jpg'
import airportPhoto4 from '../../../airport-photo4.jpg'
import vipLoungePhoto from '../../vip 1.jpg'

const StepCard = ({ number, title, description, icon }) => (
  <div className="relative w-full h-[260px] px-8 pt-10 pb-6 flex flex-col group">
    {/* Background SVG */}
    <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <img src={blockBg} alt="" className="w-full h-full" style={{ objectFit: 'fill' }} />
    </div>

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full items-start -ml-2">
        <div className="flex justify-start mb-2 h-16 items-center -ml-2">
            <img src={icon} alt={title} className="max-h-full w-auto object-contain scale-110" />
        </div>
        <div className="-ml-2">
            <h3 className="text-xl font-bold text-vip-blue mb-0">{title}</h3>
            <p className="text-[#002C6E] text-opacity-80 text-sm leading-relaxed max-w-[95%] mt-0">{description}</p>
        </div>
    </div>
  </div>
)

const InfoColumn = ({ title, items }) => (
  <div className="flex-1">
    <h3 className="text-xl font-bold text-vip-blue mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-gray-600 text-sm">
          <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

const AirportCard = ({ image, price, name, location, code }) => (
  <div className="flex-shrink-0 w-[280px] sm:w-[320px] cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] snap-start">
    <div className="w-full aspect-[4/3] overflow-hidden rounded-[6px] mb-3">
      {/* Placeholder for airport image */}
      <img src={image || vipLoungePhoto} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="bg-transparent">
      <h3 className="text-base md:text-lg lg:text-xl font-bold text-vip-blue mb-1">
        {location}
      </h3>
      <p className="text-sm md:text-base text-gray-600">{code}</p>
    </div>
  </div>
)

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
      onClick={onClick}
    >
      <span className="font-medium pr-4" style={{ color: '#002C6E' }}>{question}</span>
      <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="#005AA8"/>
        </svg>
      </span>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
    >
      <p className="text-sm leading-relaxed" style={{ color: '#002C6E' }}>{answer}</p>
    </div>
  </div>
)

const VipLoungePage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const steps = [
    {
      icon: vipLoungeIcon1,
      title: 'Встреча и сопровождение',
      description: 'Вас встретит представитель в аэропорту — у входа, у стойки регистрации или в зоне прилёта. Поможет с багажом, проведёт по терминалу и сопроводит, минуя очереди.'
    },
    {
      icon: vipLoungeIcon2,
      title: 'Размещение в VIP Lounge',
      description: 'Доступ в приватную зону с удобными креслами, напитками, закусками и Wi‑Fi. Здесь можно отдохнуть, поработать, зарядить устройства или спокойно дождаться рейса.'
    },
    {
      icon: vipLoungeIcon3,
      title: 'Сопровождение до посадки',
      description: 'Вас проинформируют, когда рейс готов, и сопроводят к выходу на посадку без суеты, сохраняя максимальный комфорт до момента посадки.'
    }
  ]

  const whyNeed = [
    'Избегайте очередей и суеты аэропорта.',
    'Отдохните и расслабьтесь перед полётом.',
    'Поработайте или проведите встречи в приватной зоне.',
    'Получите персональное сопровождение и премиальный сервис.',
    'Сэкономьте время и силы, сохраните комфорт и уверенность.'
  ]

  const additional = [
    'Стоимость отличается от аэропорта к аэропорту — точные тарифы смотри внутри описания аэропорта.',
    'Бронирование необходимо оформить не менее чем за 24 часа до рейса.',
    'Сервис невозвратный.'
  ]

  const airports = [
    { code: 'DME', name: 'Домодедово', location: 'Домодедово, Россия', price: '5 500', image: airportPhoto1 },
    { code: 'AUH', name: 'Абу-Даби', location: 'Абу-Даби, ОАЭ', price: '15 000', image: airportPhoto2 },
    { code: 'SVO', name: 'Шереметьево', location: 'Шереметьево, Россия', price: '6 000', image: airportPhoto3 },
    { code: 'AYT', name: 'Анталья', location: 'Анталья, Турция', price: '3 500', image: airportPhoto4 },
    { code: 'DXB', name: 'Дубай', location: 'Дубай, ОАЭ', price: '12 000', image: airportPhoto2 },
  ]

  const faqs = [
    {
      question: 'Чем VIP Lounge отличается от бизнес-зала?',
      answer: 'VIP Lounge — это приватная зона с ограниченным количеством гостей и индивидуальным сопровождением. В отличие от бизнес-зала, здесь вы получаете персональное внимание, отдельную зону отдыха и сопровождение на всех этапах пребывания в аэропорту.'
    },
    {
      question: 'Нужно ли заранее бронировать VIP Lounge?',
      answer: 'Да, бронирование необходимо оформить не менее чем за 24 часа до рейса. Это гарантирует наличие места и подготовку персонального сопровождения.'
    },
    {
      question: 'Какие услуги включены?',
      answer: 'В услугу VIP Lounge входит встреча в аэропорту, сопровождение, доступ в приватную зону с напитками, закусками, Wi‑Fi, удобными креслами, а также сопровождение до выхода на посадку.'
    },
    {
      question: 'Можно ли заказать VIP Lounge для группы или семьи?',
      answer: 'Да, VIP Lounge можно заказать для группы или семьи. При бронировании укажите количество человек, и мы подготовим соответствующее размещение и сопровождение.'
    },
    {
      question: 'В каких аэропортах доступна услуга?',
      answer: 'VIP Lounge доступна в более чем 450 аэропортах по всему миру. Вы можете ознакомиться со списком доступных аэропортов в нашем каталоге.'
    }
  ]

  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-[#FFB700] text-white text-xs font-bold px-3 py-1 rounded-[6px]">
              Доступно в 450+ аэропортах
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-vip-blue">VIP lounge</h1>
            <p className="font-semibold leading-relaxed max-w-xl" style={{ fontSize: '16px', color: '#809DCA' }}>
              Создано для тех, кто ценит время и расслабление. Отдохните в приватной зоне с напитками, сервисом и заботой, которую вы заслуживаете.
            </p>
            <button className="bg-vip-blue text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-[6px] hover:bg-opacity-90 transition-all shadow-none">
              Забронировать
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative rounded-[6px] overflow-hidden shadow-none aspect-[4/3] bg-gray-100">
               <img src={vipLoungePhoto} alt="VIP Lounge" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        {/* Steps Indicator */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-1 relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#D9E4F8] -translate-y-1/2 z-0" />
          
          {steps.map((_, idx) => (
            <div key={idx} className="relative z-10 flex justify-start">
              <div className="bg-[#FFB700] text-white flex items-center gap-2 px-4 py-1.5 rounded-lg shadow-sm ring-8 ring-white">
                <img src={starIcon} alt="" className="brightness-0 invert" style={{ width: '20px', height: '20px' }} />
                <span className="text-sm font-bold">Шаг {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <StepCard key={idx} number={idx + 1} {...step} />
          ))}
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 md:px-8 py-8">
        <h2 className="text-2xl font-bold text-vip-blue mb-4">Описание</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          VIP Lounge — это премиальная услуга в аэропорту, которая обеспечивает спокойствие, конфиденциальность и персональное внимание. В отличие от стандартного бизнес-зала, это приватная зона с ограниченным количеством гостей и индивидуальным сопровождением. Вы избегаете очередей в терминале и шума, наслаждаетесь удобными креслами, напитками, закусками, Wi‑Fi и бизнес-зонами для отдыха и восстановления. Сервис помогает сохранить энергию и сосредоточиться на задачах без отвлекающих факторов.
        </p>
      </section>

      {/* Info Columns Section */}
      <section className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <InfoColumn title="Зачем нужен VIP lounge" items={whyNeed} />
          <InfoColumn title="Дополнительно" items={additional} />
        </div>
      </section>

      {/* Airport Selection Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-vip-blue">Выбор аэропорта</h2>
            <button className="text-vip-blue font-semibold hover:underline text-sm">Все аэропорты</button>
          </div>
          
          <div className="mb-8">
             <SearchBar />
          </div>

          <div className="relative group">
            {/* Scroll Buttons */}
            <button 
              onClick={() => handleScroll('left')}
              className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 z-10 text-vip-blue hover:text-[#809DCA] transition-colors cursor-pointer focus:outline-none shadow-none"
              aria-label="Предыдущий"
            >
              <span className="text-5xl font-light">‹</span>
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 z-10 text-vip-blue hover:text-[#809DCA] transition-colors cursor-pointer focus:outline-none shadow-none"
              aria-label="Следующий"
            >
              <span className="text-5xl font-light">›</span>
            </button>

            {/* Carousel */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {airports.map((airport, idx) => (
                <AirportCard key={idx} {...airport} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl font-bold text-vip-blue mb-2">Узнайте больше про услугу VIP lounge</h2>
        <p className="text-vip-blue mb-8 cursor-pointer hover:underline inline-block">Найти ответы на другие вопросы можно на нашей странице помощи</p>
        
        <div className="bg-blue-50/50 rounded-2xl p-6 md:p-8">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === idx}
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default VipLoungePage
