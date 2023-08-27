import { Link } from 'react-router-dom'
import logo from '../assets/newlogo.png'
import { ethers } from 'ethers';
import { useEffect, useLayoutEffect, useState } from 'react';
// import Login from './login';
import { ABI } from '../CONSTANTS/Abi';
import { Bytecode } from '../CONSTANTS/Bytecode';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';



const Header = ({ accountAddress, setAccountAddress, chainId, setChainId }) => {

    const reqAccounts = () => {
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                    setAccountAddress(res[0])
                });
        }
    }

    useEffect(() => {
        reqAccounts()
    }, [])

    window.ethereum.on('accountsChanged', () => reqAccounts());

    const btnhandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            reqAccounts()
        } else {
            alert("install metamask extension!!");
        }
    };

    return (
        <>
            <div className='flex px-2 p-2 bg-black text-white  '>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
                {
                    accountAddress ? <h5 className='text-cyan-500 mt-7'>Hello:{accountAddress}</h5> : <button onClick={btnhandler} className='text-2xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Login with MetaMask</button>

                }

                <Link to='/create'>
                    <h5 className=' mx-auto  py-5 px-5 ml-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Create-E-signature-request</h5>
                </Link>
            </div >
        </>
    )
}

export default Header