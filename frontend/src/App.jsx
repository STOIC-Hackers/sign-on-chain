import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import History from './components/History'
import Create from './components/Create'
import SignContract from './components/SignContract'
import { useState } from 'react'


const App = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [signerEmail, setSignerEmail] = useState("")
  const [signerAddress, setSignerAddress] = useState("")
  const [file, setFile] = useState(null);

  const formState = {
    useTitle() {
      return [title, setTitle]
    },
    useDescription() { return [description, setDescription] },
    useSignerEmail() { return [signerEmail, setSignerEmail] },
    useSignerAddress() { return [signerAddress, setSignerAddress] },
    useFile() { return [file, setFile] }
  }
  return <>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/create' element={<Create formState={formState} />}></Route>
      <Route path='/history' element={<History />}></Route>
      <Route path='/sign/:id' element={<SignContract formState={formState} />}></Route>
    </Routes>
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
