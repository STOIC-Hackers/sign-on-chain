import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import SignContract from './components/SignContract'
import { useState } from 'react'


const App = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [signerEmail, setSignerEmail] = useState("")
  const [signerAddress, setSignerAddress] = useState("")
  const [file, setFile] = useState(null);
  const [accountAddress, setAccountAddress] = useState("")
  const [chainId, setChainId] = useState("")
  const [metaDataHash, setMetaDataHash] = useState()


  const formState = {
    useTitle() {
      return [title, setTitle]
    },
    useDescription() { return [description, setDescription] },
    useSignerEmail() { return [signerEmail, setSignerEmail] },
    useSignerAddress() { return [signerAddress, setSignerAddress] },
    useFile() { return [file, setFile] },
    useAccountAddress() { return [accountAddress, setAccountAddress] }
  }
  return <>
    <Routes>
      <Route path='/' element={<Home accountAddress={accountAddress} setChainId={setChainId} chainId={chainId} setAccountAddress={setAccountAddress} />}></Route>
      <Route path='/create' element={<Create metaDataHash={metaDataHash} setMetaDataHash={setMetaDataHash} setChainId={setChainId} chainId={chainId} formState={formState} />}></Route>
      <Route path='/sign/:cid/:contractAdd/:metaDatahash' element={<SignContract metaDataHash={metaDataHash} formState={formState} />}></Route>
    </Routes >
  </>
}

export default App;

// export const Approuter = createBrowserRouter([{
//   path: '/',
//   element: <Home />
// },
// {
//   path: '/create',
//   element: <Create />
// },
// {
//   path: '/history',
//   element: <History />
// },
// {
//   path: '/sign/:id',
//   element: <SignContract />
// }])
