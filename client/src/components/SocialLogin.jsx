import React from 'react'

const SocialLogin = () => {
  return (
    <div className="my-6">
      <hr className="mb-6 border-gray-300" />
      <div className="text-center text-gray-500 text-sm mb-4">
        Or sign up with
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                d="M21.6 12.227c0-.818-.073-1.604-.208-2.364H12v4.482h5.424c-.234 1.262-.938 2.332-2.002 3.05v2.537h3.234c1.895-1.747 2.984-4.322 2.984-7.705z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.43 0 4.466-.805 5.955-2.188l-3.234-2.537c-.899.604-2.047.963-3.321.963-2.554 0-4.724-1.724-5.498-4.043H2.57v2.54C4.053 19.432 7.769 22 12 22z"
                fill="#34A853"
              />
              <path
                d="M6.502 13.195a5.98 5.98 0 010-3.82V6.835H2.57A9.997 9.997 0 002 12c0 1.604.385 3.127 1.07 4.465l3.432-3.27z"
                fill="#FBBC05"
              />
              <path
                d="M12 6.58c1.323 0 2.51.455 3.447 1.346l2.582-2.582C16.462 3.805 14.426 3 12 3 7.769 3 4.053 5.568 2.57 9.165l3.932 3.03C7.276 9.304 9.446 6.58 12 6.58z"
                fill="#EA4335"
              />
            </g>
          </svg>
          Continue with Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-lg bg-white text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#1877F2" />
            <path
              d="M15.67 12H13v7h-3v-7H8v-2.5h2V8.75C10 7.23 10.93 6 13.36 6H16v2.5h-1.5c-.41 0-.5.19-.5.5v1.5h2.17L15.67 12z"
              fill="#fff"
            />
          </svg>
          Continue with Facebook
        </button>
      </div>
    </div>
  )
}

export default SocialLogin
