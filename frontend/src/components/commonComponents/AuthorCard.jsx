import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router';

const AuthorCard = ({ id, name, degignation, image }) => {
    return (
        <>

            <div className=" flex flex-col items-center gap-4 mb-6 bg-gray-200 py-10 rounded-md">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                    <Link to={"/author/" + id} className="text-lg font-semibold">{name}</Link>
                    <p className="text-gray-600">{degignation}</p>
                </div>
                <div className="flex gap-4 mt-2">
                    <a href="#" className="text-black hover:underline"><FaFacebook /></a>
                    <a href="#" className="text-black hover:underline"><FaXTwitter /></a>
                    <a href="#" className="text-black hover:underline"><FaLinkedin /></a>
                    <a href="#" className="text-black hover:underline"><FaInstagram /></a>
                </div>
            </div>
        </>
    )
}

export default AuthorCard