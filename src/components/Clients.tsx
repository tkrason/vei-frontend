import { useQuery } from '@tanstack/react-query'
import { getClients } from '../api/Client'
import { ClientDataTable } from './clients/ClientTable'

function Clients() {

  const { isSuccess, data } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients
  })

  if (isSuccess) {
    return (
      <>
        <div className='flex flex-col pt-8 pl-8'>
          <div className='flex'>
            <h1 className='text-xl font-bold'>All clients</h1>
            <div>

            </div>
          </div>
          <div className='pt-10'>
            <ClientDataTable clients={data.data} />
          </div>
        </div>
      </>
    )
  }

  return <div>Loading...</div>
}

export default Clients