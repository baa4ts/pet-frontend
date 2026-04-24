import './index.css'  

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { AppRouter } from './configuracion/AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRouter} />
  </StrictMode>,
)