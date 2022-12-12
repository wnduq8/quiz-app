import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import shuffle from '@lib/shuffle'
import Button from '@components/atomic/Button'
import Cookies from 'js-cookie'
import { PATH, START_TIMESTAMP_COOKIE_NAME, USER_ANSWER_COOKIE_NAME } from '@lib/constants'

function QuizIntro() {
  const navigate = useNavigate()
  const quiz = [
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which Elton John hit starts with the line &quot;When are you gonna come down&quot;?',
      correct_answer: 'Goodbye Yellow Brick Road',
      incorrect_answers: ['Rocket Man', 'Bennie and the Jets', 'Crocodile Rock'],
    },
    {
      category: 'Entertainment: Board Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'How many dice are used in the game of Yahtzee?',
      correct_answer: 'Five',
      incorrect_answers: ['Four', 'Six', 'Eight'],
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'easy',
      question: 'How many manned moon landings have there been?',
      correct_answer: '6',
      incorrect_answers: ['1', '3', '7'],
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'medium',
      question: 'On what day did Germany invade Poland?',
      correct_answer: 'September 1, 1939',
      incorrect_answers: ['December 7, 1941', 'June 22, 1941', 'July 7, 1937'],
    },
    {
      category: 'Geography',
      type: 'multiple',
      difficulty: 'medium',
      question: 'The following Spanish provinces are located in the northern area of Spain except:',
      correct_answer: 'Murcia',
      incorrect_answers: ['Asturias', 'Navarre', 'Le&oacute;n'],
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is Brian May&#039;s guitar called?',
      correct_answer: 'Red Special',
      incorrect_answers: ['Blue Special', 'Green Special', 'Yellow Special'],
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What does the term MIME stand for, in regards to computing?',
      correct_answer: 'Multipurpose Internet Mail Extensions',
      incorrect_answers: [
        'Mail Internet Mail Exchange',
        'Multipurpose Interleave Mail Exchange',
        'Mail Interleave Method Exchange',
      ],
    },
    {
      category: 'Entertainment: Cartoon & Animations',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Which Hanna-Barbera cartoon character travelled with a canine companion named Beegle Beagle?',
      correct_answer: 'Grape Ape',
      incorrect_answers: ['Boss Gator', 'Wally Gator', 'Yogi Bear'],
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the number of keys on a standard Windows Keyboard?',
      correct_answer: '104',
      incorrect_answers: ['64', '94', '76'],
    },
    {
      category: 'Art',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Who painted the epic mural Guernica?',
      correct_answer: 'Pablo Picasso',
      incorrect_answers: ['Francisco Goya', 'Leonardo da Vinci', 'Henri Matisse'],
    },
  ]
  const onClickStartBtn = () => {
    const convertQuiz = quiz.map((quiz) => ({
      ...quiz,
      question_list: shuffle([...quiz.incorrect_answers, quiz.correct_answer]),
    }))
    Cookies.set(USER_ANSWER_COOKIE_NAME, '[]')
    Cookies.set(START_TIMESTAMP_COOKIE_NAME, JSON.stringify(new Date().getTime()))
    navigate(PATH.QUIZ, { state: { quiz: convertQuiz } })
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
      <Button onClick={onClickStartBtn} disabled={false} btnName="퀴즈풀기" />
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
