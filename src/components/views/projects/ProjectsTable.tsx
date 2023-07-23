import React from 'react'
import { Link } from 'react-router-dom'
import { Project, deleteProject } from '../../../api/Project'
import { Button } from '../../../global/button'
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from '../../../global/components/ui/table'

interface ProjectsTableProps {
  projects: Project[],
  refetchProjects: () => void,
  showButtonLinkToClient: boolean
}

export const ProjectsTable: React.FC<ProjectsTableProps> = (projectsTableProps: ProjectsTableProps) => {

  const rows = projectsTableProps.projects.map(project => {

    let deleteFunction = async (projectId: string) => {
      await deleteProject(projectId)
      projectsTableProps.refetchProjects()
    }

    let projectDetailPath = "/projects/" + project.id

    let clientDetailPath = "/clients/" + project.belongsToClient
    let goToClientTableCell = projectsTableProps.showButtonLinkToClient ? <>
    <TableCell>
        <Link to={clientDetailPath}>
          <Button key={project.id} variant='outline'>To client</Button>
        </Link>
    </TableCell>
    </> : <></>

    return (
      <TableRow>
        <TableCell>{project.id}</TableCell>
        <TableCell>{project.name}</TableCell>
        <TableCell>{project.priority}</TableCell>
        <TableCell>{project.startDate.toString()}</TableCell>
        <TableCell>{project.endDate?.toString() || "no end"}</TableCell>
        <TableCell>{project.description}</TableCell>
        <TableCell>{project.isTentative}</TableCell>
        <TableCell>{project.probability}</TableCell>
        <TableCell>{project.currency}</TableCell>
        <TableCell>
          <Link to={projectDetailPath}>
            <Button key={project.id} variant='outline'>Detail</Button>
          </Link>
        </TableCell>
        <TableCell><Button key={project.id} variant='destructive' onClick={_ => deleteFunction(project.id)}>Delete</Button></TableCell>
        {goToClientTableCell}
      </TableRow>)
  })

  let goToClientTableHeader = projectsTableProps.showButtonLinkToClient ? <>
    <TableHead>Link to client</TableHead>
  </> : <></>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>is Tentative</TableHead>
            <TableHead>Probability (%)</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Project detail</TableHead>
            <TableHead>Delete</TableHead>
            {goToClientTableHeader}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </>
  )
}




export default ProjectsTable