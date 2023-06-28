import React, { useEffect, useState } from 'react'
import './Categories.css'
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