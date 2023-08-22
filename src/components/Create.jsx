import { useState } from 'react';
import Header from './Header'
import { FileUploader } from "react-drag-drop-files";
import Footer from './Footer';

const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

function DragDrop() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
}

const Create = () => {
    return (
        <>
            <Header />
            <div className='bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900 min-h-fit flex justify-center p-1'>
                <div className='bg-gray-600 w-2/4 mt-16'>
                    <h1 className='text-2xl mt-5 ml-5 font-semibold text-white'>Create new esignature request</h1>
                    <form >
                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-white'>Esignature request title:</h4>
                        
                            <input
  placeholder='Title of the E-signature request'
  className='block border-2 mt-5 h-12 ml-5 w-[96%] max-w-full'
  type="text"
  name="title"
  id=""
/>

<textarea
  placeholder='Description of the E-signature request'
  className='border-2 mt-5 ml-5 block w-[96%] max-w-full'
  name=""
  cols="96"
  rows="2"
/>

                        </section>

                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-whtie text-white'>Upload Documents to E-sign:</h4>
                            {/* <input type="file" name="docfile" id="" /> */}
                            <div className='ml-5 mt-2'>
                                <DragDrop />
                            </div>
                            <h5 className='font-semibold ml-5 mt-2 text-white'>Files to upload:</h5>
                        </section>

                        <section>
                            <h4 className='ml-5 mt-10 font-semibold text-white'>Enter signer address:</h4>
                            <p className='ml-5 text-white'>In order to sign or agree to the documents, the viewer or potential signer of the documents must prove ownership of a particular address</p>
                            <input placeholder="Enter Signer's Email " className='border-2 mt-5 ml-5 w-[96%] h-12 text-cyan-500' type="email" name="signerEmail" id="" />
                            <input placeholder='Signer Address:' className='border-2 my-5 ml-5 w-[96%] h-12' type="text" name="signerAddress" id="" />
                        </section>
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