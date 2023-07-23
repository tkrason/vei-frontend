import { useQuery } from '@tanstack/react-query'
import { Person, deletePerson, getPeople } from '../../../api/People'
import { AllPeopleTable } from './AllPeopleTable'
import { ScrollArea } from '@radix-ui/react-scroll-area'

function AllPeoplePage() {

  const { isSuccess, data, refetch } = useQuery({
    queryKey: ['people'],
    queryFn: getPeople
  })

  if (isSuccess) {


    let deleteFunction = async (person: Person) => {
      await deletePerson(person.id)
      refetch()
    }

    let table = <AllPeopleTable people={data} deleteFunction={deleteFunction} />

    return (
      <>
        <div className='flex flex-col pt-8 pl-8'>
          <div>
            <h1 className='text-xl font-bold'>All people</h1>
          </div>
          <div className=''>
            <ScrollArea className='h-[90vh] flex-auto rounded-md border mr-4 mt-4 overflow-scroll overflow overflow-x-hidden'>
                {table}
            </ScrollArea>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>Loading all people...</div>
  )
}

export default AllPeoplePage