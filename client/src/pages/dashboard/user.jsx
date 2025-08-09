import React from 'react'
import Overview from '../../components/dashboard/user/Overview'
import Projects from '../../components/dashboard/user/Projects'
import Profile from '../../components/dashboard/user/Profile'
import Billing from '../../components/dashboard/user/Billing'
import Analytics from '../../components/dashboard/user/Analytics'
import Notifications from '../../components/dashboard/user/Notifications'
import Settings from '../../components/dashboard/user/Settings'
import Support from '../../components/dashboard/user/Support'

const UserDashboardPage = () => (
  <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4 sm:px-8">
    <div className="max-w-6xl mx-auto space-y-6">
      <Overview />
      <Profile />
      <Projects />
      <Billing />
      <Analytics />
      <Notifications />
      <Settings />
      <Support />
    </div>
  </div>
)

export default UserDashboardPage
