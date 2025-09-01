import React from 'react'
import JoinTeam from '../../commonComponents/JoinTeam'
import AuthorList from '../../Homepage/AuthorList/AuthorList'
import WhyWeStarted from '../../AboutPage/WhyWeStarted'
import aboutImg2 from '/aboutimg2.png'
import aboutImg3 from '/aboutimg3.png'
import Heading from '../../commonComponents/Heading'

const About = () => {
    return (
        <>
            <div className="container mx-auto pt-section_gap">
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-5 col-start-2">
                        <div className="p-10 bg-white mb-[-40px] z-10 relative">
                            <span className="text-base block font-semibold leading-5 tracking-[5px] mb-6 uppercase">About Us</span>
                            <Heading title="We are a team of content writers who share their learnings" className=" mb-4"></Heading>
                        </div>

                    </div>
                    <div className="col-span-5">
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="relative">
                    <img src={aboutImg2} alt="aboutImg2" />
                    <div className="absolute bottom-0 left-20 transform">
                        <div className="bg-yellow-300 text-black py-10 px-10 flex gap-10">
                            <div className="">
                                <span className='text-5xl font-bold block'>10k+</span>
                                <span>Blogs Published</span>
                            </div>
                            <div className="">
                                <span className='text-5xl font-bold block'>18k+</span>
                                <span>Views on Finsweet</span>
                            </div>
                            <div className="">
                                <span className='text-5xl font-bold block'>30k+</span>
                                <span>Total active Users</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="">
                <div className="container mx-auto pb-section_gap">
                    <div className="bg-gray-100 py-24 px-20 relative after:absolute after:bg-yellow-300 after:h-4 after:w-3/5 after:-top-4 after:left-20 after:transition-all after:duration-500 before:absolute before:bg-purple before:h-4 before:w-1/5 before:-top-4 before:left-20 before:transition-all before:duration-500 before:z-10">
                        <div className="grid grid-cols-12 gap-15">
                            <div className="col-span-6">
                                <span className="text-base block font-semibold leading-5 tracking-[5px] mb-6 uppercase">Our mision</span>
                                <h3 className='text-[28px] font-bold text-secondary leading-10 pb-4'>Creating valuable content for creatives all around the world</h3>
                                <p className="text-gray-600 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <div className="col-span-6">
                                <span className="text-base block font-semibold leading-5 tracking-[5px] mb-6 uppercase">Our Vision</span>
                                <Heading title="A platform that empowers individuals to improve" className=" mb-4"></Heading>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className="">
                <div className="container mx-auto py-section_gap">
                    <div className="grid grid-cols-12 items-center gap-16">

                        <div className="col-span-6 pe-10">
                            <Heading title="Our team of creatives" className="text-left mb-4" />
                            <h6 className="text-2xl leading-8 font-bold  tracking-wide mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h6>
                            <p className="text-base mt-4 mb-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                        </div>
                        <div className="col-span-6">
                            <div className="">
                                <img src={aboutImg3} alt="aboutImg3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WhyWeStarted />
            <AuthorList limit={Infinity} />
            <JoinTeam />
        </>
    )
}

export default About