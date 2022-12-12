import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './App'
import NotFound from '@pages/NotFound'
import QuizIntro from '@pages/QuizIntro'
import Quiz from '@pages/Quiz'
import QuizResult from '@pages/QuizResult'
import QuizResultIncorrect from '@pages/QuizResultIncorrect'
import { PATH } from '@lib/constants'

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <QuizIntro /> },
      { path: PATH.QUIZ, element: <Quiz /> },
      { path: PATH.RESULT, element: <QuizResult /> },
      { path: PATH.INCORRECT, element: <QuizResultIncorrect /> },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

reportWebVitals()
