import './App.css'
import LoginPage from './views/LoginPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  }
])

function App() {
  

  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
