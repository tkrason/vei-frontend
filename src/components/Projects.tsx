import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProjects } from '../api/Project'
import ProjectsTable from './projects/ProjectsTable'

function Projects() {

  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  })

  if (isSuccess && data) {
    return (
      <>
        <div className='flex flex-col pt-8 pl-8'>
          <div className='flex'>
            <h1 className='text-xl font-bold'>All projects</h1>
          </div>
          <div className='pt-10'>
            <ProjectsTable projects={data} refetchProjects={refetch} showButtonLinkToClient={true} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div>Loading all projects...</div>
  )
}

export default Projects