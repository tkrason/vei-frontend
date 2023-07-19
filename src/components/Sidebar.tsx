import { Link } from "react-router-dom"

function Sidebar() {

  return (
    <>
      <div className="h-screen w-52 flex flex-col bg-slate-100 shadow-md text-left pt-10 pl-5">
        <nav>
          <ul>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar