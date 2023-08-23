/* eslint-disable react/prop-types */
import logo from '../assets/logo.d4fbb84b.png'
import { Link } from 'react-router-dom'


const SignContract = ({ formState }) => {
    const { useTitle, useDescription, useSignerEmail, useSignerAddress, useFile } = formState;
    const [title] = useTitle()
    const [description] = useDescription()
    const [file] = useFile()
    console.log(file);
    const [signerEmail] = useSignerEmail()
    const [signerAddress] = useSignerAddress()

    return (
        <>
            <div className='flex m-3 ml-2'>
                <Link to='/'>
                    <img className='w-44 mx-3' src={logo} alt="logo" />
                </Link>
            </div>
            <div className='flex bg-gray-300 h-[100vh]'>
                <div className='mx-auto my-auto h-[80vh] bg-white w-2/4'>
                    <h1 className='mt-4 text-center text-xl font-bold'>Sign Documents</h1>
                    <ul className='mt-8'>
                        <li className='mt-5 ml-5 text-xl font-semibold'>{title}</li>
                        <li className='mt-5 ml-5'>{description}</li>
                        <li className='mt-5 ml-5'><a className='text-blue-500' href="">View Contract (Mumbai)</a></li>
                        <li className='mt-5 ml-5'><a className='text-blue-500' href="">View Request</a></li>
                        <h1 className='mt-5 ml-5 font-bold'>Documents to acknowledge:</h1>
                        <li className='mt-5 ml-5'>{file ? file.name : "No file Selected"}</li>
                        <li className='mt-12 ml-5 text-sm'>By continuing, you agree to the documents listed and available for download above.</li>

                        <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mt-5 ml-5'>Accept Documents</button>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SignContract



