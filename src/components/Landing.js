import React from 'react'
import Home from './Home'
import Works from '../utilities/works/Works'
import Agriculture from '../utilities/agriculture/Agriculture'
import Goldmine from '../utilities/GoldMine/Goldmine'
import Footer from '../utilities/footer/Footer'
import Categories from '../utilities/agriculture/Categories'

const Landing = () => {
  return (
    <div className='nav-margin'>
      <Home/>
      <Works/>
      <Categories/>
      {/* <Agriculture/> */}
      <Goldmine/>
      <Footer/>
    </div>
  )
}

export default Landing
