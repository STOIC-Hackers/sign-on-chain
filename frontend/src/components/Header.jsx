import { Link } from 'react-router-dom'
import logo from '../assets/logo.d4fbb84b.png'
import { ethers } from 'ethers';
import { useEffect, useLayoutEffect, useState } from 'react';
// import Login from './login';
import { ABI } from '../CONSTANTS/Abi';
import { Bytecode } from '../CONSTANTS/Bytecode';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';



const Header = () => {
    const [address, setAddress] = useState(null)

    useLayoutEffect(() => {
        const res = localStorage.getItem('address', address)
        if (res) {
            setAddress(res)
        }
    }, [])

    useLayoutEffect(() => {
        if (address) {
            localStorage.setItem('address', address)
        }
    }, [address])

    async function handleMetaMaskLogin() {
        let provider;
        if (window.ethereum == null) {
            console.log("MetaMask not installed; using read-only defaults")
            provider = ethers.getDefaultProvider()
        } else {
            provider = new ethers.BrowserProvider(window.ethereum)
            let signer = await provider.getSigner();
            setAddress(signer.address)
        }

    }
    async function handleLogout() {
        setAddress(null)
        localStorage.removeItem('address');
    }

    return (
        <>
            <div className='flex m-3 ml-2'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
                {
                    address ? <h5>Hello:{address}</h5> : <button onClick={handleMetaMaskLogin} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Login with MetaMask</button>

                }

                <Link to='/create'>
                    <h5 className='mx-3 text-center text-sm hover:text-blue-400 pt-2'>Create-E-signature-request</h5>
                </Link>
                <Link to='/history'>
                    <h5 className='mx-3 text-center text-sm hover:text-blue-400 pt-2'>Lookup</h5>
                </Link>
                <button onClick={handleLogout} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Logout</button>
            </div >
        </>
    )
}

export default Header