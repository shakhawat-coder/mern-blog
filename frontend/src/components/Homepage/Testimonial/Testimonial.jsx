import React, { useRef } from 'react'
import Slider from "react-slick";
import author1 from '/author1.png'
import author2 from '/author2.png'
import author3 from '/author3.png'
import author4 from '/author4.png'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

const Testimonial = () => {
    const sliderRef = useRef(null);
    const testimocilData = [
        {
            name: 'John Doe',
            designation: 'junior journalist',
            image: author1,
            testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: 'Jane Smith',
            designation: 'senior journalist',
            image: author2,
            testimonial: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            name: 'Alice Johnson',
            designation: 'editor',
            image: author3,
            testimonial: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            name: 'Bob Brown',
            designation: 'blogger',
            image: author4,
            testimonial: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }

    ]
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="grid grid-cols-12 bg-light_yellow p-20 rounded-lg shadow-lg items-center">
                    <div className="col-span-5 relative after:absolute after:content-[''] after:w-[2px] after:h-full after:bg-gray-400 after:right-0 after:top-0 after:z-10">
                        <h6 className="text-base leading-5 font-semibold uppercase tracking-wide mb-4">TESTIMONIALs </h6>
                        <h3 className="text-5xl leading-16 font-bold">What people say about our blog</h3>
                        <p className="text-base mt-4 mb-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>

                    </div>
                    <div className="col-span-7">
                        <Slider ref={sliderRef} {...settings} arrows={false}>
                            {testimocilData.map((item, index) => (
                                <div key={index} className="p-6 mb-6">
                                    <p className="text-2xl font-bold max-w-[500px] text-gray-700 mb-20">{item.testimonial}</p>
                                    <div className="flex items-center mb-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full mr-4" />
                                        <div>
                                            <h4 className="text-xl font-semibold">{item.name}</h4>
                                            <p className="text-gray-600">{item.designation}</p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </Slider>
                        <div className="flex justify-end mt-4">
                            <button
                                className="text-gray-600 hover:text-white h-12 w-12 flex items-center justify-center mr-2 bg-white hover:bg-black rounded-full shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                                onClick={() => sliderRef.current.slickPrev()}
                            >
                                <FaLongArrowAltLeft />
                            </button>
                            <button
                                className="text-gray-600 hover:text-white h-12 w-12 flex items-center justify-center mr-2 bg-white hover:bg-black rounded-full shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                                onClick={() => sliderRef.current.slickNext()}
                            >
                                <FaLongArrowAltRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial