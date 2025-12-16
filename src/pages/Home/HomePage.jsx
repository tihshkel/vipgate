import React from 'react'
import Hero from '../../components/sections/Hero'
import VIPServices from '../../components/sections/VIPServices'
import LoyaltyProgram from '../../components/sections/LoyaltyProgram'
import PopularAirports from '../../components/sections/PopularAirports'
import TravelWithoutQueues from '../../components/sections/TravelWithoutQueues'
import HowItWorks from '../../components/sections/HowItWorks'
import AboutUs from '../../components/sections/AboutUs'

const HomePage = () => {
  return (
    <>
      <Hero />
      <VIPServices />
      <LoyaltyProgram />
      <PopularAirports />
      <TravelWithoutQueues />
      <HowItWorks />
      <AboutUs />
    </>
  )
}

export default HomePage
