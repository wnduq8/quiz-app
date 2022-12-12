import Cookies from 'js-cookie'
import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ECBasicOption } from 'echarts/types/dist/shared'
import echarts from '@lib/echarts'
import { END_TIMESTAMP_COOKIE_NAME, PATH, START_TIMESTAMP_COOKIE_NAME, USER_ANSWER_COOKIE_NAME } from '@lib/constants'
import useQuizResult from '@hooks/useQuizResult'
import Button from '@components/atomic/Button'

function QuizResult() {
  const navigate = useNavigate()
  const divRef = useRef<HTMLDivElement>(null)
  const pieChartRef = useRef<echarts.ECharts | null>(null)

  const userAnswerList = Cookies.get(USER_ANSWER_COOKIE_NAME) ? JSON.parse(Cookies.get(USER_ANSWER_COOKIE_NAME)!) : null
  const endTime = Cookies.get(END_TIMESTAMP_COOKIE_NAME) ? JSON.parse(Cookies.get(END_TIMESTAMP_COOKIE_NAME)!) : null
  const startTime = Cookies.get(START_TIMESTAMP_COOKIE_NAME)
    ? JSON.parse(Cookies.get(START_TIMESTAMP_COOKIE_NAME)!)
    : null

  const { timeObj, totalQuestion, totalCorrect, totalIncorrect, onClickHome, onClickIncorrect } = useQuizResult({
    timeStamp: endTime - startTime,
    userAnswerList,
  })
  const { hour, min, sec } = timeObj

  const pieChartOptions = useMemo(() => {
    const options: ECBasicOption = {
      title: {
        text: '퀴즈 정오답 비율',
        left: 'center',
      },
      color: ['#2196f3', '#ef5350'],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Answers Ratio',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: [
            { name: '정답', value: totalCorrect },
            { name: '오답', value: totalIncorrect },
          ],
        },
      ],
    }
    return options
  }, [])

  useEffect(() => {
    if (!userAnswerList || !endTime || !startTime) {
      navigate(PATH.HOME, { replace: true })
    }
  }, [])

  useEffect(() => {
    const pieElement = divRef.current
    if (!pieElement || !pieChartOptions) return

    const pieChart = echarts.init(pieElement)
    if (!pieChartRef.current) {
      pieChartRef.current = pieChart
    }
    pieChart.setOption(pieChartOptions)

    const handleResize = () => {
      pieChart.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [divRef])

  return (
    <QuizResultBlock>
      <div className="quiz_result_info">
        <p>
          당신의 점수는 {totalQuestion}점 만점의 {totalCorrect}점
        </p>
        <p>틀린 문항 : {totalIncorrect} 문항</p>
        <p>
          퀴즈를 마칠 때까지 소요된 시간 : {hour}:{min}:{sec}
        </p>
      </div>
      <div className="pie_chart" ref={divRef} />
      <div className="btn_wrap">
        <Button onClick={onClickHome} disabled={false} btnName="홈으로 가기" />
        {totalIncorrect > 0 && <Button onClick={onClickIncorrect} disabled={false} btnName="오답노트 보기" />}
      </div>
    </QuizResultBlock>
  )
}

export default QuizResult

const QuizResultBlock = styled.div`
  .quiz_result_info {
    padding: 20px;
    background: #000000;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    border-radius: 10px;
  }

  .pie_chart {
    margin-top: 20px;
    width: 100%;
    height: 300px;
  }

  .btn_wrap {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`
