import React from 'react'

const RegisterStep2 = ({
  form,
  onChange,
  onBack,
  onSubmit,
  loading,
  passwordValid,
  confirmPasswordValid,
}) => {
  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-blue-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="new-password"
          placeholder="••••••••"
          className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            !passwordValid ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          value={form.password}
          onChange={onChange}
        />
        {!passwordValid && (
          <div className="text-xs text-red-600 mt-1">
            Password must be at least 8 chars, include upper, lower, number, and
            special character.
          </div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-blue-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="••••••••"
          className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            !confirmPasswordValid ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          value={form.confirmPassword}
          onChange={onChange}
        />
        {!confirmPasswordValid && (
          <div className="text-xs text-red-600 mt-1">
            Passwords do not match.
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="w-1/2 py-2 px-4 bg-gray-200 text-blue-700 font-bold rounded-lg shadow hover:bg-gray-300"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="w-1/2 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
          onClick={onSubmit}
          disabled={loading || !passwordValid || !confirmPasswordValid}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  )
}

export default RegisterStep2
