import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { Gauge, Briefcase, MessageSquare } from 'lucide-react'

const Overview = () => (
  <SectionWrapper
    title="Welcome Back!"
    icon={<Gauge className="w-6 h-6 text-blue-600" />}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Spend */}
      <div className="p-6 bg-white rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-blue-500 transition hover:shadow-md">
        <Gauge className="w-8 h-8 mb-3 text-blue-600 bg-blue-100 rounded-full p-1.5" />
        <div className="text-3xl font-bold text-gray-900">$1,200</div>
        <div className="text-gray-500 mt-1">Total Spend</div>
      </div>

      {/* Active Projects */}
      <div className="p-6 bg-white rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-green-500 transition hover:shadow-md">
        <Briefcase className="w-8 h-8 mb-3 text-green-600 bg-green-100 rounded-full p-1.5" />
        <div className="text-3xl font-bold text-gray-900">8</div>
        <div className="text-gray-500 mt-1">Active Projects</div>
      </div>

      {/* New Messages */}
      <div className="p-6 bg-white rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-purple-500 transition hover:shadow-md">
        <MessageSquare className="w-8 h-8 mb-3 text-purple-600 bg-purple-100 rounded-full p-1.5" />
        <div className="text-3xl font-bold text-gray-900">3</div>
        <div className="text-gray-500 mt-1">New Messages</div>
      </div>
    </div>
  </SectionWrapper>
)

export default Overview
