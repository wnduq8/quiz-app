import { PATH } from '@lib/constants'
import { act, renderHook } from '@testing-library/react'
import { fakeLastUserAnswerList, fakeQuizList, fakeUserAnswerList } from '@src/tests/quiz'
import useQuizResult from '@hooks/useQuizResult'
const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('useQuizResult', () => {
  let hook: any

  beforeEach(() => {
    mockedUsedNavigate.mockReset()
    const { result } = renderHook(useQuizResult, {
      initialProps: {
        timeStamp: 0,
        userAnswerList: fakeLastUserAnswerList,
      },
    })
    hook = result
  })

  it('totalQuestion은 userAnswerList.length이다.', () => {
    expect(hook.current.totalQuestion).toBe(fakeLastUserAnswerList.length)
  })

  it('totalCorrect은 totalQuestion - totalIncorrect이다.', () => {
    const totalQuestion = fakeLastUserAnswerList.length
    const totalIncorrect = fakeLastUserAnswerList.filter(
      ({ correct_answer, user_answer }) => correct_answer !== user_answer,
    ).length

    expect(hook.current.totalCorrect).toBe(totalQuestion - totalIncorrect)
  })

  it('onClickHome함수가 호출되면 "/"페이지로 이동한다.', () => {
    act(() => hook.current.onClickHome())
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(PATH.HOME)
  })

  it('onClickIncorrect함수가 호출되면 incorrectList정보와 함께 "/quiz/incorrect"페이지로 이동한다.', () => {
    const incorrectList = fakeLastUserAnswerList.filter(
      ({ correct_answer, user_answer }) => correct_answer !== user_answer,
    )
    act(() => hook.current.onClickIncorrect())
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedUsedNavigate).toHaveBeenCalledWith(PATH.INCORRECT, {
      state: {
        incorrectList,
      },
    })
  })
})
