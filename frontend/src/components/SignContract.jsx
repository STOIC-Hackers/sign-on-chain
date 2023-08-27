/* eslint-disable react/prop-types */
import logo from '../assets/newlogo.png'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
const { ethereum } = window;
import { ABI } from '../CONSTANTS/Abi';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import styles from './style.module.css'




const SignContract = ({ formState }) => {
    const { cid, contractAdd, metaDatahash } = useParams()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [documentContentHash, setDocumentContentHash] = useState()
    const [showModal, setShowModal] = useState(false)
    const [fileName, setFileName] = useState()
    const [finalObj, setFinalObj] = useState(null)

    // const { useTitle, useDescription, useSignerEmail, useSignerAddress, useFile } = formState;
    // const [title] = useTitle()
    // const [description] = useDescription()
    // const [file] = useFile()

    const getData = async (cid, contractAdd) => {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider && provider?.getSigner();
        const contractInstance = new ethers.Contract(contractAdd, ABI, provider)

        const title = await contractInstance.documentTitle()
        const description = await contractInstance.documentDescription()
        const documentContentHash = await contractInstance.documentContentHash()
        const fileName = await contractInstance.fileName()
        setTitle(title)
        setDescription(description)
        setDocumentContentHash(documentContentHash)
        setFileName(fileName)

        // let res = await contractInstance.connect(signer).sign(cid)
        // console.log(res);

    }
    useEffect(() => {
        getData(cid, contractAdd)
    }, [])

    //w-2/3 my-auto mx-auto h-[100vh] overflow-scroll bg-gray-500
    if (finalObj) {
        return (
            <div className={`${styles['bg-gradient-to-br']} ${styles['animate-spin-slow']} p-8 mt-[10vh]  w-2/3 my-auto mx-auto h-[100vh] overflow-scroll shadow-2xl text-cyan-300`}
>
                <h1 className='text-3xl mt-10 font-extrabold text-pink-300'>Transaction complete!</h1>
                <h6 className='text-lg mt-5'>Access your completed polygon contract and signature packet.</h6>
                <h6 className='mt-5'><a className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ' href={`https://mumbai.polygonscan.com/address/${contractAdd}`}>View Contract</a></h6>
                <h6 className='text-sm mt-5'>Full response below:</h6>

                <pre className='ml-2 mt-6 text-sm'>{finalObj}</pre>
            </div>
        )
    }

    return (
        <>
            <div className='flex  bg-[#161911]'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
            </div>
            <div className='flex bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900 h-[100vh]'>

                {
                    showModal ? <Modal setShowModal={setShowModal} setFinalObj={setFinalObj} contractAdd={contractAdd} /> :
                        <>
                            <div className={`${styles['bg-gradient-to-br']} ${styles['animate-spin-slow']} p-8 mt-[10vh] shadow-2xl mx-auto my-auto h-[90vh] bg-gray-600 w-2/4`}>
                                <h1 className='mt-4 text-center text-4xl font-semibold text-cyan-500'>Sign Documents</h1>
                                <ul >
                                    <h1 className='text-cyan-300 text-xl '>Document title:</h1>
                                    <li className='mt-5 ml-5 text-xl font-semibold text-purple-300 '>{title}</li>
                                    <h1 className='text-cyan-300 text-xl'>Description:</h1>
                                    <li className='mt-5 ml-5 font-semibold text-xl text-purple-300'>{description}</li>
                                    <li className='mt-5 ml-5'>
                                        <a className='text-cyan-200 text-md underline' href={`https://mumbai.polygonscan.com/address/${contractAdd}`}>View Contract (Mumbai)</a>
                                    </li>
                                    <li className='mt-5 ml-5'>
                                        <a className='text-cyan-200 text-md underline' href={`https://ipfs.io/ipfs/${metaDatahash}`}>View Request</a>
                                    </li>
                                    <h1 className='mt-5 ml-5 font-bold text-xl text-cyan-300 py-5'>Documents to acknowledge:</h1>
                                    <li className='mt-5 ml-5 text-purple-300 underline '><a href={`https://ipfs.io/ipfs/${cid}`}>{fileName}</a></li>
                                    <li className='mt-12 ml-5 text-md text-cyan-300 py-1'>By continuing, you agree to the documents listed and available for download above.</li>

                                    <button onClick={() => setShowModal(true)} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mt-5 ml-5'>Accept Documents</button>
                                </ul>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default SignContract
////{`${styles['bg-gradient-to-br']} ${styles['animate-spin-slow']} p-8 mt-[10vh] w-[60vw] shadow-2xl`}
//mx-auto my-auto h-[90vh] bg-gray-600 w-2/4


