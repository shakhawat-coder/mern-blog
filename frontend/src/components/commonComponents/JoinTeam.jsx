import React from 'react'
import Heading from './Heading'
import { Link } from 'react-router'
import Button from './Button'

const JoinTeam = () => {
    return (
        <>
            <div className="container py-section_gap">
                <div className="flex flex-col items-center justify-center max-w-1/3 mx-auto">
                    <Heading title="Join our team to be a part of our story" className="text-center mb-4" />
                    <p className="text-center pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    <Link to="/careers" className="text-blue-500 hover:underline"><Button buttonText="Join Now" bgColor='bg-yellow-500' className="text-white mt-8" /></Link>

                </div>
            </div>
        </>
    )
}

export default JoinTeam