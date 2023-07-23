import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Clients from '../components/Clients'
import Projects from '../components/Projects'
import People from '../components/People'
import ClientDetail from '../components/ClientDetail'
import ProjectDetail from '../components/ProjectDetail'
import FillableSlotDetail from '../components/FillableSlot'


export default function App() {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className='flex-auto grow'>
          <Routes>
            <Route path='/' Component={Clients} />
            <Route path='/clients' Component={Clients} />
            <Route path='/clients/:id' Component={ClientDetail} />
            <Route path='/projects' Component={Projects} />
            <Route path='/projects/:id' Component={ProjectDetail} />
            <Route path='/people' Component={People} />
          </Routes>
        </div>
      </div>
    </>
  )
}