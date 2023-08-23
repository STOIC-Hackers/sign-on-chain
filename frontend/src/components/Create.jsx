/* eslint-disable react/prop-types */
import { useState } from 'react';
import Header from './Header'
import { FileUploader } from "react-drag-drop-files";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';


const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

function DragDrop({ useFile }) {
    const [file, setFile] = useFile();

    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <FileUploader required handleChange={handleChange} name="file" types={fileTypes} />
    );
}

const Create = ({ formState }) => {
    const { useTitle, useDescription, useSignerEmail, useSignerAddress, useFile } = formState;
    const [title, setTitle] = useTitle()
    const [description, setDescription] = useDescription()
    const [signerEmail, setSignerEmail] = useSignerEmail()
    const [signerAddress, setSignerAddress] = useSignerAddress()
    const [file, setFile] = useFile();

    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [uploadingError, setUploadingError] = useState(false)

    const handleForm = (e) => {

        e.preventDefault()
        setUploading(true)
        if (!title || !description || !signerAddress || !file) {
            console.log("Fields should not be empty");
            setUploadingError(true)
            setUploading(false)
            return
        }
        if (signerEmail) {
            emailjs.send('service_cn9z4ey', 'template_n8iswrs', { from_name: 'sign-on-chain', to_name: 'bilal', message: 'hello first mail' }, 'mWritrH0gsysW65x4')
                .then((result) => {
                    // show the user a success message
                    console.log(result);
                }, (error) => {
                    // show the user an error
                    console.log(error);
                });
        }
        const pinFileToIPFS = async () => {
            const formData = new FormData();
            formData.append('file', file)

            const pinataMetadata = JSON.stringify({
                name: file.name,
            });
            formData.append('pinataMetadata', pinataMetadata);

            const pinataOptions = JSON.stringify({
                cidVersion: 0,
            })
            formData.append('pinataOptions', pinataOptions);

            try {
                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                        'Content-Type': `multipart/form-data`,
                        'pinata_api_key': 'db021f2efac1258ffe00',
                        'pinata_secret_api_key': 'e625525f0d52b26917314101cc3420a9393a7e16bcd02d4699b83fa29a693191',
                        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1OTk2ZGEwMS1lMGZkLTRmODEtODQ0NS1mMjdmMDY2Y2EzMjAiLCJlbWFpbCI6ImJpbGFsMTAxc2hhaWtoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkYjAyMWYyZWZhYzEyNThmZmUwMCIsInNjb3BlZEtleVNlY3JldCI6ImU2MjU1MjVmMGQ1MmIyNjkxNzMxNDEwMWNjMzQyMGE5MzkzYTdlMTZiY2QwMmQ0Njk5YjgzZmEyOWE2OTMxOTEiLCJpYXQiOjE2OTI3OTU0ODh9.D61YjsgW5KvI3OIxuHjsqYVKqUlx_tlByDsrzB_3J1Y"
                    }
                });
                const ImgHash = `https://gateway.ipfs.io/ipfs/${res.data.IpfsHash}`;
                console.log(ImgHash);
                console.log(res);
                setUploadingError(false)
                setUploading(false)
                setUploaded(true)
            } catch (error) {
                setUploadingError(true)
                setUploading(false)
                console.log(error);
            }
        }
        pinFileToIPFS()
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
                                required
                            />

                            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description of the E-signature request'
                                className='border-2 mt-5 ml-5 block w-[96%] max-w-full bg-gray-300 rounded-lg'
                                name="description"
                                cols="96"
                                rows="2"
                                required
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
                                placeholder="Enter Signer's Email(optional) " className='border-2 mt-5 ml-5 w-[96%] h-12 text-cyan-500' type="email" name="signerEmail" id="" />

                            <input required value={signerAddress} onChange={(e) => setSignerAddress(e.target.value)}
                                placeholder='Signer Address:' className='border-2 my-5 ml-5 w-[96%] h-12' type="text" name="signerAddress" id="" />

                        </section>
                        {
                            uploading ? <button type="submit" className='text-white bg-yellow-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ml-5 '> <TailSpin color='#fff' height={20} /> Create E-signature request</button>
                                : uploadingError == true ? <button type="submit" className='text-white bg-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ml-5 '>error</button> :
                                    uploaded == false ?
                                        <button type="submit" className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ml-5 '>Create E-signature request</button>
                                        : <button type="submit" className='text-white bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ml-5 '>Files Uploaded</button>
                        }
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