import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ResendVerification from './pages/ResendVerification.jsx'
import NewPassword from './pages/NewPassword.jsx'

import { ToastContainer } from 'react-toastify'
import GmailVerifying from './pages/GmailVerifying.jsx'
import UserDashboardPage from './pages/dashboard/user.jsx'
import AdminDashboardPage from './pages/dashboard/admin.jsx'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route path="/gmail-verifying" element={<GmailVerifying />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
