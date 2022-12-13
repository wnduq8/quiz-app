import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { PATH } from '@lib/constants'
import styled from 'styled-components'
import Question from '@components/Question'
import { IUserAnswerList } from '@hooks/types'

function QuizResultIncorrect() {
  const {
    state: { incorrectList },
  } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!incorrectList) {
      navigate(PATH.HOME, { replace: true })
    }
  }, [])

  return (
    <QuizResultIncorrectBlock>
      <p>오답 노트</p>
      <ul>
        {incorrectList.map((list: IUserAnswerList) => (
          <li key={list.question}>
            <Question question={list.question} question_list={list.question_list} userAnswer={list.user_answer} />
            <p>정답 : {list.correct_answer}</p>
            <p>선택하신 답 : {list.user_answer}</p>
          </li>
        ))}
      </ul>
    </QuizResultIncorrectBlock>
  )
}

export default QuizResultIncorrect

const QuizResultIncorrectBlock = styled.div`
  > p {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }

  > ul > li {
    border-bottom: 1px solid #000000;
    padding-bottom: 20px;

    &:last-of-type {
      border-bottom: none;
    }
  }
`
