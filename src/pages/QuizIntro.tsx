import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { shuffle } from '@lib/shuffle'
import Button from '@components/atomic/Button'
import Cookies from 'js-cookie'
import { PATH, START_TIMESTAMP_COOKIE_NAME, USER_ANSWER_COOKIE_NAME } from '@lib/constants'
import { getQuiz } from '@lib/api/quiz'

function QuizIntro() {
  const navigate = useNavigate()
  const {
    isLoading,
    error,
    data: quiz,
  } = useQuery(['quiz', 10, 'multiple'], () => getQuiz({ amount: 10, type: 'multiple', encode: 'url3986' }), {
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      return data.results.map((quiz) => {
        const decode_incorrect_answers = quiz.incorrect_answers.map((answer) => decodeURIComponent(answer))
        const decode_correct_answer = decodeURIComponent(quiz.correct_answer)
        return {
          ...quiz,
          category: decodeURIComponent(quiz.category),
          question: decodeURIComponent(quiz.question),
          correct_answer: decode_correct_answer,
          incorrect_answers: decode_incorrect_answers,
          question_list: shuffle([...decode_incorrect_answers, decode_correct_answer]),
        }
      })
    },
  })

  const onClickStartBtn = () => {
    Cookies.set(USER_ANSWER_COOKIE_NAME, '[]')
    Cookies.set(START_TIMESTAMP_COOKIE_NAME, JSON.stringify(new Date().getTime()))
    navigate(PATH.QUIZ, { state: { quiz } })
  }

  return (
    <QuizIntroBlock>
      <img src="/assets/images/quiz_logo.png" alt="quiz_logo" className="quiz_logo" draggable={false} />
      <QuizDesc>
        <li>1. 시작하기 버튼을 클릭 하시면 퀴즈 화면으로 넘어갑니다.</li>
        <li>2. 퀴즈는 총 10문제가 출제 됩니다.</li>
        <li>3. 퀴즈는 객관식이고 정답이라고 생각되는 하나의 항목을 클릭해주세요.</li>
        <li>4. 항목 선택 시 다음 문항으로 넘어갈 수 있습니다.</li>
        <li>5. 항목 선택 시 정답 유무를 바로 알 수 있습니다.</li>
        <li>6. 퀴즈를 모두 완료하면 최종 결과를 볼 수 있습니다.</li>
        <li>7. 최종 결과화면에서 오답노트를 볼 수 있습니다.</li>
      </QuizDesc>
      <>
        {isLoading && <p>퀴즈 정보를 받아오고 있습니다...</p>}
        {error && <p>퀴즈 정보를 받아오는데 실패하였습니다. 잠시 후에 다시 시도해주세요!</p>}
        {quiz && <Button onClick={onClickStartBtn} disabled={false} btnName="퀴즈풀기" />}
      </>
    </QuizIntroBlock>
  )
}

export default QuizIntro

const QuizIntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  > .quiz_logo {
    max-width: 500px;
    height: auto;
  }
`

const QuizDesc = styled.ul`
  > li {
    font-size: 18px;
  }
`
