import './App.css'
import LoginPage from './views/LoginPage/LoginPage'
import CreateQuiz from './views/CreateQuiz/CreateQuiz'
import ShowOptions from './views/ShowOptions/ShowOptions'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/showoptions",
    element: <ShowOptions />
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
