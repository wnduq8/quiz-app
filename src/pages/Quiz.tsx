import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useQuiz from '@hooks/useQuiz'
import Button from '@components/atomic/Button'
import { PATH, USER_ANSWER_COOKIE_NAME } from '@lib/constants'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import Question from '@components/Question'

function Quiz() {
  const {
    state: { quiz },
  } = useLocation()
  const navigate = useNavigate()
  const userAnswerList = Cookies.get(USER_ANSWER_COOKIE_NAME) ? JSON.parse(Cookies.get(USER_ANSWER_COOKIE_NAME)!) : null
  const { userAnswer, isCorrect, isFinish, currentQuiz, order, onChangeQuestion, onClickNext, onClickFinish } = useQuiz(
    {
      quiz,
      userAnswerList,
    },
  )

  useEffect(() => {
    if (!userAnswerList) {
      navigate(PATH.HOME, { replace: true })
    }
  }, [])

  return (
    <QuizBlock>
      <p>Quiz {order}</p>
      <Question
        onChange={onChangeQuestion}
        question={currentQuiz.question}
        question_list={currentQuiz.question_list}
        userAnswer={userAnswer}
      />
      {userAnswer && (
        <>
          <p>선택하신 답은 {isCorrect ? '정답' : '오답'}입니다.</p>
          <Button
            onClick={isFinish ? onClickFinish : onClickNext}
            disabled={false}
            btnName={isFinish ? '결과보기' : '다음'}
          />
        </>
      )}
    </QuizBlock>
  )
}

export default Quiz

const QuizBlock = styled.div`
  width: 100%;
  padding: 0 100px;
  display: flex;
  flex-direction: column;

  > p {
    font-size: 30px;
    font-weight: 700;
  }
`
