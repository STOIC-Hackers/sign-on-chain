import { Link } from 'react-router-dom'
import logo from '../assets/newlogo.png'
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

    // // usetstate for storing and retrieving wallet details
    // const [data, setdata] = useState({
    //     address: "",
    //     Balance: null,
    // });

    // // Button handler button for handling a
    // // request event for metamask
    // const btnhandler = () => {

    //     // Asking if metamask is already present or not
    //     if (window.ethereum) {

    //         // res[0] for fetching a first wallet
    //         window.ethereum
    //             .request({ method: "eth_requestAccounts" })
    //             .then((res) => accountChangeHandler(res[0]));
    //     } else {
    //         alert("install metamask extension!!");
    //     }
    // };

    // // getbalance function for getting a balance in
    // // a right format with help of ethers
    // const getbalance = (address) => {

    //     // Requesting balance method
    //     window.ethereum
    //         .request({
    //             method: "eth_getBalance",
    //             params: [address, "latest"]
    //         })
    //         .then((balance) => {
    //             // Setting balance
    //             console.log(balance);
    //             setdata({
    //                 Balance: balance / 10 ** 18,
    //             });
    //         });
    // };
    // // Function for getting handling all events
    // const accountChangeHandler = (account) => {
    //     // Setting an address data
    //     setdata({
    //         address: account,
    //     });

    //     // Setting a balance
    //     getbalance(account);
    // };
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
                    <img className=' h-[8vh] w-[7vw] mx-4' src={logo} alt="logo" />
                </Link>
                {
                    address ? <h5>Hello:{address}</h5> : <button onClick={handleMetaMaskLogin} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-lg rounded-lg px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] font-semibold'>Login with MetaMask</button>

                }

                <Link to='/create'>
                    <h5 className='mx-3 text-center text-large hover:text-blue-400 pt-2 font-semibold'>Create-E-signature-request</h5>
                </Link>
                <Link to='/history'>
                    <h5 className='mx-3 text-center text-large hover:text-blue-400 pt-2 font-semibold'>Lookup</h5>
                </Link>
                <button onClick={handleLogout} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg  px-5 py-2.5 text-lg text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] font-semibold'>Logout</button>
            </div >
        </>
    )
}

export default Header