import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { CreditCard } from 'lucide-react'

const Billing = () => (
  <SectionWrapper
    title="Billing & Payments"
    icon={<CreditCard className="w-6 h-6" />}
  >
    <div className="text-gray-500 dark:text-gray-400">No billing info yet.</div>
  </SectionWrapper>
)

export default Billing
