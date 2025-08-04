import React, { useState } from 'react'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NewPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/password/reset', { token, password })
      toast.success('Password reset successful! You can now log in.')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to reset password. Try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-red-600">Invalid Link</h2>
          <p className="text-gray-600">Reset token is missing or invalid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        <h1 className="text-2xl font-extrabold text-blue-900 mb-6 text-center">
          Set New Password
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200 tracking-wide"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Set New Password'}
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  )
}

export default NewPassword
