function time(milliSeconds: number) {
  const seconds = Math.floor(milliSeconds / 1000)
  const hour = parseInt(String(seconds / 3600))
  const min = parseInt(String((seconds % 3600) / 60))
  const sec = seconds % 60

  return {
    hour: `${hour < 10 ? '0' : ''}${hour}`,
    min: `${min < 10 ? '0' : ''}${min}`,
    sec: `${sec < 10 ? '0' : ''}${sec}`,
  }
}

export { time }
