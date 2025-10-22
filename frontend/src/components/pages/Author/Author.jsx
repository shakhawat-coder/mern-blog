import React from 'react'
import { useParams } from 'react-router';
import author1 from '/author1.png'
import author2 from '/author2.png'
import author3 from '/author3.png'
import author4 from '/author4.png'

import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import AllPost from '../../BlogPage/AllPost/AllPost';
import { useGetSingleUserQuery } from '../../../Features/Api/blog.Api';

const Author = ({  }) => {
    const {id}=useParams();
    const {data,error ,isLoading}=useGetSingleUserQuery(id);
    const author=data?.data;
    console.log(author);
    


    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="flex  items-center gap-4 mb-6 bg-gray-200 p-10 rounded-md">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                        <img src={author?.profilePic} alt={author?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-4/5">
                        <h2 className="text-lg font-semibold">Hey There, I am {author?.name}. and welcome to my Blog</h2>
                        <p className="text-gray-600">{author?.degignation}</p>
                        <p className="text-gray-600">{(author?.bio)?author?.bio:"A passionate Junior Journalist dedicated to uncovering facts and sharing impactful stories. Skilled in research, writing, and digital reporting, with a keen interest in current affairs and human-interest topics. Eager to learn from senior professionals while bringing fresh perspectives and creativity to every assignment."}</p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="text-black hover:underline"><FaFacebook /></a>
                            <a href="#" className="text-black hover:underline"><FaXTwitter /></a>
                            <a href="#" className="text-black hover:underline"><FaLinkedin /></a>
                            <a href="#" className="text-black hover:underline"><FaInstagram /></a>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="container mx-auto pt-10">
                <h1 className="text-5xl leading-16 font-bold">My Post</h1>
            </div>
            <AllPost />
        </>
    )
}

export default Author