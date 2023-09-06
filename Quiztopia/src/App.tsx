import './App.css'
import LoginPage from './views/LoginPage/LoginPage'
import CreateQuiz from './views/CreateQuiz/CreateQuiz'
import Navigation from './views/Navigation/Navigation'
import SearchQuiz from './views/SearchQuiz/SearchQuiz'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ShowQuizzes from './views/ShowQuizzes/ShowQuizzes'

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
  },
  {
    path: "/showquizzes",
    element: <ShowQuizzes />
  },
  {
    path: "/searchquiz",
    element: <SearchQuiz />
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
