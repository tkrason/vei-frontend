import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Client, getClient } from '../api/Client';
import { Project, getProjectsForClient } from '../api/Project';
import ProjectsOnClientTable from './projects/ProjectsTable';

function ClientDetail() {

  const { id: clientId } = useParams()

  if (clientId === undefined) return

  const { isSuccess, data } = useQuery({
    queryKey: ["client-detail", clientId],
    queryFn: () => getClient(clientId)
  })

  const { isSuccess: projectsIsSuccess, data: projects, refetch: refetchProjects } = useQuery({
    queryKey: ["projects", clientId],
    queryFn: () => getProjectsForClient(clientId)
  })

  const clientDetailsPart = getClientPart(isSuccess, data)

  const refetchProjectsFunction = () => { refetchProjects() }
  const projectsTablePart = getProjectsTable(projectsIsSuccess, projects, refetchProjectsFunction)

  return (
    <>
      <div className='flex flex-col pt-8 pl-8'>
        <div>{clientDetailsPart}</div>
        <hr className='my-8'></hr>
        <div>{projectsTablePart}</div>
      </div>
    </>
  )

}

function getClientPart(isSuccess: boolean, data: Client | undefined) {

  if (isSuccess && data) {
    return (
      <>
        <div className='flex flex-col'>
          <div className=''>
            <h1 className='text-xl font-bold'>{data.name}</h1>
          </div>
          <div className='pt-10'>
            <ul>
              <li>Id: {data.id}</li>
              <li>Name: {data.name}</li>
              <li>Category: {data.category}</li>
              <li>Priority: {data.priority}</li>
              <li>Start of cooperation: {data.cooperationStart.toString()}</li>
              <li>End of cooperation: {data.cooperationEnd?.toString() || "no end"}</li>
              <li>Description: {data.description}</li>
              <li>Legal name: {data.contact.legalName}</li>
              <li>Registration number: {data.contact.registrationNumber}</li>
              <li>Address: {data.contact.address}</li>
              <li>Note: {data.contact.note}</li>
              <></>
            </ul>
          </div>
        </div>
      </>
    )
  } else {
    return <div>Loading client data...</div>
  }

}

function getProjectsTable(isSuccess: boolean, data: Project[] | undefined, refetch: () => void) {
  if (isSuccess && data) {
    return <ProjectsOnClientTable projects={data} refetchProjects={refetch} showButtonLinkToClient={false} />
  } else {
    return <div>Loading projects data...</div>
  }

}


export default ClientDetail