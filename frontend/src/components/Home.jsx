import Header from './Header'
import Footer from './Footer'
import bgImg from '../assets/newlogo.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = ({ accountAddress, setAccountAddress, setChainId, chainId }) => {

    useEffect(() => {
        async function getChainId() {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(chainId)
            console.log(chainId);
        }
        getChainId()
    })

    return (
        <>
            <Header chainId={chainId} setChainId={setChainId} accountAddress={accountAddress} setAccountAddress={setAccountAddress} />
            <div className='bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900 h-screen flex justify-center justify-items-center py-4 '>
                <div className='w-1/4 mt-44'>
                    <h1 className=" text-4xl font-extrabold animate-pulse bg-gradient-to-r from-pink-500 via-green-500 to-violet-500 bg-clip-text text-transparent"> Blockchain-backed</h1>
                    <h1 className='text-3xl font-semibold text-white' > esignature requests for everyone|.</h1>
                    <ul className='mt-5 font-semibold text-lg'>
                        <li className='mt-5 text-white'>Free esignature request page hosting on IPFS</li>

                        <li className='mt-5 text-white'>Completed esignatures saved on Smart Contracts</li>

                        <li className='mt-5 text-white py-3'>No vendor agreements required</li>


                    </ul>
                    <Link to='/create'>
                        <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Create E-signature request</button>
                    </Link>
                </div>
                <img className='w-[500px] h-[400px] mt-36' src={bgImg} alt="background-Image" />
            </div>
            <Footer />
        </>
    )
}

export default Home
// <hr class="w-4 h-4 mx-auto my-8 bg-gray-200 border-0 rounded md:my-3 dark:bg-gray-700"></hr>