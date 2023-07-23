import { FillableSlot, SlotOptionState, deleteFillableSlot, deletePersonFromSlot, hardbookPersonIntoSlot, prebookPersonIntoSlot } from "../../../../api/FillableSlot"
import { Button } from "../../../../global/button"
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from "../../../../global/components/ui/table"
import { Person, getPeople } from "../../../../api/People"
import { useQuery } from "@tanstack/react-query"
import AddPersonIntoSlotDialog from "./AddPersonIntoSlotDialog"
import { useMemo } from "react"

interface FillableSlotTableProps {
  slots: FillableSlot[],
  refetchSlots: () => void,
}

export const FillableSlotTable: React.FC<FillableSlotTableProps> = (props: FillableSlotTableProps) => {

  const { isSuccess, data: allPeople } = useQuery({
    queryKey: ['people'],
    queryFn: getPeople
  })

  const peopleMap = useMemo(() => {
    if (!isSuccess) return new Map<string, Person>()
    return new Map(allPeople.map(person => [person.id, person]))
  }, [allPeople])

  let rows = props.slots.map(slot => {

    let deleteSlotFunction = async (slotId: string) => {
      await deleteFillableSlot(slotId)
      props.refetchSlots()
    }

    let hardbookFunction = async (slotId: string, personId: string) => {
      await hardbookPersonIntoSlot(slotId, personId)
      props.refetchSlots()
    }

    let prebookFunction = async (slotId: string, personId: string) => {
      await prebookPersonIntoSlot(slotId, personId)
      props.refetchSlots()
    }

    let deletePersonFromSlotFunction = async (slotId: string, personId: string) => {
      await deletePersonFromSlot(slotId, personId)
      props.refetchSlots()
    }

    let preBookedList = slot.poolOfPossibleFillables
      .filter(slotOption => slotOption.state == SlotOptionState.PREBOOKED)
      .map(slotOption => {
        const person = peopleMap.get(slotOption.personId)
        return <>
          <div className="flex"><div className="flex-auto py-2">{person?.name} {person?.surname} [{slotOption.fte}%]</div><Button onClick={() => hardbookFunction(slot.id, slotOption.personId)} variant='outline' className="ml-1 h-6 my-1">Hard book</Button><Button onClick={() => deletePersonFromSlotFunction(slot.id, slotOption.personId)} variant='destructive' className="ml-1 h-6 my-1">X</Button></div>
        </>
      })

    let hardBookedList = slot.poolOfPossibleFillables
      .filter(slotOption => slotOption.state == SlotOptionState.HARDBOOKED)
      .map(slotOption => {
        const person = peopleMap.get(slotOption.personId)
        return <>
          <div className="flex"><div className="flex-auto py-2">{person?.name} {person?.surname} [{slotOption.fte}%]</div><Button onClick={() => prebookFunction(slot.id, slotOption.personId)} variant='outline' className="ml-1 h-6 my-1">Pre book</Button><Button onClick={() => deletePersonFromSlotFunction(slot.id, slotOption.personId)} variant='destructive' className="ml-1 h-6 my-1">X</Button></div>
        </>
      })

    let idsOfPeopleAlreadyAssigned = slot.poolOfPossibleFillables.map(slotOption => slotOption.personId)
    let allPeopleWithoutPeopleInSlot = isSuccess ? allPeople.filter(person => !idsOfPeopleAlreadyAssigned.includes(person.id)) : []

    return (
      <TableRow>
        <TableCell>{slot.id}</TableCell>
        <TableCell>{slot.product}</TableCell>
        <TableCell>{slot.dailyRate}</TableCell>
        <TableCell>{slot.startDate.toString()}</TableCell>
        <TableCell>{slot.endDate?.toString() || "no end"}</TableCell>
        <TableCell>
          <AddPersonIntoSlotDialog slotId={slot.id} isSuccessAllPeople={isSuccess} allPeople={allPeopleWithoutPeopleInSlot} refetchSlots={props.refetchSlots} />
        </TableCell>
        <TableCell className="align-top w-auto">
          <div className="flex flex-col">
            {preBookedList}
          </div>
        </TableCell>
        <TableCell className="align-top w-auto">
          <div className="flex flex-col">
            {hardBookedList}
          </div>
        </TableCell>
        <TableCell>
          <Button key={slot.id} className='text-red-500' variant='outline' onClick={_ => deleteSlotFunction(slot.id)}>Delete</Button>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Daily rate</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Manage people</TableHead>
            <TableHead>Pre booked</TableHead>
            <TableHead>Hard booked</TableHead>
            <TableHead>Delete slot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </>
  )


}