import { Link } from 'react-router-dom'
import logo from '../assets/logo.d4fbb84b.png'
const Header = () => {
    return (
        <>
            <div className='flex m-3 ml-2'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
                <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Login with MetaMask</button>
                <Link to='/create'>
                    <h5 className='mx-3 text-center text-sm hover:text-blue-400 pt-2'>Create-E-signature-request</h5>
                </Link>
                <Link to='/history'>
                    <h5 className='mx-3 text-center text-sm hover:text-blue-400 pt-2'>Lookup</h5>
                </Link>
            </div>
        </>
    )
}

export default Header