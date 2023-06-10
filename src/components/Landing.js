import React from 'react'
import Home from './Home'
import Works from '../utilities/works/Works'
import Agriculture from '../utilities/agriculture/Agriculture'
import Goldmine from '../utilities/GoldMine/Goldmine'
import Footer from '../utilities/footer/Footer'

const Landing = () => {
  return (
    <div>
      <Home/>
      <Works/>
      <Agriculture/>
      <Goldmine/>
      <Footer/>
    </div>
  )
}

export default Landing
