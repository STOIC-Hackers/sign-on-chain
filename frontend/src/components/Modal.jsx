
import SignatureCanvas from 'react-signature-canvas'
import SignaturePad from 'signature_pad';
import toImg from 'react-svg-to-image';
// const pinataSDK = require('@pinata/sdk');
import axios from 'axios';
import { ethers } from 'ethers';

import { Web3Provider } from '@ethersproject/providers';
import { ABI } from '../CONSTANTS/Abi';
import { useState } from 'react';

const { ethereum } = window;


const Modal = ({ contractAdd, setFinalObj }) => {
    const canvas = document.querySelector("#canvas");

    let signaturePad;
    if (canvas) {
        signaturePad = new SignaturePad(canvas);
        signaturePad.backgroundColor = "black"
        signaturePad.penColor = 'red';


    }
    async function createSignNft(contractAdd, ipfsHash) {
        try {
            const provider = new Web3Provider(window.ethereum);
            const signer = provider && provider?.getSigner();
            const contractInstance = new ethers.Contract(
                contractAdd,
                ABI,
                signer
            );
            console.log("after  =", contractInstance.address);
            console.log("signer = ", signer);
            const signerAddress = await signer.getAddress()
            const contractSigner = await contractInstance.connect(signer);
            const tx = await contractSigner.sign(ipfsHash, {
                gasLimit: 1000000,
            });
            const res = await tx.wait()
            console.log("res", res);
            const txReciept = await provider.getTransaction(res.transactionHash)
            console.log("txReceipt", txReciept);
            // return await tx.wait()
            // if (type === userStatus.WHITELIST) {
            //     const tx = await contractSigner.whitelistUser(teamHash, user, {
            //         gasLimit: 1000000,
            //     });
            //     return await tx.wait();
            // }
            const nftSignUrl = await contractInstance.getSign()
            const fileName = await contractInstance.fileName()
            console.log(nftSignUrl);
            const nftResults = {
                signatureNft: {
                    response: "OK",
                    ipfs_url: nftSignUrl,
                    file_name: fileName,
                    content_type: 'image/png'
                }
            }
            const nftTransactionDetails = {
                nftResults,
                ...txReciept,
            }
            const finalObj = JSON.stringify(nftTransactionDetails, null, 6)
            setFinalObj(finalObj)
            console.log(finalObj);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleCanvasSubmit() {
        console.log("hello");
        const signatureDataURL = signaturePad.toDataURL();

        console.log("dataURL = ", signatureDataURL);

        // Extract base64 data from the data URL
        const data = signatureDataURL.split(',')[1];
        console.log("data = ", data);

        // Convert base64 data to binary format
        const binaryData = atob(data);
        console.log("Binary data = ", binaryData);

        // Create a Uint8Array to hold the binary data
        const byteArray = new Uint8Array(binaryData.length);
        console.log(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
        }
        // Create a Blob from the Uint8Array
        const blob = new Blob([byteArray], { type: 'image/png' });

        // Create a File from the Blob (optional)
        const pngFile = new File([blob], 'signature.png', { type: 'image/png' });

        const pinFileToIPFS = async () => {
            console.log("HI in pin");
            const formData = new FormData();
            formData.append('file', pngFile)
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
                console.log(res);
                console.log(res.data.IpfsHash);
                return res.data.IpfsHash
            } catch (error) {
                console.log(error);
            }
        }
        let ipfsHash = pinFileToIPFS()
        createSignNft(contractAdd, ipfsHash)
        // Decode base64 data from the data URL
    }

    return (
        <div>
            <div>
                <input className='bg-black' type="text" name="name" id="" />
            </div>
            <div>
                <SignatureCanvas penColor='cyan'
                    canvasProps={{ width: 500, height: 200, className: ' ml -3 px-3 bg-black', id: 'canvas' }} />
            </div>
            <button onClick={handleCanvasSubmit} type="submit" className="  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mt-5 ml-5">Submit</button>
        </div>
    )
}

export default Modal