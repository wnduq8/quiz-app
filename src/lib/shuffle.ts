function shuffle(array: string[]) {
  if (array.length < 1) {
    throw new Error('배열의 요소가 존재하지 않습니다.')
  }
  return array.sort(() => Math.random() - 0.5)
}

export default shuffle
