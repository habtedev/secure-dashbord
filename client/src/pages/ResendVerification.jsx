import React, { useState } from 'react'

const ResendVerification = () => {
  const [submitted, setSubmitted] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [resendCount, setResendCount] = useState(1)
  const resendLimit = 3

  React.useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const startCooldown = () => setCooldown(30)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setResendCount(1)
    startCooldown()
  }

  const handleResend = () => {
    if (resendCount < resendLimit && cooldown === 0) {
      setResendCount(resendCount + 1)
      setSubmitted(true)
      startCooldown()
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400 mb-2">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Resend Verification Email
            </span>
          </h1>
          <p className="text-gray-500 text-center text-sm mb-4">
            Enter your email address to resend the verification link.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Resend Verification
          </button>
        </form>
        {submitted && (
          <div className="mt-4 text-green-600 text-center">
            Verification email sent!{' '}
            {cooldown > 0 && `You can resend in ${cooldown}s.`}
          </div>
        )}
        <button
          className="mt-4 w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
          onClick={handleResend}
          disabled={cooldown > 0 || resendCount >= resendLimit}
        >
          Resend Again
        </button>
        {resendCount >= resendLimit && (
          <div className="mt-2 text-red-500 text-center text-sm">
            Resend limit reached. Try again later.
          </div>
        )}
      </div>
    </div>
  )
}

export default ResendVerification
