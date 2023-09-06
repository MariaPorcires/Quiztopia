import './App.css'
import LoginPage from './views/LoginPage/LoginPage'
import CreateQuiz from './views/CreateQuiz/CreateQuiz'
import ShowOptions from './views/Navigation/Navigation'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './views/Navigation/Navigation'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/navigation",
    element: <Navigation />
  },
  {
    path: "/createquiz",
    element: <CreateQuiz />
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
