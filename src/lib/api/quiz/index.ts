import { CommonResult, IGetQuizParams, IQuizRes } from '@lib/api/types'
import httpClient from '@lib/api/httpClient'

export async function getQuiz(params: IGetQuizParams) {
  const response = await httpClient.get<CommonResult<IQuizRes[]>>('/api.php', { params })
  return response.data
}
