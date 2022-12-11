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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <QuizIntro /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'quiz/result', element: <QuizResult /> },
      { path: 'quiz/incorrect', element: <QuizResultIncorrect /> },
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
