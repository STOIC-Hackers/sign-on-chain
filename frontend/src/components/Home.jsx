import React from 'react'
import Header from './Header'
import Footer from './Footer'
import bgImg from '../assets/home-bg-img.png'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Header />
            <div className='bg-gray-200 h-screen flex justify-center justify-items-center '>
                <div className='w-1/4 mt-44'>
                    <h1 className='text-3xl font-semibold ' >Polygon-backed esignature requests for everyone|.</h1>
                    <ul className='mt-5 font-semibold text-lg'>
                        <li className='mt-5 '>Free esignature request page hosting on IPFS</li>
                        <li className='mt-5 '>Completed esignatures saved on Smart Contracts</li>
                        <li className='mt-5 '>No vendor agreements required</li>
                    </ul>
                    <Link to='/create'>
                        <button className='bg-blue-500 hover:bg-blue-400 p-2 mt-10 text-white'>Create E-signature request</button>
                    </Link>
                </div>
                <img className='w-[500px] h-[400px] mt-36' src={bgImg} alt="background-Image" />
            </div>
            <Footer />
        </>
    )
}

export default Home