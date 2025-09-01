import React from 'react'
import Banner from '../../Homepage/Banner/Banner'
import FeaturedPost from '../../Homepage/FeaturePost/FeaturedPost'
import AboutUs from '../../Homepage/AboutUs/AboutUs'
import Category from '../../commonComponents/Category'
import OurStory from '../../Homepage/OurStory/OurStory'
import AuthorList from '../../Homepage/AuthorList/AuthorList'
import JoinTeam from '../../commonComponents/JoinTeam'
import Testimonial from '../../Homepage/Testimonial/Testimonial'

const Home = () => {
    return (
        <>
            <Banner />
            <FeaturedPost />
            <AboutUs />
            <Category />
            <OurStory />
            <AuthorList />
            <Testimonial />
            <JoinTeam />
        </>
    )
}

export default Home