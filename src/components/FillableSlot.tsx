import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '../api/Project'
import { FillableSlot, addPersonToSlot, deletePersonFromSlot, getFillableSlot } from '../api/FillableSlot'
import { Separator } from '../global/components/ui/separator'
import { getProjectDetailsPart } from './ProjectDetail'
import { Person, getPeople, getPeopleInSlot } from '../api/People'
import { PeopleTable, createSkillBadges } from './people/PeopleTable'
import { Button } from '../global/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../global/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../global/components/ui/dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../global/components/ui/sheet'
import { ScrollArea } from '../global/components/ui/scroll-area'
import { Input } from '../global/components/ui/input'

function FillableSlotDetail() {
  const { id: projectId, slotId: slotId } = useParams()

  const [filter, setFilter] = useState("")

  if (projectId === undefined) return
  if (slotId === undefined) return

  const { isSuccess: isProjectSuccess, data: projectData } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId)
  })

  const { isSuccess: isSlotSuccess, data: slotData } = useQuery({
    queryKey: ["projects", projectId, 'fillable-slot', slotId],
    queryFn: () => getFillableSlot(slotId)
  })

  const { isSuccess: isPeopleInSlotSuccess, data: peopleInSlot, refetch: peopleInSlotRefetch } = useQuery({
    queryKey: ["projects", projectId, 'fillable-slot', slotId, "people"],
    queryFn: () => getPeopleInSlot(slotId)
  })

  const { isSuccess: IsSuccessAllPeople, data: allPeople } = useQuery({
    queryKey: ['people'],
    queryFn: getPeople
  })

  const projectDetails = getProjectDetailsPart(isProjectSuccess, projectData)
  const slotDetails = getSlotDetailsPart(isSlotSuccess, slotData)
  const peopleInSlotPart = getPeopleInSlotPart(slotId, isPeopleInSlotSuccess, peopleInSlot, peopleInSlotRefetch, IsSuccessAllPeople, allPeople, filter, setFilter)

  return (
    <>
      <div className='flex flex-col pt-8 pl-8'>
        <div className='flex'>
          <div>
            {projectDetails}
          </div>
          <Separator className='mx-24 h-auto' orientation='vertical' />
          <div className='flex-auto'>
            {slotDetails}
          </div>
        </div>
        <Separator className='my-8'></Separator>
        <div>{peopleInSlotPart}</div>
      </div>
    </>
  )
}

export default FillableSlotDetail

function getSlotDetailsPart(isSlotsSuccess: boolean, slot: FillableSlot | undefined) {

  if (isSlotsSuccess && slot) {
    return <>
      <div className='flex flex-col'>
        <div className=''>
          <h1 className='text-xl'>Slot name: <b>{slot.product}</b></h1>
        </div>
        <div className='pt-10'>
          <ul>
            <li>Id: {slot.id}</li>
            <li>Project start: {slot.startDate.toString()}</li>
            <li>Project end: {slot.endDate?.toString() || "no end"}</li>
            <li>Rate per person: {slot.dailyRate}</li>
            <li>Required # of people: {slot.requiredNumberOfFillables}</li>
            <></>
          </ul>
        </div>
      </div>
    </>
  } else {
    return <div>Loading slot details...</div>
  }

}

function getPeopleInSlotPart(slotId: string, isSuccess: boolean, peopleInSlot: Person[] | undefined, refetchPeopleInSlot: () => void, isSuccessAllPeople: boolean, allPeople: Person[] | undefined, filter: string, setFilter: React.Dispatch<SetStateAction<string>>) {

  if (isSuccess && peopleInSlot) {

    let removePersonFromSlot = async (person: Person) => {
      await deletePersonFromSlot(slotId, person.id)
      refetchPeopleInSlot()
    }

    const peopleInSlotTablePart = peopleInSlot.length === 0 ? <div>No people in slot yet</div> : <div className='flex-auto rounded-md border mr-4'>
      <PeopleTable people={peopleInSlot} deleteFunction={removePersonFromSlot}></PeopleTable>
    </div>

    return (<>
      <div className='flex flex-col'>
        <div className='flex'>
          <h1 className='text-xl font-bold text-left w-60'>Possible people to add</h1>
          <div className='flex-auto mr-4'>{getAddMorePeopleToSlotDialogPart(slotId, isSuccessAllPeople, allPeople, refetchPeopleInSlot, peopleInSlot, filter, setFilter)}</div>
        </div>
        <Separator className='my-6' />
        <div className='flex'>
          <h1 className='text-xl font-bold text-left w-60'>People in slot</h1>
          {peopleInSlotTablePart}
        </div>
      </div>
    </>
    )
  } else {
    return <div>Loading people currently in slot...</div>
  }
}

function getAddMorePeopleToSlotDialogPart(slotId: string, isSuccessAllPeople: boolean, allPeople: Person[] | undefined, refetch: () => void, peopleInSlot: Person[], filter: string, setFilter: React.Dispatch<SetStateAction<string>>) {

  if (isSuccessAllPeople && allPeople) {

    const idsOfPeopleInSlot = peopleInSlot.map(person => { return person.id })
    const setOfIdsInSlot = new Set(idsOfPeopleInSlot)

    const peopleNotYetInSlot = allPeople.filter(person => { return !setOfIdsInSlot.has(person.id) })

    console.log("Running")

    let filterLowerCase = filter.toLowerCase()
    let rows = peopleNotYetInSlot
      .filter(person => {
        if (filterLowerCase == "") return true
        return person.name.toLowerCase().includes(filterLowerCase) || person.surname.toLowerCase().includes(filterLowerCase)
      })
      .map(person => {

        let addIntoSlotFunction = async () => {
          await addPersonToSlot(slotId, person.id)
          refetch()
        }

        let skillBadgesPart = createSkillBadges(person.skills)

        return (
          <TableRow>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.surname}</TableCell>
            <TableCell className='w-full'>{skillBadgesPart}</TableCell>
            <TableCell>
              <Button key={person.id} onClick={_ => addIntoSlotFunction()}>Add</Button>
            </TableCell>
          </TableRow>
        )
      })

    let table = <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Add into slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </>

    let dialog = <>
      <Dialog>
        <DialogTrigger><Button variant='default'>Open</Button></DialogTrigger>
        <DialogContent className='max-w-fit'>
          <DialogHeader>
            <DialogTitle>Select people to add into the slot</DialogTitle>
          </DialogHeader>
          <Input placeholder='Search...' value={filter} onChange={event => setFilter(event.target.value)}></Input>
          <ScrollArea className='h-[450px]'>
            {table}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>

    return (<>
      {dialog}
    </>)
  } else {
    return <div>Loading all people...</div>
  }
}
