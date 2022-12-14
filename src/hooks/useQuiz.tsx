import { useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import { PATH, END_TIMESTAMP_COOKIE_NAME, USER_ANSWER_COOKIE_NAME } from '@lib/constants'
import { useNavigate } from 'react-router-dom'
import { IUseQuizProps } from '@hooks/types'

function useQuiz({ quiz, userAnswerList }: IUseQuizProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const navigate = useNavigate()
  const currentQuiz = quiz[userAnswerList.length]
  const order = userAnswerList.length + 1
  const isCorrect = currentQuiz.correct_answer === userAnswer
  const isFinish = quiz.length === order

  const onChangeQuestion = (answer: string) => {
    setUserAnswer(answer)
  }
  const userAnswerObj = useMemo(
    () => ({
      question: currentQuiz.question,
      correct_answer: currentQuiz.correct_answer,
      question_list: currentQuiz.question_list,
      user_answer: userAnswer,
    }),
    [currentQuiz, userAnswer],
  )

  const onClickNext = () => {
    if (!userAnswer) return
    Cookies.set(USER_ANSWER_COOKIE_NAME, JSON.stringify([...userAnswerList, userAnswerObj]))
    setUserAnswer('')
  }

  const onClickFinish = () => {
    Cookies.set(USER_ANSWER_COOKIE_NAME, JSON.stringify([...userAnswerList, userAnswerObj]))
    Cookies.set(END_TIMESTAMP_COOKIE_NAME, JSON.stringify(new Date().getTime()))
    setUserAnswer('')
    navigate(PATH.RESULT)
  }

  return { userAnswer, isCorrect, isFinish, currentQuiz, order, onClickFinish, onChangeQuestion, onClickNext }
}

export default useQuiz
