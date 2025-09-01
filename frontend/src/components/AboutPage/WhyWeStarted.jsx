import React from 'react'
import aboutImg4 from '/aboutimg4.png'
import Heading from '../commonComponents/Heading'

const WhyWeStarted = () => {
    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="grid grid-cols-12 items-center gap-16">
                    <div className="col-span-6">
                        <div className="">
                            <img src={aboutImg4} alt="aboutImg4" />
                        </div>
                    </div>
                    <div className="col-span-6 pe-10">
                        <Heading title="Why we started this Blog" className="text-left mb-4" />
                        <h6 className="text-2xl leading-8 font-bold  tracking-wide mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h6>
                        <p className="text-base mt-4 mb-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyWeStarted