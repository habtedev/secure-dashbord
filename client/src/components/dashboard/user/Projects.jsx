import React from 'react'
import SectionWrapper from '../../ui/SectionWrapper'
import { Folder } from 'lucide-react'

const Projects = () => (
  <SectionWrapper title="Projects" icon={<Folder className="w-6 h-6" />}>
    <div className="text-gray-500 dark:text-gray-400">No projects yet.</div>
  </SectionWrapper>
)

export default Projects
