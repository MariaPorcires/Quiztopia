import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  }
])

function App() {
  

  return (
    <div m className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
