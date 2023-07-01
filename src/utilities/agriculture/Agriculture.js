import React from 'react'
import './agri.css'
import group1 from '../../images/Group1.png'
import group2 from '../../images/Group2.png'
import group3 from '../../images/Group3.png'
import group4 from '../../images/Group4.png'

const Agriculture = () => {
  return (

    <div className='agri-container'>
    <div className="agri-heading">
        <h1>Up to 2,00,000 speaking slots in 4000-4000 worldwide oppotunities <br/> across <span style={{color:'#24754F'}}>categories</span> annually</h1>
    </div>
    <div className='agri-imgs'>
            <div className="agri-img-box">
                <img src={group4}/>
            </div>
            <div className="agri-img-box">
                <img src={group3}/>
            </div>
            <div className="agri-img-box">
                <img src={group2}/>
            </div>
            <div className="agri-img-box">
                <img src={group1}/>
            </div>
    </div>
    </div>
  )
}

export default Agriculture