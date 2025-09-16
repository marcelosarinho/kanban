import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './Login.tsx'
import VerifyEmail from './VerifyEmail.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      {/* <Login /> */}
      <VerifyEmail />
    </QueryClientProvider>
  </StrictMode>,
)
