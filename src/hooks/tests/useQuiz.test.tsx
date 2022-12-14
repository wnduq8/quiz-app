import { renderHook, act } from '@testing-library/react'
import useQuiz from '../useQuiz'
import { fakeQuizList, fakeUserAnswerList, fakeLastUserAnswerList } from '@src/tests/quiz'
import { PATH } from '@lib/constants'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('useQuiz', () => {
  let hook: any

  beforeEach(() => {
    mockedUsedNavigate.mockReset()
    const { result } = renderHook(useQuiz, {
      initialProps: {
        quiz: fakeQuizList,
        userAnswerList: fakeUserAnswerList,
      },
    })
    hook = result
  })

  it('정답을 입력하면 isCorrect는 true이다.', () => {
    const currentQuiz = fakeQuizList[fakeUserAnswerList.length]
    act(() => hook.current.onChangeQuestion(currentQuiz.correct_answer))
    expect(hook.current.isCorrect).toBe(true)
  })

  it('오답을 입력하면 isCorrect는 false이다.', () => {
    const currentQuiz = fakeQuizList[fakeUserAnswerList.length]
    act(() => hook.current.onChangeQuestion(currentQuiz.incorrect_answers[0]))
    expect(hook.current.isCorrect).toBe(false)
  })

  it('userAnswer의 초기값은 빈 string이다.', () => {
    expect(hook.current.userAnswer).toBe('')
  })

  it('isFinish는 false이다.', () => {
    expect(hook.current.isFinish).toBe(false)
  })

  it('문제 번호는 userAnswerList.length + 1 이다.', () => {
    expect(hook.current.order).toBe(fakeUserAnswerList.length + 1)
  })

  it('onClickNext함수가 실행되면 userAnswer은 빈 string이다.', () => {
    act(() => hook.current.onChangeQuestion('test'))
    act(() => hook.current.onClickNext())
    expect(hook.current.userAnswer).toBe('')
  })

  it('currentQuiz는 quiz[userAnswerList.length]이다.', () => {
    expect(hook.current.currentQuiz).toEqual(fakeQuizList[fakeUserAnswerList.length])
  })

  it('onClickFinish함수가 실행되면 userAnswer은 빈 string이고 "/quiz/result" 페이지로 이동한다.', () => {
    act(() => hook.current.onChangeQuestion('test'))
    act(() => hook.current.onClickFinish())
    expect(hook.current.userAnswer).toBe('')
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(PATH.RESULT)
  })

  describe('마지막 문제일 경우', () => {
    let hook: any
    beforeEach(() => {
      const { result } = renderHook(useQuiz, {
        initialProps: {
          quiz: fakeQuizList,
          userAnswerList: fakeLastUserAnswerList,
        },
      })
      hook = result
    })

    it('isFinish는 true이다.', () => {
      expect(hook.current.isFinish).toBe(true)
    })
  })
})
