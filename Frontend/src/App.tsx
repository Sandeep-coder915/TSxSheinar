import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'

const router = getRouter()

const App = () => {
  return <RouterProvider router={router} />
}

export default App
