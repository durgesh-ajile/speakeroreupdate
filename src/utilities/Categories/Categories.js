import React, { useState } from 'react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCamera } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaClone } from "react-icons/fa";
import { FaScrewdriver } from "react-icons/fa";
import './Categories.css';
function Categories() {
    const [cards] =useState([{
        link:< FaCamera className='icon' />,
        title:'Advertising',
        
    },
    {
        link:<FaBook className='icon'/>,
        title:'Banking',
        
    },
    {
        link:<FaCloud className='icon'/>,
        title:'Creativity',
        
    },
    {
        link:<FaExpandArrowsAlt className='icon'/>,
        title:'Fitness',
       
    },
    {
        link:<FaClone className='icon'/>,
        title:'IT',
        
    },
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Marketing',
        
    }
    ,
    {
        link:<FaBook className='icon'/>,
        title:'Retail',
        
    },
    {
        link:<FaCloud className='icon'/>,
        title:'Agriculture',
        
    },
    {
        link:<FaExpandArrowsAlt className='icon'/>,
        title:'Business',
       
    },
    {
        link:<FaClone className='icon'/>,
        title:'Design Thinking',
        
    },
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Health',
        
    }
    ,
    {
        link:<FaCloud className='icon'/>,
        title:'Leadership',
        
    },
    {
        link:<FaExpandArrowsAlt className='icon'/>,
        title:'High Resolution',
       
    },
    {
        link:<FaClone className='icon'/>,
        title:'Oil Gas',
        
    },
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Sales',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'AI',
        
    }
    ,
    {
        link:<FaCloud className='icon'/>,
        title:'Coaching',
        
    },
    {
        link:<FaExpandArrowsAlt className='icon'/>,
        title:'Education',
       
    },
    {
        link:<FaClone className='icon'/>,
        title:'Human Resources',
        
    },
    {
        link:<FaScrewdriver className='icon'/>,
        title:'LGBTQ',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Parenting',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Soft Skills',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Automobile',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Communication',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Finance',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Innovation',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Parenting',
        
    }
    ,
    {
        link:<FaScrewdriver className='icon'/>,
        title:'Manufacturig',
        
    }
   
        
    ])
  return (
    <>
    <section>
    <div className="container5">
    <h1 className="wrap">
        <span className="first">Explore the Categories<br/>Of </span>
        <span className="second">SpeakerOne</span> </h1>
        <div className="cards5">
            {
               
                
                cards.map((card,i)=>(
                    
                    <div key={i} className="card5">
                        
                      
                        <div className="i"> {card.link}</div>
                        
                      
                        <p>
                       
                            {card.title}
                        </p>
                       

                    </div>
                ))
            }
        </div>
        </div>
  </section>
    </>
  )
}

export default Categories