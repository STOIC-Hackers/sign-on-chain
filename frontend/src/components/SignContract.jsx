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




const SignContract = ({ formState }) => {
    const { cid, contractAdd } = useParams()
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

    if (finalObj) {
        return <pre className='text-white'>
            {finalObj}
        </pre>
    }

    return (
        <>
            <div className='flex m-3 ml-2'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
            </div>
            <div className='flex bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900 h-[100vh]'>
                <div className='mx-auto my-auto h-[90vh] bg-gray-600 w-2/4'>
                    <h1 className='mt-4 text-center text-4xl font-semibold text-cyan-500'>Sign Documents</h1>
                    <ul className='mt- bg-gray-600'>
                        <li className='mt-5 ml-5 text-xl font-semibold'>{title}</li>
                        <li className='mt-5 ml-5'>{description}</li>
                        <li className='mt-5 ml-5'><a className='text-cyan-300 text-xl' href={`https://mumbai.polygonscan.com/address/${contractAdd}`}>View Contract (Mumbai)</a></li>
                        <li className='mt-5 ml-5'><a className='text-cyan-300 text-xl' href="">View Request</a></li>
                        <h1 className='mt-5 ml-5 font-bold text-xl text-cyan-300 py-5'>Documents to acknowledge:</h1>
                        <li className='mt-5 ml-5'><a href={`https://ipfs.io/ipfs/${cid}`}>{fileName}</a></li>
                        <li className='mt-12 ml-5 text-md text-cyan-300 py-1'>By continuing, you agree to the documents listed and available for download above.</li>

                        <button onClick={() => null} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mt-5 ml-5'>Accept Documents</button>
                    </ul>
                    <Modal setFinalObj={setFinalObj} contractAdd={contractAdd} />
                </div>
            </div>
        </>
    )
}

export default SignContract



