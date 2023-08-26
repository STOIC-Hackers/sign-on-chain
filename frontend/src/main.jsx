import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
// import { Web3ReactProvider } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
// import { Approuter } from './App'
import './index.css'
import App from './App'

// function getLibrary(provider) {
//   return new Web3Provider(provider);
// }


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={Approuter} /> */}
    <BrowserRouter>
      {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      <App />
      {/* </Web3ReactProvider> */}
    </BrowserRouter>
  </React.StrictMode >,
)
