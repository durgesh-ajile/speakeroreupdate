import React, { useEffect, useState } from 'react'
import './Categories.css'

// import agriculture from '../../images/categories_img/agriculture.png'
// import Advertising from '../../images/categories_img/Advertising.png'
// import banking from '../../images/categories_img/banking.png'
// import marketing from '../../images/categories_img/marketing.png'
// import parenting from '../../images/categories_img/parenting.png'

// import Artificial_Intelligence from '../../images/categories_img/Artificial_Intelligence.png'
// import Automobile from '../../images/categories_img/Automobile.png'
// import Business from '../../images/categories_img/Business.png'
// import Coaching from '../../images/categories_img/Coaching.png'
// import Communication from '../../images/categories_img/Communication.png'
// import Creativity from '../../images/categories_img/Creativity.png'
// import Design_Thinking from '../../images/categories_img/Design_Thinking.png'
// import Education from '../../images/categories_img/Education.png'
// import Finance from '../../images/categories_img/Finance.png'
// import Health from '../../images/categories_img/Health.png'
// import Human_Resources from '../../images/categories_img/Human_Resources.png'
// import Innovation from '../../images/categories_img/Innovation.png'
// import IT from '../../images/categories_img/IT.png'
// import Leadership from '../../images/categories_img/Leadership.png'
// import LGBTQ from '../../images/categories_img/LGBTQ.png'
// import Manufacturing from '../../images/categories_img/Manufacturing.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Categories = ({ data, text }) => {

    const [carousel, setCarousel] = useState(data)
    var settings = {
        dots: !true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: text ? 2000 : 4000,
        pauseOnHover: true,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        const sortArrayFunction = (carousel) => {
            // Create a copy of the array
            const sortedArray = [...carousel];

            // Perform bubble sort algorithm
            for (let i = 0; i < sortedArray.length - 1; i++) {
                for (let j = 0; j < sortedArray.length - 1 - i; j++) {
                    if (sortedArray[j][0] > sortedArray[j + 1][0]) {
                        // Swap elements
                        const temp = sortedArray[j];
                        sortedArray[j] = sortedArray[j + 1];
                        sortedArray[j + 1] = temp;
                    }
                }
            }

            // Update the state with the sorted array
            setCarousel(sortedArray);
        };

        sortArrayFunction(carousel)

        if (text) {
            // Convert the first element of each subarray to uppercase
            const modifiedCarousel = carousel.map(([title, value]) => [title.toUpperCase(), value]);
            setCarousel(modifiedCarousel);
        }

    }, [])

    return (
        <div className='Categories_container' style={{ backgroundColor: text && '#FDFAE8' }}>
            <div className='Categories_container_fluid'>
                {
                    text ?
                        <div className="Categories_container_fluid_text">
                            <h1>4000-40000 worldwide opportunities </h1>
                            <h1>across <span style={{ color: '#24754F' }}>categories</span> annually</h1>
                        </div>
                        :
                        <div className="Categories_container_fluid_text">
                            <h1 style={{ fontSize: '13px' }}> <span style={{ color: '#24754F' }}> SpeakerOre - </span>A Goldmine for Speakers</h1>
                        </div>
                }
                <Slider {...settings}>
                    {
                        carousel?.map((value, i) => {
                            return (<div key={i} className='Categories_carousel_imgNh3'>
                                <img src={carousel[i][1]} alt="" />
                                <h3 style={{ fontSize: !text && '10px' }}>{carousel[i][0]}</h3>
                            </div>)
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Categories