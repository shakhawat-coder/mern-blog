import React from 'react'
import Heading from '../../commonComponents/Heading'
import Button from '../../commonComponents/Button'

const Contact = () => {
    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 col-start-3">
                        <div className="text-center">
                            <h6 className="text-base leading-5 font-semibold uppercase tracking-wide mb-4">Contact us</h6>
                            <Heading title="Let’s Start a Conversation" className="mb-4" />
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                        </div>

                        <div className="bg-purple py-14 px-12 mt-14 mb-8">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="col-span-1">
                                    <span className='text-base block text-gray-300 font-semibold leading-5 tracking-[5px] mb-6 uppercase border-b border-gray-500 pb-2'>Working Hours</span>
                                    <p className='text-white text-xl'>Monday To Friday</p>
                                    <p className='text-white text-xl'>9:00 AM to 8:00 PM </p>
                                    <p className="text-white text-base">Our Support Team is available 24/7</p>
                                </div>
                                <div className="col-span-1">
                                    <span className='text-base block text-gray-300 font-semibold leading-5 tracking-[5px] mb-6 uppercase border-b border-gray-500 pb-2'>Contact Us</span>
                                    <a href="tel:6777777776" className="text-white text-xl block">+6777777776</a>
                                    <a href="mailto:G2T6t@example.com" className="text-white text-xl"> G2T6t@example.com</a>
                                </div>
                            </div>
                        </div>

                        <form action="">
                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <div className="col-span-1">
                                    <input type="text" placeholder="Full Name" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none" />
                                </div>
                                <div className="col-span-">
                                    <input type="email" placeholder="Your Email" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none" />
                                </div>
                                <div className="col-span-">
                                    <select name="query-type" id="" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none">
                                        <option value="0" >Select Query Type</option>
                                        <option value="1">Query Type 1</option>
                                        <option value="2">Query Type 2</option>
                                        <option value="3">Query Type 3</option>
                                        <option value="4">Query Type 4</option>
                                        <option value="5">Query Type 5</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <textarea placeholder="Message" required className="w-full border border-gray-300 px-4 py-3 focus:outline-none"></textarea>
                                </div>
                            </div>
                            <div className=" mt-4">
                                <Button buttonText="Send Message" widht={'w-full'} bgColor='bg-yellow-500' className="text-white" />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Contact