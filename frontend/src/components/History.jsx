import Header from './Header'
import Footer from './Footer'

const History = () => {
    return (
        <>
            <Header />
            <div className='bg-gradient-to-bl  from-sky-900 via-gray-900 to-slate-900  h-[100vh] py-7' >
                <div className='bg-gray-600 mx-64 py-3 px-3'>
                    <h5 className=' py-3 pt-12 text-cyan-500 font-extrabold text-2xl'>This page can be used to lookup Polysign transactions against a given Mumbai address.</h5>
                    <input placeholder='Address' className='h-8 w-[94%] block text-pink-500 bg-black' type="text" name="" id="" />
                    <select defaultValue={"Mumbai"} className='mt-4 p-1 bg-black text-cyan-500 '>
                        <option value="sfjs bg-black">Mumbai</option>
                        <option value="Matic Mainnet">Matic Mainnet</option>
                    </select>
                    <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Login with MetaMask</button>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default History
//                <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] '>Login with MetaMask</button>
// <button className='bg-black ml-2 p-1 text-cyan-500'>View transactions</button>
