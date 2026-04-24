import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { AppRouter } from './configuracion/AppRouter'
import TanStack from './configuracion/TanStack'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanStack>
      <RouterProvider router={AppRouter} />
    </TanStack>
  </StrictMode>,
)