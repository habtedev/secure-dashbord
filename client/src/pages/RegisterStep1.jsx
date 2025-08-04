import React from 'react'

const RegisterStep1 = ({ form, onChange, onNext, emailValid, nameValid }) => {
  return (
    <div>
      <div className="mb-6">
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
          className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            !nameValid ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          value={form.name}
          onChange={onChange}
        />
        {!nameValid && (
          <div className="text-xs text-red-600 mt-1">
            Name must be 2-30 characters.
          </div>
        )}
      </div>
      <div className="mb-6">
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
          className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            !emailValid ? 'border-red-500' : 'border-gray-300'
          }`}
          required
          value={form.email}
          onChange={onChange}
        />
        {!emailValid && (
          <div className="text-xs text-red-600 mt-1">
            Please enter a valid email address.
          </div>
        )}
      </div>
      <button
        type="button"
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
        onClick={onNext}
        disabled={!nameValid || !emailValid}
      >
        Next
      </button>
    </div>
  )
}

export default RegisterStep1
