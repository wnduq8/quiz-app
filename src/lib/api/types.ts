export interface CommonResult<T> {
  response_code: number
  results: T
}

export interface IGetQuizParams {
  amount: number
  type: string
  encode: string
}

export interface IQuizRes {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
