import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../global/components/ui/dialog'
import { Button } from '../../../../global/button'
import { Input } from '../../../../global/components/ui/input'
import { ScrollArea } from '../../../../global/components/ui/scroll-area'
import { Person } from '../../../../api/People'
import { AddPeopleIntoSlotTable } from './AddPeopleIntoSlotTable'

interface AddPersonIntoSlotDialogProps {
  slotId: string,
  isSuccessAllPeople: boolean,
  allPeople: Person[],
  refetchSlots: () => void
}

export const AddPeopleIntoSlotDialog: React.FC<AddPersonIntoSlotDialogProps> = (props: AddPersonIntoSlotDialogProps) => {

  const [filter, setFilter] = useState("")

  const table = props.isSuccessAllPeople ? <AddPeopleIntoSlotTable slotId={props.slotId} peopleToChooseFrom={props.allPeople.filter((person: Person) => filterPerson(person, filter))} refetchSlots={props.refetchSlots} /> :
    <div>Loading all people</div>

  return (
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
  )
}

const filterPerson = (person: Person, activeFilter: string) => {
  if (activeFilter == "") return true

  let filterLowerCase = activeFilter.toLowerCase()
  return person.name.toLowerCase().includes(filterLowerCase) || person.surname.toLowerCase().includes(filterLowerCase) ||
    person.skills
      .map(skill => skill.skillName + " - " + skill.seniority)
      .some(skill => skill.toLowerCase().includes(filterLowerCase))
}


export default AddPeopleIntoSlotDialog