import Radio from '@components/atomic/Radio'
import styled from 'styled-components'

interface IQuestionProps {
  question: string
  questionList: string[]
  userAnswer: string
  onChange?: (value: string) => void
}

function Question({ question, questionList, userAnswer, onChange }: IQuestionProps) {
  return (
    <QuestionBlock>
      <p>{question}</p>
      <ul>
        {questionList.map((question: string, index: number) => (
          <li key={question}>
            <Radio
              value={question}
              onChange={(e) => onChange && onChange(e.target.value)}
              checked={userAnswer === question}
              label={question}
              id={`${question}-${index + 1}`}
            />
          </li>
        ))}
      </ul>
    </QuestionBlock>
  )
}

export default Question

const QuestionBlock = styled.section`
  > ul {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    li {
      label {
        padding-left: 10px;
      }

      input,
      label {
        cursor: pointer;
      }
    }
  }
`
