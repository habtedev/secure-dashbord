import React from 'react'
import SocialLogin from '../components/SocialLogin'

const Register = () => {
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
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-900 dark:text-blue-400 mb-2">
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent">
              Create Your Account
            </span>
          </h1>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-blue-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
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
          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-semibold text-blue-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="register-password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-semibold text-blue-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="register-confirm-password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200 tracking-wide transform hover:scale-105 active:scale-95"
          >
            Register
          </button>
        </form>
        <SocialLogin />
        <hr className="my-6 border-gray-300" />
        <div className="mt-8 text-center text-sm text-gray-600">
          <span>Already have an account?</span>
          <a
            href="/login"
            className="inline-block ml-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            Sign In Your Account
          </a>
        </div>
      </div>
    </div>
  )
}

export default Register
