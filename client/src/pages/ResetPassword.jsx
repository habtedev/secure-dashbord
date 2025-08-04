import React, { useState } from 'react'
import axios from 'axios'

// Ensure axios uses the backend server on port 8500
axios.defaults.baseURL = 'http://localhost:8500'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false)
  const [resendCount, setResendCount] = useState(1)
  const [cooldown, setCooldown] = useState(0)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const resendLimit = 3

  React.useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const startCooldown = () => setCooldown(30)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address.')
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/password/request-reset', { email })
      toast.success(
        'If your email is registered, a reset link (valid for 30 minutes) has been sent.',
      )
      setSubmitted(true)
      setResendCount(1)
      startCooldown()
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Failed to send reset link. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCount < resendLimit && cooldown === 0) {
      setLoading(true)
      try {
        await axios.post('/api/password/request-reset', { email })
        toast.success('Reset link resent! The link is valid for 30 minutes.')
        setResendCount(resendCount + 1)
        setSubmitted(true)
        startCooldown()
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            'Failed to resend link. Please try again.',
        )
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-200 relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-gray-200 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 rounded-full p-3 mb-3">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 1c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400 mb-2">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Reset Your Password
            </span>
          </h1>
          <p className="text-gray-500 text-center text-sm mb-4">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold py-4">
            If your email is registered, a reset link (valid for 30 minutes) has
            been sent.
            <br />
            <button
              type="button"
              className={`mt-4 py-2 px-4 bg-blue-50 text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                resendCount >= resendLimit || cooldown > 0 || loading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleResend}
              disabled={resendCount >= resendLimit || cooldown > 0 || loading}
            >
              {cooldown > 0
                ? `Resend Link (${resendCount}/${resendLimit}) in ${cooldown}s`
                : `Resend Link (${resendCount}/${resendLimit})`}
            </button>
            {resendCount >= resendLimit && (
              <div className="text-red-500 text-xs mt-2">
                Resend limit reached. Please try again later.
              </div>
            )}
            <button
              type="button"
              className="block mx-auto mt-2 text-blue-500 underline text-xs"
              onClick={() => setSubmitted(false)}
            >
              Back to form
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="reset-email"
                className="block text-sm font-semibold text-blue-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="reset-email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200 tracking-wide transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  )
}

export default ResetPassword
