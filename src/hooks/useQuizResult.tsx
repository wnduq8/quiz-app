import { useMemo } from 'react'
import { time } from '@lib/time'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@lib/constants'

interface IUseQuizResultProps {
  timeStamp: number
  userAnswerList: any
}

function useQuizResult({ timeStamp, userAnswerList }: IUseQuizResultProps) {
  const navigate = useNavigate()
  const totalQuestion = userAnswerList.length
  const incorrectList = userAnswerList.filter(({ correct_answer, user_answer }: any) => correct_answer !== user_answer)
  const totalIncorrect = incorrectList.length
  const totalCorrect = totalQuestion - totalIncorrect
  const timeObj = useMemo(() => time(timeStamp), [])

  const onClickHome = () => {
    navigate(PATH.HOME)
  }

  const onClickIncorrect = () => {
    navigate(PATH.INCORRECT, {
      state: {
        incorrectList,
      },
    })
  }

  return { totalQuestion, totalCorrect, totalIncorrect, timeObj, onClickHome, onClickIncorrect }
}

export default useQuizResult
