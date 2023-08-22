import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import History from './components/History'
import Create from './components/Create'

export const Approuter = createBrowserRouter([{
  path: '/',
  element: <Home />
},
{
  path: '/create',
  element: <Create />
},
{
  path: '/history',
  element: <History />
}])
