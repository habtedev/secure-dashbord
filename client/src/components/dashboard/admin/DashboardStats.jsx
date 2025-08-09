import React from 'react'

const DashboardStats = () => (
  <section className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow mb-6">
    <h2 className="text-xl font-bold mb-2">Platform Stats</h2>
    {/* Total users, revenue, usage stats */}
    <div className="flex space-x-6">
      <div className="flex-1">
        <div className="text-2xl font-bold">1,200</div>
        <div className="text-gray-500">Total Users</div>
      </div>
      <div className="flex-1">
        <div className="text-2xl font-bold">$12,000</div>
        <div className="text-gray-500">Total Revenue</div>
      </div>
      <div className="flex-1">
        <div className="text-2xl font-bold">98%</div>
        <div className="text-gray-500">Uptime</div>
      </div>
    </div>
  </section>
)

export default DashboardStats
