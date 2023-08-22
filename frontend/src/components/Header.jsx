import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.d4fbb84b.png'
const Header = () => {
    return (
        <>
            <div className='flex m-3 ml-2'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
                <button className='bg-blue-500 hover:bg-blue-400 mx-3 p-2 text-white '>Login with MetaMask</button>
                <Link to='/create'>
                    <h5 className='mx-3 text-center hover:text-blue-400'>Create E-signature request</h5>
                </Link>
                <Link to='/history'>
                    <h5 className='mx-3 text-center hover:text-blue-400'>Lookup</h5>
                </Link>
            </div>
        </>
    )
}

export default Header