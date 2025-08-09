import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { BarChart3 } from 'lucide-react'

const Analytics = () => (
  <SectionWrapper title="Analytics" icon={<BarChart3 className="w-6 h-6" />}>
    <div className="text-gray-500 dark:text-gray-400">
      Analytics coming soon.
    </div>
  </SectionWrapper>
)

export default Analytics
