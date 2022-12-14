import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes } from 'react-router-dom'

export function withMemoryRouter(routes: ReactNode, initialEntry: string = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  )
}
const testClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
})

export function Wrapper(children: ReactNode) {
  return <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
}
