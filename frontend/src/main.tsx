import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/Login.tsx'
import VerifyEmail from './pages/VerifyEmail.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './components/AuthLayout.tsx'
import Register from './pages/Register.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>

          <Route index element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
