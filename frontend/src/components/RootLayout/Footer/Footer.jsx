import React from 'react'
import { Link } from 'react-router'
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import Button from '../../commonComponents/Button'
const Footer = () => {
    return (
        <>
            <footer className="bg-[#232536]">
                <div className="container mx-auto py-15 ">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <Link to="/" className="text-white text-2xl font-bold">Logo</Link>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="text-base text-white">Home</Link>
                            <Link to="/blog" className="text-base text-white">Blog</Link>
                            <Link to="/about" className="text-base text-white">About Us</Link>
                            <Link to="/contact" className="text-base text-white">Contact Us</Link>
                            <Link to="/privacy-policy" className="text-base text-white">Privacy Policy</Link>

                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-4 bg-white/5 mt-10 p-10">
                        <div className="col-span-6">
                            <h2 className="font-bold text-4xl leading-12 text-white">Subscribe to our news letter to get latest updates and news</h2>
                        </div>
                        <div className="col-span-6 flex items-center justify-end">
                            <form className="flex items-center space-x-4">
                                <input type="email" placeholder="Enter your email" className="px-4 h-14 text-gray-400 border border-gray-500 w-full placeholder:text-gray-400" />
                                <Button buttonText="Subscribe" bgColor='bg-yellow-500' className="text-white" />
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <div className="">
                            <p className="text-white">Finstreet 118 2561 Fintown</p>
                            <p className="text-white flex items-center gap-4">
                                <a href="mailto:Hello@finsweet.com" className="hover:underline">Hello@finsweet.com</a>
                                {" "}{/* Add space between email and phone */}
                                <a href="tel:02079932905" className="hover:underline">020 7993 2905</a>
                            </p>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="text-white hover:underline"><FaFacebook /></a>
                            <a href="#" className="text-white hover:underline"><FaXTwitter /></a>
                            <a href="#" className="text-white hover:underline"><FaLinkedin /></a>
                            <a href="#" className="text-white hover:underline"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer