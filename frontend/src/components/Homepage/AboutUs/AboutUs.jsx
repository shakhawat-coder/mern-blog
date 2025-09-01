import React from 'react'
import Heading from '../../commonComponents/Heading'
import { Link } from 'react-router'

const AboutUs = () => {
    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="bg-gray-100 py-24 px-20 relative after:absolute after:bg-yellow-300 after:h-4 after:w-4/5 after:-top-4 after:right-0 after:transition-all after:duration-500 before:absolute before:bg-purple before:h-4 before:w-1/5 before:-top-4 before:right-0 before:transition-all before:duration-500 before:z-10">
                    <div className="grid grid-cols-12 gap-15">
                        <div className="col-span-6">
                            <span className="text-base block font-semibold leading-5 tracking-[5px] mb-6 uppercase">About Us</span>
                            <Heading title="We are a community of content writers who share their learnings" className=" mb-4"></Heading>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <Link to="/about" className="text-purple hover:underline mt-4 inline-block">Read More</Link>
                        </div>
                        <div className="col-span-6">
                            <span className="text-base block font-semibold leading-5 tracking-[5px] mb-6 uppercase">Our mision</span>
                            <h3 className='text-[28px] font-bold text-secondary leading-10 pb-4'>Creating valuable content for creatives all around the world</h3>
                            <p className="text-gray-600 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutUs