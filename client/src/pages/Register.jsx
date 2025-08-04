import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import SocialLogin from '../components/SocialLogin'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Validation regexes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRules = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
  const nameValid = form.name.length >= 2 && form.name.length <= 30
  const emailValid = emailRegex.test(form.email)
  const passwordValid = passwordRules.every((r) => r.test(form.password))
  const confirmPasswordValid =
    form.password === form.confirmPassword && form.confirmPassword.length > 0

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }

  const handleNext = () => {
    if (!nameValid) {
      toast.error('Name must be 2-30 characters.')
      return
    }
    if (!emailValid) {
      toast.error('Please enter a valid email address.')
      return
    }
    setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleSubmit = async () => {
    if (!passwordValid) {
      toast.error(
        'Password must be at least 8 chars, include upper, lower, number, and special character.',
      )
      return
    }
    if (!confirmPasswordValid) {
      toast.error('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      toast.success('Registration successful! Please verify your email.')
      setTimeout(() => {
        navigate(`/gmail-verifying?email=${encodeURIComponent(form.email)}`)
      }, 1200)
      setForm({ name: '', email: '', password: '', confirmPassword: '' })
      setStep(1)
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registration failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-100 via-blue-50 to-blue-200 relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-200 relative z-10 h-auto">
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
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 1 ? 'bg-blue-500' : 'bg-gray-200'
            } mx-1 transition-all duration-300`}
          ></div>
          <div
            className={`flex-1 h-1 rounded-full ${
              step === 2 ? 'bg-blue-500' : 'bg-gray-200'
            } mx-1 transition-all duration-300`}
          ></div>
        </div>
        {/* Step Content */}
        {step === 1 ? (
          <RegisterStep1
            form={form}
            onChange={handleChange}
            onNext={handleNext}
            emailValid={emailValid}
            nameValid={nameValid}
          />
        ) : (
          <RegisterStep2
            form={form}
            onChange={handleChange}
            onBack={handleBack}
            onSubmit={handleSubmit}
            loading={loading}
            passwordValid={passwordValid}
            confirmPasswordValid={confirmPasswordValid}
          />
        )}
        <details className="mt-6">
          <summary className="cursor-pointer text-blue-600 font-medium hover:underline">
            Use Social Login
          </summary>
          <div className="mt-4">
            <SocialLogin />
          </div>
        </details>
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  )
}

export default Register
