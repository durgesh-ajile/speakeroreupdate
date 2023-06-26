import React, { useState } from 'react'
import Home from './Home'
import Works from '../utilities/works/Works'
// import Agriculture from '../utilities/agriculture/Agriculture'
import Goldmine from '../utilities/GoldMine/Goldmine'
import Footer from '../utilities/footer/Footer'
import Categories from '../utilities/agriculture/Categories'




import agriculture from '../../src/images/categories_img/agriculture.png'
import Advertising from '../../src/images/categories_img/Advertising.png'
import banking from '../../src/images/categories_img/banking.png'
import marketing from '../../src/images/categories_img/marketing.png'
import parenting from '../../src/images/categories_img/parenting.png'

import Artificial_Intelligence from '../../src/images/categories_img/Artificial_Intelligence.png'
import Automobile from '../../src/images/categories_img/Automobile.png'
import Business from '../../src/images/categories_img/Business.png'
import Coaching from '../../src/images/categories_img/Coaching.png'
import Communication from '../../src/images/categories_img/Communication.png'
import Creativity from '../../src/images/categories_img/Creativity.png'
import Design_Thinking from '../../src/images/categories_img/Design_Thinking.png'
import Education from '../../src/images/categories_img/Education.png'
import Finance from '../../src/images/categories_img/Finance.png'
import Health from '../../src/images/categories_img/Health.png'
import Human_Resources from '../../src/images/categories_img/Human_Resources.png'
import Innovation from '../../src/images/categories_img/Innovation.png'
import IT from '../../src/images/categories_img/IT.png'
import Leadership from '../../src/images/categories_img/Leadership.png'
import LGBTQ from '../../src/images/categories_img/LGBTQ.png'
import Manufacturing from '../../src/images/categories_img/Manufacturing.png'


const Landing = () => {

  const[cerousel, setCarousel] = useState([
    ["agriculture", agriculture],
    ["Advertising", Advertising],
    ["banking", banking],
    ["marketing", marketing],
    ["parenting", parenting],
    ["Artificial", Artificial_Intelligence],
    ["Automobile", Automobile],
    ["Business", Business],
    ["Coaching", Coaching],
    ["Communication", Communication],
    ["Creativity", Creativity],
    ["Design Thinking", Design_Thinking],
    ["Education", Education],
    ["Finance", Finance],
    ["Health", Health],
    ["Human Resources", Human_Resources],
    ["Innovation", Innovation],
    ["IT", IT],
    ["Leadership", Leadership],
    ["LGBTQ", LGBTQ],
    ["Manufacturing", Manufacturing]
])

  return (
    <div className='nav-margin'>
      <Home/>
      <Works/>
      <Categories data={cerousel} text/>
      {/* <Agriculture/> */}
      <Goldmine/>
      {/* <Footer/> */}
    </div>
  )
}

export default Landing
