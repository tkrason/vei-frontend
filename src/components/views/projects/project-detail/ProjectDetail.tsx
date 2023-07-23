import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Project, getProject } from '../../../../api/Project'
import PeopleInSlot from './SlotManagementView'

function ProjectDetail() {

  const { id: projectId } = useParams()

  if (projectId == undefined) return

  const {isSuccess, data} = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId)
  })

  const projectDetailsPart = getProjectDetailsPart(isSuccess, data) 

  return (
    <>
      <div className='flex flex-col pt-8 pl-8'>
        <div>{projectDetailsPart}</div>
        <hr className='my-8'></hr>
        <PeopleInSlot projectId={projectId}></PeopleInSlot>
      </div>
    </>
  )
}

export default ProjectDetail

export function getProjectDetailsPart(isSuccess: boolean, project: Project | undefined) {
  if (isSuccess && project) {
    return <>
      <div className='flex flex-col'>
        <div className=''>
          <h1 className='text-xl font-bold'>{project.name}</h1>
        </div>
        <div className='pt-10'>
          <ul>
            <li>Id: {project.id}</li>
            <li>Name: {project.name}</li>
            <li>Priority: {project.priority}</li>
            <li>Type: {project.type}</li>
            <li>Project start: {project.startDate.toString()}</li>
            <li>Project end: {project.endDate?.toString() || "no end"}</li>
            <li>Description: {project.description}</li>
            <li>Is tentative: {project.isTentative}</li>
            <li>Probability: {project.probability}%</li>
            <></>
          </ul>
        </div>
      </div>
    </>
  } else {
    return <div>Loading project details...</div>
  }
}
