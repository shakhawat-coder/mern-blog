import React from 'react'
import Heading from '../../commonComponents/Heading'
import AuthorCard from '../../commonComponents/AuthorCard'
import author1 from '/author1.png'
import author2 from '/author2.png'
import author3 from '/author3.png'
import author4 from '/author4.png'
import Author from '../../pages/Author/Author'

const AuthorList = ({ limit = 4 }) => {
    const author = [
        {
            id: 1,
            name: 'John Doe',
            degignation: 'junior journalist',
            image: author4,
        },
        {
            id: 2,
            name: 'Kate Smith',
            degignation: 'junior journalist',
            image: author3,
        },
        {
            id: 3,
            name: 'Alice Johnson',
            degignation: 'junior journalist',
            image: author2,
        },
        {
            id: 4,
            name: 'Kaira Lee',
            degignation: 'junior journalist',
            image: author1,
        },
        {
            id: 5,
            name: 'Kate Smith',
            degignation: 'junior journalist',
            image: author3,
        },
        {
            id: 6,
            name: 'Alice Johnson',
            degignation: 'junior journalist',
            image: author2,
        },
        {
            id: 7,
            name: 'Kaira Lee',
            degignation: 'junior journalist',
            image: author1,
        },
    ]
    return (
        <>
            <div className="container mx-auto py-section_gap">
                <Heading title="List of  Authors" className="text-center mb-10" />
                <div className="grid grid-cols-12 gap-6">
                    {author.slice(0, limit).map((item, index) => (
                        <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3">
                            <AuthorCard {...item} />
                            <Author {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AuthorList