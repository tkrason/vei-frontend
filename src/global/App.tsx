import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AllClientsPage from '../components/views/clients/AllClientsPage'
import AllProjectsPage from '../components/views/projects/AllProjectsPage'
import AllPeoplePage from '../components/views/people/AllPeoplePage'
import ClientDetail from '../components/views/clients/ClientDetail'
import ProjectDetail from '../components/views/projects/project-detail/ProjectDetail'

export default function App() {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex-auto grow'>
          <Routes>
            <Route path='/' Component={AllClientsPage} />
            <Route path='/clients' Component={AllClientsPage} />
            <Route path='/clients/:id' Component={ClientDetail} />
            <Route path='/projects' Component={AllProjectsPage} />
            <Route path='/projects/:id' Component={ProjectDetail} />
            <Route path='/people' Component={AllPeoplePage} />
          </Routes>
        </div>
      </div>
    </>
  )
}