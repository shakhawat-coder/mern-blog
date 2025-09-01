import React from 'react'
import { Link } from 'react-router'
import Button from '../../commonComponents/Button'

const Navbar = () => {
    return (
        <>
            <div className="bg-[#232536] sticky top-0 z-50">
                <div className="container mx-auto">
                    <div className=" flex justify-between py-3 items-center">
                        <div className="">
                            <Link to="/" className="text-white text-2xl font-bold"><h1 className="text-2xl font-bold text-white">Blog</h1></Link>

                        </div>
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-base text-white">Home</Link>
                            <Link to="/blog" className="text-base text-white">Blog</Link>
                            <Link to="/about" className="text-base text-white">About Us</Link>
                            <Link to="/contact" className="text-base text-white">Contact Us</Link>
                            <Button buttonText="Subscribe" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar