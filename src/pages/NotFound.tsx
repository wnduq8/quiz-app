import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@lib/constants'

function NotFound() {
  const navigate = useNavigate()
  useLayoutEffect(() => {
    navigate(PATH.HOME, { replace: true })
  }, [])

  return null
}

export default NotFound
