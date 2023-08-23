/* eslint-disable react/prop-types */
import { useState } from 'react';
import Header from './Header'
import { FileUploader } from "react-drag-drop-files";
import Footer from './Footer';
import { Link } from 'react-router-dom';

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

function DragDrop({ useFile }) {
    const [file, setFile] = useFile();

    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
}

const Create = ({ formState }) => {
    //{ useTitle, useDescription, useSignerEmail, useSignerAddress }
    const { useTitle, useDescription, useSignerEmail, useSignerAddress, useFile } = formState;

    // const [demo, setDemo] = useTitle()
    // console.log(demo);
    // setDemo(() => "change")
    const [title, setTitle] = useTitle()
    const [description, setDescription] = useDescription()
    const [signerEmail, setSignerEmail] = useSignerEmail()
    const [signerAddress, setSignerAddress] = useSignerAddress()

    const handleForm = (e) => {
        e.preventDefault()
        if (!title || !description || !signerAddress || !signerEmail) {
            console.log("Fields should not be empty");
            return
        }
    }
    return (
        <>
            <Header />
            <div className='bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900 min-h-fit flex justify-center p-1'>
                <div className='bg-gray-600 w-2/4 mt-16'>
                    <h1 className='text-2xl mt-5 ml-5 font-semibold text-white'>Create new esignature request</h1>
                    <form onSubmit={handleForm} >
                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-white'>Esignature request title:</h4>

                            <input value={title} onChange={(e) => setTitle(e.target.value)}
                                placeholder='Title of the E-signature request'
                                className='block border-2 mt-5 h-12 ml-5 w-[96%] max-w-full rounded-lg'
                                type="text"
                                name="title"
                                id=""
                            />

                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description of the E-signature request'
                                className='border-2 mt-5 ml-5 block w-[96%] max-w-full bg-gray-300 rounded-lg'
                                name="description"
                                cols="96"
                                rows="2"
                            />

                        </section>

                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-whtie text-white'>Upload Documents to E-sign:</h4>
                            {/* <input type="file" name="docfile" id="" /> */}
                            <div className='ml-5 mt-2'>
                                <DragDrop useFile={useFile} />
                            </div>
                            <h5 className='font-semibold ml-5 mt-2 text-white'>Files to upload:</h5>
                        </section>

                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-white'>Enter signer address:</h4>
                            <p className='ml-5 text-white'>In order to sign or agree to the documents, the viewer or potential signer of the documents must prove ownership of a particular address</p>
                            <input value={signerEmail} onChange={(e) => setSignerEmail(e.target.value)}
                                placeholder="Enter Signer's Email " className='border-2 mt-5 ml-5 w-[96%] h-12 text-cyan-500' type="email" name="signerEmail" id="" />

                            <input value={signerAddress} onChange={(e) => setSignerAddress(e.target.value)}
                                placeholder='Signer Address:' className='border-2 my-5 ml-5 w-[96%] h-12' type="text" name="signerAddress" id="" />

                        </section>

                        <Link to={`/sign/1254`}>
                            <button type="submit" className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ml-5 '>Create E-signature request</button>
                        </Link>
                    </form>
                </div>
                <div className='bg-white ml-8 w-80 h-64 mt-16 text-white'>
                    <h5>Fill in fields Enter required data.</h5>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Create