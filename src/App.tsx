import React from 'react'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BasicLayout } from '@components/Layout'
import GlobalStyle from '@src/GlobalStyle'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BasicLayout>
          <GlobalStyle />
          <Outlet />
        </BasicLayout>
      </QueryClientProvider>
    </>
  )
}

export default App
