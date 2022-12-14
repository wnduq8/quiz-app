import { time } from '../time'

describe('time', () => {
  it('millisecond를 계산하여 시분초 객체를 반환한다.', () => {
    expect(time(213912313)).toEqual({
      hour: '59',
      min: '25',
      sec: '12',
    })
  })

  it('시분초는 두자릿수를 반환한다.', () => {
    expect(time(11109430)).toEqual({
      hour: '03',
      min: '05',
      sec: '09',
    })
  })

  it('millisecond가 1000 미만이라면 00을 반환한다.', () => {
    expect(time(999)).toEqual({
      hour: '00',
      min: '00',
      sec: '00',
    })
  })
})
