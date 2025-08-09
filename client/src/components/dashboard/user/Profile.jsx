import React, { useState, useRef } from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import {
  UserCircle,
  Mail,
  Calendar,
  Lock,
  Settings,
  FileText,
  CreditCard,
  AlertTriangle,
} from 'lucide-react'

const TABS = [
  { label: 'Account', icon: <Lock className="w-4 h-4 mr-1" /> },
  { label: 'Settings', icon: <Settings className="w-4 h-4 mr-1" /> },
  { label: 'Activity', icon: <FileText className="w-4 h-4 mr-1" /> },
  { label: 'Billing', icon: <CreditCard className="w-4 h-4 mr-1" /> },
  {
    label: 'Danger Zone',
    icon: <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />,
  },
]

const Profile = () => {
  const [tab, setTab] = useState(0)
  const dateInputRef = useRef(null)
  return (
    <SectionWrapper title="Profile" icon={<UserCircle className="w-6 h-6" />}>
      {/* Profile Banner */}
      <div className="relative mb-8">
        <div className="h-28 bg-gradient-to-r from-blue-100 via-blue-50 to-white rounded-t-xl w-full absolute top-0 left-0 z-0" />
        <div className="relative flex flex-col items-center justify-center pt-10 pb-4 z-10">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-400 flex items-center justify-center shadow-lg mb-2">
            <UserCircle className="w-14 h-14 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-1">
            Customer
          </span>
          <div className="flex items-center text-gray-500 text-sm gap-2">
            <Mail className="w-4 h-4" /> john@example.com
          </div>
          <div className="flex items-center text-gray-400 text-xs gap-2 mt-1">
            <Calendar className="w-4 h-4" /> Member since Jan 2024
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-gray-200">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setTab(i)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-colors ${
              tab === i
                ? 'bg-white border-x border-t border-gray-200 -mb-px text-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="bg-gray-50 p-6 rounded-b-xl border border-t-0 border-gray-200">
        {tab === 0 && (
          <div className='flex flex-col items-baseline'>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Username</div>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:bg-white transition-colors w-4/5"
                defaultValue="johndoe"
              />
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Email</div>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:bg-white transition-colors w-4/5"
                defaultValue="john@example.com"
              />
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Phone</div>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:bg-white transition-colors w-4/5"
                defaultValue="+1 555-1234"
              />
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">
                Date of Birth
              </div>
              <div className="relative">
                <input
                  ref={dateInputRef}
                  className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:bg-white transition-colors pl-12 w-4/5"
                  type="date"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-100 rounded-full p-1 shadow text-blue-600 flex items-center justify-center"
                  style={{ pointerEvents: 'auto' }}
                  onClick={() =>
                    dateInputRef.current && dateInputRef.current.showPicker
                      ? dateInputRef.current.showPicker()
                      : dateInputRef.current && dateInputRef.current.focus()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Change Password
            </button>
          </div>
        )}
        {tab === 1 && (
          <div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">
                Notifications
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Email
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Push
              </label>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Language</div>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Theme</div>
              <select className="border border-gray-300 rounded-md px-4 py-2">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">Privacy</div>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Make profile private
              </label>
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <div className="mb-2 text-gray-700 font-semibold">
              Recent Logins
            </div>
            <ul className="text-sm text-gray-600 mb-4">
              <li>2025-08-07 10:12 - Chrome (192.168.1.2)</li>
              <li>2025-08-06 18:45 - Mobile (192.168.1.3)</li>
            </ul>
            <div className="mb-2 text-gray-700 font-semibold">
              Last Password Update
            </div>
            <div className="text-sm text-gray-600 mb-4">2025-07-30</div>
            <div className="mb-2 text-gray-700 font-semibold">
              Last Profile Edit
            </div>
            <div className="text-sm text-gray-600">2025-07-28</div>
          </div>
        )}
        {tab === 3 && (
          <div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">
                Subscription Plan
              </div>
              <div className="text-gray-900">Pro</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">
                Payment Method
              </div>
              <div className="text-gray-900">Visa **** 1234</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-1">
                Next Renewal
              </div>
              <div className="text-gray-900">2025-09-01</div>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Billing History
            </button>
          </div>
        )}
        {tab === 4 && (
          <div>
            <div className="mb-4">
              <div className="font-semibold text-red-600 mb-1">Danger Zone</div>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete Account
              </button>
              <button className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Deactivate Account
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}

export default Profile
