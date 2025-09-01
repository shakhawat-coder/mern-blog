import React from 'react'

const Heading = ({ title, className }) => {
    return (
        <h2 className={`text-4xl font-bold text-secondary leading-12 ${className || ''}`}>
            {title}
        </h2>
    )
}

export default Heading