import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { LifeBuoy } from 'lucide-react'

const Support = () => (
  <SectionWrapper
    title="Help & Support Center"
    icon={<LifeBuoy className="w-6 h-6" />}
  >
    <div className="text-gray-500 dark:text-gray-400">
      Need help? Contact support.
    </div>
  </SectionWrapper>
)

export default Support
