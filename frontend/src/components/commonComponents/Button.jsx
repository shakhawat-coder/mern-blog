import React from 'react'

const Button = ({ buttonText, bgColor = 'bg-white', widht }) => {
    return (
        <button
            type="button"
            className={`px-12 py-4 ${bgColor} ${widht}  text-black font-bold cursor-pointer`}
        >
            {buttonText}
        </button >
    )
}

export default Button