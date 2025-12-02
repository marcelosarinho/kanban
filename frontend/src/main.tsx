import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from '@routes/index.tsx'
import ThemeProvider from '@providers/ThemeProvider.tsx'
import GoodbyeProvider from '@providers/GoodbyeProvider'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <GoodbyeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </GoodbyeProvider>
    </ThemeProvider>
  </StrictMode>,
)
