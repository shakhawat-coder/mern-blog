import React from 'react'
import JoinTeam from '../../commonComponents/JoinTeam'
import Category from '../../commonComponents/Category'
import AllPost from '../../BlogPage/AllPost/AllPost'

const Blog = () => {
    return (
        <>
            <div className="container mx-auto pt-10">
                <h1 className="text-5xl leading-16 font-bold">All Post</h1>
            </div>

            <AllPost />
            <Category title='All Categories' limit={Infinity} />
            <JoinTeam />

        </>
    )
}

export default Blog