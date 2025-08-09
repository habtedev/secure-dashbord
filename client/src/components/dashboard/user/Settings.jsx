import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { Settings as SettingsIcon } from 'lucide-react'

const Settings = () => (
  <SectionWrapper title="Settings" icon={<SettingsIcon className="w-6 h-6" />}>
    <div className="text-gray-500 dark:text-gray-400">
      Settings coming soon.
    </div>
  </SectionWrapper>
)

export default Settings
