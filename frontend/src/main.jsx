import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
// import { Approuter } from './App'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={Approuter} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode >,
)
