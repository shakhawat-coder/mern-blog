import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router'
import ScrollToTop from '../commonComponents/ScrollToTop'
const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout