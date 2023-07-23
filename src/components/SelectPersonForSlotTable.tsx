import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../global/components/ui/table'
import { Person } from '../api/People'
import { hardbookPersonIntoSlot, prebookPersonIntoSlot } from '../api/FillableSlot'
import { Button } from '../global/button'
import { createSkillBadges } from './people/PeopleTable'

interface SelectPersonForSlotTable {
  peopleToChooseFrom: Person[],
  slotId: string,
  refetchSlots: () => void
}

export const SelectPersonForSlotTable: React.FC<SelectPersonForSlotTable> = (props: SelectPersonForSlotTable) => {
  
  let rows = props.peopleToChooseFrom.map(person => {

        let preBookPersonIntoSlot = async () => {
          await prebookPersonIntoSlot(props.slotId, person.id)
          props.refetchSlots()
        }

        let hardBookPersonIntoSlot = async () => {
          await hardbookPersonIntoSlot(props.slotId, person.id)
          props.refetchSlots()
        }

        let skillBadgesPart = createSkillBadges(person.skills)

        return (
          <TableRow>
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.surname}</TableCell>
            <TableCell className='w-full'>{skillBadgesPart}</TableCell>
            <TableCell>
              <Button key={person.id} variant='outline' onClick={_ => preBookPersonIntoSlot()}>Prebook</Button>
            </TableCell>
            <TableCell>
              <Button key={person.id} onClick={_ => hardBookPersonIntoSlot()}>Hardbook</Button>
            </TableCell>
          </TableRow>
        )
      })

  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Surname</TableHead>
        <TableHead>Skills</TableHead>
        <TableHead>Put into slot</TableHead>
        <TableHead>Put into slot</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows}
    </TableBody>
  </Table>
  )
}

export default SelectPersonForSlotTable