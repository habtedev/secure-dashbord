import React from 'react'

const SectionWrapper = ({ title, icon, children }) => (
  <section className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-lg mb-6 border border-gray-200">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      {icon && <span className="text-blue-500">{icon}</span>}
      {title}
    </h2>
    {children}
  </section>
)

export default SectionWrapper
