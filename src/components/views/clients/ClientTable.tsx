import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../global/components/ui/table"

import { Client, deleteClient } from "../../../api/Client"
import { Button } from "../../../global/button"
import { Link } from "react-router-dom"

interface ClientTableProps {
  clients: Client[],
  refetch: () => void
}

export const ClientDataTable: React.FC<ClientTableProps> = (clientTableProps: ClientTableProps) => {

  let rows = clientTableProps.clients.map(item => {

    let deleteFunction = async (id: string) => {
      await deleteClient(id)
      clientTableProps.refetch()
    }

    let showClientEndpoint = "/clients/" + item.id

    return (
      <TableRow>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.priority}</TableCell>
        <TableCell>{item.cooperationStart.toString()}</TableCell>
        <TableCell>{item.cooperationEnd?.toString() || "no end"}</TableCell>
        <TableCell>
          <Link to={showClientEndpoint}>
            <Button key={item.id} variant='outline'>Detail</Button>
          </Link>
        </TableCell>
        <TableCell><Button key={item.id} variant='destructive' onClick={_ => deleteFunction(item.id)}>Delete</Button></TableCell>
      </TableRow>)
  })

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Details</TableHead>
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
