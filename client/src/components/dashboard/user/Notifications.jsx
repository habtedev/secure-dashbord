import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { Bell } from 'lucide-react'

const Notifications = () => (
  <SectionWrapper title="Notifications" icon={<Bell className="w-6 h-6" />}>
    <div className="text-gray-500 dark:text-gray-400">
      No notifications at the moment.
    </div>
  </SectionWrapper>
)

export default Notifications
