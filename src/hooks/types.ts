import { IQuizRes } from '@lib/api/types'

export interface IQuiz extends IQuizRes {
  question_list: string[]
}
export interface IUserAnswerList {
  correct_answer: string
  question: string
  question_list: string[]
  user_answer: string
}

export interface IUseQuizProps {
  quiz: IQuiz[]
  userAnswerList: IUserAnswerList[]
}

export interface IUseQuizResultProps {
  timeStamp: number
  userAnswerList: IUserAnswerList[]
}
