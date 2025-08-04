import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const GmailVerifying = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = React.useState('pending')
  const [message, setMessage] = React.useState('')
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  React.useEffect(() => {
    if (token) {
      setStatus('pending')
      // Simulate API call to verify email
      axios
        .post('/api/email/verify', { token })
        .then(() => {
          setStatus('success')
          setMessage('Your email has been verified! You can now log in.')
          setTimeout(() => navigate('/login'), 2000)
        })
        .catch((err) => {
          setStatus('error')
          setMessage(
            err.response?.data?.message ||
              'Verification failed. The link may be invalid or expired.',
          )
        })
    } else if (email) {
      setStatus('awaiting')
      setMessage(
        'Check your Gmail inbox for a verification link to activate your account.',
      )
    } else {
      setStatus('error')
      setMessage('Verification token is missing or invalid.')
    }
  }, [token, email, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-gray-200 text-center">
        <h1 className="text-2xl font-extrabold text-blue-900 mb-6">
          Gmail Verification
        </h1>
        {status === 'pending' && (
          <div className="text-blue-600 font-semibold animate-pulse">
            <svg
              className="mx-auto mb-2 w-8 h-8 text-blue-400 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Verifying your email...
          </div>
        )}
        {status === 'awaiting' && (
          <>
            <div className="text-blue-700 font-semibold mb-4">
              <svg
                className="mx-auto mb-2 w-10 h-10 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {message}
            </div>
            <div className="mb-2 text-gray-600 text-sm">
              Didn't get the email?
            </div>
            <button
              className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
              onClick={async () => {
                try {
                  await axios.post('/api/email/resend', { email })
                  toast.success('Verification email resent!')
                } catch (err) {
                  if (err.response?.status === 429) {
                    toast.error(
                      'Resend limit reached. Please try again in 24 hours.',
                    )
                  } else {
                    toast.error(
                      err.response?.data?.message ||
                        'Failed to resend verification email.',
                    )
                  }
                }
              }}
              disabled={!email}
            >
              Resend Verification Email
            </button>
          </>
        )}
        {status === 'success' && (
          <div className="text-green-600 font-semibold">{message}</div>
        )}
        {status === 'error' && (
          <div className="text-red-600 font-semibold">{message}</div>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  )
}

export default GmailVerifying
