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

const Author = ({ name, degignation }) => {
    const author = [
        {
            id: 1,
            name: 'John Doe',
            degignation: 'junior journalist',
            image: author4,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 2,
            name: 'Kate Smith',
            degignation: 'junior journalist',
            image: author3,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 3,
            name: 'Alice Johnson',
            degignation: 'junior journalist',
            image: author2,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 4,
            name: 'Kaira Lee',
            degignation: 'junior journalist',
            image: author1,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 5,
            name: 'Kate Smith',
            degignation: 'junior journalist',
            image: author3,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 6,
            name: 'Alice Johnson',
            degignation: 'junior journalist',
            image: author2,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
        {
            id: 7,
            name: 'Kaira Lee',
            degignation: 'junior journalist',
            image: author1,
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.",
        },
    ]
    const { id } = useParams();

    const filteredAuthor = author.filter((author) => author.id === parseInt(id));
    console.log(filteredAuthor);

    if (filteredAuthor.length === 0) {
        return <p>Author not found</p>;
    }


    return (
        <>
            <div className="container mx-auto py-section_gap">
                <div className="flex  items-center gap-4 mb-6 bg-gray-200 p-10 rounded-md">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                        <img src={filteredAuthor[0].image} alt={filteredAuthor[0].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-4/5">
                        <h2 className="text-lg font-semibold">Hey There, I am {filteredAuthor[0].name}. and welcome to my Blog</h2>
                        <p className="text-gray-600">{filteredAuthor[0].degignation}</p>
                        <p className="text-gray-600">{filteredAuthor[0].bio}</p>
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