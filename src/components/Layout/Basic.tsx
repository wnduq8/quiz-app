import React from 'react'
import styled from 'styled-components'

interface IBasicLayoutProps {
  children: React.ReactNode
}

function BasicLayout({ children }: IBasicLayoutProps) {
  return <LayoutWrap>{children}</LayoutWrap>
}

export default BasicLayout

const LayoutWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`
