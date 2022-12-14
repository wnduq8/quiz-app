import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import Question from '@components/Question'
import { fakeQuiz } from '@src/tests/quiz'

const { question, question_list, correct_answer } = fakeQuiz

describe('Question', () => {
  it('Snapshot - 항목을 선택했을 때', () => {
    const questionComponent = renderer.create(
      <Question question={question} questionList={question_list} userAnswer={correct_answer} />,
    )

    expect(questionComponent.toJSON()).toMatchSnapshot()
  })

  it('Snapshot - 항목을 선택하지 않았을 때', () => {
    const questionComponent = renderer.create(
      <Question question={question} questionList={question_list} userAnswer={''} />,
    )

    expect(questionComponent.toJSON()).toMatchSnapshot()
  })
})
