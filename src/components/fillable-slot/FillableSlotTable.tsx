import { Link } from "react-router-dom"
import { FillableSlot, deleteFillableSlot } from "../../api/FillableSlot"
import { Button } from "../../global/button"
import { TableRow, TableCell, Table, TableBody, TableHead, TableHeader } from "../../global/components/ui/table"

interface FillableSlotTableProps {
  slots: FillableSlot[],
  refetchSlots: () => void,
}

export const FillableSlotTable: React.FC<FillableSlotTableProps> = (fillableSlotsTableProp: FillableSlotTableProps) => {

  let rows = fillableSlotsTableProp.slots.map(slot => {

    let deleteFunction = async (id: string) => {
      await deleteFillableSlot(id)
      fillableSlotsTableProp.refetchSlots()
    }

    let linkToSlotPeopleManagement = "/projects/" + slot.belongsToProject + "/slot/" + slot.id

    return (
      <TableRow>
        <TableCell>{slot.id}</TableCell>
        <TableCell>{slot.product}</TableCell>
        <TableCell>{slot.requiredNumberOfFillables}</TableCell>
        <TableCell>{slot.dailyRate}</TableCell>
        <TableCell>{slot.startDate.toString()}</TableCell>
        <TableCell>{slot.endDate?.toString() || "no end"}</TableCell>
        <TableCell>
          <Link to={linkToSlotPeopleManagement}>
            <Button key={slot.id} className="bg-green-400" variant='outline'>Manage people</Button>
          </Link>
        </TableCell>
        <TableCell>
          <Button key={slot.id} variant='destructive' onClick={_ => deleteFunction(slot.id)}>Delete</Button>
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
            <TableHead>Num. of openings</TableHead>
            <TableHead>Daily rate per person</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Manage people</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </>
  )


}