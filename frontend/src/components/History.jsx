import Header from './Header'
import Footer from './Footer'

const History = () => {
    return (
        <>
            <Header />
            <div className='bg-gray-200 h-[100vh]'>
                <div className='bg-gray-200 mx-64'>
                    <h5 className='pt-12'>This page can be used to lookup Polysign transactions against a given Mumbai address.</h5>
                    <input placeholder='Address' className='h-8 w-[94%] block' type="text" name="" id="" />
                    <select defaultValue={"Mumbai"} className='mt-4 p-1'>
                        <option value="sfjs">Mumbai</option>
                        <option value="Matic Mainnet">Matic Mainnet</option>
                    </select>
                    <button className='bg-white ml-2 p-1'>View transactions</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default History